<template>
  <ion-page>
    <ion-content class="ion-padding bg-slate-50">
      <div class="flex flex-col justify-center h-full max-w-md mx-auto">
        <div class="text-center mb-10">
          <h1 class="text-3xl font-bold text-blue-600 italic">ZukkoPay</h1>
          <p class="text-slate-500 mt-2 text-sm">Tizimga xavfsiz kirish</p>
        </div>

        <div class="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div class="space-y-6">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase">Telefon raqam</label>
              <input 
                type="tel" 
                placeholder="+998 90 000 00 00" 
                class="w-full p-4 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase">Parol</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                class="w-full p-4 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <button class="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform">
              Kirish
            </button>
          </div>
        </div>

        <p class="text-center mt-8 text-slate-600">
          Akkauntingiz yo'qmi? 
          <router-link to="/register" class="text-blue-600 font-bold">Ro'yxatdan o'ting</router-link>
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
</script>