// Consolidated structured data for the homepage
// Extracted to avoid large inline strings that cause webpack cache serialization warnings

export function getHomepageSchemas() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.dcsam.co.za/#localbusiness",
    name: "DCSA Debt Counselling South Africa",
    image: "https://www.dcsam.co.za/images/dcsa-logo.png",
    telephone: "+27-71-900-6298",
    email: "info@dcsam.co.za",
    address: {
      "@type": "PostalAddress",
      streetAddress: "81 6th Avenue, Newton Park",
      addressLocality: "Gqeberha",
      addressRegion: "Eastern Cape",
      postalCode: "6045",
      addressCountry: "ZA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-33.9612",
      longitude: "25.5894",
    },
    url: "https://www.dcsam.co.za",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "287",
    },
  }

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.dcsam.co.za/#service",
    name: "DCSA Debt Counselling & Credit Repair Services",
    description:
      "Compassionate debt counselling and credit repair services for South Africans who need financial support. No judgment, just honest guidance.",
    provider: {
      "@id": "https://www.dcsam.co.za/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Debt Counselling Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Debt Review / Debt Counselling",
            description:
              "Professional debt review and counselling services to help manage and reduce debt",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Credit Repair",
            description:
              "Credit repair services to improve your credit score and financial health",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Free Debt Consultation",
            description:
              "Free consultation to assess your debt situation and recommend solutions",
          },
        },
      ],
    },
  }

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is DCSA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DCSA (Debt Counselling South Africa) is an NCR registered debt counselling service that provides compassionate support to South Africans struggling with debt. We offer debt counselling and credit repair services with no judgment, just honest guidance to help you regain financial control.",
        },
      },
      {
        "@type": "Question",
        name: "What is debt counselling?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Debt counselling is a formal debt relief process regulated by the National Credit Regulator (NCR) that helps over-indebted consumers restructure their debt repayments into one affordable monthly payment.",
        },
      },
      {
        "@type": "Question",
        name: "How can DCSA help with my debt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DCSA provides two main services: debt counselling (debt review) to restructure your debt into one affordable payment, and credit repair to help improve your credit score. We offer compassionate, judgment-free support throughout your journey to financial freedom, with free consultations to understand your situation and recommend the right path forward.",
        },
      },
      {
        "@type": "Question",
        name: "Is DCSA registered with the NCR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, DCSA is a fully registered debt counsellor with the National Credit Regulator (NCR) under registration number NCRDC3995.",
        },
      },
    ],
  }

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.dcsam.co.za",
      },
    ],
  }

  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DCSA Free Financial Calculators",
    url: "https://www.dcsam.co.za/calculator",
    description:
      "Free online calculators to help South Africans manage debt, calculate interest, and plan their finances. Includes Money Map, Potential Savings Calculator, and Interest Calculator.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ZAR",
    },
    featureList: [
      "Money Map Calculator - Track income and expenses",
      "Potential Savings Calculator - Calculate debt counselling savings",
      "Interest Calculator - Calculate loan interest and repayments",
      "Share results with friends and family",
      "Free to use, no registration required",
    ],
    author: {
      "@id": "https://www.dcsam.co.za/#organization",
    },
  }

  const financialService = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "DCSA Debt Counselling Services",
    description:
      "Professional debt counselling and credit repair services helping South Africans reduce debt by 15-45% through NCR registered debt review.",
    provider: {
      "@id": "https://www.dcsam.co.za/#organization",
    },
    serviceType: "Debt Counselling",
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Financial Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FinancialProduct",
            name: "Debt Review",
            description:
              "Reduce monthly debt payments by 15-45% through NCR regulated debt review process",
            feesAndCommissionsSpecification: "Initial consultation free",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "FinancialProduct",
            name: "Credit Repair",
            description:
              "Improve credit score and repair credit history",
          },
        },
      ],
    },
    award: "NCR Registered Debt Counsellor NCRDC3995",
  }

  return [
    localBusiness,
    professionalService,
    faqPage,
    breadcrumbList,
    webApplication,
    financialService,
  ]
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.dcsam.co.za/#organization",
        name: "DCSA Debt Counsellors",
        legalName: "DCSA Debt Counselling Services",
        url: "https://www.dcsam.co.za",
        logo: {
          "@type": "ImageObject",
          url: "https://www.dcsam.co.za/icon-512.png",
          width: 512,
          height: 512,
        },
        description:
          "NCR registered debt counsellors providing professional debt relief, debt review, and credit repair services across South Africa. Over 12 years of experience helping South Africans achieve financial freedom.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "ZA",
          addressRegion: "Eastern Cape",
          addressLocality: "Gqeberha",
          postalCode: "6001",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+27-71-900-6298",
            contactType: "customer service",
            areaServed: "ZA",
            availableLanguage: ["English", "Afrikaans"],
          },
          {
            "@type": "ContactPoint",
            email: "info@dcsam.co.za",
            contactType: "customer service",
          },
        ],
        sameAs: ["https://www.facebook.com/DebtClearDCSA"],
        founder: {
          "@type": "Person",
          name: "Corrie",
          jobTitle: "Registered Debt Counsellor",
        },
        areaServed: {
          "@type": "Country",
          name: "South Africa",
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "NCR Registration",
          recognizedBy: {
            "@type": "Organization",
            name: "National Credit Regulator",
            sameAs: "https://www.ncr.org.za",
          },
          identifier: "NCRDC3995",
        },
        knowsAbout: [
          "Debt Counselling",
          "Debt Review",
          "Credit Repair",
          "Debt Management",
          "Financial Planning",
          "National Credit Act",
          "Consumer Protection",
        ],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Debt Review / Debt Counselling",
              description:
                "Comprehensive debt review services under the National Credit Act. Immediate legal protection, reduced monthly payments, and structured debt repayment plans.",
              provider: {
                "@id": "https://www.dcsam.co.za/#organization",
              },
              areaServed: "ZA",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              priceCurrency: "ZAR",
              price: "50.00",
              description:
                "Initial application fee - R50. Admin fee R300-R350. Restructuring fee (1st month payment or max R8000). Monthly aftercare 5% (max R450).",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Credit Repair",
              description:
                "Professional credit repair services to improve credit scores, remove incorrect listings, and restore financial reputation.",
              provider: {
                "@id": "https://www.dcsam.co.za/#organization",
              },
              areaServed: "ZA",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Free Debt Consultation",
              description:
                "Complimentary initial consultation to assess your financial situation and recommend the best debt solution.",
              provider: {
                "@id": "https://www.dcsam.co.za/#organization",
              },
              areaServed: "ZA",
            },
            price: "0",
            priceCurrency: "ZAR",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.dcsam.co.za/#website",
        url: "https://www.dcsam.co.za",
        name: "DCSA Debt Counsellors",
        description:
          "Professional debt counselling, debt review, and credit repair services in South Africa",
        publisher: {
          "@id": "https://www.dcsam.co.za/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.dcsam.co.za/blog?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.dcsam.co.za/#service",
        name: "DCSA Debt Counselling Services",
        description:
          "NCR registered debt counselling providing immediate debt relief and legal protection. Specializing in debt review, credit repair, and financial rehabilitation across South Africa.",
        provider: {
          "@id": "https://www.dcsam.co.za/#organization",
        },
        serviceType: "Debt Counselling",
        areaServed: {
          "@type": "Country",
          name: "South Africa",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Debt Solutions",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Debt Review",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Credit Repair",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Debt Consolidation",
              },
            },
          ],
        },
      },
    ],
  }
}

