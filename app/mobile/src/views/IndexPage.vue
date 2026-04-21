<template>
  <ion-page>
    <ion-content class="ion-padding bg-white">
      <div class="min-h-full flex flex-col items-center justify-between py-12">
        
        <div class="text-center mt-6">
          <div class="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-3 shadow-lg shadow-blue-200">
            ZP
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight">
            ZUKKO<span class="text-blue-600">PAY</span>
          </h1>
          <p class="text-slate-400 mt-1 text-sm font-medium italic text-balance">Bilim — eng yaxshi sarmoya!</p>
        </div>

        <div class="w-full max-w-sm px-4">
          <p class="text-center text-slate-500 font-bold text-[10px] uppercase tracking-[4px] mb-8">Tizimga kirish</p>
          
          <div class="grid grid-cols-2 gap-4">
            
            <div @click="selectRole('parent')" 
                 class="bg-slate-50 border border-slate-100 p-6 rounded-[32px] text-center transition-all duration-300 active:scale-90 hover:bg-white hover:shadow-xl hover:shadow-blue-50 hover:border-blue-100 group">
              <div class="text-4xl mb-3 filter grayscale-[0.5] group-hover:grayscale-0 transition-all">👨‍👩‍👦</div>
              <h3 class="font-black text-sm text-slate-800 uppercase tracking-tighter">Ota-ona</h3>
              <p class="text-slate-400 mt-2 text-[10px] leading-tight font-medium">Nazorat va <br> rag'bat</p>
            </div>
     
            <div @click="selectRole('student')" 
                 class="bg-slate-50 border border-slate-100 p-6 rounded-[32px] text-center transition-all duration-300 active:scale-90 hover:bg-white hover:shadow-xl hover:shadow-blue-50 hover:border-blue-100 group">
              <div class="text-4xl mb-3 filter grayscale-[0.5] group-hover:grayscale-0 transition-all">🎓</div>
              <h3 class="font-black text-sm text-slate-800 uppercase tracking-tighter">O'quvchi</h3>
              <p class="text-slate-400 mt-2 text-[10px] leading-tight font-medium">O'qish va <br> daromad</p>
            </div>

          </div>
        </div>

        <div class="text-center">
          <p class="text-slate-300 text-[9px] uppercase tracking-[4px] font-black tracking-widest">ZUKKO TEAM • 2026</p>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const selectRole = (role: string) => {
  router.push({
    path: '/login',
    query: { role: role }
  });
};
</script>

<style scoped>
/* Xatolik bermasligi uchun @apply ni olib tashladik va klasslarni template-ga ko'chirdik */
</style>