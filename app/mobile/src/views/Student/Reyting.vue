<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="min-h-screen bg-[#0d1117] text-white font-sans w-full max-w-[480px] mx-auto pb-40 relative">
        
        <div class="pt-10 pb-6 px-6 flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-white">🏆 Reyting</h1>
            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Top Students</p>
          </div>
          
          <div class="relative flex items-center">
            <input 
              v-if="isSearching"
              v-model="searchQuery"
              type="text"
              placeholder="Ism bo'yicha qidiruv..."
              class="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 w-48 transition-all duration-300 mr-2"
            />
            <button 
              @click="isSearching = !isSearching"
              class="bg-slate-800/50 p-2.5 rounded-2xl border border-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              <span v-if="!isSearching" class="text-xl">🔍</span>
              <span v-else class="text-sm font-bold">X</span>
            </button>
          </div>
        </div>

        <div class="flex gap-2 px-6 mb-8 bg-[#161b22]/50 p-1 rounded-2xl mx-6 border border-slate-800/50">
          <button 
            @click="activeMode = 'school'"
            class="flex-1 py-2.5 rounded-xl font-bold text-xs transition-all duration-300"
            :class="activeMode === 'school' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
              : 'text-slate-500 hover:text-slate-300'"
          >
            Maktab
          </button>
          <button 
            @click="activeMode = 'class'"
            class="flex-1 py-2.5 rounded-xl font-bold text-xs transition-all duration-300"
            :class="activeMode === 'class' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
              : 'text-slate-500 hover:text-slate-300'"
          >
            Sinf
          </button>
        </div>

        <div class="px-6 mb-12 flex justify-center items-end gap-3 h-40">
          <div class="flex flex-col items-center w-24">
            <div class="w-16 h-16 rounded-full bg-[#1c2128] border-2 border-slate-400 flex items-center justify-center relative mb-2 shadow-lg">
              <span class="text-lg font-bold text-slate-300">JK</span>
              <div class="absolute -bottom-1 bg-slate-400 text-black text-[9px] font-black px-1.5 rounded-full border-2 border-[#0d1117]">2</div>
            </div>
            <p class="text-[11px] font-bold text-slate-300">James K.</p>
            <p class="text-[10px] text-slate-500 font-mono">4,950 ZK</p>
          </div>

          <div class="flex flex-col items-center w-28">
            <div class="w-20 h-20 rounded-full bg-[#1c2128] border-4 border-amber-400 flex items-center justify-center relative mb-2 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
              <span class="text-2xl font-bold text-amber-400">SM</span>
              <div class="absolute -bottom-1 bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-[#0d1117]">1</div>
            </div>
            <p class="text-[13px] font-black text-amber-400">Sarah M.</p>
            <p class="text-[11px] text-amber-500/80 font-mono">5,820 ZK</p>
          </div>

          <div class="flex flex-col items-center w-24">
            <div class="w-16 h-16 rounded-full bg-[#1c2128] border-2 border-orange-500/70 flex items-center justify-center relative mb-2 shadow-lg">
              <span class="text-lg font-bold text-orange-300">EL</span>
              <div class="absolute -bottom-1 bg-orange-500 text-black text-[9px] font-black px-1.5 rounded-full border-2 border-[#0d1117]">3</div>
            </div>
            <p class="text-[11px] font-bold text-slate-300">Emma L.</p>
            <p class="text-[10px] text-slate-500 font-mono">3,420 ZK</p>
          </div>
        </div>

        <div class="px-6 space-y-3 pb-40">
          <div 
            v-for="student in filteredLeaderboard" 
            :key="student.id"
            class="p-4 rounded-[22px] border transition-all flex items-center justify-between"
            :class="student.name === 'You' 
              ? 'bg-indigo-600/10 border-indigo-500/40 shadow-lg shadow-indigo-900/10' 
              : 'bg-[#161b22] border-slate-800/60'"
          >
            <div class="flex items-center gap-4">
              <div class="w-6 text-center font-black text-sm" :class="student.rank <= 3 ? 'text-amber-400' : 'text-slate-600'">
                {{ student.rank }}
              </div>
              <div 
                class="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold"
                :class="student.name === 'You' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'"
              >
                {{ student.initials }}
              </div>
              <div>
                <p class="font-bold text-[15px] leading-none mb-1">{{ student.name === 'You' ? 'Siz' : student.name }}</p>
                <p class="text-[9px] text-slate-500 uppercase font-bold tracking-wider">{{ activeMode === 'school' ? 'Umumiy' : '9-Sinf' }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-base font-black text-white/90">{{ student.coins.toLocaleString() }}</p>
              <p class="text-[9px] text-slate-500 font-bold uppercase">ZK Tangalar</p>
            </div>
          </div>
        </div>

        <div class="fixed bottom-24 left-6 right-6 max-w-[432px] mx-auto z-30">
          <div class="bg-[#1c2128]/95 backdrop-blur-md border border-indigo-500/30 p-4 rounded-[28px] shadow-2xl flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="bg-indigo-600 w-11 h-11 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/20">
                #{{ yourCurrentRank }}
              </div>
              <div>
                <p class="text-[13px] font-black text-white">Sizning reytingingiz</p>
                <p class="text-[10px] text-slate-400 font-medium">Yuqoriga ko'tarilish uchun +{{ 2400 }} ZK</p>
              </div>
            </div>
            <div class="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <p class="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">YUQORIGA</p>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { ref, computed } from 'vue';

type Student = {
  id: number;
  name: string;
  initials: string;
  coins: number;
  rank: number;
};

const activeMode = ref<'school' | 'class'>('school');
const isSearching = ref(false);
const searchQuery = ref('');

// MA’LUMOTLAR
const schoolStudents: Student[] = [
  { id: 2, name: "Sarah M.", initials: "SM", coins: 5820, rank: 1 },
  { id: 1, name: "James K.", initials: "JK", coins: 4950, rank: 2 },
  { id: 3, name: "Emma L.", initials: "EL", coins: 3420, rank: 3 },
  { id: 12, name: "You", initials: "YO", coins: 3420, rank: 4 },
  { id: 4, name: "Omar R.", initials: "OR", coins: 2850, rank: 5 },
  { id: 5, name: "Nina P.", initials: "NP", coins: 2640, rank: 6 },
  { id: 6, name: "Liam T.", initials: "LT", coins: 2410, rank: 7 },
  { id: 7, name: "Zoe H.", initials: "ZH", coins: 2150, rank: 8 },
];

const classStudents: Student[] = [
  { id: 2, name: "Sarah M.", initials: "SM", coins: 4820, rank: 1 },
  { id: 12, name: "You", initials: "YO", coins: 3420, rank: 2 },
  { id: 1, name: "James K.", initials: "JK", coins: 3120, rank: 3 },
];

const currentList = computed(() => activeMode.value === 'school' ? schoolStudents : classStudents);

// Qidiruv funksiyasi
const filteredLeaderboard = computed(() => {
  if (!searchQuery.value) return currentList.value;
  return currentList.value.filter(s => 
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const yourCurrentRank = computed(() => currentList.value.find(s => s.name === 'You')?.rank || 0);
</script>

<style scoped>
ion-content {
  --background: #0d1117;
}

/* UI elementlarini silliq chiqarish */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

::-webkit-scrollbar {
  display: none;
}
</style>