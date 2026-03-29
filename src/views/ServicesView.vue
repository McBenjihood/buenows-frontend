<script setup lang="ts">
const coreServices = [
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
]

const upcomingServices = [
  'AI Telefonassistent für Unternehmen',
  'AI Chatbot für Firmenwebsites',
  'AI Sales Automationen für digitale Kundenprozesse',
]

const targetGroups = [
  'Kleine und mittlere Unternehmen',
  'Handwerksbetriebe und lokale Firmen',
  'Dienstleister mit modernem Webauftritt',
  'Unternehmen mit Bedarf an Automatisierung',
]
</script>

<template>
  <section class="services-page">
    <div class="services-wrapper">
      <div class="hero-card">
        <span class="section-label">Services</span>
        <h1>Digitale Lösungen für Websites, Automatisierung und moderne Kundenkommunikation.</h1>
        <p class="hero-text">
          Wir entwickeln professionelle Websites, technische Funktionen und smarte
          Automatisierungen, die Unternehmen im Alltag entlasten und online stärker machen.
        </p>
      </div>

      <div class="section-card">
        <div class="section-heading">
          <span class="section-label">Leistungen</span>
          <h2>Was wir heute für Unternehmen anbieten</h2>
          <p>
            Unser Fokus liegt auf modernen Weblösungen, klarer technischer Umsetzung und Funktionen,
            die nicht nur gut aussehen, sondern im Alltag echten Nutzen bringen.
          </p>
        </div>

        <div class="services-grid">
          <div v-for="service in coreServices" :key="service.title" class="service-card">
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </div>
        </div>
      </div>

      <div class="two-column-grid">
        <div class="section-card">
          <div class="section-heading">
            <span class="section-label">Im Ausbau</span>
            <h2>Was als Nächstes kommt</h2>
            <p>
              Wir erweitern unser Angebot gezielt um weitere AI-gestützte Lösungen für Unternehmen,
              die Kundenkommunikation, interne Abläufe und digitale Prozesse weiter verbessern.
            </p>
          </div>

          <ul class="bullet-list">
            <li v-for="service in upcomingServices" :key="service">
              {{ service }}
            </li>
          </ul>
        </div>

        <div class="section-card">
          <div class="section-heading">
            <span class="section-label">Zielgruppen</span>
            <h2>Für wen unsere Leistungen besonders interessant sind</h2>
          </div>

          <ul class="bullet-list">
            <li v-for="group in targetGroups" :key="group">
              {{ group }}
            </li>
          </ul>
        </div>
      </div>

      <div class="process-card">
        <div class="section-heading center">
          <span class="section-label">Zusammenarbeit</span>
          <h2>Wie wir mit Kunden arbeiten</h2>
        </div>

        <div class="process-grid">
          <div class="process-step">
            <h3>1. Bedarf verstehen</h3>
            <p>
              Wir schauen gemeinsam, was Ihr Unternehmen wirklich braucht und welche Lösung sinnvoll
              ist.
            </p>
          </div>

          <div class="process-step">
            <h3>2. Lösung planen</h3>
            <p>
              Danach definieren wir Struktur, Funktionen und den technischen Aufbau Ihrer Lösung.
            </p>
          </div>

          <div class="process-step">
            <h3>3. Umsetzen</h3>
            <p>
              Wir entwickeln Website, Backend oder Automatisierung sauber, modern und
              nachvollziehbar.
            </p>
          </div>

          <div class="process-step">
            <h3>4. Weiterentwickeln</h3>
            <p>
              Nach dem Start kann das Projekt erweitert, gepflegt und an neue Anforderungen
              angepasst werden.
            </p>
          </div>
        </div>
      </div>

      <div class="cta-card">
        <span class="section-label">Kontakt</span>
        <h2>Sie möchten eine Website erstellen, modernisieren oder Prozesse automatisieren?</h2>
        <p>
          Schreiben Sie uns und wir besprechen gemeinsam, welche Lösung für Ihr Unternehmen sinnvoll
          ist.
        </p>

        <router-link to="/contact" class="primary-button">Jetzt Projekt anfragen</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-page {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 2rem;
}

.services-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.section-label {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #42b883;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero-card,
.section-card,
.process-card,
.cta-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero-card,
.section-card,
.process-card {
  margin-bottom: 2rem;
}

.hero-card h1 {
  margin: 0 0 1rem 0;
  font-size: 2.9rem;
  line-height: 1.15;
  max-width: 950px;
}

.hero-text {
  margin: 0;
  max-width: 850px;
  color: #d2d2d2;
  line-height: 1.7;
  font-size: 1.1rem;
}

.section-heading {
  margin-bottom: 2rem;
}

.section-heading.center {
  text-align: center;
}

.section-heading h2 {
  margin: 0 0 0.8rem 0;
  font-size: 2rem;
}

.section-heading p {
  margin: 0;
  color: #d2d2d2;
  line-height: 1.7;
  max-width: 820px;
}

.section-heading.center p {
  margin-left: auto;
  margin-right: auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.service-card {
  background-color: #1f1f1f;
  border-radius: 14px;
  padding: 1.5rem;
}

.service-card h3 {
  margin-top: 0;
  margin-bottom: 0.8rem;
  color: #42b883;
}

.service-card p {
  margin: 0;
  color: #dfdfdf;
  line-height: 1.7;
}

.two-column-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.bullet-list {
  margin: 0;
  padding-left: 1.2rem;
}

.bullet-list li {
  margin-bottom: 0.9rem;
  color: #e0e0e0;
  line-height: 1.6;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.process-step {
  background-color: #1f1f1f;
  border-radius: 14px;
  padding: 1.5rem;
}

.process-step h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #42b883;
}

.process-step p {
  margin: 0;
  color: #dfdfdf;
  line-height: 1.7;
}

.cta-card {
  text-align: center;
}

.cta-card h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2.2rem;
}

.cta-card p {
  max-width: 760px;
  margin: 0 auto 2rem auto;
  color: #d2d2d2;
  line-height: 1.7;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 10px;
  padding: 0.95rem 1.4rem;
  font-weight: 700;
  background-color: #42b883;
  color: white;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.primary-button:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

@media (max-width: 992px) {
  .services-grid,
  .two-column-grid,
  .process-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .services-page {
    padding: 2rem 1rem;
  }

  .hero-card,
  .section-card,
  .process-card,
  .cta-card {
    padding: 1.5rem;
  }

  .hero-card h1 {
    font-size: 2.1rem;
  }

  .section-heading h2,
  .cta-card h2 {
    font-size: 1.7rem;
  }
}
</style>
