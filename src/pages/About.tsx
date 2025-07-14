import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award,
  Code2,
  Coffee,
  Gamepad2,
  Music,
  Linkedin,
  Github,
  Mail
} from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Jean-Jacques Petit",
      role: "CEO & Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "15 ans d'expérience en développement full-stack. Passionné par l'innovation et l'excellence technique.",
      skills: ["Architecture", "React", "Node.js", "Leadership"],
      hobbies: [Coffee, Code2, Music]
    },
    {
      name: "Marie Dubois",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=300&h=300&fit=crop&crop=face",
      bio: "Designer créative avec 8 ans d'expérience dans la création d'interfaces utilisateur intuitives.",
      skills: ["UI/UX", "Figma", "Design System", "Prototyping"],
      hobbies: [Lightbulb, Gamepad2, Coffee]
    },
    {
      name: "Pierre Martin",
      role: "Senior Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", 
      bio: "Expert en développement backend et architectures cloud. Spécialisé dans les solutions scalables.",
      skills: ["Backend", "Cloud", "DevOps", "Security"],
      hobbies: [Code2, Music, Gamepad2]
    },
    {
      name: "Sophie Laurent",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Agile coach et chef de projet expérimentée. Elle assure la livraison dans les délais et budgets.",
      skills: ["Project Management", "Agile", "Scrum", "Communication"],
      hobbies: [Target, Coffee, Music]
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque ligne de code et chaque interaction client."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Le succès naît de la collaboration étroite avec nos clients et au sein de notre équipe."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Nous explorons constamment de nouvelles technologies pour rester à la pointe."
    },
    {
      icon: Award,
      title: "Qualité",
      description: "Chaque projet est livré avec les plus hauts standards de qualité et de sécurité."
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Création de JJ-P1114 STUDIO",
      description: "Fondation de l'entreprise avec la vision de démocratiser le développement sur mesure."
    },
    {
      year: "2020",
      title: "Premiers Grands Clients",
      description: "Signature des premiers contrats avec des entreprises du CAC 40."
    },
    {
      year: "2022",
      title: "Développement du Configurateur",
      description: "Lancement de notre outil révolutionnaire de co-création de maquettes."
    },
    {
      year: "2023",
      title: "Expansion Européenne",
      description: "Ouverture sur les marchés européens avec plus de 50 projets réalisés."
    },
    {
      year: "2024",
      title: "Plateforme Intégrée",
      description: "Lancement de notre écosystème complet boutique + services personnalisés."
    }
  ];

  const culture = [
    "🏠 Télétravail flexible et locaux modernes",
    "📚 Formation continue et budget développement personnel",
    "🎮 Espaces détente et événements d'équipe réguliers",
    "💡 Innovation time - 20% du temps pour projets personnels",
    "🌿 Engagement RSE et projets open source",
    "⚖️ Équilibre vie professionnelle/personnelle respecté"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600">Notre Histoire</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              À Propos de 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}JJ-P1114 STUDIO
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe passionnée dédiée à transformer vos idées en solutions numériques innovantes. 
              Depuis 2019, nous accompagnons les entreprises dans leur transformation digitale.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                JJ-P1114 STUDIO est né d'une vision simple : rendre le développement sur mesure 
                accessible et transparent pour toutes les entreprises, quelle que soit leur taille.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Nous croyons que chaque entreprise mérite des solutions technologiques qui 
                s'adaptent parfaitement à ses besoins, pas l'inverse. C'est pourquoi nous avons 
                développé notre approche unique alliant expertise technique et collaboration active.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
                  <p className="text-sm text-gray-600">Projets Réalisés</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
                  <p className="text-sm text-gray-600">Clients Satisfaits</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="Notre équipe au travail"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions et décisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des experts passionnés qui donnent vie à vos projets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="relative mx-auto mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Code2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Compétences :</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-center space-x-2">
                      {member.hobbies.map((HobbyIcon, idx) => (
                        <div key={idx} className="w-6 h-6 text-gray-400">
                          <HobbyIcon className="w-4 h-4" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Parcours
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les étapes clés de notre évolution depuis 2019
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-blue-600 text-white">{milestone.year}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-4 border-white z-10"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Culture d'Entreprise
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous créons un environnement où l'innovation prospère, où chaque voix compte 
                et où l'équilibre vie professionnelle/personnelle est une priorité.
              </p>
              
              <div className="space-y-3">
                {culture.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop" 
                alt="Notre culture d'entreprise"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Rejoignez Notre Équipe
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Nous recherchons constamment des talents passionnés pour renforcer notre équipe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
              Voir les Postes Ouverts
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              Candidature Spontanée
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;