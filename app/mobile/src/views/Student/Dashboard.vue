<template>
  <ion-page>
    <ion-content class="ion-padding-horizontal bg-slate-50/50" :fullscreen="true">
      <div class="max-w-[450px] mx-auto min-h-screen pb-10">
        
        <div class="flex items-center justify-between pt-8 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-blue-200">
              👦
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-900 leading-tight">Abbosjon</h2>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">9-B Sinf o'quvchisi</p>
            </div>
          </div>
          <button class="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm active:scale-90 transition-all">
            <span class="text-lg text-slate-400 font-bold italic">🔔</span>
          </button>
        </div>

        <div class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[30px] p-6 shadow-xl shadow-blue-100 relative overflow-hidden mb-8">
          <div class="relative z-10 text-white">
            <p class="text-[10px] font-bold uppercase tracking-widest opacity-70">Mening hisobim</p>
            <h1 class="text-3xl font-black mt-1 italic">450,000 <span class="text-xs not-italic uppercase opacity-80 ml-1 font-medium">uzs</span></h1>
            
            <div class="mt-6 flex items-center gap-3">
              <div class="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-2xl flex items-center gap-2">
                <span class="text-base">🪙</span>
                <span class="text-xs font-black italic">24.5 ZP</span>
              </div>
              <div class="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-2xl flex items-center gap-2">
                <span class="text-base">📈</span>
                <span class="text-xs font-black italic">+12%</span>
              </div>
            </div>
          </div>
          <div class="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div class="mb-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-black text-slate-800 italic uppercase tracking-tighter leading-none">Oxirgi yutuqlar</h3>
            <button class="text-[10px] font-black text-blue-600 uppercase tracking-widest">Barchasi</button>
          </div>

          <div class="space-y-3">
            <div v-for="(item, i) in recentGrades" :key="i" 
                 class="bg-white p-4 rounded-[25px] border border-slate-100 flex items-center justify-between shadow-sm active:bg-slate-50 transition-all">
              <div class="flex items-center gap-3">
                <div :class="item.color" class="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black text-white shadow-md">
                  {{ item.grade }}
                </div>
                <div>
                  <p class="text-sm font-black text-slate-800 tracking-tight leading-tight">{{ item.subject }}</p>
                  <p class="text-[9px] text-slate-400 font-bold uppercase">{{ item.time }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-black text-green-600 leading-tight">+{{ item.reward }}</p>
                <p class="text-[9px] text-yellow-500 font-bold italic">+{{ item.coin }} Coin</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 bg-slate-900 rounded-[25px] p-5 text-white flex items-center justify-between">
          <div>
            <h4 class="text-sm font-black italic uppercase">Super Bonus!</h4>
            <p class="text-[10px] opacity-60">Chorak yakunida koinlar 2x</p>
          </div>
          <div class="text-2xl">🔥</div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { ref } from 'vue';

const recentGrades = ref([
  { subject: 'Matematika', grade: '5', reward: '5,000', coin: '1.5', time: 'Bugun, 09:40', color: 'bg-green-500 shadow-green-100' },
  { subject: 'Tarix', grade: '5', reward: '5,000', coin: '1.5', time: 'Bugun, 11:20', color: 'bg-green-500 shadow-green-100' },
  { subject: 'Ingliz tili', grade: '4', reward: '2,500', coin: '0.8', time: 'Kecha, 14:15', color: 'bg-blue-500 shadow-blue-100' },
]);
</script>