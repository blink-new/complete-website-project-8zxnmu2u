import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Building, 
  Clock, 
  Users, 
  Code2,
  ExternalLink,
  TrendingUp,
  Smartphone,
  Globe,
  Database,
  Filter
} from 'lucide-react';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', 'Application Web', 'Application Mobile', 'Solution Enterprise', 'E-commerce'];

  const projects = [
    {
      id: 1,
      title: "Plateforme CRM Intelligente",
      client: "TechCorp Solutions",
      sector: "Technologie",
      duration: "4 mois",
      category: "Application Web",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
      challenge: "Moderniser un système CRM legacy avec 10 000+ utilisateurs actifs tout en maintenant la disponibilité du service.",
      solution: "Migration progressive avec architecture microservices, API REST modernes et interface utilisateur repensée pour améliorer l'expérience.",
      results: [
        { metric: "Productivité", improvement: "+40%" },
        { metric: "Temps de réponse", improvement: "-60%" },
        { metric: "Satisfaction utilisateur", improvement: "+75%" }
      ],
      features: ["Tableau de bord temps réel", "Automation des workflows", "Intégrations API", "Analytics avancées"]
    },
    {
      id: 2,
      title: "App Mobile E-commerce",
      client: "RetailPro Fashion",
      sector: "Mode & Retail",
      duration: "6 mois", 
      category: "Application Mobile",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      technologies: ["React Native", "Firebase", "Stripe", "Redux"],
      challenge: "Créer une expérience mobile native pour une boutique en ligne avec catalogue de 50 000+ produits.",
      solution: "Application mobile performante avec recherche intelligente, recommendations personnalisées et checkout optimisé.",
      results: [
        { metric: "Ventes mobiles", improvement: "+65%" },
        { metric: "Taux de conversion", improvement: "+35%" },
        { metric: "Engagement utilisateur", improvement: "+80%" }
      ],
      features: ["Catalogue intelligent", "Paiement sécurisé", "Push notifications", "Programme fidélité"]
    },
    {
      id: 3,
      title: "Système de Gestion Documentaire",
      client: "LegalTech Innovation",
      sector: "Services Juridiques",
      duration: "8 mois",
      category: "Solution Enterprise",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "Laravel", "Elasticsearch", "Docker"],
      challenge: "Digitaliser la gestion de 100 000+ documents juridiques avec recherche avancée et workflow d'approbation.",
      solution: "Plateforme complète avec OCR, indexation intelligente, workflow configurable et signature électronique.",
      results: [
        { metric: "Efficacité", improvement: "+80%" },
        { metric: "Temps de recherche", improvement: "-90%" },
        { metric: "Coûts administratifs", improvement: "-45%" }
      ],
      features: ["OCR automatique", "Recherche sémantique", "Workflow d'approbation", "Signature électronique"]
    },
    {
      id: 4,
      title: "Marketplace B2B",
      client: "IndustrialHub",
      sector: "Industrie",
      duration: "10 mois",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      technologies: ["Angular", "Java Spring", "MongoDB", "Kubernetes"],
      challenge: "Créer une marketplace B2B pour connecter 1000+ fournisseurs industriels avec leurs clients.",
      solution: "Plateforme robuste avec gestion multi-vendeurs, système de commandes complexes et intégrations ERP.",
      results: [
        { metric: "Volume transactions", improvement: "+120%" },
        { metric: "Nouveaux clients", improvement: "+85%" },
        { metric: "Satisfaction vendeurs", improvement: "+70%" }
      ],
      features: ["Multi-vendeurs", "Intégrations ERP", "Devis complexes", "Analytics business"]
    },
    {
      id: 5,
      title: "Plateforme IoT Industrielle",
      client: "SmartFactory Systems",
      sector: "Industrie 4.0",
      duration: "12 mois",
      category: "Solution Enterprise",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
      technologies: ["React", "Python", "InfluxDB", "MQTT"],
      challenge: "Connecter et monitorer 500+ machines industrielles avec analyse prédictive en temps réel.",
      solution: "Plateforme IoT avec collecte de données temps réel, machine learning et dashboards interactifs.",
      results: [
        { metric: "Maintenance prédictive", improvement: "+95%" },
        { metric: "Downtime", improvement: "-70%" },
        { metric: "Efficacité énergétique", improvement: "+30%" }
      ],
      features: ["Monitoring temps réel", "IA prédictive", "Alertes intelligentes", "Dashboards custom"]
    },
    {
      id: 6,
      title: "App Santé Mobile",
      client: "HealthTech Plus",
      sector: "Santé",
      duration: "5 mois",
      category: "Application Mobile",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      technologies: ["Flutter", "Firebase", "ML Kit", "HealthKit"],
      challenge: "Développer une application de suivi santé avec analyse d'images et recommandations personnalisées.",
      solution: "App mobile avec IA pour analyse d'images médicales, suivi de symptômes et téléconsultation intégrée.",
      results: [
        { metric: "Adoption utilisateurs", improvement: "+90%" },
        { metric: "Précision diagnostic", improvement: "+85%" },
        { metric: "Satisfaction patients", improvement: "+88%" }
      ],
      features: ["Analyse IA", "Téléconsultation", "Suivi symptoms", "Rappels médicaments"]
    }
  ];

  const filteredProjects = selectedCategory === 'Tous' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Application Web': Globe,
      'Application Mobile': Smartphone, 
      'Solution Enterprise': Database,
      'E-commerce': Building
    };
    return icons[category as keyof typeof icons] || Code2;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600">Nos Réalisations</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Portfolio & 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Études de Cas
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos projets qui ont transformé les entreprises de nos clients 
              avec des solutions innovantes et performantes.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600 font-medium">Filtrer par catégorie :</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredProjects.map((project) => {
              const CategoryIcon = getCategoryIcon(project.category);
              
              return (
                <Card key={project.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-800">
                        <CategoryIcon className="w-4 h-4 mr-2" />
                        {project.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-600 text-white">
                        {project.sector}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    {/* Project Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{project.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Le Défi :</h4>
                        <p className="text-gray-600 text-sm">{project.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Notre Approche :</h4>
                        <p className="text-gray-600 text-sm">{project.solution}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Résultats Mesurables :</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {project.results.map((result, idx) => (
                          <div key={idx} className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                              <span className="font-bold text-green-600">{result.improvement}</span>
                            </div>
                            <p className="text-xs text-gray-600">{result.metric}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Technologies :</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Fonctionnalités Clés :</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Aucun projet trouvé pour cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Chiffres Clés
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des résultats concrets qui témoignent de notre expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Projets Réalisés</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <p className="text-gray-600">Satisfaction Client</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">+60%</div>
              <p className="text-gray-600">Amélioration Moyenne</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <p className="text-gray-600">Support Technique</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Votre Projet Sera le Prochain
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez nos clients satisfaits et transformez votre vision en réalité
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
            Discutons de Votre Projet
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;