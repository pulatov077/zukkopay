<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      
      <ion-tab-bar slot="bottom" class="border-t border-slate-100 py-2 h-16 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        
        <ion-tab-button tab="dashboard" href="/student/dashboard" class="transition-all">
          <ion-icon :icon="gridOutline" class="text-xl" />
          <ion-label class="text-[9px] font-black uppercase mt-1">Asosiy</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="leaderboard" href="/student/leaderboard">
          <ion-icon :icon="trophyOutline" class="text-xl" />
          <ion-label class="text-[9px] font-black uppercase mt-1">Reyting</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="wallet" href="/student/wallet">
          <ion-icon :icon="walletOutline" class="text-xl" />
          <ion-label class="text-[9px] font-black uppercase mt-1">Hamyon</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/student/settings">
          <ion-icon :icon="settingsOutline" class="text-xl" />
          <ion-label class="text-[9px] font-black uppercase mt-1">Sozlamalar</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
import { gridOutline, trophyOutline, walletOutline, settingsOutline } from 'ionicons/icons';
</script>

<style scoped>
/* Aktiv tugmani ko'k rangga bo'yash (Tailwind-siz uslub) */
ion-tab-button.tab-selected {
  color: #2563eb; /* blue-600 */
  --color-selected: #2563eb;
  transform: scale(1.1);
  transition: all 0.3s ease;
}
</style>