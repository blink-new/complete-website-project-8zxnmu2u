import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/use-products';
import { useCart } from '../hooks/use-cart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  ShoppingCart, 
  Star, 
  Download, 
  Shield, 
  Clock,
  Users,
  CheckCircle,
  Filter,
  Search,
  Eye,
  Heart,
  Package,
  Zap,
  Code
} from 'lucide-react';

const Shop = () => {
  const { products, categories, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const { addItem, isInCart, toggleCart, getItemCount } = useCart();

  const sortOptions = [
    { value: 'popular', label: 'Popularité' },
    { value: 'price-low', label: 'Prix croissant' },
    { value: 'price-high', label: 'Prix décroissant' },
    { value: 'newest', label: 'Plus récents' },
    { value: 'featured', label: 'Produits vedettes' }
  ];

  useEffect(() => {
    // Filter and sort products
    let filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'Tous' || 
        (product.category && product.category.name === selectedCategory);
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.short_description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort products
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'featured':
          return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
        case 'popular':
        default:
          return (b.is_popular ? 1 : 0) - (a.is_popular ? 1 : 0);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (product: any) => {
    // Convert Supabase product to cart format
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
      icon: Package, // Default icon
      license: product.license_type,
      activations: `${product.max_activations} postes`,
      support: `${product.support_duration_months} mois inclus`,
      popular: product.is_popular,
      systemRequirements: product.system_requirements || [],
      downloadSize: product.download_size,
      version: product.version
    };
    addItem(cartProduct);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de la boutique...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des produits</p>
          <Button onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-600">Boutique</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Produits 
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Clés en Main
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme de logiciels professionnels prêts à l'emploi. 
              Téléchargement instantané, licences flexibles et support inclus.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Download,
                title: "Téléchargement Instantané",
                description: "Accès immédiat après achat"
              },
              {
                icon: Shield,
                title: "Licences Flexibles",
                description: "Activations multiples incluses"
              },
              {
                icon: Clock,
                title: "Support Technique",
                description: "Assistance dédiée incluse"
              }
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Filtres */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 font-medium">Catégories :</span>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === 'Tous' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory('Tous')}
                    className={selectedCategory === 'Tous' ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    Tous
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.name)}
                      className={selectedCategory === category.name ? "bg-purple-600 hover:bg-purple-700" : ""}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Recherche et panier */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64"
                />
              </div>
              
              {getItemCount() > 0 && (
                <Button 
                  variant="outline" 
                  onClick={toggleCart}
                  className="relative"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Panier
                  <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs">
                    {getItemCount()}
                  </Badge>
                </Button>
              )}
            </div>
          </div>
          
          {/* Résultats */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-500 mb-6">
                Essayez de modifier vos critères de recherche ou de filtrage
              </p>
              <Button 
                onClick={() => {
                  setSelectedCategory('Tous');
                  setSearchQuery('');
                }}
                variant="outline"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const IconComponent = Package;
                const inCart = isInCart(product.id);
                
                return (
                  <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
                    {product.is_popular && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-orange-500 text-white">
                          🔥 Populaire
                        </Badge>
                      </div>
                    )}
                    
                    {product.is_featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-purple-500 text-white">
                          ⭐ Vedette
                        </Badge>
                      </div>
                    )}
                    
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <IconComponent className="w-16 h-16 text-purple-600" />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      
                      {/* Actions overlay */}
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Link to={`/product/${product.id}`}>
                            <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category?.name || 'Autre'}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-xs text-gray-500">({product.review_count})</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">
                        <Link 
                          to={`/product/${product.id}`}
                          className="hover:text-purple-600 transition-colors"
                        >
                          {product.name}
                        </Link>
                      </CardTitle>
                      <CardDescription>{product.short_description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="mb-4">
                        <div className="flex items-baseline space-x-2 mb-2">
                          <span className="text-2xl font-bold text-purple-600">
                            {product.price.toFixed(2)}€
                          </span>
                          {product.old_price && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                {product.old_price.toFixed(2)}€
                              </span>
                              <Badge className="bg-red-100 text-red-600 text-xs">
                                -{Math.round(((product.old_price - product.price) / product.old_price) * 100)}%
                              </Badge>
                            </>
                          )}
                        </div>
                        
                        <div className="text-xs text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Licence:</span>
                            <span>{product.license_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Activations:</span>
                            <span>{product.max_activations}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Support:</span>
                            <span>{product.support_duration_months} mois</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Fonctionnalités :</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center space-x-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600">Téléchargement instantané</span>
                          </li>
                          <li className="flex items-center space-x-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600">Support technique inclus</span>
                          </li>
                          <li className="flex items-center space-x-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600">Mises à jour gratuites</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        {inCart ? (
                          <Button 
                            variant="outline" 
                            className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                            onClick={toggleCart}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Voir le panier
                          </Button>
                        ) : (
                          <Button 
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Ajouter au panier
                          </Button>
                        )}
                        <Link to={`/product/${product.id}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir les détails
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Custom Solutions CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Besoin d'une Solution Personnalisée ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Nos produits ne correspondent pas exactement à vos besoins ? 
              Nous créons des solutions sur mesure parfaitement adaptées.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4">
                  Demander un Devis Sur Mesure
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="px-8 py-4">
                  Voir Nos Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support & Guarantee */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-lg mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Garantie 30 Jours</h3>
                <p className="text-purple-100">
                  Remboursement intégral si vous n'êtes pas satisfait
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-lg mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Support Expert</h3>
                <p className="text-purple-100">
                  Équipe technique dédiée pour vous accompagner
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-lg mx-auto mb-4">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mises à Jour Gratuites</h3>
                <p className="text-purple-100">
                  Nouvelles versions et améliorations incluses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;