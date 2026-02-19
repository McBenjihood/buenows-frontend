<script setup lang="ts">

import { ref } from 'vue'

const url = "localhost:8080/api/user"

const email = ref("");
const title = ref("");
const message = ref("");

async function submitForm(){
  try{
    const response = await fetch(url + "")
  }catch (error) {
    
  }
}

</script>

<template>
  <div class="container">
    <div class="titleDiv">
      <h1>Kontaktieren Sie uns</h1>
    </div>

    <div class="infoDiv">
      <div class="info">
        <h3>Lassen Sie uns reden</h3>
        <p>
          Haben Sie eine Idee für ein Projekt oder benötigen Sie Unterstützung bei Ihrer digitalen
          Infrastruktur? Wir freuen uns darauf, von Ihnen zu hören und gemeinsam Lösungen zu
          entwickeln.
        </p>
      </div>
      <div class="info">
        <h3>Erreichbarkeit</h3>
        <p>
          Wir bemühen uns, alle Anfragen innerhalb von 24 Stunden zu beantworten. Für dringende
          technische Anliegen nutzen Sie bitte die telefonische Kontaktaufnahme.
        </p>
      </div>
    </div>

    <div class="solutionsDiv">
      <div class="solutions-block">
        <h1>Kontaktdaten</h1>
        <div class="solutions-grid">
          <div class="solutions-content">
            <div class="contact-icon-box">
              <h3>Telefon</h3>
              <p>
                <a href="tel:+410775238836" class="contact-link">+41 077 523 88 36</a>
              </p>
              <p class="sub-text">Mo - Fr: 09:00 - 18:00 Uhr</p>
            </div>
          </div>

          <div class="solutions-content">
            <div class="contact-icon-box">
              <h3>E-Mail</h3>
              <p>
                <a href="mailto:info.buenows@gmail.com" class="contact-link"
                  >info.buenows@gmail.com</a
                >
              </p>
              <p class="sub-text">Wir antworten schnellstmöglich.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="solutions-block">
        <h1>Direkter Kontakt</h1>
        <form class="contact-form" @submit.prevent>
          <div class="form-group">
            <label for="email">E-Mail</label>
            <input v-model="email" type="email" id="email" placeholder="ihre@mail.de" required />
          </div>

          <div class="form-group">
            <label for="anliegen">Anliegen</label>
            <input v-model="title" type="text" id="anliegen" placeholder="Zusammenarbeit, Support, etc." required />
          </div>

          <div class="form-group">
            <label for="beschreibung">Beschreibung</label>
            <textarea
              id="beschreibung"
              rows="4"
              placeholder="Beschreiben Sie Ihr Anliegen..."
              v-model="message"

            ></textarea>
          </div>

          <button @click="submitForm" class="submit-btn">Nachricht senden</button>
        </form>
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
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.solutions-block {
  background-color: #252525;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  flex: 1;
  min-width: 350px;
  max-width: 600px;
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
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  text-align: center;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.form-group label {
  color: #42b883;
  font-size: 0.9rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 0.8rem;
  color: white;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b883;
}

.submit-btn {
  background-color: #42b883;
  color: #1a1a1a;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s,
    background-color 0.2s;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #33a06f;
  transform: translateY(-2px);
}

.solutions-content h3 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #42b883;
}

.contact-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #42b883;
}

.sub-text {
  font-size: 0.85rem;
  color: #888;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .solutionsDiv {
    flex-direction: column;
    align-items: center;
  }

  .solutions-block {
    width: 100%;
    min-width: unset;
    padding: 2rem;
  }

  .infoDiv {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
