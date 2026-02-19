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
</script>

<template>
  <div class="container">
    <div class="titleDiv">
      <h1>Ihr Partner</h1>
      <h1>im Webdevelopment</h1>
    </div>

    <div class="infoDiv">
      <div class="info">
        <h3>Innovation</h3>
        <p>
          Wir setzen auf modernste Technologien, damit Ihr digitaler Auftritt auch morgen noch
          zukunftssicher bleibt.
        </p>
      </div>

      <div class="info">
        <h3>Individualität</h3>
        <p>
          Unsere Lösungen sind keine Stangenware, sondern werden exakt auf Ihre spezifischen
          Geschäftsziele zugeschnitten.
        </p>
      </div>

      <div class="info">
        <h3>Zuverlässigkeit</h3>
        <p>
          Von der ersten Planung bis zum finalen Launch begleiten wir Sie transparent, termingerecht
          und professionell.
        </p>
      </div>
    </div>

    <div class="solutionsDiv">
      <div class="solutions-block">
        <h1>Dienstleistungen</h1>
        <div class="solutions-grid">
          <div class="solutions-content">
            <h3>Full-Stack Entwicklung</h3>
            <p>
              Wir bauen keine leeren Fassaden. Wir liefern vollwertige Webanwendungen inklusive
              leistungsstarkem Backend. Ob Datenbank-Anbindungen, Benutzer-Logins oder komplexe
              Verwaltungs-Tools – wir programmieren die komplette Logik, die Ihr Unternehmen
              benötigt.
            </p>
          </div>
          <div class="solutions-content">
            <h3>Professionelles Cloud-Hosting</h3>
            <p>
              Wir bieten professionelles Cloud-Hosting mit hoher Verfügbarkeit und Sicherheit.
              Unsere Plattformen sind skalierbar und können auf Anforderungen und Bedarf anpassen.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="technologiesDiv">
      <h1>Technologien</h1>
      <div class="tech-grid">
        <div v-for="tech in technologies" :key="tech.name" class="tech-card">
          <img :src="tech.icon" :alt="tech.name" />
          <span>{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.container {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 4rem 2rem;
  min-height: 100vh;
}

.titleDiv {
  text-align: center;
  margin-bottom: 5rem;
}

.titleDiv h1 {
  margin: 0;
  line-height: 1.2;
  font-weight: 700;
  font-size: 2.5rem;
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

.technologiesDiv {
  margin-top: 6rem;
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.technologiesDiv h1 {
  font-weight: 700;
  margin-bottom: 3rem;
  font-size: 2rem;
}

.tech-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.tech-card {
  background-color: #252525;
  border-radius: 16px;
  padding: 2rem;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.1);
}

.tech-card img {
  height: 80px;
  width: auto;
  margin-bottom: 1.5rem;
  display: block;
}

.tech-card span {
  color: #42b883;
  font-weight: 600;
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .solutions-grid {
    flex-direction: column;
    gap: 2rem;
  }

  .infoDiv {
    flex-direction: column;
  }

  .solutions-block {
    padding: 2rem;
  }

  .tech-card {
    width: 40%;
    min-width: 140px;
  }
}
</style>