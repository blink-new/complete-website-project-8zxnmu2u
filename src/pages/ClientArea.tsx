import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  User, 
  Lock, 
  Download, 
  CreditCard,
  FileText,
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
  LogOut,
  Eye,
  RefreshCw,
  Smartphone,
  Monitor,
  Key
} from 'lucide-react';

const ClientArea = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Mock user data
  const user = {
    name: "Marie Dubois",
    email: "marie.dubois@techcorp.com",
    company: "TechCorp Solutions",
    memberSince: "2023",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=100&h=100&fit=crop&crop=face"
  };

  const currentProjects = [
    {
      id: 1,
      name: "Plateforme CRM v2.0",
      status: "En cours",
      progress: 75,
      nextMilestone: "Tests utilisateurs",
      dueDate: "15 Mars 2025",
      manager: "Pierre Martin",
      messages: 3
    },
    {
      id: 2,
      name: "App Mobile iOS",
      status: "Planifié",
      progress: 10,
      nextMilestone: "Maquettes finales",
      dueDate: "30 Avril 2025",
      manager: "Sophie Laurent",
      messages: 1
    }
  ];

  const licenses = [
    {
      id: 1,
      product: "TaskFlow Pro",
      licenseKey: "TFP-2024-XXXX-XXXX-XXXX",
      status: "Active",
      activations: "3/5",
      expiryDate: "2025-12-31",
      version: "2.4.1",
      downloadUrl: "#"
    },
    {
      id: 2,
      product: "DataSync Enterprise",
      licenseKey: "DSE-2024-YYYY-YYYY-YYYY",
      status: "Active",
      activations: "Illimité",
      expiryDate: "2025-06-15",
      version: "1.8.3",
      downloadUrl: "#"
    },
    {
      id: 3,
      product: "ShopBuilder Lite",
      licenseKey: "SBL-2023-ZZZZ-ZZZZ-ZZZZ",
      status: "Expiré",
      activations: "1/1",
      expiryDate: "2024-12-31",
      version: "3.2.1",
      downloadUrl: "#"
    }
  ];

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-12-15",
      amount: "49.99€",
      status: "Payé",
      items: ["TaskFlow Pro - Licence perpétuelle"]
    },
    {
      id: "ORD-2024-002",
      date: "2024-11-28",
      amount: "199.99€",
      status: "Payé",
      items: ["DataSync Enterprise - Abonnement annuel"]
    },
    {
      id: "ORD-2023-045",
      date: "2023-10-12",
      amount: "29.99€",
      status: "Payé",
      items: ["ShopBuilder Lite - Licence perpétuelle"]
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en cours': return 'bg-blue-100 text-blue-700';
      case 'planifié': return 'bg-yellow-100 text-yellow-700';
      case 'terminé': return 'bg-green-100 text-green-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'expiré': return 'bg-red-100 text-red-700';
      case 'payé': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en cours': return Clock;
      case 'planifié': return Calendar;
      case 'terminé': return CheckCircle;
      case 'active': return CheckCircle;
      case 'expiré': return AlertCircle;
      case 'payé': return CheckCircle;
      default: return Clock;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Espace Client</h2>
            <p className="mt-2 text-gray-600">Connectez-vous pour accéder à vos projets et licences</p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Lock className="w-4 h-4 mr-2" />
                  Se connecter
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Mot de passe oublié ?
                </a>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Pas encore client ? 
              <a href="/contact" className="text-blue-600 hover:text-blue-700 ml-1">
                Demander un devis
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Bienvenue, {user.name}</h1>
                <p className="text-sm text-gray-600">{user.company}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Mes Projets</span>
            </TabsTrigger>
            <TabsTrigger value="licenses" className="flex items-center space-x-2">
              <Key className="w-4 h-4" />
              <span>Mes Licences</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Commandes</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profil</span>
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentProjects.map((project) => {
                const StatusIcon = getStatusIcon(project.status);
                return (
                  <Card key={project.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge className={getStatusColor(project.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription>Chef de projet: {project.manager}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progression</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Prochaine étape:</span>
                            <p className="font-medium">{project.nextMilestone}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Échéance:</span>
                            <p className="font-medium">{project.dueDate}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-2">
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {project.messages} nouveau{project.messages > 1 ? 'x' : ''} message{project.messages > 1 ? 's' : ''}
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir détails
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Licenses Tab */}
          <TabsContent value="licenses" className="space-y-6">
            <div className="space-y-4">
              {licenses.map((license) => {
                const StatusIcon = getStatusIcon(license.status);
                return (
                  <Card key={license.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{license.product}</h3>
                            <Badge className={getStatusColor(license.status)}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {license.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Clé de licence:</span>
                              <p className="font-mono text-xs mt-1">{license.licenseKey}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Activations:</span>
                              <p className="font-medium">{license.activations}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Expire le:</span>
                              <p className="font-medium">{new Date(license.expiryDate).toLocaleDateString('fr-FR')}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Version:</span>
                              <p className="font-medium">{license.version}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-6">
                          <Button size="sm" variant="outline">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Gérer
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" disabled={license.status === 'Expiré'}>
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                      
                      {license.status === 'Active' && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">Appareils activés:</h4>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Monitor className="w-4 h-4 text-green-600" />
                              <span>PC-WORK-01</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Smartphone className="w-4 h-4 text-green-600" />
                              <span>Mobile-iPhone</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="space-y-4">
              {orders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <Card key={order.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">Commande {order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {order.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Date:</span>
                              <p className="font-medium">{new Date(order.date).toLocaleDateString('fr-FR')}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Montant:</span>
                              <p className="font-medium text-green-600">{order.amount}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Articles:</span>
                              <p className="font-medium">{order.items.length} produit{order.items.length > 1 ? 's' : ''}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <span className="text-gray-600 text-sm">Produits:</span>
                            <ul className="mt-1">
                              {order.items.map((item, idx) => (
                                <li key={idx} className="text-sm text-gray-800">• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-6">
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Facture
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Gérez vos informations de compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">Client depuis {user.memberSince}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                      <input
                        type="text"
                        value={user.company}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Modifier les informations
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité</CardTitle>
                  <CardDescription>Paramètres de sécurité de votre compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Lock className="w-4 h-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Authentification à 2 facteurs
                  </Button>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Compte sécurisé
                      </span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Dernière connexion: il y a 2 minutes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientArea;