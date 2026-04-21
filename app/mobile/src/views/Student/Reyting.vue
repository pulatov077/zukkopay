<template>
  <ion-page>
    <ion-content class="ion-padding-horizontal bg-slate-50/50" :fullscreen="true">
      <div class="max-w-[450px] mx-auto min-h-screen pb-10">
        
        <div class="pt-8 mb-6 px-1">
          <h2 class="text-2xl font-black text-slate-900 italic uppercase">Maktab Reytingi</h2>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Eng zukko o'quvchilar TOP-10</p>
        </div>

        <div class="flex items-end justify-center gap-2 mb-10 mt-4 h-48">
          <div class="flex flex-col items-center">
            <div class="w-14 h-14 bg-slate-200 rounded-full mb-2 border-2 border-white shadow-sm flex items-center justify-center text-xl">🥈</div>
            <div class="bg-white w-24 h-24 rounded-t-2xl shadow-lg flex flex-col items-center justify-center border border-slate-100">
              <p class="text-[10px] font-black text-slate-800 truncate px-2">Jasur. A</p>
              <p class="text-[9px] font-bold text-blue-600 italic">420 ZP</p>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-yellow-400 rounded-full mb-2 border-4 border-white shadow-xl flex items-center justify-center text-2xl relative">
              👑
            </div>
            <div class="bg-blue-600 w-28 h-32 rounded-t-3xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
              <p class="text-[10px] font-black text-white z-10">Abbosjon</p>
              <p class="text-[9px] font-bold text-blue-100 italic z-10">450 ZP</p>
              <div class="absolute -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-14 h-14 bg-orange-200 rounded-full mb-2 border-2 border-white shadow-sm flex items-center justify-center text-xl">🥉</div>
            <div class="bg-white w-24 h-20 rounded-t-2xl shadow-lg flex flex-col items-center justify-center border border-slate-100">
              <p class="text-[10px] font-black text-slate-800 truncate px-2">Malika. S</p>
              <p class="text-[9px] font-bold text-blue-600 italic">380 ZP</p>
            </div>
          </div>
        </div>

        <div class="space-y-3 px-1">
          <div v-for="(student, i) in topStudents" :key="i" 
               class="bg-white p-4 rounded-[25px] border border-slate-100 flex items-center justify-between shadow-sm active:bg-slate-50 transition-all">
            <div class="flex items-center gap-4">
              <span class="text-xs font-black text-slate-400 w-4">#{{ i + 4 }}</span>
              <div class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg italic">👤</div>
              <div>
                <p class="text-sm font-black text-slate-800 tracking-tight leading-tight">{{ student.name }}</p>
                <p class="text-[9px] text-slate-400 font-bold uppercase">{{ student.class }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-black text-blue-600 italic">{{ student.coins }} ZP</p>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { ref } from 'vue';

const topStudents = ref([
  { name: 'Sardorbek Sh.', class: '9-B Sinf', coins: '350' },
  { name: 'Guli I.', class: '9-A Sinf', coins: '310' },
  { name: 'Doniyor M.', class: '8-V Sinf', coins: '290' },
  { name: 'Sardor R.', class: '9-B Sinf', coins: '275' },
]);
</script>