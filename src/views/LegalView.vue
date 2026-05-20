<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const provider = {
  name: 'Bueno Web Solutions',
  representatives: 'Liam und Benjamin Gerresheim',
  email: 'info.buenows@gmail.com',
  phone: '+41 77 523 88 36',
}

type Section = {
  title: string
  paragraphs?: string[]
  items?: string[]
}

const content = {
  de: {
    title: 'Rechtliches & Datenschutz',
    updated: 'Stand: Mai 2026',
    intro:
      'Diese Seite erklärt, wer hinter Bueno Web Solutions steht und wie wir personenbezogene Daten auf dieser Website und im Kundenbereich bearbeiten. Sie ersetzt keine individuellen Projektverträge oder AGB für bezahlte Kundenprojekte.',
    launchNotice:
      'Interner Launch-Hinweis: Anbieterangaben vollständig ergänzen und rechtlich prüfen lassen.',
    providerTitle: 'Anbieter und verantwortliche Stelle',
    providerRows: [
      ['Name', provider.name],
      ['Vertreten durch', provider.representatives],
      ['Adresse', '[vollständige Geschäftsadresse vor Veröffentlichung ergänzen]'],
      ['E-Mail', provider.email],
      ['Telefon', provider.phone],
      ['UID / Rechtsform', '[UID / Rechtsform ergänzen, falls vorhanden]'],
    ],
    sections: [
      {
        title: 'Worum es auf dieser Website geht',
        paragraphs: [
          'Bueno Web Solutions bietet Websites, Backend-Systeme, Admin-Bereiche, AI-Automatisierung, Hosting und Support für Unternehmen an. Über die Website können Interessenten Kontakt aufnehmen und Nutzerkonten für den Projekt- oder Administrationsbereich verwenden.',
          'Aktuell gibt es keinen Online-Shop und keinen direkten Checkout. Bezahlte Leistungen sollten deshalb über individuelle Offerten, Projektbestätigungen oder separate AGB geregelt werden.',
        ],
      },
      {
        title: 'Welche Daten wir bearbeiten',
        items: [
          'Kontaktanfragen: E-Mail-Adresse, Betreff, Nachricht und Erstellungszeitpunkt.',
          'Nutzerkonten: E-Mail-Adresse, Vorname, Nachname, Rollen/Berechtigungen, Erstellungszeitpunkt und verschlüsselte Passwörter.',
          'Authentifizierung: notwendige HttpOnly-Cookies für access_token (bis ca. 1 Stunde) und refresh_token (bis ca. 7 Tage).',
          'Passwort- und E-Mail-Bestätigung: E-Mail-Adresse, einmaliger Code, Versuche, Ablaufzeit und Sperrfristen.',
          'Sicherheit und Missbrauchsschutz: IP-Adresse aus der Anfrage oder X-Forwarded-For-Header für Rate-Limits.',
          'Spracheinstellung: die gewählte Sprache wird lokal im Browser gespeichert.',
          'Admin-Bereich: berechtigte Administratoren können Kontaktanfragen und registrierte Nutzer verwalten.',
        ],
      },
      {
        title: 'Zwecke der Bearbeitung',
        items: [
          'Beantwortung von Anfragen und Vorbereitung möglicher Projekte.',
          'Bereitstellung von Login, Konto, Admin-Bereich und Sicherheitsfunktionen.',
          'Versand von Bestätigungs- und Passwort-zurücksetzen-E-Mails.',
          'Schutz der Website vor Missbrauch, automatisierten Anfragen und unbefugtem Zugriff.',
          'Erfüllung vorvertraglicher, vertraglicher und gesetzlicher Pflichten, soweit anwendbar.',
        ],
      },
      {
        title: 'Cookies, localStorage und externe Dienste',
        items: [
          'Die Auth-Cookies sind technisch notwendig, damit Login, Sitzung und Logout funktionieren. Sie sind HttpOnly, Secure und SameSite=Lax gesetzt.',
          'localStorage wird aktuell nur für die Spracheinstellung verwendet.',
          'Wir verwenden aktuell keine Analytics-, Werbe- oder Tracking-Pixel.',
          'Die Website lädt aktuell Google Fonts extern. Für den Launch sollte die Schrift lokal gehostet oder die Einbindung ausdrücklich in der Datenschutzerklärung abgedeckt werden.',
          'OTP-E-Mails werden über Gmail beziehungsweise Google-Dienste versendet.',
          'Links zu GitHub und LinkedIn führen zu externen Websites. Beim Anklicken gelten die Datenschutzregeln der jeweiligen Anbieter.',
        ],
      },
      {
        title: 'Empfänger und Übermittlung ins Ausland',
        paragraphs: [
          'Personendaten können an Dienstleister weitergegeben werden, die für Betrieb, Hosting, Datenbank, E-Mail-Versand, Sicherheit oder Wartung notwendig sind. Der gewählte Hosting-Anbieter und dessen Standort müssen vor dem Launch ergänzt werden.',
          'Bei Google/Gmail, Google Fonts, GitHub oder LinkedIn kann eine Bearbeitung ausserhalb der Schweiz beziehungsweise ausserhalb des EWR stattfinden. Dabei sollten angemessene Schutzmassnahmen und die jeweiligen Datenschutzbedingungen geprüft werden.',
        ],
      },
      {
        title: 'Speicherdauer',
        items: [
          'Kontaktanfragen bleiben gespeichert, bis sie erledigt sind, gelöscht werden oder gesetzliche Aufbewahrungspflichten entgegenstehen.',
          'Nutzerkonten bleiben bestehen, bis sie gelöscht werden oder für berechtigte Zwecke weiter aufbewahrt werden müssen.',
          'Refresh-Tokens laufen nach ca. 7 Tagen ab, Access-Tokens nach ca. 1 Stunde.',
          'OTP-Codes laufen nach ca. 15 Minuten ab und werden nach Nutzung, Ablauf oder zu vielen Versuchen deaktiviert.',
          'Server- und Sicherheitslogs hängen vom Hosting-Setup ab und müssen nach Auswahl des Hosters konkretisiert werden.',
        ],
      },
      {
        title: 'Rechte betroffener Personen',
        paragraphs: [
          'Betroffene Personen können je nach anwendbarem Recht Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch oder Datenherausgabe verlangen. Anfragen können an die oben genannte E-Mail-Adresse gesendet werden.',
          'Wenn die DSGVO anwendbar ist, kann zudem ein Beschwerderecht bei einer zuständigen Datenschutzaufsichtsbehörde bestehen.',
        ],
      },
      {
        title: 'Sicherheit',
        paragraphs: [
          'Wir setzen technische und organisatorische Massnahmen ein, darunter verschlüsselte Passwörter, rollenbasierte Zugriffe, HttpOnly-Cookies und Rate-Limits. Trotzdem kann keine absolute Sicherheit garantiert werden.',
        ],
      },
      {
        title: 'Automatisierte Entscheidungen und Profiling',
        paragraphs: [
          'Aktuell finden keine automatisierten Einzelentscheidungen mit rechtlicher Wirkung und kein Tracking-basiertes Profiling statt.',
        ],
      },
      {
        title: 'Haftung, Verträge und Urheberrechte',
        paragraphs: [
          'Die Inhalte dieser Website dienen der allgemeinen Information über unsere Leistungen. Verbindliche Angebote, Preise, Projektumfang, Rechte an Arbeitsergebnissen, Gewährleistung, Wartung und Haftung sollten in individuellen Offerten, Verträgen oder AGB geregelt werden.',
          'Wir übernehmen keine Verantwortung für Inhalte externer Websites, auf die verlinkt wird. Texte, Bilder, Logos, Designs und sonstige Inhalte dieser Website dürfen ohne Zustimmung nicht weiterverwendet werden, soweit keine gesetzlichen Ausnahmen greifen.',
        ],
      },
      {
        title: 'Offene Punkte vor dem Launch',
        items: [
          'Vollständige Anbieteradresse, Rechtsform und UID ergänzen.',
          'Hosting-Anbieter, Serverstandort und Log-Aufbewahrung konkret eintragen.',
          'Google Fonts lokal hosten oder sauber in Datenschutz und Consent-Konzept aufnehmen.',
          'AGB oder Projektbedingungen erstellen, sobald online verbindliche Buchungen, Zahlungen oder standardisierte Servicepakete angeboten werden.',
          'Auftragsbearbeitungsverträge abschliessen, wenn für Kunden personenbezogene Daten verarbeitet werden.',
        ],
      },
    ] as Section[],
  },
  en: {
    title: 'Legal Notice & Privacy',
    updated: 'Last updated: May 2026',
    intro:
      'This page explains who operates Bueno Web Solutions and how personal data is processed on this website and in the account area. It does not replace individual project contracts or terms for paid client work.',
    launchNotice:
      'Internal launch note: complete the provider details and get this reviewed before release.',
    providerTitle: 'Provider and controller',
    providerRows: [
      ['Name', provider.name],
      ['Represented by', provider.representatives],
      ['Address', '[complete business address before publication]'],
      ['Email', provider.email],
      ['Phone', provider.phone],
      ['UID / legal form', '[add UID / legal form, if available]'],
    ],
    sections: [
      {
        title: 'What this website offers',
        paragraphs: [
          'Bueno Web Solutions offers websites, backend systems, admin areas, AI automation, hosting and support for businesses. Interested visitors can contact us and users can use accounts for project or administration areas.',
          'There is currently no online shop and no direct checkout. Paid services should therefore be governed by individual offers, project confirmations or separate terms.',
        ],
      },
      {
        title: 'Data we process',
        items: [
          'Contact inquiries: email address, subject, message and creation time.',
          'User accounts: email address, first name, last name, roles/permissions, creation time and hashed passwords.',
          'Authentication: necessary HttpOnly cookies for access_token (about 1 hour) and refresh_token (about 7 days).',
          'Password and email verification: email address, one-time code, attempts, expiry time and cooldowns.',
          'Security and abuse prevention: IP address from the request or X-Forwarded-For header for rate limits.',
          'Language preference: the selected language is stored locally in the browser.',
          'Admin area: authorized admins can manage contact inquiries and registered users.',
        ],
      },
      {
        title: 'Purposes of processing',
        items: [
          'Responding to inquiries and preparing possible projects.',
          'Providing login, account, admin and security functions.',
          'Sending verification and password reset emails.',
          'Protecting the website against abuse, automated requests and unauthorized access.',
          'Meeting pre-contractual, contractual and legal obligations where applicable.',
        ],
      },
      {
        title: 'Cookies, localStorage and external services',
        items: [
          'The authentication cookies are technically necessary for login, session handling and logout. They are set as HttpOnly, Secure and SameSite=Lax.',
          'localStorage is currently used only for the language setting.',
          'We do not currently use analytics, advertising or tracking pixels.',
          'The website currently loads Google Fonts externally. For launch, the font should be self-hosted or the integration should be covered clearly in the privacy notice.',
          'OTP emails are sent through Gmail or Google services.',
          'Links to GitHub and LinkedIn lead to external websites. Their privacy rules apply when they are opened.',
        ],
      },
      {
        title: 'Recipients and international transfers',
        paragraphs: [
          'Personal data may be shared with service providers needed for operation, hosting, database, email delivery, security or maintenance. The chosen hosting provider and server location must be added before launch.',
          'Google/Gmail, Google Fonts, GitHub and LinkedIn may involve processing outside Switzerland or the EEA. Appropriate safeguards and the respective privacy terms should be reviewed.',
        ],
      },
      {
        title: 'Retention',
        items: [
          'Contact inquiries are stored until they are handled, deleted or legal retention duties require further storage.',
          'User accounts remain until they are deleted or must be retained for legitimate purposes.',
          'Refresh tokens expire after about 7 days, access tokens after about 1 hour.',
          'OTP codes expire after about 15 minutes and are disabled after use, expiry or too many attempts.',
          'Server and security log retention depends on the hosting setup and must be specified after choosing the host.',
        ],
      },
      {
        title: 'Data subject rights',
        paragraphs: [
          'Depending on applicable law, data subjects may request access, correction, deletion, restriction, objection or data portability. Requests can be sent to the email address above.',
          'If the GDPR applies, data subjects may also have the right to lodge a complaint with a competent data protection authority.',
        ],
      },
      {
        title: 'Security',
        paragraphs: [
          'We use technical and organizational measures, including hashed passwords, role-based access, HttpOnly cookies and rate limits. Nevertheless, absolute security cannot be guaranteed.',
        ],
      },
      {
        title: 'Automated decisions and profiling',
        paragraphs: [
          'At the moment, no automated individual decisions with legal effect and no tracking-based profiling take place.',
        ],
      },
      {
        title: 'Liability, contracts and copyright',
        paragraphs: [
          'The contents of this website provide general information about our services. Binding offers, prices, project scope, rights in work results, warranty, maintenance and liability should be governed by individual offers, contracts or terms.',
          'We are not responsible for the contents of external websites that are linked. Texts, images, logos, designs and other website content may not be reused without permission unless legal exceptions apply.',
        ],
      },
      {
        title: 'Open launch items',
        items: [
          'Add the complete provider address, legal form and UID.',
          'Add the hosting provider, server location and log retention.',
          'Self-host Google Fonts or cover them properly in the privacy and consent concept.',
          'Create terms or project conditions once binding online bookings, payments or standardized service packages are offered.',
          'Conclude data processing agreements when personal data is processed for clients.',
        ],
      },
    ] as Section[],
  },
}

