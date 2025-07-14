import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useOrders } from '../hooks/use-orders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  CheckCircle, 
  Package, 
  Download, 
  Mail, 
  ArrowRight,
  Calendar,
  CreditCard,
  FileText,
  Key,
  ExternalLink
} from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const { getOrderById } = useOrders();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const orderId = searchParams.get('order');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/?mode=login');
      return;
    }

    if (!orderId) {
      navigate('/shop');
      return;
    }

    fetchOrder();
  }, [isAuthenticated, orderId, navigate]);

  const fetchOrder = async () => {
    if (!orderId) return;
    
    try {
      const orderData = await getOrderById(orderId);
      if (orderData) {
        setOrder(orderData);
      } else {
        navigate('/shop');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className=\"min-h-screen flex items-center justify-center\">
        <div className=\"text-center\">
          <div className=\"animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto\"></div>
          <p className=\"mt-4 text-gray-600\">Chargement de votre commande...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className=\"min-h-screen bg-gray-50 py-8\">
      <div className=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8\">
        {/* Success Header */}
        <div className=\"text-center mb-8\">
          <div className=\"flex justify-center mb-4\">
            <div className=\"w-20 h-20 bg-green-100 rounded-full flex items-center justify-center\">
              <CheckCircle className=\"w-12 h-12 text-green-600\" />
            </div>
          </div>
          <h1 className=\"text-3xl font-bold text-gray-900 mb-2\">
            Commande confirmée !
          </h1>
          <p className=\"text-lg text-gray-600 mb-4\">
            Merci pour votre achat. Votre commande a été traitée avec succès.
          </p>
          <div className=\"flex items-center justify-center space-x-4 text-sm text-gray-500\">
            <div className=\"flex items-center space-x-1\">
              <FileText className=\"w-4 h-4\" />
              <span>Commande #{order.order_number}</span>
            </div>
            <div className=\"flex items-center space-x-1\">
              <Calendar className=\"w-4 h-4\" />
              <span>{new Date(order.created_at).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-8\">
          {/* Main Content */}
          <div className=\"lg:col-span-2 space-y-6\">
            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className=\"flex items-center space-x-2\">
                  <ArrowRight className=\"w-5 h-5 text-purple-600\" />
                  <span>Prochaines étapes</span>
                </CardTitle>
                <CardDescription>
                  Voici ce qui va se passer maintenant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className=\"space-y-4\">
                  <div className=\"flex items-start space-x-3\">
                    <div className=\"flex items-center justify-center w-8 h-8 bg-green-100 rounded-full flex-shrink-0\">
                      <CheckCircle className=\"w-4 h-4 text-green-600\" />
                    </div>
                    <div>
                      <h3 className=\"font-medium text-gray-900\">Confirmation par email</h3>
                      <p className=\"text-sm text-gray-600\">
                        Un email de confirmation a été envoyé à {order.billing_address?.email || 'votre adresse email'}
                      </p>
                    </div>
                  </div>
                  
                  <div className=\"flex items-start space-x-3\">
                    <div className=\"flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full flex-shrink-0\">
                      <Key className=\"w-4 h-4 text-blue-600\" />
                    </div>
                    <div>
                      <h3 className=\"font-medium text-gray-900\">Génération des licences</h3>
                      <p className=\"text-sm text-gray-600\">
                        Vos clés de licence seront générées et disponibles dans votre portail client
                      </p>
                    </div>
                  </div>
                  
                  <div className=\"flex items-start space-x-3\">
                    <div className=\"flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full flex-shrink-0\">
                      <Download className=\"w-4 h-4 text-purple-600\" />
                    </div>
                    <div>
                      <h3 className=\"font-medium text-gray-900\">Téléchargement disponible</h3>
                      <p className=\"text-sm text-gray-600\">
                        Vous pourrez télécharger vos logiciels depuis votre portail client
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className=\"flex items-center space-x-2\">
                  <Package className=\"w-5 h-5\" />
                  <span>Articles commandés</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className=\"space-y-4\">
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} className=\"flex items-center space-x-4 p-4 bg-gray-50 rounded-lg\">
                      <div className=\"w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0\">
                        <Package className=\"w-6 h-6 text-purple-600\" />
                      </div>
                      <div className=\"flex-1\">
                        <h3 className=\"font-medium text-gray-900\">{item.product?.name}</h3>
                        <p className=\"text-sm text-gray-600\">{item.product?.license_type}</p>
                        <div className=\"flex items-center space-x-4 mt-1\">
                          <span className=\"text-sm text-gray-500\">Quantité: {item.quantity}</span>
                          <span className=\"text-sm text-gray-500\">Prix unitaire: {item.unit_price}€</span>
                        </div>
                      </div>
                      <div className=\"text-right\">
                        <span className=\"font-medium text-lg\">{item.total_price.toFixed(2)}€</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de facturation</CardTitle>
              </CardHeader>
              <CardContent>
                {order.billing_address && (
                  <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                    <div>
                      <h4 className=\"font-medium text-gray-900 mb-2\">Adresse de facturation</h4>
                      <div className=\"text-sm text-gray-600 space-y-1\">
                        <p>{order.billing_address.full_name}</p>
                        {order.billing_address.company_name && (
                          <p>{order.billing_address.company_name}</p>
                        )}
                        <p>{order.billing_address.address}</p>
                        <p>
                          {order.billing_address.city}, {order.billing_address.postal_code}
                        </p>
                        <p>{order.billing_address.country}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className=\"font-medium text-gray-900 mb-2\">Contact</h4>
                      <div className=\"text-sm text-gray-600 space-y-1\">
                        <div className=\"flex items-center space-x-2\">
                          <Mail className=\"w-4 h-4\" />
                          <span>{order.billing_address.email}</span>
                        </div>
                        {order.billing_address.phone && (
                          <div className=\"flex items-center space-x-2\">
                            <span className=\"w-4 h-4 text-center\">📞</span>
                            <span>{order.billing_address.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className=\"space-y-6\">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Résumé de commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className=\"space-y-3\">
                  <div className=\"flex justify-between text-sm\">
                    <span>Sous-total</span>
                    <span>{order.subtotal.toFixed(2)}€</span>
                  </div>
                  
                  {order.discount_amount > 0 && (
                    <div className=\"flex justify-between text-sm text-green-600\">
                      <span>Réduction</span>
                      <span>-{order.discount_amount.toFixed(2)}€</span>
                    </div>
                  )}
                  
                  <div className=\"flex justify-between text-sm\">
                    <span>Taxes</span>
                    <span>{order.tax_amount.toFixed(2)}€</span>
                  </div>
                  
                  <Separator />
                  
                  <div className=\"flex justify-between font-bold text-lg\">
                    <span>Total</span>
                    <span>{order.total_amount.toFixed(2)}€</span>
                  </div>
                </div>

                <div className=\"mt-4 pt-4 border-t\">
                  <div className=\"flex items-center justify-between\">
                    <span className=\"text-sm text-gray-600\">Statut</span>
                    <Badge className=\"bg-green-100 text-green-800\">
                      {order.status === 'completed' ? 'Terminée' : 
                       order.status === 'processing' ? 'En cours' : 
                       order.status === 'pending' ? 'En attente' : order.status}
                    </Badge>
                  </div>
                  
                  <div className=\"flex items-center justify-between mt-2\">
                    <span className=\"text-sm text-gray-600\">Paiement</span>
                    <Badge className=\"bg-blue-100 text-blue-800\">
                      {order.payment_status === 'paid' ? 'Payé' : 
                       order.payment_status === 'pending' ? 'En attente' : order.payment_status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className=\"space-y-3\">
                <Button 
                  className=\"w-full\" 
                  onClick={() => navigate('/client-portal')}
                >
                  <Key className=\"w-4 h-4 mr-2\" />
                  Voir mes licences
                </Button>
                
                <Button 
                  variant=\"outline\" 
                  className=\"w-full\"
                  onClick={() => navigate('/client-portal?tab=orders')}
                >
                  <FileText className=\"w-4 h-4 mr-2\" />
                  Mes commandes
                </Button>
                
                <Button 
                  variant=\"outline\" 
                  className=\"w-full\"
                  onClick={() => navigate('/shop')}
                >
                  <Package className=\"w-4 h-4 mr-2\" />
                  Continuer mes achats
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardContent className=\"pt-6\">
                <div className=\"text-center\">
                  <h3 className=\"font-medium mb-2\">Besoin d'aide ?</h3>
                  <p className=\"text-sm text-gray-600 mb-4\">
                    Notre équipe support est disponible pour vous aider
                  </p>
                  <Button 
                    variant=\"outline\" 
                    size=\"sm\" 
                    onClick={() => navigate('/contact')}
                  >
                    <ExternalLink className=\"w-4 h-4 mr-2\" />
                    Nous contacter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <Card className=\"mt-8\">
          <CardContent className=\"pt-6\">
            <div className=\"text-center text-sm text-gray-600\">
              <p className=\"mb-2\">
                <strong>Important :</strong> Conservez ce numéro de commande pour vos dossiers : 
                <span className=\"font-mono bg-gray-100 px-2 py-1 rounded ml-2\">
                  {order.order_number}
                </span>
              </p>
              <p>
                Si vous avez des questions concernant votre commande, n'hésitez pas à{' '}
                <button 
                  onClick={() => navigate('/contact')}
                  className=\"text-purple-600 hover:underline\"
                >
                  nous contacter
                </button>
                {' '}en mentionnant ce numéro.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;