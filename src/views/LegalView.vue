<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const provider = {
  name: 'Bueno Web Solutions',
  operatorsDe: 'Liam Bruno und Benjamin Gerresheim',
  operatorsEn: 'Liam Bruno and Benjamin Gerresheim',
  address: 'Burgweid 2, 6340 Baar, Zug, Schweiz',
  email: 'info.buenows@gmail.com',
  phone: '+41 077 523 88 36',
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
      'Diese Seite informiert transparent über Anbieter, Verantwortlichkeit und Datenbearbeitung auf bueno-ws.ch. Sie ist keine Rechtsberatung und ersetzt keine individuellen Projektverträge oder Geschäftsbedingungen.',
    providerTitle: 'Anbieter und verantwortliche Stelle',
    providerRows: [
      ['Name', provider.name],
      ['Betrieben durch', provider.operatorsDe],
      ['Adresse', provider.address],
      ['E-Mail', provider.email],
      ['Telefon', provider.phone],
      ['Rechtsform', 'Keine eingetragene Gesellschaft; aktuell Betrieb durch Privatpersonen'],
      ['UID', 'Keine UID vorhanden'],
      ['Handelsregister', 'Kein Handelsregistereintrag vorhanden'],
    ],
    sections: [
      {
        title: 'Website und Funktionen',
        paragraphs: [
          'Bueno Web Solutions bietet Informationen zu Websites, Backend-Systemen, Automatisierung, Hosting und Support. Zum Start sind Kontaktformular, Registrierung, Login, Passwort-Reset/OTP, Konto- und Admin-Bereich aktiv.',
          'Der Admin-Bereich ist auf autorisierte Nutzer mit der erforderlichen Administratorrolle beschränkt. Unbefugter Zugriff ist nicht erlaubt.',
        ],
      },
      {
        title: 'Welche Daten wir bearbeiten',
        items: [
          'Kontaktformular: E-Mail-Adresse, Betreff, Nachricht und Zeitpunkt der Anfrage.',
          'Registrierung und Login: E-Mail-Adresse, Vorname, Nachname, Rollen/Berechtigungen, Erstellungszeitpunkt und verschlüsselte Passwörter.',
          'Passwort-Reset und OTP: E-Mail-Adresse, einmaliger Bestätigungscode, Versuche, Ablaufzeit, Sperrfristen und verifizierter Token.',
          'Admin-Bereich: Kontaktanfragen und registrierte Nutzer, soweit zur Verwaltung erforderlich.',
          'Website-Chatbot: eingegebene Chatnachrichten, gewählte Sprache, temporäre Session-ID und technische Anfrageinformationen. Inhalte können zur Antwortgenerierung an den eingesetzten KI-Anbieter verarbeitet werden.',
          'Technische Logs: IP-Adresse beziehungsweise technische Anfrageinformationen, Zeitpunkt, URL, Statuscode und Fehlerdaten, soweit für Betrieb und Sicherheit erforderlich.',
        ],
      },
      {
        title: 'Zwecke der Bearbeitung',
        items: [
          'Beantwortung von Kontaktanfragen und Vorbereitung möglicher Projekte.',
          'Bereitstellung von Konto, Login, Registrierung, Passwort-Reset und Admin-Funktionen.',
          'Versand von Bestätigungs- und Passwort-Reset-E-Mails.',
          'Bereitstellung des Website-Chatbots, Beantwortung von Fragen zu Bueno Web Solutions und Vorbereitung von Projektanfragen.',
          'Missbrauchsschutz, Rate-Limits, Sicherheit, Fehleranalyse und Betrieb der Website.',
          'Erfüllung vorvertraglicher, vertraglicher und gesetzlicher Pflichten, soweit anwendbar.',
        ],
      },
      {
        title: 'Hosting, Infrastruktur und Logs',
        items: [
          'Hosting erfolgt über AWS: Frontend über AWS S3/CloudFront, Backend über AWS EC2 und Datenbank über AWS RDS PostgreSQL.',
          'Als Serverregion ist Europe (Zurich) / eu-central-2 vorgesehen, sofern diese im finalen Setup verwendet wird und verfügbar ist.',
          'Die Datenbank ist nicht öffentlich vorgesehen und soll nur vom Backend beziehungsweise der EC2-Umgebung erreichbar sein.',
          'Technische Logs werden nach aktuellem Launch-Setup bis zu 14 Tage aufbewahrt, sofern keine längere Aufbewahrung aus Sicherheits- oder Rechtsgründen erforderlich ist.',
        ],
      },
      {
        title: 'Cookies, localStorage und externe Dienste',
        items: [
          'Für Authentifizierung werden technisch notwendige HttpOnly-Cookies verwendet: access_token mit ca. 1 Stunde Laufzeit und refresh_token mit ca. 7 Tagen Laufzeit. Die Cookies sind Secure, SameSite=Lax und auf passende Pfade begrenzt.',
          'localStorage wird für die Spracheinstellung verwendet.',
          'Der Chatbot verwendet localStorage für eine temporäre Session-ID und die feste Chat-Sprache. Die Chat-Sprache kann während einer laufenden Session nicht gewechselt werden.',
          'Zum Start werden keine Analytics, keine Werbepixel und keine Heatmaps eingesetzt.',
          'Google Fonts werden aktuell extern von Google geladen. Dabei können technische Verbindungsdaten an Google übermittelt werden.',
          'OTP- und Authentifizierungs-E-Mails werden über Gmail beziehungsweise Google-Dienste versendet.',
          'Externe Links, zum Beispiel zu GitHub oder LinkedIn, führen zu Websites Dritter. Dort gelten die Datenschutzregeln der jeweiligen Anbieter.',
        ],
      },
      {
        title: 'Speicherdauer',
        items: [
          'Kontaktanfragen bleiben gespeichert, bis sie bearbeitet, gelöscht oder aus berechtigten Gründen weiter aufbewahrt werden.',
          'Nutzerkonten bleiben bestehen, bis sie gelöscht werden oder eine weitere Aufbewahrung erforderlich ist.',
          'Access Tokens laufen nach ca. 1 Stunde ab, Refresh Tokens nach ca. 7 Tagen oder bei Logout.',
          'OTP-Codes laufen nach ca. 15 Minuten ab und werden nach Nutzung, Ablauf oder zu vielen Versuchen deaktiviert.',
          'Chatbot-Sessions werden serverseitig temporär gehalten und nach Ablauf der Session-Frist gelöscht. Die lokale Session-ID wird entfernt, wenn der Chat beendet wird oder der Browser-Speicher gelöscht wird.',
          'Technische Logs werden grundsätzlich 14 Tage aufbewahrt.',
        ],
      },
      {
        title: 'Rechte betroffener Personen',
        paragraphs: [
          'Betroffene Personen können je nach anwendbarem Recht Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch oder Datenherausgabe verlangen. Anfragen können an info.buenows@gmail.com gesendet werden.',
          'Wenn die DSGVO anwendbar ist, kann zusätzlich ein Beschwerderecht bei einer zuständigen Datenschutzaufsichtsbehörde bestehen.',
        ],
      },
      {
        title: 'Sicherheit',
        paragraphs: [
          'Wir setzen technische und organisatorische Massnahmen ein, darunter HTTPS, verschlüsselte Passwörter, HttpOnly-Cookies, rollenbasierte Zugriffe, Rate-Limits und eingeschränkte Datenbank-Erreichbarkeit. Absolute Sicherheit kann dennoch nicht garantiert werden.',
          'Der Chatbot darf keine Passwörter, Zahlungsdaten, Ausweise oder privaten Dokumente anfordern. KI-Antworten können Fehler enthalten und ersetzen keine verbindliche Offerte, keinen Vertrag und keine Rechtsberatung.',
        ],
      },
      {
        title: 'Automatisierte Entscheidungen und Profiling',
        paragraphs: [
          'Zum Start finden keine automatisierten Einzelentscheidungen mit rechtlicher Wirkung, kein trackingbasiertes Profiling, keine Analytics, keine Werbepixel und keine Heatmaps statt.',
        ],
      },
      {
        title: 'Beendigung laufender Services und Übergabe',
        paragraphs: [
          'Laufende Services wie Wartung, Support, Hosting-Unterstützung, Backend-Betrieb, Automatisierungen oder KI-basierte E-Mail- und Telefon-Systeme können von beiden Seiten mit einer Frist von mindestens 30 Tagen auf das Ende eines Kalendermonats beendet werden, sofern keine separate schriftliche Vereinbarung etwas anderes regelt.',
          'Wenn Bueno Web Solutions einen laufenden Service beendet, darf der Kunde die bereits gelieferten und bezahlten Projektergebnisse, zum Beispiel Website, Code, Design oder konfigurierte Systeme, im vereinbarten Umfang weiterverwenden. Nach Ende des Servicezeitraums ist Bueno Web Solutions jedoch nicht mehr für Wartung, Updates, Monitoring, Support, Fehlerbehebungen, Hosting-Betrieb, Drittanbieter-Dienste oder Weiterentwicklungen verantwortlich, sofern keine neue Vereinbarung getroffen wird.',
          'Externe Dienste wie Domains, Hosting-Accounts, API-Anbieter, E-Mail-Anbieter oder andere Tools können eigenen Bedingungen, Preisen und Verfügbarkeiten unterliegen. Soweit möglich und zumutbar kann Bueno Web Solutions bei einer Übergabe unterstützen. Der weitere Betrieb nach Ende des Services liegt jedoch in der Verantwortung des Kunden, sofern nichts anderes vereinbart wurde.',
        ],
      },
      {
        title: 'Haftung, Verträge und Urheberrechte',
        paragraphs: [
          'Die Inhalte dieser Website dienen der allgemeinen Information. Verbindliche Angebote, Preise, Projektumfang, Rechte an Arbeitsergebnissen, Gewährleistung, Wartung und Haftung sollten in individuellen Offerten, Verträgen oder AGB geregelt werden.',
          'Texte, Bilder, Logos, Designs und sonstige Inhalte dieser Website dürfen ohne Zustimmung nicht weiterverwendet werden, soweit keine gesetzlichen Ausnahmen greifen.',
        ],
      },
    ] as Section[],
  },
  en: {
    title: 'Legal Notice & Privacy',
    updated: 'Last updated: May 2026',
    intro:
      'This page explains the provider, responsibilities and data processing on bueno-ws.ch. It is not legal advice and does not replace individual project contracts or terms.',
    providerTitle: 'Provider and controller',
    providerRows: [
      ['Name', provider.name],
      ['Operated by', provider.operatorsEn],
      ['Address', provider.address],
      ['Email', provider.email],
      ['Phone', provider.phone],
      ['Legal form', 'No registered company; currently operated by private individuals'],
      ['UID', 'No UID available'],
      ['Commercial register', 'No commercial register entry available'],
    ],
    sections: [
      {
        title: 'Website and features',
        paragraphs: [
          'Bueno Web Solutions provides information about websites, backend systems, automation, hosting and support. At launch, the contact form, registration, login, password reset/OTP, account area and admin area are active.',
          'The admin area is restricted to authorized users with the required administrator role. Unauthorized access is not permitted.',
        ],
      },
      {
        title: 'Data we process',
        items: [
          'Contact form: email address, subject, message and inquiry time.',
          'Registration and login: email address, first name, last name, roles/permissions, creation time and hashed passwords.',
          'Password reset and OTP: email address, one-time verification code, attempts, expiry time, cooldowns and verified token.',
          'Admin area: contact inquiries and registered users where required for administration.',
          'Website chatbot: entered chat messages, selected language, temporary session ID and technical request information. Content may be processed by the AI provider used to generate replies.',
          'Technical logs: IP address or technical request information, time, URL, status code and error data where required for operation and security.',
        ],
      },
      {
        title: 'Purposes of processing',
        items: [
          'Responding to contact inquiries and preparing possible projects.',
          'Providing account, login, registration, password reset and admin functions.',
          'Sending verification and password reset emails.',
          'Providing the website chatbot, answering questions about Bueno Web Solutions and preparing project inquiries.',
          'Abuse prevention, rate limits, security, error analysis and website operation.',
          'Meeting pre-contractual, contractual and legal obligations where applicable.',
        ],
      },
      {
        title: 'Hosting, infrastructure and logs',
        items: [
          'Hosting is provided through AWS: frontend via AWS S3/CloudFront, backend via AWS EC2 and database via AWS RDS PostgreSQL.',
          'Europe (Zurich) / eu-central-2 is intended as the server region if it is used in the final setup and available.',
          'The database is not intended to be publicly reachable and should only be accessible by the backend or EC2 environment.',
          'Technical logs are kept for up to 14 days under the current launch setup unless longer retention is required for security or legal reasons.',
        ],
      },
      {
        title: 'Cookies, localStorage and external services',
        items: [
          'Technically necessary HttpOnly cookies are used for authentication: access_token with about 1 hour lifetime and refresh_token with about 7 days lifetime. Cookies are Secure, SameSite=Lax and limited to appropriate paths.',
          'localStorage is used for the language preference.',
          'The chatbot uses localStorage for a temporary session ID and the fixed chat language. The chat language cannot be changed during an active session.',
          'At launch, we do not use analytics, advertising pixels or heatmaps.',
          'Google Fonts are currently loaded externally from Google. Technical connection data may be transferred to Google.',
          'OTP and authentication emails are sent via Gmail or Google services.',
          'External links, for example to GitHub or LinkedIn, lead to third-party websites. Their privacy rules apply there.',
        ],
      },
      {
        title: 'Retention',
        items: [
          'Contact inquiries are stored until handled, deleted or retained for legitimate reasons.',
          'User accounts remain until deleted or further retention is required.',
          'Access tokens expire after about 1 hour, refresh tokens after about 7 days or on logout.',
          'OTP codes expire after about 15 minutes and are disabled after use, expiry or too many attempts.',
          'Chatbot sessions are stored temporarily on the server and deleted after the session period expires. The local session ID is removed when the chat ends or browser storage is cleared.',
          'Technical logs are generally retained for 14 days.',
        ],
      },
      {
        title: 'Data subject rights',
        paragraphs: [
          'Depending on applicable law, data subjects may request access, correction, deletion, restriction, objection or data portability. Requests can be sent to info.buenows@gmail.com.',
          'If the GDPR applies, data subjects may also have the right to lodge a complaint with a competent data protection authority.',
        ],
      },
      {
        title: 'Security',
        paragraphs: [
          'We use technical and organizational measures, including HTTPS, hashed passwords, HttpOnly cookies, role-based access, rate limits and restricted database reachability. Absolute security cannot be guaranteed.',
          'The chatbot must not request passwords, payment data, ID documents or private documents. AI replies may contain mistakes and do not replace a binding offer, contract or legal advice.',
        ],
      },
      {
        title: 'Automated decisions and profiling',
        paragraphs: [
          'At launch, there are no automated individual decisions with legal effect, no tracking-based profiling, no analytics, no advertising pixels and no heatmaps.',
        ],
      },
      {
        title: 'Service termination and handover',
        paragraphs: [
          'Ongoing services such as maintenance, support, hosting assistance, backend operation, automation services or AI-based email and phone systems may be terminated by either party with at least 30 days’ notice to the end of a calendar month, unless a separate written agreement states otherwise.',
          'If Bueno Web Solutions terminates an ongoing service, the customer may continue to use the delivered and paid project results, such as the website, code, design or configured system, to the extent agreed. After the end of the service period, Bueno Web Solutions is no longer responsible for maintenance, updates, monitoring, support, bug fixes, hosting operation, third-party services or further development, unless a new agreement is made.',
          'Third-party services such as domains, hosting accounts, API providers, email providers or other tools may remain subject to their own terms, prices and availability. Where possible and reasonable, Bueno Web Solutions may assist with a handover. Continued operation after service termination is the customer’s responsibility unless otherwise agreed.',
        ],
      },
      {
        title: 'Liability, contracts and copyright',
        paragraphs: [
          'The contents of this website provide general information. Binding offers, prices, project scope, rights to work results, warranty, maintenance and liability should be governed by individual offers, contracts or terms.',
          'Texts, images, logos, designs and other website content may not be reused without permission unless legal exceptions apply.',
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

      <section v-for="section in pageContent.sections" :key="section.title" class="legal-section">
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