const pageContent = computed(() => (locale.value === 'de' ? content.de : content.en))
</script>

<template>
  <section class="legal-page">
    <div class="legal-wrapper">
      <header class="legal-header">
        <span class="section-label">{{ pageContent.updated }}</span>
        <h1>{{ pageContent.title }}</h1>
        <p>{{ pageContent.intro }}</p>
        <p class="launch-notice">{{ pageContent.launchNotice }}</p>
      </header>

      <section class="provider-section" aria-labelledby="provider-title">
        <h2 id="provider-title">{{ pageContent.providerTitle }}</h2>
        <dl class="provider-list">
          <template v-for="[label, value] in pageContent.providerRows" :key="label">
            <dt>{{ label }}</dt>
            <dd>{{ value }}</dd>
          </template>
        </dl>
      </section>

      <section
        v-for="section in pageContent.sections"
        :key="section.title"
        class="legal-section"
      >
        <h2>{{ section.title }}</h2>
        <p v-for="paragraph in section.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>
        <ul v-if="section.items">
          <li v-for="item in section.items" :key="item">
            {{ item }}
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<style scoped>
.legal-page {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 2rem;
}

.legal-wrapper {
  max-width: 980px;
  margin: 0 auto;
}

.legal-header,
.provider-section,
.legal-section {
  border-top: 1px solid #333;
  padding: 2rem 0;
}

.legal-header {
  border-top: none;
  padding-top: 0;
}

.section-label {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #42b883;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1 {
  margin: 0 0 1rem;
  font-size: 2.5rem;
  line-height: 1.2;
}

h2 {
  margin: 0 0 1rem;
  color: #42b883;
  font-size: 1.35rem;
}

p,
li,
dd {
  color: #d2d2d2;
  line-height: 1.7;
}

p {
  margin: 0 0 1rem;
}

.launch-notice {
  color: #ffffff;
  background-color: #252525;
  border: 1px solid #42b883;
  border-radius: 8px;
  padding: 1rem;
}

.provider-list {
  display: grid;
  grid-template-columns: minmax(150px, 220px) 1fr;
  gap: 0.85rem 1.5rem;
  margin: 0;
}

dt {
  color: #ffffff;
  font-weight: 700;
}

dd {
  margin: 0;
}

ul {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding-left: 1.25rem;
}

@media (max-width: 700px) {
  .legal-page {
    padding: 2rem 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .provider-list {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
</style>
