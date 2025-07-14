import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Textarea } from '../components/ui/textarea';
import { 
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Settings,
  UserCheck,
  Key,
  FileText,
  Mail,
  Bell,
  Shield,
  Database,
  Activity,
  Calendar,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Eye,
  AlertCircle,
  CheckCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { toast } from '../hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeProducts: 0,
    pendingOrders: 0,
    activeLicenses: 0
  });
  
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [licenses, setLicenses] = useState<any[]>([]);

  // Check if user is admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/?mode=login');
      return;
    }
    
    // For demo purposes, we'll check if user email contains 'admin'
    // In a real app, you'd check against a proper admin role
    if (!user?.email?.includes('admin')) {
      navigate('/');
      toast({
        title: \"Accès refusé\",
        description: \"Vous n'avez pas les permissions pour accéder à cette page.\",
        variant: \"destructive\"
      });
      return;
    }
    
    fetchDashboardData();
  }, [isAuthenticated, user, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Simulate API calls - in a real app, these would be actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setStats({
        totalUsers: 1247,
        totalOrders: 892,
        totalRevenue: 45678.90,
        activeProducts: 24,
        pendingOrders: 12,
        activeLicenses: 756
      });
      
      setUsers([
        {
          id: '1',
          email: 'john.doe@example.com',
          full_name: 'John Doe',
          created_at: '2024-01-15T10:30:00Z',
          last_login: '2024-01-20T14:22:00Z',
          status: 'active',
          orders_count: 3,
          total_spent: 299.97
        },
        {
          id: '2',
          email: 'jane.smith@example.com',
          full_name: 'Jane Smith',
          created_at: '2024-01-10T09:15:00Z',
          last_login: '2024-01-19T16:45:00Z',
          status: 'active',
          orders_count: 1,
          total_spent: 99.99
        }
      ]);
      
      setOrders([
        {
          id: '1',
          order_number: 'ORD-2024-001',
          user_email: 'john.doe@example.com',
          total_amount: 199.99,
          status: 'completed',
          payment_status: 'paid',
          created_at: '2024-01-20T10:30:00Z',
          items_count: 2
        },
        {
          id: '2',
          order_number: 'ORD-2024-002',
          user_email: 'jane.smith@example.com',
          total_amount: 99.99,
          status: 'processing',
          payment_status: 'paid',
          created_at: '2024-01-19T14:22:00Z',
          items_count: 1
        }
      ]);
      
      setProducts([
        {
          id: '1',
          name: 'Adobe Creative Suite',
          price: 199.99,
          license_type: 'Licence complète',
          status: 'active',
          sales_count: 45,
          created_at: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          name: 'Microsoft Office 365',
          price: 99.99,
          license_type: 'Abonnement annuel',
          status: 'active',
          sales_count: 78,
          created_at: '2024-01-01T00:00:00Z'
        }
      ]);
      
      setLicenses([
        {
          id: '1',
          product_name: 'Adobe Creative Suite',
          user_email: 'john.doe@example.com',
          license_key: 'ABCD-EFGH-IJKL-MNOP',
          status: 'active',
          created_at: '2024-01-20T10:30:00Z',
          expires_at: '2025-01-20T10:30:00Z'
        }
      ]);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: \"Erreur\",
        description: \"Impossible de charger les données du tableau de bord.\",
        variant: \"destructive\"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string, type: 'user' | 'order' | 'product' | 'license' = 'order') => {
    const configs = {
      user: {
        active: { label: 'Actif', className: 'bg-green-100 text-green-800' },
        inactive: { label: 'Inactif', className: 'bg-gray-100 text-gray-800' },
        suspended: { label: 'Suspendu', className: 'bg-red-100 text-red-800' }
      },
      order: {
        completed: { label: 'Terminée', className: 'bg-green-100 text-green-800' },
        processing: { label: 'En cours', className: 'bg-blue-100 text-blue-800' },
        pending: { label: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
        cancelled: { label: 'Annulée', className: 'bg-red-100 text-red-800' }
      },
      product: {
        active: { label: 'Actif', className: 'bg-green-100 text-green-800' },
        inactive: { label: 'Inactif', className: 'bg-gray-100 text-gray-800' },
        draft: { label: 'Brouillon', className: 'bg-yellow-100 text-yellow-800' }
      },
      license: {
        active: { label: 'Active', className: 'bg-green-100 text-green-800' },
        expired: { label: 'Expirée', className: 'bg-red-100 text-red-800' },
        suspended: { label: 'Suspendue', className: 'bg-yellow-100 text-yellow-800' }
      }
    };
    
    const config = configs[type][status as keyof typeof configs[typeof type]] || 
                  { label: status, className: 'bg-gray-100 text-gray-800' };
    
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  if (!isAuthenticated || !user?.email?.includes('admin')) {
    return null;
  }

  if (loading) {
    return (
      <div className=\"min-h-screen flex items-center justify-center\">
        <div className=\"text-center\">
          <Loader2 className=\"w-8 h-8 animate-spin mx-auto mb-4\" />
          <p className=\"text-gray-600\">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gray-50 py-8\">
      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
        {/* Header */}
        <div className=\"mb-8\">
          <div className=\"flex items-center justify-between\">
            <div>
              <h1 className=\"text-3xl font-bold text-gray-900\">Tableau de bord Admin</h1>
              <p className=\"text-gray-600 mt-2\">
                Gérez votre boutique en ligne et vos clients
              </p>
            </div>
            <div className=\"flex space-x-4\">
              <Button variant=\"outline\" onClick={fetchDashboardData}>
                <RefreshCw className=\"w-4 h-4 mr-2\" />
                Actualiser
              </Button>
              <Button onClick={() => navigate('/shop')}>
                <Eye className=\"w-4 h-4 mr-2\" />
                Voir la boutique
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className=\"space-y-6\">
          <TabsList className=\"grid w-full grid-cols-6\">
            <TabsTrigger value=\"overview\" className=\"flex items-center space-x-2\">
              <BarChart3 className=\"w-4 h-4\" />
              <span>Aperçu</span>
            </TabsTrigger>
            <TabsTrigger value=\"users\" className=\"flex items-center space-x-2\">
              <Users className=\"w-4 h-4\" />
              <span>Utilisateurs</span>
            </TabsTrigger>
            <TabsTrigger value=\"orders\" className=\"flex items-center space-x-2\">
              <ShoppingCart className=\"w-4 h-4\" />
              <span>Commandes</span>
            </TabsTrigger>
            <TabsTrigger value=\"products\" className=\"flex items-center space-x-2\">
              <Package className=\"w-4 h-4\" />
              <span>Produits</span>
            </TabsTrigger>
            <TabsTrigger value=\"licenses\" className=\"flex items-center space-x-2\">
              <Key className=\"w-4 h-4\" />
              <span>Licences</span>
            </TabsTrigger>
            <TabsTrigger value=\"settings\" className=\"flex items-center space-x-2\">
              <Settings className=\"w-4 h-4\" />
              <span>Paramètres</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value=\"overview\" className=\"space-y-6\">
            {/* Stats Cards */}
            <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6\">
              <Card>
                <CardContent className=\"pt-6\">
                  <div className=\"flex items-center space-x-2\">
                    <Users className=\"w-8 h-8 text-blue-600\" />
                    <div>
                      <p className=\"text-2xl font-bold\">{stats.totalUsers.toLocaleString()}</p>
                      <p className=\"text-sm text-gray-600\">Utilisateurs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className=\"pt-6\">
                  <div className=\"flex items-center space-x-2\">
                    <ShoppingCart className=\"w-8 h-8 text-green-600\" />
                    <div>
                      <p className=\"text-2xl font-bold\">{stats.totalOrders.toLocaleString()}</p>
                      <p className=\"text-sm text-gray-600\">Commandes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className=\"pt-6\">
                  <div className=\"flex items-center space-x-2\">
                    <DollarSign className=\"w-8 h-8 text-purple-600\" />
                    <div>
                      <p className=\"text-2xl font-bold\">{stats.totalRevenue.toLocaleString()}€</p>
                      <p className=\"text-sm text-gray-600\">Revenus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className=\"pt-6\">
                  <div className=\"flex items-center space-x-2\">
                    <Package className=\"w-8 h-8 text-orange-600\" />
                    <div>
                      <p className=\"text-2xl font-bold\">{stats.activeProducts}</p>
                      <p className=\"text-sm text-gray-600\">Produits actifs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className=\"pt-6\">
                  <div className=\"flex items-center space-x-2\">
                    <Activity className=\"w-8 h-8 text-yellow-600\" />
                    <div>
                      <p className=\"text-2xl font-bold\">{stats.pendingOrders}</p>
                      <p className=\"text-sm text-gray-600\">En attente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className=\"pt-6\">
                  <div className=\"flex items-center space-x-2\">
                    <Key className=\"w-8 h-8 text-indigo-600\" />
                    <div>
                      <p className=\"text-2xl font-bold\">{stats.activeLicenses}</p>
                      <p className=\"text-sm text-gray-600\">Licences actives</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">
              <Card>
                <CardHeader>
                  <CardTitle>Commandes récentes</CardTitle>
                  <CardDescription>Les dernières commandes passées</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className=\"space-y-4\">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className=\"flex items-center justify-between p-3 bg-gray-50 rounded-lg\">
                        <div>
                          <p className=\"font-medium text-sm\">#{order.order_number}</p>
                          <p className=\"text-xs text-gray-600\">{order.user_email}</p>
                          <p className=\"text-xs text-gray-500\">
                            {new Date(order.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className=\"text-right\">
                          <p className=\"font-medium\">{order.total_amount.toFixed(2)}€</p>
                          {getStatusBadge(order.status, 'order')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nouveaux utilisateurs</CardTitle>
                  <CardDescription>Utilisateurs récemment inscrits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className=\"space-y-4\">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className=\"flex items-center justify-between p-3 bg-gray-50 rounded-lg\">
                        <div>
                          <p className=\"font-medium text-sm\">{user.full_name}</p>
                          <p className=\"text-xs text-gray-600\">{user.email}</p>
                          <p className=\"text-xs text-gray-500\">
                            Inscrit le {new Date(user.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className=\"text-right\">
                          <p className=\"text-sm font-medium\">{user.orders_count} commande(s)</p>
                          {getStatusBadge(user.status, 'user')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value=\"users\" className=\"space-y-6\">
            <Card>
              <CardHeader>
                <div className=\"flex items-center justify-between\">
                  <div>
                    <CardTitle>Gestion des utilisateurs</CardTitle>
                    <CardDescription>Gérez les comptes utilisateurs</CardDescription>
                  </div>
                  <div className=\"flex space-x-2\">
                    <Button variant=\"outline\" size=\"sm\">
                      <Download className=\"w-4 h-4 mr-2\" />
                      Exporter
                    </Button>
                    <Button size=\"sm\">
                      <Plus className=\"w-4 h-4 mr-2\" />
                      Nouvel utilisateur
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filters */}
                <div className=\"flex items-center space-x-4 mb-6\">
                  <div className=\"flex-1\">
                    <div className=\"relative\">
                      <Search className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                      <Input
                        placeholder=\"Rechercher un utilisateur...\"
                        className=\"pl-10\"
                      />
                    </div>
                  </div>
                  <Button variant=\"outline\" size=\"sm\">
                    <Filter className=\"w-4 h-4 mr-2\" />
                    Filtres
                  </Button>
                </div>

                {/* Users Table */}
                <div className=\"space-y-4\">
                  {users.map((user) => (
                    <Card key={user.id} className=\"border-l-4 border-l-blue-500\">
                      <CardContent className=\"pt-6\">
                        <div className=\"flex items-center justify-between\">
                          <div className=\"flex items-center space-x-4\">
                            <div className=\"w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center\">
                              <Users className=\"w-6 h-6 text-blue-600\" />
                            </div>
                            <div>
                              <h3 className=\"font-medium\">{user.full_name}</h3>
                              <p className=\"text-sm text-gray-600\">{user.email}</p>
                              <div className=\"flex items-center space-x-4 mt-1 text-xs text-gray-500\">
                                <span>Inscrit: {new Date(user.created_at).toLocaleDateString('fr-FR')}</span>
                                <span>Dernière connexion: {new Date(user.last_login).toLocaleDateString('fr-FR')}</span>
                              </div>
                            </div>
                          </div>
                          <div className=\"flex items-center space-x-4\">
                            <div className=\"text-right\">
                              <p className=\"text-sm font-medium\">{user.orders_count} commande(s)</p>
                              <p className=\"text-sm text-gray-600\">{user.total_spent.toFixed(2)}€ dépensés</p>
                            </div>
                            {getStatusBadge(user.status, 'user')}
                            <div className=\"flex space-x-2\">
                              <Button variant=\"outline\" size=\"sm\">
                                <Eye className=\"w-4 h-4\" />
                              </Button>
                              <Button variant=\"outline\" size=\"sm\">
                                <Edit className=\"w-4 h-4\" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value=\"orders\" className=\"space-y-6\">
            <Card>
              <CardHeader>
                <div className=\"flex items-center justify-between\">
                  <div>
                    <CardTitle>Gestion des commandes</CardTitle>
                    <CardDescription>Suivez et gérez toutes les commandes</CardDescription>
                  </div>
                  <div className=\"flex space-x-2\">
                    <Button variant=\"outline\" size=\"sm\">
                      <Download className=\"w-4 h-4 mr-2\" />
                      Exporter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filters */}
                <div className=\"flex items-center space-x-4 mb-6\">
                  <div className=\"flex-1\">
                    <div className=\"relative\">
                      <Search className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                      <Input
                        placeholder=\"Rechercher une commande...\"
                        className=\"pl-10\"
                      />
                    </div>
                  </div>
                  <select className=\"px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent\">
                    <option value=\"\">Tous les statuts</option>
                    <option value=\"pending\">En attente</option>
                    <option value=\"processing\">En cours</option>
                    <option value=\"completed\">Terminée</option>
                    <option value=\"cancelled\">Annulée</option>
                  </select>
                </div>

                {/* Orders Table */}
                <div className=\"space-y-4\">
                  {orders.map((order) => (
                    <Card key={order.id} className=\"border-l-4 border-l-green-500\">
                      <CardContent className=\"pt-6\">
                        <div className=\"flex items-center justify-between mb-4\">
                          <div>
                            <h3 className=\"font-medium text-lg\">#{order.order_number}</h3>
                            <p className=\"text-sm text-gray-600\">{order.user_email}</p>
                            <p className=\"text-xs text-gray-500\">
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
                            <div className=\"flex items-center space-x-2 mt-1\">
                              {getStatusBadge(order.status, 'order')}
                              <Badge className={order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                {order.payment_status === 'paid' ? 'Payé' : 'En attente'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className=\"flex items-center justify-between pt-4 border-t\">
                          <div className=\"text-sm text-gray-600\">
                            {order.items_count} article(s)
                          </div>
                          <div className=\"flex space-x-2\">
                            <Button variant=\"outline\" size=\"sm\">
                              <Eye className=\"w-4 h-4 mr-2\" />
                              Détails
                            </Button>
                            <Button variant=\"outline\" size=\"sm\">
                              <Edit className=\"w-4 h-4 mr-2\" />
                              Modifier
                            </Button>
                            <Button variant=\"outline\" size=\"sm\">
                              <Mail className=\"w-4 h-4 mr-2\" />
                              Contacter
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value=\"products\" className=\"space-y-6\">
            <Card>
              <CardHeader>
                <div className=\"flex items-center justify-between\">
                  <div>
                    <CardTitle>Gestion des produits</CardTitle>
                    <CardDescription>Gérez votre catalogue de produits</CardDescription>
                  </div>
                  <div className=\"flex space-x-2\">
                    <Button variant=\"outline\" size=\"sm\">
                      <Upload className=\"w-4 h-4 mr-2\" />
                      Importer
                    </Button>
                    <Button size=\"sm\">
                      <Plus className=\"w-4 h-4 mr-2\" />
                      Nouveau produit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className=\"space-y-4\">
                  {products.map((product) => (
                    <Card key={product.id} className=\"border-l-4 border-l-purple-500\">
                      <CardContent className=\"pt-6\">
                        <div className=\"flex items-center justify-between\">
                          <div className=\"flex items-center space-x-4\">
                            <div className=\"w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center\">
                              <Package className=\"w-6 h-6 text-purple-600\" />
                            </div>
                            <div>
                              <h3 className=\"font-medium\">{product.name}</h3>
                              <p className=\"text-sm text-gray-600\">{product.license_type}</p>
                              <p className=\"text-xs text-gray-500\">
                                {product.sales_count} vente(s)
                              </p>
                            </div>
                          </div>
                          <div className=\"flex items-center space-x-4\">
                            <div className=\"text-right\">
                              <p className=\"text-lg font-bold\">{product.price.toFixed(2)}€</p>
                              {getStatusBadge(product.status, 'product')}
                            </div>
                            <div className=\"flex space-x-2\">
                              <Button variant=\"outline\" size=\"sm\">
                                <Eye className=\"w-4 h-4\" />
                              </Button>
                              <Button variant=\"outline\" size=\"sm\">
                                <Edit className=\"w-4 h-4\" />
                              </Button>
                              <Button variant=\"outline\" size=\"sm\">
                                <Trash2 className=\"w-4 h-4\" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Licenses Tab */}
          <TabsContent value=\"licenses\" className=\"space-y-6\">
            <Card>
              <CardHeader>
                <div className=\"flex items-center justify-between\">
                  <div>
                    <CardTitle>Gestion des licences</CardTitle>
                    <CardDescription>Suivez toutes les licences générées</CardDescription>
                  </div>
                  <div className=\"flex space-x-2\">
                    <Button variant=\"outline\" size=\"sm\">
                      <Download className=\"w-4 h-4 mr-2\" />
                      Exporter
                    </Button>
                    <Button size=\"sm\">
                      <Plus className=\"w-4 h-4 mr-2\" />
                      Générer licence
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className=\"space-y-4\">
                  {licenses.map((license) => (
                    <Card key={license.id} className=\"border-l-4 border-l-indigo-500\">
                      <CardContent className=\"pt-6\">
                        <div className=\"flex items-center justify-between\">
                          <div className=\"flex items-center space-x-4\">
                            <div className=\"w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center\">
                              <Key className=\"w-6 h-6 text-indigo-600\" />
                            </div>
                            <div>
                              <h3 className=\"font-medium\">{license.product_name}</h3>
                              <p className=\"text-sm text-gray-600\">{license.user_email}</p>
                              <p className=\"text-xs text-gray-500 font-mono\">{license.license_key}</p>
                            </div>
                          </div>
                          <div className=\"flex items-center space-x-4\">
                            <div className=\"text-right text-sm\">
                              <p className=\"text-gray-600\">
                                Créée: {new Date(license.created_at).toLocaleDateString('fr-FR')}
                              </p>
                              <p className=\"text-gray-600\">
                                Expire: {license.expires_at ? new Date(license.expires_at).toLocaleDateString('fr-FR') : 'Jamais'}
                              </p>
                            </div>
                            {getStatusBadge(license.status, 'license')}
                            <div className=\"flex space-x-2\">
                              <Button variant=\"outline\" size=\"sm\">
                                <Eye className=\"w-4 h-4\" />
                              </Button>
                              <Button variant=\"outline\" size=\"sm\">
                                <Edit className=\"w-4 h-4\" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value=\"settings\" className=\"space-y-6\">
            <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">
              {/* General Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres généraux</CardTitle>
                  <CardDescription>Configuration de base de la boutique</CardDescription>
                </CardHeader>
                <CardContent className=\"space-y-4\">
                  <div>
                    <Label htmlFor=\"site_name\">Nom du site</Label>
                    <Input id=\"site_name\" defaultValue=\"JJ-P1114 STUDIO INC.\" />
                  </div>
                  <div>
                    <Label htmlFor=\"site_description\">Description</Label>
                    <Textarea id=\"site_description\" defaultValue=\"Boutique de logiciels professionnels\" />
                  </div>
                  <div>
                    <Label htmlFor=\"contact_email\">Email de contact</Label>
                    <Input id=\"contact_email\" type=\"email\" defaultValue=\"contact@jjp1114.com\" />
                  </div>
                  <Button>Sauvegarder</Button>
                </CardContent>
              </Card>

              {/* Payment Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de paiement</CardTitle>
                  <CardDescription>Configuration des méthodes de paiement</CardDescription>
                </CardHeader>
                <CardContent className=\"space-y-4\">
                  <Alert>
                    <AlertCircle className=\"h-4 w-4\" />
                    <AlertDescription>
                      La configuration Stripe sera disponible prochainement.
                    </AlertDescription>
                  </Alert>
                  <div>
                    <Label htmlFor=\"tax_rate\">Taux de taxe (%)</Label>
                    <Input id=\"tax_rate\" type=\"number\" defaultValue=\"15\" />
                  </div>
                  <div>
                    <Label htmlFor=\"currency\">Devise</Label>
                    <select className=\"w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent\">
                      <option value=\"EUR\">EUR (€)</option>
                      <option value=\"USD\">USD ($)</option>
                      <option value=\"CAD\">CAD ($)</option>
                    </select>
                  </div>
                  <Button>Sauvegarder</Button>
                </CardContent>
              </Card>

              {/* Email Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres email</CardTitle>
                  <CardDescription>Configuration des notifications email</CardDescription>
                </CardHeader>
                <CardContent className=\"space-y-4\">
                  <div className=\"flex items-center justify-between\">
                    <div>
                      <Label>Notifications de commande</Label>
                      <p className=\"text-sm text-gray-600\">Recevoir un email pour chaque nouvelle commande</p>
                    </div>
                    <input type=\"checkbox\" defaultChecked className=\"rounded\" />
                  </div>
                  <div className=\"flex items-center justify-between\">
                    <div>
                      <Label>Confirmations client</Label>
                      <p className=\"text-sm text-gray-600\">Envoyer des confirmations aux clients</p>
                    </div>
                    <input type=\"checkbox\" defaultChecked className=\"rounded\" />
                  </div>
                  <Button>Sauvegarder</Button>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité</CardTitle>
                  <CardDescription>Paramètres de sécurité et accès</CardDescription>
                </CardHeader>
                <CardContent className=\"space-y-4\">
                  <div className=\"flex items-center justify-between\">
                    <div>
                      <Label>Authentification à deux facteurs</Label>
                      <p className=\"text-sm text-gray-600\">Sécurité renforcée pour les admins</p>
                    </div>
                    <input type=\"checkbox\" className=\"rounded\" />
                  </div>
                  <div className=\"flex items-center justify-between\">
                    <div>
                      <Label>Logs d'activité</Label>
                      <p className=\"text-sm text-gray-600\">Enregistrer les actions administrateur</p>
                    </div>
                    <input type=\"checkbox\" defaultChecked className=\"rounded\" />
                  </div>
                  <Button>Sauvegarder</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;