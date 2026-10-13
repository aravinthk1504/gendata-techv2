// Route-specific SEO metadata for the Next.js EN/DE site.
const ROUTES = {
  "about": {
    "en": [
      "About GenData Tech",
      "Discover our approach to intelligent technology, AI engineering and practical digital solutions."
    ],
    "de": [
      "Über GenData Tech",
      "Entdecken Sie unseren Ansatz für intelligente Technologie, AI-Engineering und praxisnahe digitale Lösungen."
    ]
  },
  "services": {
    "en": [
      "Technology Services",
      "Explore AI development, full stack, web, software, app development and IoT services."
    ],
    "de": [
      "Technologiedienstleistungen",
      "Entdecken Sie AI-Entwicklung, Full Stack, Web-, Software- und App-Entwicklung sowie IoT Solutions."
    ]
  },
  "products": {
    "en": [
      "Digital Products",
      "Explore the growing ecosystem of GenData Tech products for learning and business operations."
    ],
    "de": [
      "Digitale Produkte",
      "Entdecken Sie die wachsende Produktwelt von GenData Tech für Lernen und betriebliche Abläufe."
    ]
  },
  "training": {
    "en": [
      "Technology Training",
      "Practical technology training in AI, data science, software development and modern engineering."
    ],
    "de": [
      "Technologie-Schulungen",
      "Praxisnahe Schulungen zu AI, Data Science, Softwareentwicklung und moderner Technologie."
    ]
  },
  "blog": {
    "en": [
      "Insights and Events",
      "Perspectives, practical articles and updates about AI and technology from GenData Tech."
    ],
    "de": [
      "Insights und Events",
      "Perspektiven, Fachartikel und Neuigkeiten zu AI und Technologie von GenData Tech."
    ]
  },
  "contact": {
    "en": [
      "Contact GenData Tech",
      "Discuss your AI, software or technology project with GenData Tech."
    ],
    "de": [
      "Kontakt zu GenData Tech",
      "Sprechen Sie mit GenData Tech über Ihr AI-, Software- oder Technologieprojekt."
    ]
  },
  "services/ai-ml-development": {
    "en": [
      "AI/ML Development",
      "Custom AI models, machine learning and intelligent automation solutions."
    ],
    "de": [
      "AI/ML Development",
      "Individuelle AI-Modelle, Machine Learning und intelligente Automatisierung."
    ]
  },
  "services/app-development": {
    "en": [
      "App Development",
      "Mobile applications for connected services and business workflows."
    ],
    "de": [
      "App Development",
      "Mobile Anwendungen für vernetzte Services und betriebliche Abläufe."
    ]
  },
  "services/full-stack-development": {
    "en": [
      "Full Stack Development",
      "End-to-end application engineering across frontend, backend and databases."
    ],
    "de": [
      "Full Stack Development",
      "Ganzheitliche Anwendungsentwicklung mit Frontend, Backend und Datenbanken."
    ]
  },
  "services/iot-solutions": {
    "en": [
      "IoT Solutions",
      "Connected sensor systems, monitoring platforms and intelligent automation."
    ],
    "de": [
      "IoT Solutions",
      "Vernetzte Sensorsysteme, Monitoring-Plattformen und intelligente Automatisierung."
    ]
  },
  "services/software-development": {
    "en": [
      "Software Development",
      "Custom software for digital operations and business needs."
    ],
    "de": [
      "Software Development",
      "Individuelle Software für digitale Prozesse und geschäftliche Anforderungen."
    ]
  },
  "services/web-development": {
    "en": [
      "Web Development",
      "Modern, responsive and performant corporate and product websites."
    ],
    "de": [
      "Web Development",
      "Moderne, responsive und leistungsstarke Unternehmens- und Produktwebsites."
    ]
  },
  "blog/[slug]": {
    "en": [
      "Article",
      "Read GenData Tech insights, articles and technology perspectives."
    ],
    "de": [
      "Artikel",
      "Lesen Sie Insights, Fachartikel und Technologieperspektiven von GenData Tech."
    ]
  }
};

export function getPageMetadata(lang, route) {
  const locale = lang === "de" ? "de" : "en";
  const [label, description] = (ROUTES[route] ?? ROUTES.about)[locale];
  const path = route === "blog/[slug]" ? "/blog" : `/${route}`;
  return {
    title: `${label} | GenData Tech`,
    description,
    alternates: {
      languages: { en: `/en${path}`, de: `/de${path}` },
    },
  };
}