export function getLayoutSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        "@id": "https://www.dcsam.co.za/#organization",
        name: "DCSA Debt Counsellors",
        alternateName: ["DCSA", "DCSA Debt Counselling", "Debt Clear SA"],
        description:
          "DCSA - Professional debt counselling, debt help and debt relief services in South Africa. NCR registered debt counsellor with 17+ years of experience helping South Africans achieve financial freedom.",
        url: "https://www.dcsam.co.za",
        logo: {
          "@type": "ImageObject",
          url: "https://www.dcsam.co.za/images/dcsa-logo.jpg",
          width: 512,
          height: 512,
        },
        image: "https://www.dcsam.co.za/images/dcsa-logo.jpg",
        telephone: "+27719006298",
        email: "info@dcsam.co.za",
        sameAs: [
          "https://www.facebook.com/DCSamDebt",
          "https://www.linkedin.com/company/dcsam-dcsa",
          "https://www.tiktok.com/@dcsam_debt",
          "https://www.instagram.com/debthelp_with_dcsam",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "81 6th Avenue, Newton Park",
          addressLocality: "Gqeberha",
          addressRegion: "Eastern Cape",
          postalCode: "6045",
          addressCountry: "ZA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "-33.966111",
          longitude: "25.595891",
        },
        areaServed: {
          "@type": "Country",
          name: "South Africa",
        },
        serviceType: [
          "Debt Help",
          "Debt Relief",
          "Debt Counselling",
          "Debt Management",
          "Financial Counselling",
          "Budget Planning",
          "Debt Review",
          "Credit Repair",
          "Savings Coaching",
        ],
        priceRange: "$$",
        currenciesAccepted: "ZAR",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        openingHours: "Mo-Fr 08:00-17:00",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Debt Counselling Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Debt Help & Debt Relief Services",
                description:
                  "Professional debt help and debt relief including debt review, budget planning, and personalized debt management strategies.",
                provider: {
                  "@id": "https://www.dcsam.co.za/#organization",
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Credit Repair Services",
                description:
                  "Professional credit repair services to help improve your credit score and financial standing in South Africa.",
                provider: {
                  "@id": "https://www.dcsam.co.za/#organization",
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Budget Planning & Savings Coaching",
                description:
                  "Expert budget planning and savings coaching to help you manage expenses, track spending, and build financial stability.",
                provider: {
                  "@id": "https://www.dcsam.co.za/#organization",
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Free Debt Calculators",
                description:
                  "Free online calculators including Money Map budget tracker, savings calculator, and interest calculator to help manage your finances.",
                provider: {
                  "@id": "https://www.dcsam.co.za/#organization",
                },
              },
            },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          bestRating: "5",
          worstRating: "1",
          ratingCount: "150",
        },
        founder: {
          "@type": "Person",
          name: "DCSA Counsellor",
          jobTitle: "Registered Debt Counsellor",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.dcsam.co.za/#website",
        url: "https://www.dcsam.co.za",
        name: "DCSA Debt Counsellors",
        description:
          "DCSA - Professional debt help, debt relief and debt counselling in South Africa",
        publisher: {
          "@id": "https://www.dcsam.co.za/#organization",
        },
        inLanguage: "en-ZA",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.dcsam.co.za/?s={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://www.dcsam.co.za/#webpage",
        url: "https://www.dcsam.co.za",
        name: "DCSA - Professional Debt Help & Debt Relief South Africa",
        description:
          "DCSA - Get professional debt help, debt relief and debt counselling services with 17+ years experience.",
        isPartOf: {
          "@id": "https://www.dcsam.co.za/#website",
        },
        about: {
          "@id": "https://www.dcsam.co.za/#organization",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://www.dcsam.co.za/images/dcsa-logo.jpg",
        },
        inLanguage: "en-ZA",
        breadcrumb: {
          "@id": "https://www.dcsam.co.za/#breadcrumb",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.dcsam.co.za/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.dcsam.co.za",
          },
        ],
      },
    ],
  }
}
