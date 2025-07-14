import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/use-products';
import { useCart } from '../hooks/use-cart';
import { useAuth } from '../hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  ShoppingCart, 
  Star, 
  Download, 
  Shield, 
  Clock,
  Users,
  CheckCircle,
  ArrowLeft,
  Heart,
  Share2,
  Monitor,
  Smartphone,
  Globe,
  Package,
  Zap,
  Database,
  Code,
  MessageCircle,
  Award,
  RefreshCw,
  Lock,
  Headphones
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addItem, isInCart, toggleCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      const productData = await getProductById(parseInt(id));
      setProduct(productData);
      setLoading(false);
    };

    fetchProduct();
  }, [id, getProductById]);

  const handleAddToCart = () => {
    if (!product) return;

    // Convertir le produit Supabase au format du panier
    const cartProduct = {
      id: product.id,
      name: product.name,
      category: product.category?.name || 'Autre',
      price: product.price,
      oldPrice: product.old_price,
      rating: product.rating,
      reviews: product.review_count,
      description: product.short_description,
      detailedDescription: product.long_description,
      image: product.image_url,
      features: product.features || [],
      icon: Package,
      license: product.license_type,
      activations: `${product.max_activations} postes`,
      support: `${product.support_duration_months} mois inclus`,
      popular: product.is_popular,
      systemRequirements: product.system_requirements || [],
      downloadSize: product.download_size,
      version: product.version
    };

    for (let i = 0; i < quantity; i++) {
      addItem(cartProduct);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produit non trouvé</h2>
          <p className="text-gray-600 mb-6">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link to="/shop">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la boutique
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const images = product.gallery_images || [product.image_url].filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Accueil</Link>
            <span className="text-gray-400">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-gray-700">Boutique</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/shop?category=${product.category?.slug}`} className="text-gray-500 hover:text-gray-700">
              {product.category?.name}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg overflow-hidden">
                  {images[selectedImage] ? (
                    <img 
                      src={images[selectedImage]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-24 h-24 text-purple-600" />
                    </div>
                  )}
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {product.is_popular && (
                    <Badge className="bg-orange-500 text-white">
                      🔥 Populaire
                    </Badge>
                  )}
                  {product.is_featured && (
                    <Badge className="bg-purple-500 text-white">
                      ⭐ Vedette
                    </Badge>
                  )}
                  {product.old_price && (
                    <Badge className="bg-red-500 text-white">
                      -{Math.round(((product.old_price - product.price) / product.old_price) * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-purple-600' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-sm">
                    {product.category?.name}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-500">({product.review_count} avis)</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-lg text-gray-600">{product.short_description}</p>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-bold text-purple-600">
                    {product.price.toFixed(2)}€
                  </span>
                  {product.old_price && (
                    <span className="text-xl text-gray-500 line-through">
                      {product.old_price.toFixed(2)}€
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Prix TTC, téléchargement instantané</p>
              </div>

              {/* License Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Informations de licence</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Type</p>
                      <p className="text-gray-600">{product.license_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Activations</p>
                      <p className="text-gray-600">{product.max_activations} postes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Headphones className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Support</p>
                      <p className="text-gray-600">{product.support_duration_months} mois</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-medium text-gray-900">Quantité :</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Button 
                        size="lg" 
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={handleBuyNow}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Acheter maintenant
                      </Button>
                      
                      {inCart ? (
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                          onClick={toggleCart}
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Voir le panier
                        </Button>
                      ) : (
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="w-full"
                          onClick={handleAddToCart}
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Ajouter au panier
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Link to="/auth?mode=login">
                        <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                          Se connecter pour acheter
                        </Button>
                      </Link>
                      <p className="text-sm text-gray-600 text-center">
                        Vous devez être connecté pour effectuer un achat
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Guarantees */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span>Garantie 30 jours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="w-5 h-5 text-blue-500" />
                    <span>Téléchargement instantané</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-5 h-5 text-purple-500" />
                    <span>Mises à jour gratuites</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
              <TabsTrigger value="requirements">Configuration</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({product.review_count})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Description détaillée</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700">
                    {product.long_description || product.short_description}
                  </div>
                  
                  {product.version && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Version actuelle</h4>
                      <p className="text-blue-700">
                        Version {product.version} • Taille : {product.download_size || 'Non spécifiée'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Fonctionnalités principales</CardTitle>
                  <CardDescription>
                    Découvrez tout ce que {product.name} peut faire pour vous
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {product.features && product.features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Aucune fonctionnalité spécifiée pour ce produit.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="requirements" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration système requise</CardTitle>
                  <CardDescription>
                    Assurez-vous que votre système est compatible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {product.system_requirements && product.system_requirements.length > 0 ? (
                    <div className="space-y-3">
                      {product.system_requirements.map((requirement: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Monitor className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Configuration système non spécifiée.</p>
                  )}
                  
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Note importante</h4>
                    <p className="text-yellow-700 text-sm">
                      Assurez-vous de respecter la configuration minimale pour une utilisation optimale du logiciel.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Avis clients</CardTitle>
                  <CardDescription>
                    Ce que nos clients pensent de {product.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Bientôt disponible</h3>
                    <p className="text-gray-500">
                      Le système d'avis sera disponible prochainement. 
                      En attendant, contactez-nous pour plus d'informations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produits similaires</h2>
            <p className="text-gray-600">Découvrez d'autres solutions qui pourraient vous intéresser</p>
          </div>
          
          <div className="text-center">
            <Link to={`/shop?category=${product.category?.slug}`}>
              <Button variant="outline" size="lg">
                Voir tous les produits {product.category?.name}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Besoin d'aide ?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Notre équipe d'experts est là pour vous accompagner dans l'utilisation de nos produits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contacter le support
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" className="bg-purple-700 hover:bg-purple-800">
                  <Users className="w-5 h-5 mr-2" />
                  Services personnalisés
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;