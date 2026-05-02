import { createI18n } from 'vue-i18n'

const savedLocale = localStorage.getItem('locale') || 'en'

const messages = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      personalArea: 'Personal Area',
      login: 'Login',
      logout: 'Logout',
      language: 'Language',
    },
    home: {
      brand: 'Bueno Web Solutions',
      heroTitle: 'We build websites and AI systems that help small businesses get more customers and save time.',
      heroText:
        'We help small and medium-sized businesses build a professional online presence, automate customer communication and turn their website into a real business tool.',
      requestProject: 'Request a project',
      moreAboutUs: 'More about us',

      modernTitle: 'Professional online presence',
      modernText:
        'We build clean, modern websites that make your business look trustworthy and serious.',

      customTitle: 'Built for your business',
      customText:
        'Every website and automation is adapted to your services, customers and daily workflow.',

      reliableTitle: 'Practical and reliable',
      reliableText:
        'We focus on solutions that work in real business life — not just designs that look good.',

      servicesLabel: 'Services',
      servicesTitle: 'What we can build for you',
      servicesText:
        'From new websites to backend systems and AI-powered replies, we create digital solutions that save time and help your business grow.',

      benefitsLabel: 'Benefits',
      benefitsTitle: 'Why work with BuenoWS?',

      targetGroupsLabel: 'Target groups',
      targetGroupsTitle: 'Who we help',

      technologiesLabel: 'Technologies',
      technologiesTitle: 'Built on a strong technical foundation',
      technologiesText:
        'We use modern technologies to build websites and systems that are stable, expandable and easy to maintain.',

      contactLabel: 'Contact',
      ctaTitle: 'Ready to improve your website or automate your customer communication?',
      ctaText:
        'Tell us what you need. We will look at your situation and suggest a solution that makes sense for your business.',
      contactNow: 'Get in touch',

      services: {
        createWebsites: {
          title: 'New websites',
          text: 'We create modern websites that present your services clearly, build trust and help customers contact you.',
        },
        renewWebsites: {
          title: 'Website redesign',
          text: 'We modernize outdated websites so they look better, work faster and represent your business professionally.',
        },
        backend: {
          title: 'Backend systems',
          text: 'We build the technical logic behind your website, including logins, databases, admin areas and custom features.',
        },
        automations: {
          title: 'Business automation',
          text: 'We automate repetitive tasks so you save time and can focus more on your customers and your work.',
        },
        aiSolutions: {
          title: 'AI email replier',
          text: 'We create AI-powered reply systems that help businesses answer customer inquiries faster and more consistently.',
        },
        hosting: {
          title: 'Hosting & support',
          text: 'After launch, we can support your project with hosting, updates, maintenance and future improvements.',
        },
      },

      benefits: [
        'Professional websites instead of generic templates',
        'Digital solutions adapted to your real business needs',
        'AI automation that can save time in customer communication',
        'Modern backend systems for serious and expandable projects',
      ],

      targetGroups: [
        'Craft businesses such as roofers, painters and electricians',
        'Small and medium-sized local companies',
        'Service providers that need a stronger online presence',
        'Businesses that want to automate customer communication',
      ],
    },
    about: {
      label: 'About us',
      heroTitle: 'We are building digital solutions that actually help small businesses grow.',
      heroText:
        'We are two developers from Lucerne focused on building websites, backend systems and automations that solve real problems in everyday business.',

      whoWeAreTitle: 'Who we are',
      whoWeAreText1:
        'We are Liam Bruno and Benjamin Gerresheim, both 18 years old and currently studying computer science at the IMS (Informatik Mittelschule) in Lucerne.',
      whoWeAreText2:
        'Alongside school, we are building Bueno Web Solutions to gain real experience, work with real businesses and create digital solutions that go beyond simple websites.',

      whyTitle: 'Why we started',
      whyText1:
        'We started this project because we saw that many small businesses still have outdated websites or no real digital systems behind them.',
      whyText2:
        'At the same time, we wanted to build something real ourselves — not just learn theory, but create systems, work with clients and grow a business from the ground up.',

      targetTitle: 'Who we work with',
      targetText:
        'We mainly work with small and medium-sized businesses such as craft companies, local services and startups that want a more professional online presence and smarter processes.',

      differenceTitle: 'What makes us different',
      differenceText1:
        'We work directly, personally and without unnecessary complexity. You communicate with us directly — no middlemen, no agency layers.',
      differenceText2:
        'Our focus is not just design, but practical solutions that actually help your business: getting more inquiries, saving time and simplifying processes.',

      howWeWorkTitle: 'How we work',
      howWeWorkText1:
        'We keep everything simple and transparent. We communicate directly, often via chat or call, and keep you updated during the whole process.',
      howWeWorkText2:
        'Our goal is to understand your business first and then build something that truly fits your needs — not just a standard solution.',

      futureTitle: 'What we are building',
      futureText1:
        'We are currently expanding our services with AI-powered solutions such as automatic email replies, AI-based customer communication and process automation.',
      futureText2:
        'Our long-term goal is to build systems that help businesses save time, reduce manual work and handle customer communication more efficiently.',
    },
    servicesPage: {
      label: 'Services',
      heroTitle: 'Websites, automation and AI solutions that actually help your business.',
      heroText:
        'We build websites and systems that do more than just look good — they help you get customers, save time and improve your daily workflow.',

      coreLabel: 'Services',
      coreTitle: 'What we build for businesses',
      coreText:
        'Our focus is on practical solutions: websites that convert, backend systems that work and automations that reduce manual work.',

      upcomingLabel: 'In development',
      upcomingTitle: 'What is coming next',
      upcomingText:
        'We are currently building new AI-based tools that will further improve customer communication and automate repetitive business tasks.',

      targetGroupsLabel: 'Target groups',
      targetGroupsTitle: 'Who this is for',

      collaborationLabel: 'How it works',
      collaborationTitle: 'Simple and clear process',

      step1Title: '1. Understand your business',
      step1Text:
        'We first look at your current situation, your services and where you lose time or potential customers.',

      step2Title: '2. Plan the solution',
      step2Text:
        'We define exactly what your website or system should do and how it helps your business.',

      step3Title: '3. Build and implement',
      step3Text:
        'We develop your website or automation cleanly and keep you updated during the process.',

      step4Title: '4. Improve and scale',
      step4Text:
        'After launch, we can expand and improve your system step by step as your business grows.',

      contactLabel: 'Contact',
      ctaTitle: 'Want a website or system that actually helps your business?',
      ctaText: 'Send us a short message and we will tell you what makes sense for your situation.',
      ctaButton: 'Request a project',

      coreServices: [
        {
          title: 'Websites that convert',
          text: 'We build websites that clearly present your services and turn visitors into real customer inquiries.',
        },
        {
          title: 'Website redesign',
          text: 'Outdated website? We rebuild it so it looks modern, loads fast and builds trust instantly.',
        },
        {
          title: 'Backend & systems',
          text: 'We create admin areas, login systems and database solutions so your website becomes a real tool.',
        },
        {
          title: 'AI email automation',
          text: 'We build AI systems that automatically reply to customer inquiries — perfect for repetitive questions.',
        },
        {
          title: 'Process automation',
          text: 'We automate tasks like requests, emails or workflows so you save time every day.',
        },
        {
          title: 'Hosting & support',
          text: 'We take care of your website after launch so everything stays online, fast and secure.',
        },
      ],

      upcomingServices: [
        'AI phone assistant for businesses',
        'AI chatbot for websites',
        'Automated sales and lead systems',
      ],

      targetGroups: [
        'Craft businesses (roofers, electricians, etc.)',
        'Local companies',
        'Service providers',
        'Businesses with repetitive customer requests',
      ],
    },
    contactPage: {
      label: 'Contact',
      heroTitle: 'Tell us what you need — we will show you what actually makes sense for your business.',
      heroText:
        'Whether you need a new website, a redesign, backend features or AI automation — send us a short message and we will look at what makes sense for your business.',

      directContactTitle: 'Direct contact',

      phoneTitle: 'Phone',
      phoneTime: 'Mon – Fri, 09:00 to 18:00',

      emailTitle: 'Email',
      emailText: 'Send us your idea, problem or current situation.',

      writeUsTitle: 'What to include',
      writeUsText:
        'Tell us what your business does, what you need and what your current website or process looks like. A short description is enough to start.',

      formTitle: 'Request a project',
      emailLabel: 'Your email',
      emailPlaceholder: 'name{\'@\'}company.com',
      subjectLabel: 'What do you need?',
      subjectPlaceholder: 'New website, redesign, AI email replier ...',
      messageLabel: 'Your message',
      messagePlaceholder:
        'Briefly describe your business, your goal and what you would like us to build or improve ...',

      fillAllFields: 'Please fill in all fields.',
      sending: 'Sending ...',
      sendButton: 'Send request',
      successDefault: 'Thank you. Your request has been sent successfully.',
      errorDefault: 'Something went wrong while sending your message.',
    },
    authPage: {
      loginTitle: 'Login to your account',
      registerTitle: 'Create your account and get access to your project dashboard',

      emailLabel: 'Email address',
      emailPlaceholder: 'name{\'@\'}company.com',

      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      forgotPassword: 'Forgot password?',

      signIn: 'Login',
      register: 'Create account',
      loading: 'Please wait...',

      noAccount: "Don't have an account yet?",
      haveAccount: 'Already have an account?',
      createOne: 'Create one',
      signInLink: 'Login',

      enterEmailPassword: 'Please enter your email and password.',
      loginFailedNoJwt: 'Login failed. No access token received.',
      connectionFailed: 'Could not connect to the server.',

      firstNameLabel: 'First name',
      firstNamePlaceholder: 'John',
      lastNameLabel: 'Last name',
      lastNamePlaceholder: 'Smith',
      enterFullName: 'Please enter your first and last name.',
      registerFailedNoJwt: 'Registration failed. No access token received.',
    },
    accountPage: {
      title: 'Dashboard',
      subtitle: 'Manage your website, account and project tools in one place.',

      loadingTitle: 'Loading',
      loadingText: 'Your account data is being loaded ...',

      errorTitle: 'Error',
      sessionError: 'Your session could not be confirmed.',
      noJwt: 'No login token found.',
      profileError: 'Your profile could not be loaded.',
      inquiriesError: 'Contact inquiries could not be loaded.',

      editorTitle: 'Website editor',
      editorText:
        'Open the editor area to manage website content, pages and updates when editing features are available.',
      editorButton: 'Open editor',

      postsTitle: 'Posts & content',
      postsText:
        'Create and manage news, posts or content updates for your website. This feature is currently in development.',
      soon: 'Coming soon',

      designTitle: 'Design settings',
      designText:
        'Adjust colors, images and selected design elements of your website. This feature is currently in development.',

      accountTitle: 'Account overview',
      emailLabel: 'Email',
      statusLabel: 'Status',
      statusActive: 'Active',
      roleLabel: 'Access level',

      customerAreaTitle: 'Client area',
      customerAreaText:
        'Here you will later find project updates, files, requests and information about your collaboration with Bueno Web Solutions.',

      inquiriesTitle: 'Contact inquiries',
      inquiriesText: 'View and manage messages submitted through the website contact form.',
      inquiriesLoading: 'Contact inquiries are being loaded ...',
      inquiriesEmpty: 'No contact inquiries yet.',
      inquiryEmail: 'Email',
      inquirySubject: 'Subject',
      inquiryMessage: 'Message',
      inquiryCreated: 'Created',

      actionsTitle: 'Account actions',
      actionsText: 'Log out safely from your account.',
      logout: 'Logout',

      usersTitle: 'User management',
      usersText: 'View registered users, manage roles and keep admin access under control.',
      usersLoading: 'Users are being loaded ...',
      usersEmpty: 'No users found.',
      usersError: 'Users could not be loaded.',
      userFirstName: 'First name',
      userLastName: 'Last name',
      userCreated: 'Created',

      usersOpenButton: 'Open user management',
      inquiriesOpenButton: 'Open inquiries',

      makeAdmin: 'Make admin',
      makeUser: 'Make user',
      deleteUser: 'Delete user',
      deleteWarning: 'This action can permanently remove the user account.',
      deleteStepTwo: 'I understand, continue',
      deleteConfirm: 'Confirm delete',
      cancel: 'Cancel',
      roleUpdateError: 'Role could not be updated.',
      deleteUserError: 'User could not be deleted.',
      roleUpdatedSuccess: 'Role updated successfully.',
      userDeletedSuccess: 'User deleted successfully.',

      editUser: 'Edit',
      saveUser: 'Save',
      userProfileUpdateError: 'User profile could not be updated.',
      userProfileUpdatedSuccess: 'User profile updated successfully.',
      deleteInquiry: 'Delete inquiry',
      deleteInquiryWarning: 'This action can permanently remove the inquiry.',
      deleteInquiryError: 'Inquiry could not be deleted.',
      inquiryDeletedSuccess: 'Inquiry deleted successfully.',
    },
    footer: {
      copyright: '© 2026 Bueno Web Solutions. All rights reserved.',
      socials: 'Socials',
    },
    editorPage: {
      back: 'Back',
      title: 'Personal Area',
      subtitle: 'Post Editor',
      areaTitle: 'Editor area',
    },
  },

  de: {
    nav: {
      home: 'Home',
      about: 'Über uns',
      services: 'Services',
      contact: 'Kontakt',
      personalArea: 'Persönlicher Bereich',
      login: 'Login',
      logout: 'Logout',
      language: 'Sprache',
    },
    home: {
      brand: 'Bueno Web Solutions',
      heroTitle: 'Websites, Backend-Systeme und AI-Automatisierung für wachsende Unternehmen.',
      heroText:
        'Wir helfen kleinen und mittelgrossen Unternehmen dabei, professionell online aufzutreten, Kundenkommunikation zu automatisieren und ihre Website zu einem echten Werkzeug fürs Geschäft zu machen.',
      requestProject: 'Projekt anfragen',
      moreAboutUs: 'Mehr über uns',

      modernTitle: 'Professioneller Auftritt',
      modernText:
        'Wir entwickeln moderne Websites, die Ihr Unternehmen vertrauenswürdig, klar und hochwertig präsentieren.',

      customTitle: 'Passend zu Ihrem Betrieb',
      customText:
        'Jede Website und jede Automatisierung wird an Ihre Dienstleistungen, Kunden und Arbeitsabläufe angepasst.',

      reliableTitle: 'Praktisch und zuverlässig',
      reliableText:
        'Wir bauen Lösungen, die im echten Geschäftsalltag funktionieren — nicht nur Designs, die gut aussehen.',

      servicesLabel: 'Leistungen',
      servicesTitle: 'Was wir für Sie bauen können',
      servicesText:
        'Von neuen Websites über Backend-Systeme bis zu AI-gestützten Antworten entwickeln wir digitale Lösungen, die Zeit sparen und Ihr Unternehmen stärken.',

      benefitsLabel: 'Vorteile',
      benefitsTitle: 'Warum BuenoWS?',

      targetGroupsLabel: 'Zielgruppen',
      targetGroupsTitle: 'Wem wir helfen',

      technologiesLabel: 'Technologien',
      technologiesTitle: 'Gebaut auf einer starken technischen Grundlage',
      technologiesText:
        'Wir nutzen moderne Technologien, damit Websites und Systeme stabil, erweiterbar und gut wartbar bleiben.',

      contactLabel: 'Kontakt',
      ctaTitle: 'Bereit, Ihre Website zu verbessern oder Kundenkommunikation zu automatisieren?',
      ctaText:
        'Schreiben Sie uns, was Sie brauchen. Wir schauen Ihre Situation an und schlagen eine passende Lösung für Ihr Unternehmen vor.',
      contactNow: 'Kontakt aufnehmen',

      services: {
        createWebsites: {
          title: 'Neue Websites',
          text: 'Wir erstellen moderne Websites, die Ihre Leistungen klar zeigen, Vertrauen aufbauen und Kunden zur Kontaktaufnahme bringen.',
        },
        renewWebsites: {
          title: 'Website erneuern',
          text: 'Wir modernisieren veraltete Websites, damit sie besser aussehen, schneller funktionieren und Ihr Unternehmen professionell vertreten.',
        },
        backend: {
          title: 'Backend-Systeme',
          text: 'Wir entwickeln die technische Logik hinter Ihrer Website, zum Beispiel Logins, Datenbanken, Admin-Bereiche und individuelle Funktionen.',
        },
        automations: {
          title: 'Automatisierung',
          text: 'Wir automatisieren wiederkehrende Aufgaben, damit Sie Zeit sparen und sich stärker auf Ihre Kunden und Arbeit konzentrieren können.',
        },
        aiSolutions: {
          title: 'AI E-Mail-Replier',
          text: 'Wir entwickeln AI-gestützte Antwortsysteme, mit denen Unternehmen Kundenanfragen schneller und einheitlicher beantworten können.',
        },
        hosting: {
          title: 'Hosting & Support',
          text: 'Nach dem Start unterstützen wir Ihr Projekt mit Hosting, Updates, Wartung und weiteren Verbesserungen.',
        },
      },

      benefits: [
        'Professionelle Websites statt generische Baukasten-Lösungen',
        'Digitale Lösungen passend zu echten Geschäftsprozessen',
        'AI-Automatisierung, die Zeit in der Kundenkommunikation sparen kann',
        'Moderne Backend-Systeme für seriöse und erweiterbare Projekte',
      ],

      targetGroups: [
        'Handwerksbetriebe wie Dachdecker, Maler und Elektriker',
        'Kleine und mittelgrosse lokale Unternehmen',
        'Dienstleister, die online professioneller auftreten möchten',
        'Unternehmen, die Kundenkommunikation automatisieren wollen',
      ],
    },
    about: {
      label: 'Über uns',
      heroTitle: 'Wir entwickeln digitale Lösungen, die kleinen Unternehmen wirklich helfen.',
      heroText:
        'Wir sind zwei Entwickler aus Luzern und bauen Websites, Backend-Systeme und Automatisierungen, die echte Probleme im Geschäftsalltag lösen.',

      whoWeAreTitle: 'Wer wir sind',
      whoWeAreText1:
        'Wir sind Liam Bruno und Benjamin Gerresheim, beide 18 Jahre alt und besuchen aktuell die Informatik Mittelschule (IMS) in Luzern.',
      whoWeAreText2:
        'Neben der Schule bauen wir Bueno Web Solutions auf, um echte Projekte umzusetzen, mit Unternehmen zu arbeiten und praktische Erfahrung zu sammeln.',

      whyTitle: 'Warum wir gestartet haben',
      whyText1:
        'Wir haben gesehen, dass viele kleinere Unternehmen veraltete Websites haben oder keine funktionierenden digitalen Systeme nutzen.',
      whyText2:
        'Gleichzeitig wollten wir selbst etwas aufbauen – nicht nur Theorie lernen, sondern echte Lösungen entwickeln und ein eigenes Business starten.',

      targetTitle: 'Für wen wir arbeiten',
      targetText:
        'Wir arbeiten vor allem mit kleinen und mittleren Unternehmen, Handwerksbetrieben, lokalen Firmen und Startups, die online professioneller auftreten und ihre Abläufe verbessern möchten.',

      differenceTitle: 'Was uns unterscheidet',
      differenceText1:
        'Wir arbeiten direkt, persönlich und ohne unnötige Umwege. Sie sprechen direkt mit uns – ohne Agentur-Strukturen oder komplizierte Prozesse.',
      differenceText2:
        'Unser Fokus liegt nicht nur auf Design, sondern auf Lösungen, die im Alltag wirklich helfen: mehr Anfragen, weniger Aufwand und klarere Prozesse.',

      howWeWorkTitle: 'Wie wir arbeiten',
      howWeWorkText1:
        'Wir halten alles einfach und transparent. Die Kommunikation läuft direkt, oft per Chat oder Call, und Sie bleiben immer auf dem aktuellen Stand.',
      howWeWorkText2:
        'Unser Ziel ist es, Ihr Unternehmen zuerst zu verstehen und dann eine Lösung zu bauen, die wirklich passt.',

      futureTitle: 'Woran wir arbeiten',
      futureText1:
        'Aktuell bauen wir unser Angebot mit AI-gestützten Lösungen aus, wie automatische E-Mail-Antworten, intelligente Kundenkommunikation und Automatisierungen.',
      futureText2:
        'Langfristig wollen wir Systeme entwickeln, die Unternehmen Zeit sparen, manuelle Arbeit reduzieren und Abläufe effizienter machen.',
    },
    servicesPage: {
      label: 'Services',
      heroTitle:
        'Websites, Automatisierung und AI-Lösungen, die Ihrem Unternehmen wirklich helfen.',
      heroText:
        'Wir entwickeln Websites und Systeme, die mehr machen als gut aussehen — sie bringen Kunden, sparen Zeit und verbessern Ihren Arbeitsalltag.',

      coreLabel: 'Leistungen',
      coreTitle: 'Was wir für Unternehmen bauen',
      coreText:
        'Unser Fokus liegt auf praktischen Lösungen: Websites, die Kunden bringen, Systeme, die funktionieren und Automatisierungen, die Arbeit abnehmen.',

      upcomingLabel: 'In Entwicklung',
      upcomingTitle: 'Was als Nächstes kommt',
      upcomingText:
        'Wir entwickeln aktuell weitere AI-Lösungen, die Kundenkommunikation verbessern und repetitive Aufgaben automatisieren.',

      targetGroupsLabel: 'Zielgruppen',
      targetGroupsTitle: 'Für wen das gedacht ist',

      collaborationLabel: 'Ablauf',
      collaborationTitle: 'Einfacher und klarer Prozess',

      step1Title: '1. Betrieb verstehen',
      step1Text:
        'Wir schauen uns an, wie Ihr Unternehmen aktuell arbeitet und wo Zeit oder Kunden verloren gehen.',

      step2Title: '2. Lösung planen',
      step2Text: 'Wir definieren genau, was Ihre Website oder Ihr System leisten soll.',

      step3Title: '3. Umsetzen',
      step3Text:
        'Wir entwickeln Ihre Website oder Automatisierung sauber und halten Sie auf dem Laufenden.',

      step4Title: '4. Weiterentwickeln',
      step4Text: 'Nach dem Start kann alles Schritt für Schritt erweitert werden.',

      contactLabel: 'Kontakt',
      ctaTitle: 'Möchten Sie eine Website oder ein System, das wirklich hilft?',
      ctaText: 'Schreiben Sie uns kurz und wir sagen Ihnen, was für Ihre Situation sinnvoll ist.',
      ctaButton: 'Projekt anfragen',

      coreServices: [
        {
          title: 'Websites die Kunden bringen',
          text: 'Wir erstellen Websites, die Ihre Leistungen klar zeigen und Besucher zu echten Anfragen machen.',
        },
        {
          title: 'Website erneuern',
          text: 'Veraltete Website? Wir modernisieren sie, damit sie schnell lädt und sofort Vertrauen schafft.',
        },
        {
          title: 'Backend & Systeme',
          text: 'Wir bauen Adminbereiche, Login-Systeme und Datenbanken, damit Ihre Website ein echtes Werkzeug wird.',
        },
        {
          title: 'AI E-Mail-Automation',
          text: 'Wir entwickeln AI-Systeme, die automatisch auf Kundenanfragen antworten.',
        },
        {
          title: 'Prozess-Automatisierung',
          text: 'Wir automatisieren Abläufe wie Anfragen oder E-Mails, damit Sie täglich Zeit sparen.',
        },
        {
          title: 'Hosting & Support',
          text: 'Wir kümmern uns nach dem Launch um Ihre Website, damit alles stabil und sicher läuft.',
        },
      ],

      upcomingServices: [
        'AI Telefonassistent für Unternehmen',
        'AI Chatbot für Websites',
        'Automatisierte Verkaufs- und Leadsysteme',
      ],

      targetGroups: [
        'Handwerksbetriebe (Dachdecker, Elektriker etc.)',
        'Lokale Unternehmen',
        'Dienstleister',
        'Unternehmen mit vielen Kundenanfragen',
      ],
    },
    contactPage: {
      label: 'Kontakt',
      heroTitle: 'Erzählen Sie uns, was Sie bauen oder verbessern möchten.',
      heroText:
        'Ob neue Website, Redesign, Backend-Funktionen oder AI-Automatisierung — schreiben Sie uns kurz und wir schauen, welche Lösung für Ihr Unternehmen sinnvoll ist.',

      directContactTitle: 'Direkter Kontakt',

      phoneTitle: 'Telefon',
      phoneTime: 'Mo – Fr, 09:00 bis 18:00 Uhr',

      emailTitle: 'E-Mail',
      emailText: 'Schreiben Sie uns Ihre Idee, Ihr Problem oder Ihre aktuelle Situation.',

      writeUsTitle: 'Was Sie schreiben können',
      writeUsText:
        'Sagen Sie uns kurz, was Ihr Unternehmen macht, was Sie brauchen und wie Ihre aktuelle Website oder Ihr aktueller Ablauf aussieht. Eine kurze Beschreibung reicht für den Start.',

      formTitle: 'Projekt anfragen',
      emailLabel: 'Ihre E-Mail',
      emailPlaceholder: 'name{\'@\'}firma.ch',
      subjectLabel: 'Was brauchen Sie?',
      subjectPlaceholder: 'Neue Website, Redesign, AI E-Mail-Replier ...',
      messageLabel: 'Ihre Nachricht',
      messagePlaceholder:
        'Beschreiben Sie kurz Ihr Unternehmen, Ihr Ziel und was wir für Sie bauen oder verbessern sollen ...',

      fillAllFields: 'Bitte alle Felder ausfüllen.',
      sending: 'Wird gesendet ...',
      sendButton: 'Anfrage senden',
      successDefault: 'Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.',
      errorDefault: 'Beim Senden Ihrer Nachricht ist etwas schiefgelaufen.',
    },
    authPage: {
      loginTitle: 'In Ihr Konto einloggen',
      registerTitle: 'BuenoWS-Konto erstellen',

      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'name{\'@\'}firma.ch',

      passwordLabel: 'Passwort',
      passwordPlaceholder: '••••••••',
      forgotPassword: 'Passwort vergessen?',

      signIn: 'Einloggen',
      register: 'Konto erstellen',
      loading: 'Bitte warten...',

      noAccount: 'Noch kein Konto?',
      haveAccount: 'Bereits ein Konto?',
      createOne: 'Konto erstellen',
      signInLink: 'Einloggen',

      enterEmailPassword: 'Bitte E-Mail und Passwort eingeben.',
      loginFailedNoJwt: 'Login fehlgeschlagen. Kein Zugriffstoken erhalten.',
      connectionFailed: 'Verbindung zum Server fehlgeschlagen.',

      firstNameLabel: 'Vorname',
      firstNamePlaceholder: 'Max',
      lastNameLabel: 'Nachname',
      lastNamePlaceholder: 'Muster',
      enterFullName: 'Bitte Vorname und Nachname eingeben.',
      registerFailedNoJwt: 'Registrierung fehlgeschlagen. Kein Zugriffstoken erhalten.',
    },
    accountPage: {
      title: 'Dashboard',
      subtitle: 'Verwalten Sie Website, Konto und Projektfunktionen an einem Ort.',

      loadingTitle: 'Laden',
      loadingText: 'Ihre Kontodaten werden geladen ...',

      errorTitle: 'Fehler',
      sessionError: 'Ihre Sitzung konnte nicht bestätigt werden.',
      noJwt: 'Kein Login-Token gefunden.',
      profileError: 'Ihr Profil konnte nicht geladen werden.',
      inquiriesError: 'Kontaktanfragen konnten nicht geladen werden.',

      editorTitle: 'Website-Editor',
      editorText:
        'Öffnen Sie den Editorbereich, um Inhalte, Seiten und Aktualisierungen Ihrer Website zu verwalten, sobald die Bearbeitungsfunktionen verfügbar sind.',
      editorButton: 'Editor öffnen',

      postsTitle: 'Beiträge & Inhalte',
      postsText:
        'Erstellen und verwalten Sie später News, Beiträge oder Inhaltsupdates für Ihre Website. Diese Funktion ist aktuell in Entwicklung.',
      soon: 'Bald verfügbar',

      designTitle: 'Design-Einstellungen',
      designText:
        'Passen Sie später Farben, Bilder und ausgewählte Designbereiche Ihrer Website an. Diese Funktion ist aktuell in Entwicklung.',

      accountTitle: 'Kontoübersicht',
      emailLabel: 'E-Mail',
      statusLabel: 'Status',
      statusActive: 'Aktiv',
      roleLabel: 'Zugriffsstufe',

      customerAreaTitle: 'Kundenbereich',
      customerAreaText:
        'Hier finden Sie später Projektstände, Dateien, Anfragen und Informationen zur Zusammenarbeit mit Bueno Web Solutions.',

      inquiriesTitle: 'Kontaktanfragen',
      inquiriesText: 'Nachrichten aus dem Kontaktformular ansehen und verwalten.',
      inquiriesLoading: 'Kontaktanfragen werden geladen ...',
      inquiriesEmpty: 'Noch keine Kontaktanfragen vorhanden.',
      inquiryEmail: 'E-Mail',
      inquirySubject: 'Anliegen',
      inquiryMessage: 'Nachricht',
      inquiryCreated: 'Erstellt',

      actionsTitle: 'Konto-Aktionen',
      actionsText: 'Melden Sie sich sicher von Ihrem Konto ab.',
      logout: 'Logout',

      usersTitle: 'Benutzerverwaltung',
      usersText: 'Registrierte Benutzer ansehen, Rollen verwalten und Admin-Zugriff kontrollieren.',
      usersLoading: 'Benutzer werden geladen ...',
      usersEmpty: 'Keine Benutzer gefunden.',
      usersError: 'Benutzer konnten nicht geladen werden.',
      userFirstName: 'Vorname',
      userLastName: 'Nachname',
      userCreated: 'Erstellt',

      usersOpenButton: 'Benutzerverwaltung öffnen',
      inquiriesOpenButton: 'Anfragen öffnen',

      makeAdmin: 'Zu Admin machen',
      makeUser: 'Zu User machen',
      deleteUser: 'Benutzer löschen',
      deleteWarning: 'Diese Aktion kann das Benutzerkonto dauerhaft löschen.',
      deleteStepTwo: 'Ich verstehe, weiter',
      deleteConfirm: 'Löschen bestätigen',
      cancel: 'Abbrechen',
      roleUpdateError: 'Rolle konnte nicht geändert werden.',
      deleteUserError: 'Benutzer konnte nicht gelöscht werden.',
      roleUpdatedSuccess: 'Rolle erfolgreich geändert.',
      userDeletedSuccess: 'Benutzer erfolgreich gelöscht.',

      editUser: 'Bearbeiten',
      saveUser: 'Speichern',
      userProfileUpdateError: 'Benutzerprofil konnte nicht geändert werden.',
      userProfileUpdatedSuccess: 'Benutzerprofil erfolgreich geändert.',
      deleteInquiry: 'Anfrage löschen',
      deleteInquiryWarning: 'Diese Aktion kann die Anfrage dauerhaft löschen.',
      deleteInquiryError: 'Anfrage konnte nicht gelöscht werden.',
      inquiryDeletedSuccess: 'Anfrage erfolgreich gelöscht.',
    },
    footer: {
      copyright: '© 2026 Bueno Web Solutions. Alle Rechte vorbehalten.',
      socials: 'Socials',
    },
    editorPage: {
      back: 'Zurück',
      title: 'Personal Area',
      subtitle: 'Post Editor',
      areaTitle: 'Editorbereich',
    },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages,
})

export default i18n
