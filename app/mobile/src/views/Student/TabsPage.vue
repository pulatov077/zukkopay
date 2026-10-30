<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      
      <div class="tab-bar-container">
        <ion-tab-bar slot="bottom" class="zukko-tab-bar">
          
          <ion-tab-button tab="dashboard" href="/student/dashboard">
            <ion-icon :icon="gridOutline" />
            <ion-label>Asosiy</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="leaderboard" href="/student/leaderboard">
            <ion-icon :icon="trophyOutline" />
            <ion-label>Reyting</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="earn" href="/student/earn">
            <ion-icon :icon="bookOutline" />
            <ion-label>Earn</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="store" href="/student/store" class="relative">
            <ion-icon :icon="bagHandleOutline" />
            <ion-label>Store</ion-label>
            <span class="soon-badge">Soon</span>
          </ion-tab-button>

          <ion-tab-button tab="wallet" href="/student/wallet">
            <ion-icon :icon="walletOutline" />
            <ion-label>Hamyon</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="profil" href="/student/profil">
            <ion-icon :icon="personOutline" />
            <ion-label>Profil</ion-label>
          </ion-tab-button>

        </ion-tab-bar>
      </div>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
import { gridOutline, trophyOutline, bookOutline, bagHandleOutline, walletOutline, personOutline } from 'ionicons/icons';
</script>

<style scoped>
/* Tab bar-ni ekran kengligidan qat'i nazar markazda saqlash */
.tab-bar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background: transparent;
  z-index: 1000;
  padding: 0 10px 10px 10px; /* Pastdan bir oz joy tashlash */
}

.zukko-tab-bar {
  --background: rgba(13, 17, 23, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px; /* Dumaloq burchaklar */
  height: 65px;
  width: 100%;
  max-width: 450px; /* Telefon kengligidan oshib ketmasligi uchun */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin: 0 auto;
}

ion-tab-button {
  --color: #94a3b8;
  --color-selected: #3b82f6;
  --padding-top: 8px;
  --padding-bottom: 8px;
  transition: all 0.2s ease;
}

ion-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

ion-label {
  font-size: 8px !important;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

/* Soon badge-ni to'g'ri joylashtirish */
.soon-badge {
  position: absolute;
  top: 5px;
  right: 50%;
  transform: translateX(120%);
  background: #facc15; /* Tilla rang */
  color: #000;
  font-size: 6px;
  font-weight: 900;
  padding: 1px 3px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(250, 204, 21, 0.4);
}

/* Tanlanganda kichik animatsiya */
ion-tab-button.tab-selected {
  transform: translateY(-2px);
}
</style>