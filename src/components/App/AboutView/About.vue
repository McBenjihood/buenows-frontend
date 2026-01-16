<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="titleDiv">
      <h1>Über Bueno Web Solutions</h1>
    </div>

    <div class="image-wrapper">
      <img src="/src/assets/img/team/img.png" alt="Unser Team" class="team-image" />
    </div>

    <div class="infoDiv">
      <div class="info">
        <h3>Unsere Geschichte</h3>
        <p>
          Bueno Web Solutions wurde aus der Leidenschaft geboren, digitale Barrieren zu brechen. Was
          in einer kleinen Garage als Projekt unter Freunden begann, hat sich zu einem innovativen
          Partner für Unternehmen entwickelt, die im digitalen Zeitalter nicht nur mithalten,
          sondern führen wollen.
        </p>
      </div>
      <div class="info">
        <h3>Unsere Mission</h3>
        <p>
          Der Name „Bueno“ steht für Qualität. Wir glauben nicht an Abkürzungen. Jede Zeile Code,
          die wir schreiben, und jedes Interface, das wir gestalten, folgt dem Ziel, nachhaltigen
          Mehrwert zu schaffen. Wir verbinden moderne Technologien wie Vue.js und AWS mit einer
          Prise Kreativität.
        </p>
      </div>
    </div>

    <div class="solutionsDiv">
      <div class="solutions-block">
        <h1>Warum wir tun, was wir tun</h1>
        <div class="solutions-grid">
          <div class="solutions-content">
            <h3>Handwerk</h3>
            <p>
              Webentwicklung ist für uns modernes Handwerk. Wir sind stolz auf sauberen Code,
              schnelle Ladezeiten und skalierbare Architekturen, die mit Ihrem Unternehmen
              mitwachsen.
            </p>
          </div>
          <div class="solutions-content">
            <h3>Partnerschaft</h3>
            <p>
              Wir sehen uns nicht als externer Dienstleister, sondern als Teil Ihres Teams. Ihr
              Erfolg ist die Metrik, an der wir unsere eigene Leistung messen.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 2rem;
  min-height: 100vh;
}

.titleDiv {
  text-align: center;
  margin-bottom: 3rem;
}

.titleDiv h1 {
  margin: 0;
  line-height: 1.2;
  font-weight: 700;
  font-size: 2.5rem;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
}

.team-image {
  width: 100%;
  max-width: 1000px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  object-fit: cover;
}

.infoDiv {
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.info {
  flex: 1;
}

.info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #42b883;
}

.info p {
  color: #d1d1d1;
  line-height: 1.6;
  font-size: 1rem;
}

.solutionsDiv {
  margin-top: 6rem;
  display: flex;
  justify-content: center;
}

.solutions-block {
  background-color: #252525;
  padding: 4rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 1100px;
  width: 100%;
}

.solutions-block h1 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 3rem;
  font-weight: 700;
  font-size: 2rem;
}

.solutions-grid {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 3rem;
  text-align: center;
}

.solutions-content {
  flex: 1;
}

.solutions-content h3 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #42b883;
}

.solutions-content p {
  color: #e0e0e0;
  line-height: 1.8;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .infoDiv {
    flex-direction: column;
    gap: 2rem;
  }

  .solutions-grid {
    flex-direction: column;
    gap: 2rem;
  }

  .solutions-block {
    padding: 2rem;
  }

  .team-image {
    border-radius: 8px;
  }
}
</style>
