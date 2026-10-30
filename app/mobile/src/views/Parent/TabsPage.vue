<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>

      <div class="tab-bar-container">
        <ion-tab-bar slot="bottom" class="zukko-tab-bar">

          <ion-tab-button tab="dashboard" href="/parent/dashboard">
            <ion-icon :icon="gridOutline" />
            <ion-label>Asosiy</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="monitoring" href="/parent/monitoring">
            <ion-icon :icon="statsChartOutline" />
            <ion-label>Monitoring</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="profil" href="/parent/profil">
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
import { gridOutline, statsChartOutline, personOutline } from 'ionicons/icons';
</script>

<style scoped>
.tab-bar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background: transparent;
  z-index: 1000;
  padding: 0 10px 10px 10px;
}

.zukko-tab-bar {
  --background: rgba(9, 11, 14, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  height: 65px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin: 0 auto;
}

ion-tab-button {
  --color: #94a3b8;
  --color-selected: #6366f1;
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

ion-tab-button.tab-selected {
  transform: translateY(-2px);
}
</style>
