<script setup lang="ts">
import vueIcon from '/src/assets/img/icons/technologies/vuejs_logo.svg'
import springIcon from '/src/assets/img/icons/technologies/spring_logo.svg'
import postgresIcon from '/src/assets/img/icons/technologies/postgres_logo.svg'
import awsIcon from '/src/assets/img/icons/technologies/aws_logo.svg'

const technologies = [
  { name: 'Vue.js', icon: vueIcon },
  { name: 'Spring Boot', icon: springIcon },
  { name: 'PostgreSQL', icon: postgresIcon },
  { name: 'AWS Cloud', icon: awsIcon },
]

const services = [
  {
    title: 'Websites erstellen',
    text: 'Wir entwickeln moderne und professionelle Websites, die zu Ihrem Unternehmen passen und Vertrauen aufbauen.',
  },
  {
    title: 'Websites erneuern',
    text: 'Bestehende Auftritte modernisieren wir technisch, optisch und strukturell, damit Ihre Website wieder zeitgemäss wirkt.',
  },
  {
    title: 'Backend & Logik',
    text: 'Von Login-Systemen bis zu Datenbank-Anbindungen entwickeln wir die technische Grundlage für leistungsstarke Weblösungen.',
  },
  {
    title: 'Automatisierungen',
    text: 'Wir bauen digitale Abläufe, die Zeit sparen, Prozesse vereinfachen und wiederkehrende Aufgaben automatisieren.',
  },
  {
    title: 'AI-Lösungen',
    text: 'Ob automatische Antworten oder intelligente Unterstützung im Kundenkontakt – wir entwickeln moderne AI-gestützte Funktionen.',
  },
  {
    title: 'Hosting & Weiterentwicklung',
    text: 'Wir begleiten Projekte auch nach dem Launch mit Hosting, Wartung und technischer Weiterentwicklung.',
  },
]

const benefits = [
  'Individuelle Lösungen statt Baukastensysteme',
  'Moderne Technologien für stabile und skalierbare Systeme',
  'Klare Kommunikation und saubere Umsetzung',
  'Websites und Funktionen mit echtem Nutzen im Alltag',
]

const targetGroups = [
  'Kleine und mittlere Unternehmen',
  'Handwerksbetriebe und lokale Firmen',
  'Dienstleister mit modernem Online-Auftritt',
  'Unternehmen mit Bedarf an Automatisierung',
]
</script>

<template>
  <section class="home-page">
    <div class="page-wrapper">
      <div class="hero-card">
        <span class="section-label">Bueno Web Solutions</span>
        <h1>Moderne Websites, smarte Automatisierungen und digitale Lösungen für Unternehmen.</h1>
        <p class="hero-text">
          Wir entwickeln professionelle Webauftritte, starke Backend-Lösungen und digitale
          Funktionen, die nicht nur gut aussehen, sondern im Alltag echten Mehrwert schaffen.
        </p>

        <div class="hero-actions">
          <router-link to="/contact" class="primary-button">Projekt anfragen</router-link>
          <router-link to="/about" class="secondary-button">Mehr über uns</router-link>
        </div>
      </div>

      <div class="highlights-grid">
        <div class="highlight-card">
          <h2>Modern</h2>
          <p>
            Wir setzen auf zeitgemässe Technologien und klare Strukturen für einen starken digitalen
            Auftritt.
          </p>
        </div>

        <div class="highlight-card">
          <h2>Individuell</h2>
          <p>Jede Lösung wird an Ihr Unternehmen, Ihre Ziele und Ihre Anforderungen angepasst.</p>
        </div>

        <div class="highlight-card">
          <h2>Zuverlässig</h2>
          <p>
            Von der Idee bis zur Umsetzung begleiten wir Projekte direkt, transparent und sauber.
          </p>
        </div>
      </div>

      <div class="section-card">
        <div class="section-heading">
          <span class="section-label">Leistungen</span>
          <h2>Unsere Dienstleistungen</h2>
          <p>
            Wir verbinden Design, Technik und praktische Funktionen zu Lösungen, die Unternehmen
            professionell unterstützen.
          </p>
        </div>

        <div class="services-grid">
          <div v-for="service in services" :key="service.title" class="service-card">
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </div>
        </div>
      </div>

      <div class="two-column-grid">
        <div class="section-card">
          <div class="section-heading">
            <span class="section-label">Vorteile</span>
            <h2>Warum BuenoWS?</h2>
          </div>

          <ul class="bullet-list">
            <li v-for="benefit in benefits" :key="benefit">
              {{ benefit }}
            </li>
          </ul>
        </div>

        <div class="section-card">
          <div class="section-heading">
            <span class="section-label">Zielgruppen</span>
            <h2>Für wen wir arbeiten</h2>
          </div>

          <ul class="bullet-list">
            <li v-for="group in targetGroups" :key="group">
              {{ group }}
            </li>
          </ul>
        </div>
      </div>

      <div class="section-card">
        <div class="section-heading center">
          <span class="section-label">Technologien</span>
          <h2>Technische Grundlage für starke Lösungen</h2>
          <p>
            Wir arbeiten mit modernen Technologien, damit Ihre Website zuverlässig, wartbar und
            zukunftssicher bleibt.
          </p>
        </div>

        <div class="tech-grid">
          <div v-for="tech in technologies" :key="tech.name" class="tech-card">
            <img :src="tech.icon" :alt="tech.name" />
            <span>{{ tech.name }}</span>
          </div>
        </div>
      </div>

      <div class="cta-card">
        <span class="section-label">Kontakt</span>
        <h2>Sie planen ein Projekt oder möchten Ihren Webauftritt verbessern?</h2>
        <p>
          Schreiben Sie uns und lassen Sie uns gemeinsam besprechen, wie Ihre Website oder digitale
          Lösung aussehen kann.
        </p>

        <router-link to="/contact" class="primary-button">Jetzt Kontakt aufnehmen</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 2rem;
}

.page-wrapper {
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
.cta-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero-card {
  margin-bottom: 2rem;
}

.hero-card h1 {
  margin: 0 0 1rem 0;
  font-size: 3rem;
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

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 10px;
  padding: 0.95rem 1.4rem;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    background-color 0.2s ease;
}

.primary-button {
  background-color: #42b883;
  color: white;
}

.primary-button:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

.secondary-button {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #3a3a3a;
}

.secondary-button:hover {
  background-color: #2e2e2e;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.highlight-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
}

.highlight-card h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #42b883;
}

.highlight-card p {
  color: #e0e0e0;
  line-height: 1.7;
  margin: 0;
}

.section-card {
  margin-bottom: 2rem;
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
  max-width: 800px;
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

.tech-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.tech-card {
  background-color: #1f1f1f;
  border-radius: 16px;
  padding: 2rem;
  width: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.08);
}

.tech-card img {
  height: 72px;
  width: auto;
  margin-bottom: 1.2rem;
  display: block;
}

.tech-card span {
  color: #42b883;
  font-weight: 600;
  font-size: 1.1rem;
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

@media (max-width: 992px) {
  .highlights-grid,
  .services-grid,
  .two-column-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 2rem 1rem;
  }

  .hero-card,
  .section-card,
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

  .tech-card {
    width: 42%;
    min-width: 140px;
  }
}
</style>
