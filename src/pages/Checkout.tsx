import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useCart } from '../hooks/use-cart';
import { useOrders } from '../hooks/use-orders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  CreditCard, 
  Package, 
  User, 
  MapPin, 
  Mail, 
  Phone,
  Building,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Lock,
  Percent
} from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, profile, isAuthenticated } = useAuth();
  const { items, getTotalPrice, clearCart } = useCart();
  const { createOrder, validatePromoCode } = useOrders();
  
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Confirmation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form data
  const [billingInfo, setBillingInfo] = useState({
    full_name: profile?.full_name || '',
    company_name: profile?.company_name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
    postal_code: profile?.postal_code || '',
    country: profile?.country || 'Canada'
  });
  
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/?mode=login&redirect=/checkout');
      return;
    }
    
    if (items.length === 0) {
      navigate('/shop');
      return;
    }
  }, [isAuthenticated, items.length, navigate]);

  // Update billing info when profile changes
  useEffect(() => {
    if (profile) {
      setBillingInfo(prev => ({
        ...prev,
        full_name: profile.full_name || prev.full_name,
        company_name: profile.company_name || prev.company_name,
        phone: profile.phone || prev.phone,
        address: profile.address || prev.address,
        city: profile.city || prev.city,
        postal_code: profile.postal_code || prev.postal_code,
        country: profile.country || prev.country
      }));
    }
    
    if (user?.email) {
      setBillingInfo(prev => ({
        ...prev,
        email: user.email || prev.email
      }));
    }
  }, [profile, user]);

  const subtotal = getTotalPrice();
  const taxRate = 0.15; // 15% tax (example for Canada)
  const taxAmount = (subtotal - promoDiscount) * taxRate;
  const total = subtotal - promoDiscount + taxAmount;

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) return;
    
    setPromoLoading(true);
    setPromoError(null);
    
    const result = await validatePromoCode(promoCode, subtotal);
    
    if (result.valid) {
      setPromoDiscount(result.discount);
      setSuccess(`Code promo appliqué ! Réduction de ${result.discount.toFixed(2)}€`);
    } else {
      setPromoError(result.error);
      setPromoDiscount(0);
    }
    
    setPromoLoading(false);
  };

  const handleRemovePromoCode = () => {
    setPromoCode('');
    setPromoDiscount(0);
    setPromoError(null);
    setSuccess(null);
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!billingInfo.full_name || !billingInfo.email || !billingInfo.address || !billingInfo.city) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      // Convert cart items to order format
      const orderItems = items.map(item => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price
        },
        quantity: item.quantity
      }));

      const { data: order, error } = await createOrder(
        orderItems,
        billingInfo,
        promoCode || undefined
      );

      if (error) {
        throw new Error(error);
      }

      if (order) {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, we'll mark the order as completed
        // In a real app, this would be done by Stripe webhook
        setStep(3);
        setSuccess('Commande créée avec succès !');
        
        // Clear cart after successful order
        setTimeout(() => {
          clearCart();
          navigate(`/order-success?order=${order.id}`);
        }, 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création de la commande');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  return (
    <div className=\"min-h-screen bg-gray-50 py-8\">
      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
        {/* Header */}
        <div className=\"mb-8\">
          <Button
            variant=\"ghost\"
            onClick={() => navigate('/shop')}
            className=\"mb-4\"
          >
            <ArrowLeft className=\"w-4 h-4 mr-2\" />
            Retour à la boutique
          </Button>
          
          <h1 className=\"text-3xl font-bold text-gray-900\">Finaliser la commande</h1>
          <p className=\"text-gray-600 mt-2\">
            Vérifiez vos informations et procédez au paiement
          </p>
        </div>

        {/* Progress Steps */}
        <div className=\"mb-8\">
          <div className=\"flex items-center justify-center space-x-8\">
            {[
              { step: 1, title: 'Informations', icon: User },
              { step: 2, title: 'Paiement', icon: CreditCard },
              { step: 3, title: 'Confirmation', icon: CheckCircle }
            ].map(({ step: stepNum, title, icon: Icon }) => (
              <div key={stepNum} className=\"flex items-center space-x-2\">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNum 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > stepNum ? (
                    <CheckCircle className=\"w-5 h-5\" />
                  ) : (
                    <Icon className=\"w-5 h-5\" />
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  step >= stepNum ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-8\">
          {/* Main Content */}
          <div className=\"lg:col-span-2 space-y-6\">
            {/* Step 1: Billing Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className=\"flex items-center space-x-2\">
                    <User className=\"w-5 h-5\" />
                    <span>Informations de facturation</span>
                  </CardTitle>
                  <CardDescription>
                    Vérifiez et complétez vos informations de facturation
                  </CardDescription>
                </CardHeader>
                <CardContent className=\"space-y-4\">
                  <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                    <div>
                      <Label htmlFor=\"full_name\">Nom complet *</Label>
                      <Input
                        id=\"full_name\"
                        value={billingInfo.full_name}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, full_name: e.target.value }))}
                        placeholder=\"Votre nom complet\"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor=\"company_name\">Nom de l'entreprise</Label>
                      <Input
                        id=\"company_name\"
                        value={billingInfo.company_name}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, company_name: e.target.value }))}
                        placeholder=\"Nom de votre entreprise (optionnel)\"
                      />
                    </div>
                  </div>

                  <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                    <div>
                      <Label htmlFor=\"email\">Email *</Label>
                      <div className=\"relative\">
                        <Mail className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                        <Input
                          id=\"email\"
                          type=\"email\"
                          value={billingInfo.email}
                          onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                          className=\"pl-10\"
                          placeholder=\"votre@email.com\"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor=\"phone\">Téléphone</Label>
                      <div className=\"relative\">
                        <Phone className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                        <Input
                          id=\"phone\"
                          value={billingInfo.phone}
                          onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
                          className=\"pl-10\"
                          placeholder=\"+1 (555) 123-4567\"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor=\"address\">Adresse *</Label>
                    <div className=\"relative\">
                      <MapPin className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4\" />
                      <Input
                        id=\"address\"
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, address: e.target.value }))}
                        className=\"pl-10\"
                        placeholder=\"123 Rue de la Paix\"
                        required
                      />
                    </div>
                  </div>

                  <div className=\"grid grid-cols-1 md:grid-cols-3 gap-4\">
                    <div>
                      <Label htmlFor=\"city\">Ville *</Label>
                      <Input
                        id=\"city\"
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, city: e.target.value }))}
                        placeholder=\"Montréal\"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor=\"postal_code\">Code postal</Label>
                      <Input
                        id=\"postal_code\"
                        value={billingInfo.postal_code}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, postal_code: e.target.value }))}
                        placeholder=\"H1A 1A1\"
                      />
                    </div>
                    <div>
                      <Label htmlFor=\"country\">Pays</Label>
                      <select
                        id=\"country\"
                        value={billingInfo.country}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, country: e.target.value }))}
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

                  <div className=\"flex justify-end pt-4\">
                    <Button 
                      onClick={() => setStep(2)}
                      disabled={!billingInfo.full_name || !billingInfo.email || !billingInfo.address || !billingInfo.city}
                    >
                      Continuer vers le paiement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className=\"flex items-center space-x-2\">
                    <CreditCard className=\"w-5 h-5\" />
                    <span>Méthode de paiement</span>
                  </CardTitle>
                  <CardDescription>
                    Choisissez votre méthode de paiement préférée
                  </CardDescription>
                </CardHeader>
                <CardContent className=\"space-y-6\">
                  {/* Payment Methods */}
                  <div className=\"space-y-3\">
                    <div className=\"flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50\">
                      <input
                        type=\"radio\"
                        id=\"card\"
                        name=\"payment\"
                        value=\"card\"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className=\"text-purple-600\"
                      />
                      <CreditCard className=\"w-5 h-5 text-gray-600\" />
                      <div className=\"flex-1\">
                        <label htmlFor=\"card\" className=\"font-medium cursor-pointer\">
                          Carte de crédit/débit
                        </label>
                        <p className=\"text-sm text-gray-500\">
                          Visa, Mastercard, American Express
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Demo Payment Form */}
                  {paymentMethod === 'card' && (
                    <div className=\"space-y-4 p-4 bg-gray-50 rounded-lg\">
                      <div className=\"flex items-center space-x-2 text-sm text-gray-600\">
                        <Lock className=\"w-4 h-4\" />
                        <span>Paiement sécurisé SSL</span>
                      </div>
                      
                      <Alert>
                        <AlertCircle className=\"h-4 w-4\" />
                        <AlertDescription>
                          <strong>Mode démonstration :</strong> Aucun paiement réel ne sera effectué. 
                          Cette commande sera traitée comme un test.
                        </AlertDescription>
                      </Alert>
                      
                      <div className=\"grid grid-cols-1 gap-4\">
                        <div>
                          <Label>Numéro de carte</Label>
                          <Input placeholder=\"4242 4242 4242 4242\" disabled />
                        </div>
                        <div className=\"grid grid-cols-2 gap-4\">
                          <div>
                            <Label>Expiration</Label>
                            <Input placeholder=\"MM/AA\" disabled />
                          </div>
                          <div>
                            <Label>CVC</Label>
                            <Input placeholder=\"123\" disabled />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className=\"flex justify-between pt-4\">
                    <Button variant=\"outline\" onClick={() => setStep(1)}>
                      Retour
                    </Button>
                    <Button 
                      onClick={handleSubmitOrder}
                      disabled={loading}
                      className=\"bg-purple-600 hover:bg-purple-700\"
                    >
                      {loading ? (
                        <>
                          <Loader2 className=\"w-4 h-4 mr-2 animate-spin\" />
                          Traitement...
                        </>
                      ) : (
                        `Payer ${total.toFixed(2)}€`
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <Card>
                <CardContent className=\"text-center py-12\">
                  <CheckCircle className=\"w-16 h-16 text-green-500 mx-auto mb-4\" />
                  <h2 className=\"text-2xl font-bold text-gray-900 mb-2\">
                    Commande confirmée !
                  </h2>
                  <p className=\"text-gray-600 mb-6\">
                    Votre commande a été traitée avec succès. Vous recevrez un email de confirmation sous peu.
                  </p>
                  <div className=\"flex justify-center space-x-4\">
                    <Button onClick={() => navigate('/client-portal')}>
                      Voir mes commandes
                    </Button>
                    <Button variant=\"outline\" onClick={() => navigate('/shop')}>
                      Continuer mes achats
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error/Success Messages */}
            {error && (
              <Alert variant=\"destructive\">
                <AlertCircle className=\"h-4 w-4\" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && step !== 3 && (
              <Alert className=\"border-green-200 bg-green-50\">
                <CheckCircle className=\"h-4 w-4 text-green-600\" />
                <AlertDescription className=\"text-green-800\">{success}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Order Summary */}
          <div className=\"space-y-6\">
            <Card>
              <CardHeader>
                <CardTitle className=\"flex items-center space-x-2\">
                  <Package className=\"w-5 h-5\" />
                  <span>Résumé de commande</span>
                </CardTitle>
              </CardHeader>
              <CardContent className=\"space-y-4\">
                {/* Items */}
                <div className=\"space-y-3\">
                  {items.map((item) => (
                    <div key={item.product.id} className=\"flex items-center space-x-3\">
                      <div className=\"w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center\">
                        <Package className=\"w-6 h-6 text-purple-600\" />
                      </div>
                      <div className=\"flex-1\">
                        <h4 className=\"font-medium text-sm\">{item.product.name}</h4>
                        <p className=\"text-xs text-gray-500\">{item.product.license}</p>
                        <p className=\"text-xs text-gray-500\">Quantité: {item.quantity}</p>
                      </div>
                      <span className=\"font-medium\">
                        {(item.product.price * item.quantity).toFixed(2)}€
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Promo Code */}
                {step < 3 && (
                  <div className=\"space-y-3\">
                    <div className=\"flex space-x-2\">
                      <Input
                        placeholder=\"Code promo\"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        disabled={promoDiscount > 0}
                      />
                      {promoDiscount > 0 ? (
                        <Button
                          variant=\"outline\"
                          onClick={handleRemovePromoCode}
                          size=\"sm\"
                        >
                          Retirer
                        </Button>
                      ) : (
                        <Button
                          onClick={handleApplyPromoCode}
                          disabled={!promoCode.trim() || promoLoading}
                          size=\"sm\"
                        >
                          {promoLoading ? (
                            <Loader2 className=\"w-4 h-4 animate-spin\" />
                          ) : (
                            'Appliquer'
                          )}
                        </Button>
                      )}
                    </div>
                    
                    {promoError && (
                      <p className=\"text-sm text-red-600\">{promoError}</p>
                    )}
                    
                    {promoDiscount > 0 && (
                      <div className=\"flex items-center space-x-2 text-green-600\">
                        <Percent className=\"w-4 h-4\" />
                        <span className=\"text-sm font-medium\">
                          Code {promoCode} appliqué
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <Separator />

                {/* Totals */}
                <div className=\"space-y-2\">
                  <div className=\"flex justify-between text-sm\">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className=\"flex justify-between text-sm text-green-600\">
                      <span>Réduction</span>
                      <span>-{promoDiscount.toFixed(2)}€</span>
                    </div>
                  )}
                  
                  <div className=\"flex justify-between text-sm\">
                    <span>Taxes (15%)</span>
                    <span>{taxAmount.toFixed(2)}€</span>
                  </div>
                  
                  <Separator />
                  
                  <div className=\"flex justify-between font-bold text-lg\">
                    <span>Total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className=\"flex items-center justify-center space-x-2 text-sm text-gray-500 pt-4\">
                  <Lock className=\"w-4 h-4\" />
                  <span>Paiement sécurisé SSL</span>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardContent className=\"pt-6\">
                <div className=\"text-center\">
                  <h3 className=\"font-medium mb-2\">Besoin d'aide ?</h3>
                  <p className=\"text-sm text-gray-600 mb-4\">
                    Notre équipe est là pour vous accompagner
                  </p>
                  <Button variant=\"outline\" size=\"sm\" onClick={() => navigate('/contact')}>
                    Nous contacter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;