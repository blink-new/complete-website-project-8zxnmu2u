import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useOrders } from '../hooks/use-orders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  User, 
  Package, 
  Download, 
  Key, 
  Settings, 
  CreditCard,
  FileText,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { toast } from '../hooks/use-toast';

const ClientPortal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, profile, updateProfile, isAuthenticated } = useAuth();
  const { getUserOrders, getUserLicenses } = useOrders();
  
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [orders, setOrders] = useState<any[]>([]);
  const [licenses, setLicenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showLicenseKeys, setShowLicenseKeys] = useState<{[key: string]: boolean}>({});
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    company_name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'Canada'
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/?mode=login&redirect=/client-portal');
      return;
    }
    
    fetchData();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        full_name: profile.full_name || '',
        company_name: profile.company_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        postal_code: profile.postal_code || '',
        country: profile.country || 'Canada'
      });
    }
  }, [profile]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch orders and licenses in parallel
      const [ordersData, licensesData] = await Promise.all([
        getUserOrders(),
        getUserLicenses()
      ]);
      
      setOrders(ordersData || []);
      setLicenses(licensesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: \"Erreur\",
        description: \"Impossible de charger vos données. Veuillez réessayer.\",
        variant: \"destructive\"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      
      const { error } = await updateProfile(profileForm);
      
      if (error) {
        throw new Error(error);
      }
      
      toast({
        title: \"Profil mis à jour\",
        description: \"Vos informations ont été sauvegardées avec succès.\"
      });
    } catch (error) {
      toast({
        title: \"Erreur\",
        description: error instanceof Error ? error.message : \"Erreur lors de la mise à jour\",
        variant: \"destructive\"
      });
    } finally {
      setUpdating(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: \"Copié !\",
      description: `${label} copié dans le presse-papiers.`
    });
  };

  const toggleLicenseKey = (licenseId: string) => {
    setShowLicenseKeys(prev => ({
      ...prev,
      [licenseId]: !prev[licenseId]
    }));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: 'Terminée', className: 'bg-green-100 text-green-800' },
      processing: { label: 'En cours', className: 'bg-blue-100 text-blue-800' },
      pending: { label: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
      cancelled: { label: 'Annulée', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || 
                  { label: status, className: 'bg-gray-100 text-gray-800' };
    
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getLicenseStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', className: 'bg-green-100 text-green-800' },
      expired: { label: 'Expirée', className: 'bg-red-100 text-red-800' },
      suspended: { label: 'Suspendue', className: 'bg-yellow-100 text-yellow-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || 
                  { label: status, className: 'bg-gray-100 text-gray-800' };
    
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className=\"min-h-screen flex items-center justify-center\">
        <div className=\"text-center\">
          <Loader2 className=\"w-8 h-8 animate-spin mx-auto mb-4\" />
          <p className=\"text-gray-600\">Chargement de votre portail...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gray-50 py-8\">
      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
        {/* Header */}
        <div className=\"mb-8\">
          <h1 className=\"text-3xl font-bold text-gray-900\">Portail Client</h1>
          <p className=\"text-gray-600 mt-2\">
            Gérez vos commandes, licences et informations personnelles
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className=\"space-y-6\">
          <TabsList className=\"grid w-full grid-cols-5\">
            <TabsTrigger value=\"overview\" className=\"flex items-center space-x-2\">
              <User className=\"w-4 h-4\" />
              <span>Aperçu</span>
            </TabsTrigger>
            <TabsTrigger value=\"orders\" className=\"flex items-center space-x-2\">
              <Package className=\"w-4 h-4\" />
              <span>Commandes</span>
            </TabsTrigger>
            <TabsTrigger value=\"licenses\" className=\"flex items-center space-x-2\">
              <Key className=\"w-4 h-4\" />
              <span>Licences</span>
            </TabsTrigger>
            <TabsTrigger value=\"profile\" className=\"flex items-center space-x-2\">
              <Settings className=\"w-4 h-4\" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value=\"billing\" className=\"flex items-center space-x-2\">
              <CreditCard className=\"w-4 h-4\" />
              <span>Facturation</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value=\"overview\" className=\"space-y-6\">
            <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6\">
              {/* Stats Cards */}
              <Card>
                <CardContent className=\"pt-6\">
                  <div className=\"flex items-center space-x-2\">
                    <Package className=\"w-8 h-8 text-purple-600\" />
                    <div>
                      <p className=\"text-2xl font-bold\">{orders.length}</p>
                      <p className=\"text-sm text-gray-600\">Commandes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className=\"pt-6\">
                  <div className=\"flex items-center space-x-2\">
                    <Key className=\"w-8 h-8 text-green-600\" />
                    <div>
                      <p className=\"text-2xl font-bold\">{licenses.length}</p>
                      <p className=\"text-sm text-gray-600\">Licences actives</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className=\"pt-6\">
                  <div className=\"flex items-center space-x-2\">
                    <Download className=\"w-8 h-8 text-blue-600\" />
                    <div>
                      <p className=\"text-2xl font-bold\">{licenses.filter(l => l.status === 'active').length}</p>
                      <p className=\"text-sm text-gray-600\">Téléchargements</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className=\"pt-6\">
                  <div className=\"flex items-center space-x-2\">
                    <CreditCard className=\"w-8 h-8 text-orange-600\" />
                    <div>
                      <p className=\"text-2xl font-bold\">
                        {orders.reduce((sum, order) => sum + (order.total_amount || 0), 0).toFixed(0)}€
                      </p>
                      <p className=\"text-sm text-gray-600\">Total dépensé</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Commandes récentes</CardTitle>
                <CardDescription>Vos dernières commandes</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className=\"text-center py-8\">
                    <Package className=\"w-12 h-12 text-gray-400 mx-auto mb-4\" />
                    <p className=\"text-gray-600 mb-4\">Aucune commande pour le moment</p>
                    <Button onClick={() => navigate('/shop')}>
                      Découvrir nos produits
                    </Button>
                  </div>
                ) : (
                  <div className=\"space-y-4\">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className=\"flex items-center justify-between p-4 bg-gray-50 rounded-lg\">
                        <div className=\"flex items-center space-x-4\">
                          <div className=\"w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center\">
                            <FileText className=\"w-5 h-5 text-purple-600\" />
                          </div>
                          <div>
                            <p className=\"font-medium\">#{order.order_number}</p>
                            <p className=\"text-sm text-gray-600\">
                              {new Date(order.created_at).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className=\"flex items-center space-x-4\">
                          <span className=\"font-medium\">{order.total_amount.toFixed(2)}€</span>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    ))}
                    
                    {orders.length > 3 && (
                      <div className=\"text-center pt-4\">
                        <Button variant=\"outline\" onClick={() => setActiveTab('orders')}>
                          Voir toutes les commandes
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Active Licenses */}
            <Card>
              <CardHeader>
                <CardTitle>Licences actives</CardTitle>
                <CardDescription>Vos licences de logiciels</CardDescription>
              </CardHeader>
              <CardContent>
                {licenses.length === 0 ? (
                  <div className=\"text-center py-8\">
                    <Key className=\"w-12 h-12 text-gray-400 mx-auto mb-4\" />
                    <p className=\"text-gray-600\">Aucune licence active</p>
                  </div>
                ) : (
                  <div className=\"space-y-4\">
                    {licenses.slice(0, 3).map((license) => (
                      <div key={license.id} className=\"flex items-center justify-between p-4 bg-gray-50 rounded-lg\">
                        <div className=\"flex items-center space-x-4\">
                          <div className=\"w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center\">
                            <Key className=\"w-5 h-5 text-green-600\" />
                          </div>
                          <div>
                            <p className=\"font-medium\">{license.product_name}</p>
                            <p className=\"text-sm text-gray-600\">{license.license_type}</p>
                          </div>
                        </div>
                        <div className=\"flex items-center space-x-4\">
                          {getLicenseStatusBadge(license.status)}
                          <Button size=\"sm\" variant=\"outline\">
                            <Download className=\"w-4 h-4 mr-2\" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {licenses.length > 3 && (
                      <div className=\"text-center pt-4\">
                        <Button variant=\"outline\" onClick={() => setActiveTab('licenses')}>
                          Voir toutes les licences
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value=\"orders\" className=\"space-y-6\">
            <Card>
              <CardHeader>
                <CardTitle>Mes commandes</CardTitle>
                <CardDescription>Historique complet de vos commandes</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className=\"text-center py-12\">
                    <Package className=\"w-16 h-16 text-gray-400 mx-auto mb-4\" />
                    <h3 className=\"text-lg font-medium text-gray-900 mb-2\">Aucune commande</h3>
                    <p className=\"text-gray-600 mb-6\">
                      Vous n'avez pas encore passé de commande
                    </p>
                    <Button onClick={() => navigate('/shop')}>
                      Découvrir nos produits
                    </Button>
                  </div>
                ) : (
                  <div className=\"space-y-4\">
                    {orders.map((order) => (
                      <Card key={order.id} className=\"border-l-4 border-l-purple-500\">
                        <CardContent className=\"pt-6\">
                          <div className=\"flex items-center justify-between mb-4\">
                            <div>
                              <h3 className=\"font-medium text-lg\">Commande #{order.order_number}</h3>
                              <p className=\"text-sm text-gray-600\">
                                {new Date(order.created_at).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            <div className=\"text-right\">
                              <p className=\"text-xl font-bold\">{order.total_amount.toFixed(2)}€</p>
                              {getStatusBadge(order.status)}
                            </div>
                          </div>
                          
                          {/* Order Items */}
                          {order.order_items && order.order_items.length > 0 && (
                            <div className=\"space-y-2 mb-4\">
                              <h4 className=\"font-medium text-sm text-gray-700\">Articles :</h4>
                              {order.order_items.map((item: any) => (
                                <div key={item.id} className=\"flex items-center justify-between text-sm bg-gray-50 p-3 rounded\">
                                  <div>
                                    <span className=\"font-medium\">{item.product?.name}</span>
                                    <span className=\"text-gray-600 ml-2\">× {item.quantity}</span>
                                  </div>
                                  <span>{item.total_price.toFixed(2)}€</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className=\"flex items-center justify-between pt-4 border-t\">
                            <div className=\"flex items-center space-x-4 text-sm text-gray-600\">
                              <div className=\"flex items-center space-x-1\">
                                <CreditCard className=\"w-4 h-4\" />
                                <span>Paiement: {order.payment_status === 'paid' ? 'Payé' : 'En attente'}</span>
                              </div>
                            </div>
                            <div className=\"flex space-x-2\">
                              <Button 
                                variant=\"outline\" 
                                size=\"sm\"
                                onClick={() => navigate(`/order-success?order=${order.id}`)}
                              >
                                <Eye className=\"w-4 h-4 mr-2\" />
                                Détails
                              </Button>
                              {order.status === 'completed' && (
                                <Button 
                                  size=\"sm\"
                                  onClick={() => setActiveTab('licenses')}
                                >
                                  <Key className=\"w-4 h-4 mr-2\" />
                                  Voir licences
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Licenses Tab */}
          <TabsContent value=\"licenses\" className=\"space-y-6\">
            <Card>
              <CardHeader>
                <CardTitle>Mes licences</CardTitle>
                <CardDescription>Gérez vos licences de logiciels</CardDescription>
              </CardHeader>
              <CardContent>
                {licenses.length === 0 ? (
                  <div className=\"text-center py-12\">
                    <Key className=\"w-16 h-16 text-gray-400 mx-auto mb-4\" />
                    <h3 className=\"text-lg font-medium text-gray-900 mb-2\">Aucune licence</h3>
                    <p className=\"text-gray-600 mb-6\">
                      Vous n'avez pas encore de licence active
                    </p>
                    <Button onClick={() => navigate('/shop')}>
                      Acheter une licence
                    </Button>
                  </div>
                ) : (
                  <div className=\"space-y-6\">
                    {licenses.map((license) => (
                      <Card key={license.id} className=\"border-l-4 border-l-green-500\">
                        <CardContent className=\"pt-6\">
                          <div className=\"flex items-center justify-between mb-4\">
                            <div>
                              <h3 className=\"font-medium text-lg\">{license.product_name}</h3>
                              <p className=\"text-sm text-gray-600\">{license.license_type}</p>
                            </div>
                            <div className=\"text-right\">
                              {getLicenseStatusBadge(license.status)}
                            </div>
                          </div>
                          
                          <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4\">
                            <div>
                              <Label className=\"text-sm font-medium text-gray-700\">Clé de licence</Label>
                              <div className=\"flex items-center space-x-2 mt-1\">
                                <Input
                                  type={showLicenseKeys[license.id] ? 'text' : 'password'}
                                  value={license.license_key || 'XXXX-XXXX-XXXX-XXXX'}
                                  readOnly
                                  className=\"font-mono text-sm\"
                                />
                                <Button
                                  variant=\"outline\"
                                  size=\"sm\"
                                  onClick={() => toggleLicenseKey(license.id)}
                                >
                                  {showLicenseKeys[license.id] ? (
                                    <EyeOff className=\"w-4 h-4\" />
                                  ) : (
                                    <Eye className=\"w-4 h-4\" />
                                  )}
                                </Button>
                                <Button
                                  variant=\"outline\"
                                  size=\"sm\"
                                  onClick={() => copyToClipboard(license.license_key || '', 'Clé de licence')}
                                >
                                  <Copy className=\"w-4 h-4\" />
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <Label className=\"text-sm font-medium text-gray-700\">Date d'expiration</Label>
                              <p className=\"text-sm text-gray-900 mt-1\">
                                {license.expires_at ? 
                                  new Date(license.expires_at).toLocaleDateString('fr-FR') : 
                                  'Licence permanente'
                                }
                              </p>
                            </div>
                          </div>
                          
                          <div className=\"flex items-center justify-between pt-4 border-t\">
                            <div className=\"text-sm text-gray-600\">
                              Activée le {new Date(license.created_at).toLocaleDateString('fr-FR')}
                            </div>
                            <div className=\"flex space-x-2\">
                              <Button variant=\"outline\" size=\"sm\">
                                <Download className=\"w-4 h-4 mr-2\" />
                                Télécharger
                              </Button>
                              <Button variant=\"outline\" size=\"sm\">
                                <ExternalLink className=\"w-4 h-4 mr-2\" />
                                Documentation
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value=\"profile\" className=\"space-y-6\">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Gérez vos informations de profil</CardDescription>
              </CardHeader>
              <CardContent className=\"space-y-6\">
                <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">
                  <div>
                    <Label htmlFor=\"full_name\">Nom complet</Label>
                    <Input
                      id=\"full_name\"
                      value={profileForm.full_name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, full_name: e.target.value }))}
                      placeholder=\"Votre nom complet\"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor=\"company_name\">Nom de l'entreprise</Label>
                    <Input
                      id=\"company_name\"
                      value={profileForm.company_name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, company_name: e.target.value }))}
                      placeholder=\"Nom de votre entreprise (optionnel)\"
                    />
                  </div>
                </div>

                <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">
                  <div>
                    <Label htmlFor=\"email\">Email</Label>
                    <div className=\"relative\">
                      <Mail className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                      <Input
                        id=\"email\"
                        type=\"email\"
                        value={user?.email || ''}
                        className=\"pl-10\"
                        disabled
                      />
                    </div>
                    <p className=\"text-xs text-gray-500 mt-1\">
                      L'email ne peut pas être modifié depuis ce portail
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor=\"phone\">Téléphone</Label>
                    <div className=\"relative\">
                      <Phone className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                      <Input
                        id=\"phone\"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                        className=\"pl-10\"
                        placeholder=\"+1 (555) 123-4567\"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor=\"address\">Adresse</Label>
                  <div className=\"relative\">
                    <MapPin className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                    <Input
                      id=\"address\"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                      className=\"pl-10\"
                      placeholder=\"123 Rue de la Paix\"
                    />
                  </div>
                </div>

                <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
                  <div>
                    <Label htmlFor=\"city\">Ville</Label>
                    <Input
                      id=\"city\"
                      value={profileForm.city}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, city: e.target.value }))}
                      placeholder=\"Montréal\"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor=\"postal_code\">Code postal</Label>
                    <Input
                      id=\"postal_code\"
                      value={profileForm.postal_code}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, postal_code: e.target.value }))}
                      placeholder=\"H1A 1A1\"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor=\"country\">Pays</Label>
                    <select
                      id=\"country\"
                      value={profileForm.country}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, country: e.target.value }))}
                      className=\"w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent\"
                    >
                      <option value=\"Canada\">Canada</option>
                      <option value=\"France\">France</option>
                      <option value=\"Belgique\">Belgique</option>
                      <option value=\"Suisse\">Suisse</option>
                      <option value=\"États-Unis\">États-Unis</option>
                    </select>
                  </div>
                </div>

                <div className=\"flex justify-end pt-6 border-t\">
                  <Button 
                    onClick={handleUpdateProfile}
                    disabled={updating}
                  >
                    {updating ? (
                      <>
                        <Loader2 className=\"w-4 h-4 mr-2 animate-spin\" />
                        Mise à jour...
                      </>
                    ) : (
                      'Sauvegarder les modifications'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value=\"billing\" className=\"space-y-6\">
            <Card>
              <CardHeader>
                <CardTitle>Informations de facturation</CardTitle>
                <CardDescription>Gérez vos méthodes de paiement et factures</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertCircle className=\"h-4 w-4\" />
                  <AlertDescription>
                    La gestion des méthodes de paiement sera disponible prochainement.
                    Pour toute question concernant la facturation, veuillez nous contacter.
                  </AlertDescription>
                </Alert>
                
                <div className=\"mt-6\">
                  <Button variant=\"outline\" onClick={() => navigate('/contact')}>
                    <Mail className=\"w-4 h-4 mr-2\" />
                    Contacter le support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientPortal;