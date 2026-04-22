<template>
  <ion-page>
    <ion-content class="ion-padding bg-white">
      <div class="min-h-full flex flex-col max-w-md mx-auto py-8">
        
        <div class="mb-10 text-slate-800">
          <button @click="router.back()" class="p-2 -ml-2 text-slate-400 active:scale-90 transition-transform cursor-pointer">
            <span class="text-2xl font-bold">←</span>
          </button>
          <div class="mt-4">
            <h2 class="text-3xl font-black text-slate-900 tracking-tight italic uppercase">ZukkoPay</h2>
            <h3 class="text-xl font-bold text-slate-800 tracking-tight">Hisob yaratish</h3>
            <p class="text-slate-400 text-sm font-medium mt-1">Kelajak ta'lim ekotizimiga qo'shiling</p>
          </div>
        </div>

        <div class="mb-8">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Men bu...</label>
          <div class="flex gap-3">
            <button 
              @click="userRole = 'student'"
              :class="userRole === 'student' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 border-slate-100 text-slate-400'"
              class="flex-1 py-4 rounded-[24px] border font-black text-[11px] uppercase tracking-wider transition-all"
            >
              👨‍🎓 O'quvchi
            </button>
            <button 
              @click="userRole = 'parent'"
              :class="userRole === 'parent' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 border-slate-100 text-slate-400'"
              class="flex-1 py-4 rounded-[24px] border font-black text-[11px] uppercase tracking-wider transition-all"
            >
              👨‍👩‍👧 Ota-ona
            </button>
          </div>
        </div>

        <div class="space-y-5">
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefon raqam</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">+998</span>
              <input 
                v-model="phoneNumber"
                type="tel" 
                maxlength="9"
                placeholder="90 123 45 67" 
                class="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-[24px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-normal"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Xavfsiz parol</label>
            <input 
              v-model="password"
              type="password" 
              placeholder="••••••••" 
              class="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-[24px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-normal"
            />
          </div>

          <div class="bg-slate-50/50 border border-slate-100 p-5 rounded-[28px] space-y-3">
            <div class="flex justify-between items-center mb-1">
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-wider text-slate-400">Xavfsizlik darajasi</span>
              <span :class="isPasswordStrong ? 'text-green-500' : 'text-orange-400'" class="text-[10px] font-bold uppercase">
                {{ isPasswordStrong ? 'Kuchli' : 'Kuchsiz' }}
              </span>
            </div>
            
            <div class="flex gap-1 h-1">
              <div v-for="n in 4" :key="n" 
                   :class="strengthCount >= n ? (isPasswordStrong ? 'bg-green-500' : 'bg-orange-400') : 'bg-slate-200'"
                   class="flex-1 rounded-full transition-all duration-500">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 mt-4">
              <div v-for="(val, key) in reqLabels" :key="key" 
                   :class="requirements[key] ? 'text-green-600' : 'text-slate-300'"
                   class="flex items-center text-[10px] font-bold transition-all">
                <span class="mr-1.5 text-xs">{{ requirements[key] ? '●' : '○' }}</span> {{ val }}
              </div>
            </div>
          </div>

          <div class="pt-4">
            <button 
              @click="handleRegister"
              :disabled="!isFormValid"
              class="w-full py-4 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg"
              :class="isFormValid 
                ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95 cursor-pointer' 
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'"
            >
              {{ userRole === 'student' ? 'O\'quvchi sifatida davom etish' : 'Ota-ona sifatida davom etish' }}
            </button>
          </div>
        </div>

        <div class="mt-auto pt-8 text-center">
          <p class="text-slate-400 text-xs font-medium">
            Akkauntingiz bormi? 
            <button @click="router.push('/login')" class="text-blue-600 font-bold ml-1 cursor-pointer">Kirish</button>
          </p>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Input qiymatlari
const phoneNumber = ref('');
const password = ref('');
const userRole = ref('student'); // Default rol: student

// Parol talablari matnlari
const reqLabels = {
  length: '8+ belgi',
  uppercase: 'Katta harf',
  number: 'Raqamlar',
  symbol: 'Belgilar'
};

// Parol tekshiruvi (Computed)
const requirements = computed(() => ({
  length: password.value.length >= 8,
  uppercase: /[A-Z]/.test(password.value),
  number: /[0-9]/.test(password.value),
  symbol: /[^A-Za-z0-9]/.test(password.value)
}));

const strengthCount = computed(() => {
  return Object.values(requirements.value).filter(Boolean).length;
});

const isPasswordStrong = computed(() => strengthCount.value === 4);

const isFormValid = computed(() => {
  return phoneNumber.value.length === 9 && isPasswordStrong.value;
});

// Registratsiya va Dashboardga yo'naltirish
const handleRegister = () => {
  if (isFormValid.value) {
    console.log(`Ro'yxatdan o'tish (${userRole.value}):`, phoneNumber.value);
    
    // Rolga qarab dashboardga o'tkazamiz
    if (userRole.value === 'student') {
      router.push('/Student/dashboard');
    } else {
      router.push('/Parent/dashboard');
    }
  }
};
</script>

<style scoped>
</style>