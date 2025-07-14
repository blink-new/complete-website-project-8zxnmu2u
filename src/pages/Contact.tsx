import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  Zap,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    description: '',
    timeline: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "contact@jjp1114.studio",
      description: "Réponse sous 24h"
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: "+33 1 23 45 67 89",
      description: "Lun-Ven 9h-18h"
    },
    {
      icon: MapPin,
      title: "Adresse",
      details: "75001 Paris, France",
      description: "Rendez-vous sur site"
    },
    {
      icon: Clock,
      title: "Horaires",
      details: "9h00 - 18h00",
      description: "Du lundi au vendredi"
    }
  ];

  const projectTypes = [
    { value: '', label: 'Sélectionner un type de projet' },
    { value: 'web-app', label: 'Application Web' },
    { value: 'mobile-app', label: 'Application Mobile' },
    { value: 'enterprise', label: 'Solution Enterprise' },
    { value: 'ecommerce', label: 'Site E-commerce' },
    { value: 'other', label: 'Autre' }
  ];

  const budgetRanges = [
    { value: '', label: 'Budget estimé' },
    { value: '5k-15k', label: '5 000€ - 15 000€' },
    { value: '15k-30k', label: '15 000€ - 30 000€' },
    { value: '30k-50k', label: '30 000€ - 50 000€' },
    { value: '50k+', label: '50 000€+' },
    { value: 'to-discuss', label: 'À discuter' }
  ];

  const timelineOptions = [
    { value: '', label: 'Délai souhaité' },
    { value: 'urgent', label: 'Urgent (< 1 mois)' },
    { value: '1-3months', label: '1-3 mois' },
    { value: '3-6months', label: '3-6 mois' },
    { value: '6months+', label: '6+ mois' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const process = [
    {
      step: 1,
      title: "Prise de Contact",
      description: "Échange initial pour comprendre vos besoins",
      duration: "24h"
    },
    {
      step: 2,
      title: "Analyse & Maquettage",
      description: "Utilisation de notre configurateur pour visualiser",
      duration: "3-5 jours"
    },
    {
      step: 3,
      title: "Devis Détaillé",
      description: "Proposition technique et commerciale précise",
      duration: "2-3 jours"
    },
    {
      step: 4,
      title: "Lancement Projet",
      description: "Démarrage du développement agile",
      duration: "1 semaine"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600">Contact</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Démarrons Votre 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Projet Ensemble
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partagez-nous votre vision et recevez un devis personnalisé. 
              Notre équipe vous accompagne de l'idée à la réalisation.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
                  Demande de Devis
                </CardTitle>
                <CardDescription>
                  Remplissez ce formulaire pour recevoir une proposition personnalisée
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Demande Envoyée !
                    </h3>
                    <p className="text-gray-600">
                      Nous vous recontacterons sous 24h pour discuter de votre projet.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Entreprise
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type de projet *
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          {projectTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {budgetRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                              {range.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Délai
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {timelineOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description du projet *
                      </label>
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Décrivez votre projet, vos objectifs et vos besoins spécifiques..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer ma demande
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Process */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Informations de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{info.title}</h4>
                        <p className="text-gray-600">{info.details}</p>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Process Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Notre Processus</CardTitle>
                <CardDescription>
                  De votre demande au lancement du projet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white text-sm font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {step.duration}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Besoin d'une réponse rapide ?</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600">
                    <Zap className="w-4 h-4 mr-2" />
                    Essayer le Configurateur
                  </Button>
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600">
                    <Users className="w-4 h-4 mr-2" />
                    Planifier un Appel
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

export default Contact;