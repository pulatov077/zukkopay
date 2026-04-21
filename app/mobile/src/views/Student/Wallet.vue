<template>
  <ion-page>
    <ion-content class="ion-padding-horizontal bg-slate-50/50" :fullscreen="true">
      <div class="max-w-[450px] mx-auto min-h-screen pb-10">
        
        <div class="pt-8 mb-6 px-1">
          <h2 class="text-2xl font-black text-slate-900 italic uppercase">Mening Hamyonim</h2>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">To'lovlar va o'tkazmalar</p>
        </div>

        <div class="bg-white rounded-[35px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center mb-8">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">To'lov uchun QR-kod</p>
          
          <div class="w-48 h-48 bg-slate-50 rounded-3xl border-4 border-blue-600/10 flex items-center justify-center p-4">
             <div class="grid grid-cols-2 gap-2 opacity-20">
                <div class="w-16 h-16 bg-slate-900"></div>
                <div class="w-16 h-16 bg-slate-900"></div>
                <div class="w-16 h-16 bg-slate-900"></div>
                <div class="w-16 h-16 bg-slate-900"></div>
             </div>
             <span class="absolute text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase italic">ZukkoPay ID: 8842</span>
          </div>

          <div class="mt-6 text-center">
            <h1 class="text-3xl font-black text-slate-900 italic">450,000 <span class="text-xs not-italic text-slate-400 font-medium ml-1 uppercase">uzs</span></h1>
            <p class="text-[10px] font-bold text-green-500 uppercase tracking-tighter mt-1 italic">Faol balans</p>
          </div>
        </div>

        <div class="px-1">
          <h3 class="text-lg font-black text-slate-800 italic uppercase tracking-tighter mb-4">Pul o'tkazmalari</h3>
          
          <div class="space-y-3">
            <div v-for="(tx, i) in transactions" :key="i" 
                 class="bg-white p-4 rounded-[25px] border border-slate-100 flex items-center justify-between shadow-sm active:scale-95 transition-all">
              <div class="flex items-center gap-3">
                <div :class="tx.type === 'plus' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'" 
                     class="w-10 h-10 rounded-full flex items-center justify-center text-lg">
                  {{ tx.type === 'plus' ? '⇣' : '⇡' }}
                </div>
                <div>
                  <p class="text-sm font-black text-slate-800 tracking-tight leading-tight">{{ tx.title }}</p>
                  <p class="text-[9px] text-slate-400 font-bold uppercase">{{ tx.date }}</p>
                </div>
              </div>
              <div class="text-right">
                <p :class="tx.type === 'plus' ? 'text-green-600' : 'text-slate-800'" class="text-sm font-black tracking-tight">
                  {{ tx.type === 'plus' ? '+' : '-' }}{{ tx.amount }} UZS
                </p>
                <p class="text-[9px] text-slate-400 font-bold italic">{{ tx.status }}</p>
              </div>
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

const transactions = ref([
  { title: 'Ona tili (Baho uchun)', amount: '5,000', type: 'plus', date: 'Bugun, 14:20', status: 'Tushirildi' },
  { title: 'Maktab Oshxonasi', amount: '12,500', type: 'minus', date: 'Bugun, 12:30', status: 'To\'landi' },
  { title: 'Informatika (Baho uchun)', amount: '10,000', type: 'plus', date: 'Kecha, 09:15', status: 'Tushirildi' },
  { title: 'Kitob xaridi', amount: '35,000', type: 'minus', date: '15-Aprel', status: 'To\'landi' },
]);
</script>