import { Product } from '../types';
import { 
  Zap, 
  Database, 
  Globe, 
  Smartphone, 
  Users, 
  CheckCircle 
} from 'lucide-react';

export const products: Product[] = [
  {
    id: 1,
    name: "TaskFlow Pro",
    category: "Productivité",
    price: 49.99,
    oldPrice: 79.99,
    rating: 4.8,
    reviews: 127,
    description: "Solution complète de gestion de tâches et de projets pour équipes",
    detailedDescription: `TaskFlow Pro est la solution ultime pour la gestion de projets et de tâches en équipe. Conçu pour les entreprises modernes, il offre une interface intuitive et des fonctionnalités avancées pour optimiser votre productivité.

Avec TaskFlow Pro, vous pouvez créer des projets complexes, assigner des tâches à vos équipes, suivre les progrès en temps réel et générer des rapports détaillés. L'application supporte la collaboration en temps réel, permettant à vos équipes de travailler ensemble efficacement, peu importe leur localisation.

Les tableaux de bord personnalisables vous donnent une vue d'ensemble de tous vos projets, tandis que les notifications intelligentes vous tiennent informé des échéances importantes. L'intégration avec plus de 50 outils populaires fait de TaskFlow Pro le centre de contrôle de votre workflow.`,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
    features: [
      "Collaboration en temps réel",
      "Rapports avancés et analytics",
      "Intégrations avec 50+ outils",
      "Applications mobile & desktop",
      "Tableaux de bord personnalisables",
      "Notifications intelligentes",
      "Gestion des ressources",
      "Suivi du temps intégré",
      "Templates de projets",
      "API REST complète"
    ],
    icon: Zap,
    license: "Licence perpétuelle",
    activations: "5 postes",
    support: "1 an inclus",
    popular: true,
    systemRequirements: [
      "Windows 10/11 ou macOS 10.15+",
      "4 GB RAM minimum (8 GB recommandé)",
      "2 GB d'espace disque",
      "Connexion Internet pour la synchronisation",
      "Navigateur moderne (Chrome, Firefox, Safari, Edge)"
    ],
    downloadSize: "156 MB",
    version: "3.2.1"
  },
  {
    id: 2,
    name: "DataSync Enterprise",
    category: "Gestion",
    price: 199.99,
    oldPrice: null,
    rating: 4.9,
    reviews: 89,
    description: "Synchronisation et sauvegarde automatique de données d'entreprise",
    detailedDescription: `DataSync Enterprise est la solution de synchronisation et de sauvegarde la plus avancée du marché. Conçue pour les entreprises qui ne peuvent pas se permettre de perdre leurs données, elle offre une protection complète avec un chiffrement de niveau militaire.

La solution synchronise automatiquement vos données entre tous vos sites et appareils, garantissant que votre équipe a toujours accès aux informations les plus récentes. Les sauvegardes incrémentielles optimisent l'utilisation de la bande passante et du stockage.

Avec des fonctionnalités avancées comme la déduplication, la compression intelligente et la récupération granulaire, DataSync Enterprise vous permet de récupérer n'importe quel fichier ou dossier en quelques clics. Le tableau de bord centralisé vous donne une visibilité complète sur l'état de toutes vos sauvegardes.`,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    features: [
      "Chiffrement AES-256",
      "Sauvegarde cloud illimitée",
      "Synchronisation multi-sites",
      "API REST complète",
      "Déduplication avancée",
      "Compression intelligente",
      "Récupération granulaire",
      "Monitoring en temps réel",
      "Rapports de conformité",
      "Support 24/7"
    ],
    icon: Database,
    license: "Abonnement annuel",
    activations: "Illimité",
    support: "Support premium 24/7",
    popular: false,
    systemRequirements: [
      "Windows Server 2016+ ou Linux",
      "8 GB RAM minimum (16 GB recommandé)",
      "100 GB d'espace disque libre",
      "Connexion Internet haut débit",
      "Ports 443 et 80 ouverts"
    ],
    downloadSize: "892 MB",
    version: "2.8.4"
  },
  {
    id: 3,
    name: "ShopBuilder Lite",
    category: "E-commerce",
    price: 29.99,
    oldPrice: 49.99,
    rating: 4.6,
    reviews: 203,
    description: "Créateur de boutiques en ligne simple et efficace",
    detailedDescription: `ShopBuilder Lite est la solution parfaite pour créer votre boutique en ligne rapidement et facilement. Sans connaissances techniques requises, vous pouvez lancer votre e-commerce en quelques heures seulement.

L'interface drag-and-drop intuitive vous permet de personnaliser entièrement votre boutique. Choisissez parmi plus de 50 templates professionnels, ajoutez vos produits, configurez les paiements et vous êtes prêt à vendre !

La solution inclut tout ce dont vous avez besoin : gestion d'inventaire, traitement des commandes, calcul automatique des taxes et frais de port, et des outils marketing intégrés. Les rapports détaillés vous aident à comprendre vos ventes et optimiser votre business.`,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    features: [
      "50+ templates responsives",
      "Paiement intégré (Stripe, PayPal)",
      "Gestion inventaire avancée",
      "Analytics et rapports",
      "SEO optimisé",
      "Codes promo et réductions",
      "Gestion des commandes",
      "Support multi-devises",
      "Outils marketing intégrés",
      "Sauvegarde automatique"
    ],
    icon: Globe,
    license: "Licence perpétuelle",
    activations: "1 boutique",
    support: "6 mois inclus",
    popular: false,
    systemRequirements: [
      "Navigateur web moderne",
      "Connexion Internet stable",
      "Compte hébergement web (optionnel)",
      "Compte Stripe ou PayPal pour les paiements"
    ],
    downloadSize: "45 MB",
    version: "1.9.2"
  },
  {
    id: 4,
    name: "MobileFirst Suite",
    category: "Développement",
    price: 149.99,
    oldPrice: null,
    rating: 4.7,
    reviews: 156,
    description: "Kit de développement pour applications mobiles cross-platform",
    detailedDescription: `MobileFirst Suite est le kit de développement ultime pour créer des applications mobiles cross-platform de qualité professionnelle. Que vous développiez en React Native ou Flutter, cette suite vous fournit tous les outils nécessaires.

La suite inclut plus de 200 composants UI prêts à l'emploi, des templates d'applications complètes, et des outils de développement avancés. Les composants sont entièrement personnalisables et suivent les guidelines de design iOS et Android.

Avec MobileFirst Suite, vous réduisez votre temps de développement de 70% tout en maintenant une qualité professionnelle. La documentation complète et les exemples de code vous permettent de démarrer immédiatement, même si vous êtes débutant.`,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    features: [
      "200+ composants React Native",
      "Support Flutter complet",
      "Templates d'applications",
      "Documentation complète",
      "Outils de debug avancés",
      "Générateur de code",
      "Thèmes personnalisables",
      "Intégrations API",
      "Tests automatisés",
      "Déploiement simplifié"
    ],
    icon: Smartphone,
    license: "Licence développeur",
    activations: "Projets illimités",
    support: "Support technique 1 an",
    popular: true,
    systemRequirements: [
      "Node.js 16+ et npm/yarn",
      "Android Studio ou Xcode",
      "8 GB RAM minimum (16 GB recommandé)",
      "20 GB d'espace disque libre",
      "Git installé"
    ],
    downloadSize: "1.2 GB",
    version: "4.1.0"
  },
  {
    id: 5,
    name: "TeamCollaborate Pro",
    category: "Productivité",
    price: 89.99,
    oldPrice: 129.99,
    rating: 4.5,
    reviews: 98,
    description: "Plateforme de collaboration et communication d'équipe",
    detailedDescription: `TeamCollaborate Pro révolutionne la façon dont vos équipes travaillent ensemble. Cette plateforme tout-en-un combine chat, vidéoconférence, partage de fichiers et gestion de projets dans une interface unifiée.

Créez des espaces de travail dédiés pour chaque projet, invitez vos collaborateurs et commencez à travailler ensemble immédiatement. Les conversations sont organisées par canaux thématiques, et l'historique complet est toujours accessible.

Les fonctionnalités avancées incluent la co-édition de documents en temps réel, les tableaux Kanban interactifs, et l'intégration avec vos outils existants. Les notifications intelligentes vous tiennent informé sans vous submerger.`,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    features: [
      "Chat en temps réel",
      "Partage de fichiers sécurisé",
      "Vidéoconférence HD",
      "Tableaux Kanban interactifs",
      "Co-édition de documents",
      "Intégrations multiples",
      "Notifications intelligentes",
      "Recherche avancée",
      "Archivage automatique",
      "Contrôles d'accès"
    ],
    icon: Users,
    license: "Abonnement mensuel",
    activations: "50 utilisateurs",
    support: "Chat 24/7",
    popular: false,
    systemRequirements: [
      "Navigateur web moderne",
      "Connexion Internet stable",
      "Microphone et caméra (pour vidéo)",
      "4 GB RAM minimum"
    ],
    downloadSize: "78 MB",
    version: "2.3.1"
  },
  {
    id: 6,
    name: "InvoiceManager Plus",
    category: "Gestion",
    price: 39.99,
    oldPrice: null,
    rating: 4.8,
    reviews: 134,
    description: "Gestion complète de facturation et comptabilité simple",
    detailedDescription: `InvoiceManager Plus simplifie la gestion de votre facturation et de votre comptabilité. Créez des factures professionnelles en quelques clics, suivez vos paiements et gérez vos clients efficacement.

L'application génère automatiquement des rapports de TVA, des bilans et des comptes de résultat conformes aux normes comptables. Les relances clients automatiques vous font gagner du temps et améliorent votre trésorerie.

Avec plus de 50 templates de factures personnalisables, vous pouvez créer des documents qui reflètent votre image de marque. L'export vers les logiciels comptables populaires facilite la collaboration avec votre expert-comptable.`,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    features: [
      "Facturation automatique",
      "Relances clients intelligentes",
      "Rapports TVA automatiques",
      "Export comptable",
      "50+ templates de factures",
      "Gestion multi-devises",
      "Suivi des paiements",
      "Tableau de bord financier",
      "Sauvegarde cloud",
      "Support multi-entreprises"
    ],
    icon: CheckCircle,
    license: "Licence perpétuelle",
    activations: "3 utilisateurs",
    support: "Email support",
    popular: false,
    systemRequirements: [
      "Windows 10+ ou macOS 10.14+",
      "4 GB RAM minimum",
      "1 GB d'espace disque",
      "Connexion Internet pour synchronisation",
      "PDF reader installé"
    ],
    downloadSize: "234 MB",
    version: "5.1.3"
  }
];