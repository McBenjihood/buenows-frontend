<script setup lang="ts"></script>

<template>
  <section class="about-page">
    <div class="about-wrapper">
      <div class="hero-card">
        <span class="section-label">Über uns</span>
        <h1>Wir entwickeln moderne Websites und digitale Lösungen mit echtem Nutzen.</h1>
        <p class="hero-text">
          Bueno Web Solutions unterstützt Unternehmen dabei, professionell online aufzutreten,
          Prozesse zu vereinfachen und digitale Lösungen einzusetzen, die im Alltag wirklich helfen.
        </p>
      </div>

      <div class="image-wrapper">
        <img src="/src/assets/img/team/img.png" alt="Bueno Web Solutions Team" class="team-image" />
      </div>

      <div class="content-grid">
        <div class="info-card">
          <h2>Wer wir sind</h2>
          <p>
            Wir sind ein modernes Webdevelopment-Team mit Fokus auf klare Designs, saubere
            technische Lösungen und digitale Werkzeuge, die Unternehmen wirklich weiterbringen.
          </p>
          <p>
            Unser Ziel ist nicht einfach nur eine schöne Website, sondern eine Lösung, die
            professionell aussieht, zuverlässig funktioniert und mit Ihrem Unternehmen mitwachsen
            kann.
          </p>
        </div>

        <div class="info-card">
          <h2>Wie wir arbeiten</h2>
          <p>
            Wir verbinden modernes Frontend, stabiles Backend und praxisnahe Automatisierungen zu
            Lösungen, die nicht nur gut aussehen, sondern im Alltag echten Mehrwert schaffen.
          </p>
          <p>
            Dabei legen wir Wert auf klare Kommunikation, saubere Umsetzung und ein Ergebnis, das
            verständlich, wartbar und zukunftssicher bleibt.
          </p>
        </div>
      </div>

      <div class="values-card">
        <h2>Wofür wir stehen</h2>
        <div class="values-grid">
          <div class="value-box">
            <h3>Qualität</h3>
            <p>
              Wir setzen auf saubere Umsetzung, klare Strukturen und Lösungen, die langfristig
              funktionieren.
            </p>
          </div>

          <div class="value-box">
            <h3>Praxisnähe</h3>
            <p>
              Unsere Websites und Systeme sollen nicht nur modern aussehen, sondern im echten
              Arbeitsalltag helfen.
            </p>
          </div>

          <div class="value-box">
            <h3>Zuverlässigkeit</h3>
            <p>
              Von der Planung bis zur Umsetzung arbeiten wir transparent, direkt und verbindlich.
            </p>
          </div>

          <div class="value-box">
            <h3>Weiterentwicklung</h3>
            <p>
              Wir denken nicht nur an heute, sondern an Lösungen, die mit zukünftigen Anforderungen
              mithalten können.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 2rem;
}

.about-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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

.hero-card h1 {
  margin: 0 0 1rem 0;
  font-size: 2.6rem;
  line-height: 1.2;
}

.hero-text {
  margin: 0;
  max-width: 850px;
  color: #d2d2d2;
  line-height: 1.7;
  font-size: 1.1rem;
}

.image-wrapper {
  margin-bottom: 3rem;
}

.team-image {
  width: 100%;
  max-width: 1200px;
  height: auto;
  border-radius: 18px;
  display: block;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-card,
.values-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.info-card h2,
.values-card h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #42b883;
}

.info-card p,
.values-card p {
  color: #e0e0e0;
  line-height: 1.7;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.value-box {
  background-color: #1f1f1f;
  border-radius: 14px;
  padding: 1.5rem;
}

.value-box h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #42b883;
}

@media (max-width: 768px) {
  .about-page {
    padding: 2rem 1rem;
  }

  .hero-card,
  .info-card,
  .values-card {
    padding: 1.5rem;
  }

  .hero-card h1 {
    font-size: 2rem;
  }

  .content-grid,
  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>
