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
      heroTitle: 'Modern websites, smart automations and digital solutions for businesses.',
      heroText:
        'We build professional websites, strong backend solutions and digital features that not only look good, but also create real value in daily business.',
      requestProject: 'Request a project',
      moreAboutUs: 'More about us',

      modernTitle: 'Modern',
      modernText: 'We use modern technologies and clear structures for a strong digital presence.',

      customTitle: 'Custom',
      customText: 'Every solution is tailored to your business, your goals and your requirements.',

      reliableTitle: 'Reliable',
      reliableText:
        'From idea to implementation, we support projects directly, transparently and cleanly.',

      servicesLabel: 'Services',
      servicesTitle: 'Our services',
      servicesText:
        'We combine design, technology and practical functions into solutions that support companies professionally.',

      benefitsLabel: 'Benefits',
      benefitsTitle: 'Why BuenoWS?',

      targetGroupsLabel: 'Target groups',
      targetGroupsTitle: 'Who we work for',

      technologiesLabel: 'Technologies',
      technologiesTitle: 'Technical foundation for strong solutions',
      technologiesText:
        'We work with modern technologies so your website remains reliable, maintainable and future-proof.',

      contactLabel: 'Contact',
      ctaTitle: 'Are you planning a project or want to improve your web presence?',
      ctaText:
        'Write to us and let us discuss together what your website or digital solution could look like.',
      contactNow: 'Get in touch now',

      services: {
        createWebsites: {
          title: 'Build websites',
          text: 'We develop modern and professional websites that fit your business and build trust.',
        },
        renewWebsites: {
          title: 'Modernize websites',
          text: 'We modernize existing websites technically, visually and structurally so your presence feels up to date again.',
        },
        backend: {
          title: 'Backend & logic',
          text: 'From login systems to database integrations, we develop the technical foundation for powerful web solutions.',
        },
        automations: {
          title: 'Automations',
          text: 'We build digital workflows that save time, simplify processes and automate recurring tasks.',
        },
        aiSolutions: {
          title: 'AI solutions',
          text: 'From automatic replies to intelligent customer support, we create modern AI-powered features.',
        },
        hosting: {
          title: 'Hosting & further development',
          text: 'We also support projects after launch with hosting, maintenance and technical improvements.',
        },
      },

      benefits: [
        'Individual solutions instead of website builders',
        'Modern technologies for stable and scalable systems',
        'Clear communication and clean execution',
        'Websites and features with real practical value',
      ],

      targetGroups: [
        'Small and medium-sized businesses',
        'Craft businesses and local companies',
        'Service providers with a modern online presence',
        'Companies with automation needs',
      ],
    },
    about: {
      label: 'About us',
      heroTitle: 'We build modern websites and digital solutions with real practical value.',
      heroText:
        'Bueno Web Solutions helps companies build a professional online presence, simplify processes and use digital solutions that truly help in day-to-day work.',

      whoWeAreTitle: 'Who we are',
      whoWeAreText1:
        'We are a modern web development team focused on clear design, clean technical solutions and digital tools that genuinely move businesses forward.',
      whoWeAreText2:
        'Our goal is not just a nice-looking website, but a solution that looks professional, works reliably and can grow together with your business.',

      howWeWorkTitle: 'How we work',
      howWeWorkText1:
        'We combine modern frontend, stable backend and practical automations into solutions that not only look good, but also create real value in daily work.',
      howWeWorkText2:
        'We focus on clear communication, clean execution and a result that stays understandable, maintainable and future-proof.',

      valuesTitle: 'What we stand for',

      qualityTitle: 'Quality',
      qualityText:
        'We focus on clean execution, clear structures and solutions that work reliably in the long term.',

      practicalTitle: 'Practical value',
      practicalText:
        'Our websites and systems should not only look modern, but also help in real everyday work.',

      reliabilityTitle: 'Reliability',
      reliabilityText:
        'From planning to implementation, we work transparently, directly and dependably.',

      growthTitle: 'Further development',
      growthText:
        'We do not only think about today, but about solutions that can keep up with future requirements.',
    },
    servicesPage: {
      label: 'Services',
      heroTitle: 'Digital solutions for websites, automation and modern customer communication.',
      heroText:
        'We build professional websites, technical features and smart automations that reduce workload and strengthen companies online.',

      coreLabel: 'Services',
      coreTitle: 'What we currently offer for businesses',
      coreText:
        'Our focus is on modern web solutions, clear technical implementation and features that not only look good, but also bring real practical value.',

      upcomingLabel: 'In development',
      upcomingTitle: 'What is coming next',
      upcomingText:
        'We are expanding our offer with additional AI-powered solutions for companies that improve customer communication, internal workflows and digital processes.',

      targetGroupsLabel: 'Target groups',
      targetGroupsTitle: 'Who our services are especially relevant for',

      collaborationLabel: 'Collaboration',
      collaborationTitle: 'How we work with clients',

      step1Title: '1. Understand needs',
      step1Text:
        'We first look together at what your business really needs and which solution makes sense.',

      step2Title: '2. Plan the solution',
      step2Text: 'Then we define the structure, features and technical setup of your solution.',

      step3Title: '3. Implement',
      step3Text: 'We build the website, backend or automation cleanly, modernly and transparently.',

      step4Title: '4. Improve further',
      step4Text:
        'After launch, the project can be expanded, maintained and adapted to new requirements.',

      contactLabel: 'Contact',
      ctaTitle: 'Do you want to build a website, modernize it or automate processes?',
      ctaText:
        'Write to us and we will discuss together which solution makes sense for your business.',
      ctaButton: 'Request a project now',

      coreServices: [
        {
          title: 'Build websites',
          text: 'We develop modern, professional websites for businesses that want to appear clear, trustworthy and high-quality online.',
        },
        {
          title: 'Modernize websites',
          text: 'We bring existing websites up to date technically, visually and structurally so your online presence becomes convincing again.',
        },
        {
          title: 'Backend & web logic',
          text: 'We build the technical foundation behind your website – from user logins to database connections and custom features.',
        },
        {
          title: 'Automatic email replies',
          text: 'With our AI Replier, we automate recurring replies and create faster, cleaner communication with your customers.',
        },
        {
          title: 'Hosting & further development',
          text: 'Even after launch, we support your project with hosting, maintenance, extensions and technical improvements.',
        },
        {
          title: 'Client areas & content features',
          text: 'We build websites so clients can later manage their own content, posts and updates themselves.',
        },
      ],

      upcomingServices: [
        'AI phone assistant for businesses',
        'AI chatbot for company websites',
        'AI sales automations for digital customer processes',
      ],

      targetGroups: [
        'Small and medium-sized businesses',
        'Craft businesses and local companies',
        'Service providers with a modern web presence',
        'Companies with automation needs',
      ],
    },
    contactPage: {
      label: 'Contact',
      heroTitle: 'Let’s talk about your project.',
      heroText:
        'Whether it is a new website, modernization, backend solution or digital automation — send us a short message about your needs and we will get back to you.',

      directContactTitle: 'Direct contact',

      phoneTitle: 'Phone',
      phoneTime: 'Mon – Fri, 09:00 to 18:00',

      emailTitle: 'Email',
      emailText: 'We reply as quickly as possible.',

      writeUsTitle: 'What you can write to us',
      writeUsText:
        'Briefly describe your project, your current situation or your goal. The clearer your request is, the better we can support you.',

      formTitle: 'Send message',
      emailLabel: 'Email',
      emailPlaceholder: 'your@mail.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'New website, support, automation ...',
      messageLabel: 'Description',
      messagePlaceholder: 'Briefly describe your project or your request ...',

      fillAllFields: 'Please fill in all fields.',
      sending: 'Sending ...',
      sendButton: 'Send message',
      successDefault: 'Message sent successfully.',
      errorDefault: 'An error occurred while sending the message.',
    },
    authPage: {
      loginTitle: 'Welcome back',
      registerTitle: 'Welcome to BuenoWS',

      emailLabel: 'Email address',
      emailPlaceholder: 'name@company.com',

      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      forgotPassword: 'Forgot password?',

      signIn: 'Sign In',
      register: 'Register',
      loading: 'Loading...',

      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      createOne: 'Create one',
      signInLink: 'Sign In',

      enterEmailPassword: 'Please enter email and password.',
      loginFailedNoJwt: 'Login failed: No JWT received from server.',
      registerSuccess: 'Registration successful! Please login.',
      connectionFailed: 'Connection to server failed.',
    },
    accountPage: {
      title: 'Personal Area',
      subtitle: 'Manage content, posts and settings for your website here.',

      loadingTitle: 'Loading',
      loadingText: 'User data is being loaded ...',

      errorTitle: 'Error',
      sessionError: 'Session could not be confirmed.',
      noJwt: 'No JWT found.',
      profileError: 'User profile could not be loaded.',
      inquiriesError: 'Contact inquiries could not be loaded.',

      editorTitle: 'Edit website',
      editorText:
        'Later you will be able to edit texts, sections, services and website content directly in this area.',
      editorButton: 'Open editor',

      postsTitle: 'Manage posts',
      postsText:
        'Here you will later be able to create, save and publish your own posts and content for your website.',
      soon: 'Coming soon',

      designTitle: 'Adjust design',
      designText:
        'Colors, images, layouts and individual website sections can later be customized here.',

      accountTitle: 'Account',
      emailLabel: 'Email',
      statusLabel: 'Status',
      statusActive: 'Logged in',
      roleLabel: 'Role',

      customerAreaTitle: 'Client area',
      customerAreaText:
        'Welcome to your client area. Here you will later see your inquiries, project progress, files and further information about your collaboration with Bueno Web Solutions.',

      inquiriesTitle: 'Contact inquiries',
      inquiriesText: 'Here you can see incoming messages from the contact form.',
      inquiriesLoading: 'Contact inquiries are being loaded ...',
      inquiriesEmpty: 'No contact inquiries yet.',
      inquiryEmail: 'Email',
      inquirySubject: 'Subject',
      inquiryMessage: 'Message',
      inquiryCreated: 'Created',

      actionsTitle: 'Account actions',
      actionsText:
        'Here you can safely log out. Additional account settings can be added here later.',
      logout: 'Logout',
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
      heroTitle:
        'Moderne Websites, smarte Automatisierungen und digitale Lösungen für Unternehmen.',
      heroText:
        'Wir entwickeln professionelle Webauftritte, starke Backend-Lösungen und digitale Funktionen, die nicht nur gut aussehen, sondern im Alltag echten Mehrwert schaffen.',
      requestProject: 'Projekt anfragen',
      moreAboutUs: 'Mehr über uns',

      modernTitle: 'Modern',
      modernText:
        'Wir setzen auf zeitgemässe Technologien und klare Strukturen für einen starken digitalen Auftritt.',

      customTitle: 'Individuell',
      customText:
        'Jede Lösung wird an Ihr Unternehmen, Ihre Ziele und Ihre Anforderungen angepasst.',

      reliableTitle: 'Zuverlässig',
      reliableText:
        'Von der Idee bis zur Umsetzung begleiten wir Projekte direkt, transparent und sauber.',

      servicesLabel: 'Leistungen',
      servicesTitle: 'Unsere Dienstleistungen',
      servicesText:
        'Wir verbinden Design, Technik und praktische Funktionen zu Lösungen, die Unternehmen professionell unterstützen.',

      benefitsLabel: 'Vorteile',
      benefitsTitle: 'Warum BuenoWS?',

      targetGroupsLabel: 'Zielgruppen',
      targetGroupsTitle: 'Für wen wir arbeiten',

      technologiesLabel: 'Technologien',
      technologiesTitle: 'Technische Grundlage für starke Lösungen',
      technologiesText:
        'Wir arbeiten mit modernen Technologien, damit Ihre Website zuverlässig, wartbar und zukunftssicher bleibt.',

      contactLabel: 'Kontakt',
      ctaTitle: 'Sie planen ein Projekt oder möchten Ihren Webauftritt verbessern?',
      ctaText:
        'Schreiben Sie uns und lassen Sie uns gemeinsam besprechen, wie Ihre Website oder digitale Lösung aussehen kann.',
      contactNow: 'Jetzt Kontakt aufnehmen',

      services: {
        createWebsites: {
          title: 'Websites erstellen',
          text: 'Wir entwickeln moderne und professionelle Websites, die zu Ihrem Unternehmen passen und Vertrauen aufbauen.',
        },
        renewWebsites: {
          title: 'Websites erneuern',
          text: 'Bestehende Auftritte modernisieren wir technisch, optisch und strukturell, damit Ihre Website wieder zeitgemäss wirkt.',
        },
        backend: {
          title: 'Backend & Logik',
          text: 'Von Login-Systemen bis zu Datenbank-Anbindungen entwickeln wir die technische Grundlage für leistungsstarke Weblösungen.',
        },
        automations: {
          title: 'Automatisierungen',
          text: 'Wir bauen digitale Abläufe, die Zeit sparen, Prozesse vereinfachen und wiederkehrende Aufgaben automatisieren.',
        },
        aiSolutions: {
          title: 'AI-Lösungen',
          text: 'Ob automatische Antworten oder intelligente Unterstützung im Kundenkontakt – wir entwickeln moderne AI-gestützte Funktionen.',
        },
        hosting: {
          title: 'Hosting & Weiterentwicklung',
          text: 'Wir begleiten Projekte auch nach dem Launch mit Hosting, Wartung und technischer Weiterentwicklung.',
        },
      },

      benefits: [
        'Individuelle Lösungen statt Baukastensysteme',
        'Moderne Technologien für stabile und skalierbare Systeme',
        'Klare Kommunikation und saubere Umsetzung',
        'Websites und Funktionen mit echtem Nutzen im Alltag',
      ],

      targetGroups: [
        'Kleine und mittlere Unternehmen',
        'Handwerksbetriebe und lokale Firmen',
        'Dienstleister mit modernem Online-Auftritt',
        'Unternehmen mit Bedarf an Automatisierung',
      ],
    },
    about: {
      label: 'Über uns',
      heroTitle: 'Wir entwickeln moderne Websites und digitale Lösungen mit echtem Nutzen.',
      heroText:
        'Bueno Web Solutions unterstützt Unternehmen dabei, professionell online aufzutreten, Prozesse zu vereinfachen und digitale Lösungen einzusetzen, die im Alltag wirklich helfen.',

      whoWeAreTitle: 'Wer wir sind',
      whoWeAreText1:
        'Wir sind ein modernes Webdevelopment-Team mit Fokus auf klare Designs, saubere technische Lösungen und digitale Werkzeuge, die Unternehmen wirklich weiterbringen.',
      whoWeAreText2:
        'Unser Ziel ist nicht einfach nur eine schöne Website, sondern eine Lösung, die professionell aussieht, zuverlässig funktioniert und mit Ihrem Unternehmen mitwachsen kann.',

      howWeWorkTitle: 'Wie wir arbeiten',
      howWeWorkText1:
        'Wir verbinden modernes Frontend, stabiles Backend und praxisnahe Automatisierungen zu Lösungen, die nicht nur gut aussehen, sondern im Alltag echten Mehrwert schaffen.',
      howWeWorkText2:
        'Dabei legen wir Wert auf klare Kommunikation, saubere Umsetzung und ein Ergebnis, das verständlich, wartbar und zukunftssicher bleibt.',

      valuesTitle: 'Wofür wir stehen',

      qualityTitle: 'Qualität',
      qualityText:
        'Wir setzen auf saubere Umsetzung, klare Strukturen und Lösungen, die langfristig funktionieren.',

      practicalTitle: 'Praxisnähe',
      practicalText:
        'Unsere Websites und Systeme sollen nicht nur modern aussehen, sondern im echten Arbeitsalltag helfen.',

      reliabilityTitle: 'Zuverlässigkeit',
      reliabilityText:
        'Von der Planung bis zur Umsetzung arbeiten wir transparent, direkt und verbindlich.',

      growthTitle: 'Weiterentwicklung',
      growthText:
        'Wir denken nicht nur an heute, sondern an Lösungen, die mit zukünftigen Anforderungen mithalten können.',
    },
    servicesPage: {
      label: 'Services',
      heroTitle: 'Digitale Lösungen für Websites, Automatisierung und moderne Kundenkommunikation.',
      heroText:
        'Wir entwickeln professionelle Websites, technische Funktionen und smarte Automatisierungen, die Unternehmen im Alltag entlasten und online stärker machen.',

      coreLabel: 'Leistungen',
      coreTitle: 'Was wir heute für Unternehmen anbieten',
      coreText:
        'Unser Fokus liegt auf modernen Weblösungen, klarer technischer Umsetzung und Funktionen, die nicht nur gut aussehen, sondern im Alltag echten Nutzen bringen.',

      upcomingLabel: 'Im Ausbau',
      upcomingTitle: 'Was als Nächstes kommt',
      upcomingText:
        'Wir erweitern unser Angebot gezielt um weitere AI-gestützte Lösungen für Unternehmen, die Kundenkommunikation, interne Abläufe und digitale Prozesse weiter verbessern.',

      targetGroupsLabel: 'Zielgruppen',
      targetGroupsTitle: 'Für wen unsere Leistungen besonders interessant sind',

      collaborationLabel: 'Zusammenarbeit',
      collaborationTitle: 'Wie wir mit Kunden arbeiten',

      step1Title: '1. Bedarf verstehen',
      step1Text:
        'Wir schauen gemeinsam, was Ihr Unternehmen wirklich braucht und welche Lösung sinnvoll ist.',

      step2Title: '2. Lösung planen',
      step2Text:
        'Danach definieren wir Struktur, Funktionen und den technischen Aufbau Ihrer Lösung.',

      step3Title: '3. Umsetzen',
      step3Text:
        'Wir entwickeln Website, Backend oder Automatisierung sauber, modern und nachvollziehbar.',

      step4Title: '4. Weiterentwickeln',
      step4Text:
        'Nach dem Start kann das Projekt erweitert, gepflegt und an neue Anforderungen angepasst werden.',

      contactLabel: 'Kontakt',
      ctaTitle: 'Sie möchten eine Website erstellen, modernisieren oder Prozesse automatisieren?',
      ctaText:
        'Schreiben Sie uns und wir besprechen gemeinsam, welche Lösung für Ihr Unternehmen sinnvoll ist.',
      ctaButton: 'Jetzt Projekt anfragen',

      coreServices: [
        {
          title: 'Websites erstellen',
          text: 'Wir entwickeln moderne, professionelle Websites für Unternehmen, die online klar, vertrauenswürdig und hochwertig auftreten möchten.',
        },
        {
          title: 'Websites modernisieren',
          text: 'Bestehende Websites bringen wir technisch, optisch und strukturell auf einen modernen Stand, damit Ihr Auftritt wieder überzeugt.',
        },
        {
          title: 'Backend & Web-Logik',
          text: 'Wir entwickeln die technische Grundlage hinter Ihrer Website – von Benutzerlogins bis zu Datenbank-Anbindungen und individuellen Funktionen.',
        },
        {
          title: 'Automatische E-Mail-Antworten',
          text: 'Mit unserem AI Replier automatisieren wir wiederkehrende Antworten und schaffen schnellere, sauberere Kommunikation mit Ihren Kunden.',
        },
        {
          title: 'Hosting & Weiterentwicklung',
          text: 'Auch nach dem Launch begleiten wir Ihr Projekt mit Hosting, Wartung, Erweiterungen und technischer Weiterentwicklung.',
        },
        {
          title: 'Kundenbereiche & Content-Funktionen',
          text: 'Wir bauen Websites so, dass Kunden später eigene Inhalte, Beiträge und Posts selbst verwalten können.',
        },
      ],

      upcomingServices: [
        'AI Telefonassistent für Unternehmen',
        'AI Chatbot für Firmenwebsites',
        'AI Sales Automationen für digitale Kundenprozesse',
      ],

      targetGroups: [
        'Kleine und mittlere Unternehmen',
        'Handwerksbetriebe und lokale Firmen',
        'Dienstleister mit modernem Webauftritt',
        'Unternehmen mit Bedarf an Automatisierung',
      ],
    },
    contactPage: {
      label: 'Kontakt',
      heroTitle: 'Lassen Sie uns über Ihr Projekt sprechen.',
      heroText:
        'Ob neue Website, Modernisierung, Backend-Lösung oder digitale Automatisierung – schreiben Sie uns kurz, worum es geht, und wir melden uns bei Ihnen.',

      directContactTitle: 'Direkter Kontakt',

      phoneTitle: 'Telefon',
      phoneTime: 'Mo – Fr, 09:00 bis 18:00 Uhr',

      emailTitle: 'E-Mail',
      emailText: 'Wir antworten so schnell wie möglich.',

      writeUsTitle: 'Was Sie uns schreiben können',
      writeUsText:
        'Beschreiben Sie kurz Ihr Vorhaben, Ihre aktuelle Situation oder Ihr Ziel. Je klarer Ihre Anfrage ist, desto besser können wir Sie unterstützen.',

      formTitle: 'Nachricht senden',
      emailLabel: 'E-Mail',
      emailPlaceholder: 'ihre@mail.de',
      subjectLabel: 'Anliegen',
      subjectPlaceholder: 'Neue Website, Support, Automatisierung ...',
      messageLabel: 'Beschreibung',
      messagePlaceholder: 'Beschreiben Sie kurz Ihr Projekt oder Ihre Anfrage ...',

      fillAllFields: 'Bitte alle Felder ausfüllen.',
      sending: 'Wird gesendet ...',
      sendButton: 'Nachricht senden',
      successDefault: 'Nachricht erfolgreich gesendet.',
      errorDefault: 'Beim Senden der Nachricht ist ein Fehler aufgetreten.',
    },
    authPage: {
      loginTitle: 'Willkommen zurück',
      registerTitle: 'Willkommen bei BuenoWS',

      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'name@firma.com',

      passwordLabel: 'Passwort',
      passwordPlaceholder: '••••••••',
      forgotPassword: 'Passwort vergessen?',

      signIn: 'Einloggen',
      register: 'Registrieren',
      loading: 'Lädt...',

      noAccount: 'Noch kein Konto?',
      haveAccount: 'Bereits ein Konto?',
      createOne: 'Eines erstellen',
      signInLink: 'Einloggen',

      enterEmailPassword: 'Bitte E-Mail und Passwort eingeben.',
      loginFailedNoJwt: 'Login fehlgeschlagen: Kein JWT vom Server erhalten.',
      registerSuccess: 'Registrierung erfolgreich! Bitte einloggen.',
      connectionFailed: 'Verbindung zum Server fehlgeschlagen.',
    },
    accountPage: {
      title: 'Personal Area',
      subtitle: 'Verwalten Sie hier Inhalte, Beiträge und Einstellungen Ihrer Website.',

      loadingTitle: 'Laden',
      loadingText: 'Benutzerdaten werden geladen ...',

      errorTitle: 'Fehler',
      sessionError: 'Sitzung konnte nicht bestätigt werden.',
      noJwt: 'Kein JWT gefunden.',
      profileError: 'Benutzerprofil konnte nicht geladen werden.',
      inquiriesError: 'Kontaktanfragen konnten nicht geladen werden.',

      editorTitle: 'Website bearbeiten',
      editorText:
        'Bearbeiten Sie später Texte, Abschnitte, Dienstleistungen und Inhalte Ihrer Website direkt in diesem Bereich.',
      editorButton: 'Editor öffnen',

      postsTitle: 'Beiträge verwalten',
      postsText:
        'Erstellen, speichern und veröffentlichen Sie hier künftig eigene Posts und Inhalte für Ihre Website.',
      soon: 'Bald verfügbar',

      designTitle: 'Design anpassen',
      designText:
        'Farben, Bilder, Layouts und einzelne Bereiche Ihrer Website können hier später individuell angepasst werden.',

      accountTitle: 'Konto',
      emailLabel: 'E-Mail',
      statusLabel: 'Status',
      statusActive: 'Aktiv eingeloggt',
      roleLabel: 'Rolle',

      customerAreaTitle: 'Kundenbereich',
      customerAreaText:
        'Willkommen in Ihrem Kundenbereich. Hier sehen Sie später Ihre Anfragen, Projektstände, Dateien und weitere Informationen zu Ihrer Zusammenarbeit mit Bueno Web Solutions.',

      inquiriesTitle: 'Kontaktanfragen',
      inquiriesText: 'Hier sehen Sie eingegangene Nachrichten aus dem Kontaktformular.',
      inquiriesLoading: 'Kontaktanfragen werden geladen ...',
      inquiriesEmpty: 'Noch keine Kontaktanfragen vorhanden.',
      inquiryEmail: 'E-Mail',
      inquirySubject: 'Anliegen',
      inquiryMessage: 'Nachricht',
      inquiryCreated: 'Erstellt',

      actionsTitle: 'Konto-Aktionen',
      actionsText:
        'Hier können Sie sich sicher abmelden. Weitere Einstellungen für Ihr Konto können später an dieser Stelle ergänzt werden.',
      logout: 'Logout',
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
