<template>
  <ion-page>
    <ion-content class="ion-padding-horizontal bg-slate-50/50">
      <div class="max-w-[450px] mx-auto min-h-screen pb-10">
        
        <div class="pt-12 mb-8 flex flex-col items-center">
          <div class="w-24 h-24 bg-white p-1 rounded-[35px] shadow-xl border border-slate-100 relative">
            <div class="w-full h-full bg-blue-600 rounded-[30px] flex items-center justify-center text-4xl shadow-inner italic">
              👦
            </div>
            <button class="absolute -right-1 -bottom-1 w-8 h-8 bg-slate-900 rounded-full border-4 border-white flex items-center justify-center text-xs">
              📸
            </button>
          </div>
          <h2 class="text-xl font-black text-slate-900 mt-4 italic">Abbosjon</h2>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">ID: 8842991</p>
        </div>

        <div class="space-y-6">
          
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-4">Akkaunt</p>
            <div class="bg-white rounded-[30px] border border-slate-100 overflow-hidden shadow-sm">
              <div v-for="(item, i) in menuItems" :key="i" 
                   class="flex items-center justify-between p-4 active:bg-slate-50 transition-all border-b border-slate-50 last:border-0">
                <div class="flex items-center gap-3">
                  <span class="text-lg">{{ item.icon }}</span>
                  <span class="text-sm font-black text-slate-800 tracking-tight">{{ item.title }}</span>
                </div>
                <span class="text-slate-300">→</span>
              </div>
            </div>
          </div>

          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-4">Xavfsizlik</p>
            <div class="bg-white rounded-[30px] border border-slate-100 overflow-hidden shadow-sm">
              <div class="flex items-center justify-between p-4 active:bg-slate-50 transition-all">
                <div class="flex items-center gap-3">
                  <span class="text-lg">🔐</span>
                  <span class="text-sm font-black text-slate-800 tracking-tight">Parolni yangilash</span>
                </div>
                <span class="text-slate-300">→</span>
              </div>
            </div>
          </div>

          <button @click="handleLogout" 
                  class="w-full bg-red-50 text-red-600 py-4 rounded-[25px] font-black text-sm uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2">
            <span>🚪</span> Tizimdan chiqish
          </button>

        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const menuItems = [
  { title: 'Shaxsiy ma\'lumotlar', icon: '👤' },
  { title: 'Bildirishnomalar', icon: '🔔' },
  { title: 'Ilova tili (O\'zb)', icon: '🌍' },
  { title: 'Yordam markazi', icon: '🎧' },
];

const handleLogout = () => {
  // Hozircha login sahifasiga qaytarish
  router.push('/login');
};
</script>