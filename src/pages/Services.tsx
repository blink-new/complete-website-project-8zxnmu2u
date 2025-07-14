import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ArrowRight, 
  Code2, 
  Smartphone, 
  Globe, 
  Database,
  Shield,
  Zap,
  Users,
  CheckCircle,
  Clock,
  Target,
  Wrench
} from 'lucide-react';

const Services = () => {
  const agilePhases = [
    {
      phase: "Phase 1",
      title: "Découverte & Maquette",
      duration: "1-2 semaines",
      description: "Ateliers collaboratifs avec le client et utilisation de notre configurateur pour définir précisément les besoins.",
      deliverables: ["Cahier des charges", "Maquettes interactives", "Spécifications fonctionnelles"]
    },
    {
      phase: "Phase 2", 
      title: "Spécification & Devis",
      duration: "3-5 jours",
      description: "Analyse détaillée de la maquette et création d'un devis précis avec planning de réalisation.",
      deliverables: ["Architecture technique", "Devis détaillé", "Planning projet"]
    },
    {
      phase: "Phase 3",
      title: "Développement par Sprints", 
      duration: "Variable",
      description: "Sprints de 2 semaines avec démonstrations régulières et ajustements en temps réel.",
      deliverables: ["Livraisons incrémentielles", "Tests automatisés", "Documentation"]
    },
    {
      phase: "Phase 4",
      title: "Déploiement & Formation",
      duration: "1 semaine",
      description: "Livraison de la solution, installation en production et formation des utilisateurs.",
      deliverables: ["Solution déployée", "Formation utilisateurs", "Documentation finale"]
    },
    {
      phase: "Phase 5",
      title: "Support & Évolution",
      duration: "Continu",
      description: "Contrats de maintenance, support technique et développements futurs selon vos besoins.",
      deliverables: ["Support technique", "Maintenance", "Évolutions"]
    }
  ];

  const services = [
    {
      icon: Globe,
      title: "Applications Web",
      description: "Plateformes web modernes et performantes",
      features: ["React / Vue.js", "API REST", "Base de données", "Interface responsive"],
      color: "blue"
    },
    {
      icon: Smartphone,
      title: "Applications Mobile",
      description: "Apps natives et hybrides pour iOS et Android",
      features: ["React Native", "Flutter", "Synchronisation", "Push notifications"],
      color: "purple"
    },
    {
      icon: Database,
      title: "Solutions Enterprise",
      description: "Systèmes complexes pour grandes organisations",
      features: ["Architecture microservices", "Intégrations", "Sécurité avancée", "Scalabilité"],
      color: "green"
    },
    {
      icon: Code2,
      title: "Configurateur Interactif",
      description: "Notre outil unique de co-création",
      features: ["Glisser-déposer", "Prévisualisation", "Commentaires", "Versioning"],
      color: "orange"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Protection de vos données avec les derniers standards de sécurité"
    },
    {
      icon: Zap,
      title: "Performance Optimale",
      description: "Solutions optimisées pour la vitesse et l'efficacité"
    },
    {
      icon: Users,
      title: "Accompagnement Complet",
      description: "Support dédié de la conception au déploiement"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 bg-blue-100 text-blue-600",
      purple: "from-purple-500 to-purple-600 bg-purple-100 text-purple-600", 
      green: "from-green-500 to-green-600 bg-green-100 text-green-600",
      orange: "from-orange-500 to-orange-600 bg-orange-100 text-orange-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600">Notre Expertise</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Services & 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Méthodologie
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De l'idée à la réalisation, notre approche agile et nos outils innovants 
              garantissent le succès de vos projets technologiques.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Domaines d'Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Technologies modernes et méthodologies éprouvées pour créer des solutions sur mesure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const colorClasses = getColorClasses(service.color);
              const [gradientColors, bgColor, textColor] = colorClasses.split(' ');
              
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradientColors} rounded-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agile Methodology */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Méthodologie Agile Détaillée
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un processus en 5 phases pour garantir la réussite de votre projet
            </p>
          </div>

          <div className="space-y-8">
            {agilePhases.map((phase, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
                        <span className="font-bold text-lg">{index + 1}</span>
                      </div>
                      <div>
                        <Badge variant="secondary" className="bg-white/20 text-white mb-2">
                          {phase.phase}
                        </Badge>
                        <h3 className="text-xl font-semibold">{phase.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-100">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{phase.duration}</span>
                    </div>
                  </div>
                  <div className="lg:w-2/3 p-8">
                    <p className="text-gray-700 mb-6">{phase.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Livrables :</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {phase.deliverables.map((deliverable, idx) => (
                          <Badge key={idx} variant="outline" className="justify-center">
                            {deliverable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Nous Choisir ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les avantages qui font la différence dans nos collaborations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Commençons Votre Projet Ensemble
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Utilisez notre configurateur pour visualiser votre idée ou contactez-nous directement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
                <Wrench className="w-5 h-5 mr-2" />
                Essayer le Configurateur
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;