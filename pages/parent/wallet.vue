<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Farzandning NFT hamyoni va baholari (Real loyihada Supabase dan keladi)
const walletData = ref({
  childName: "Asilbek To'lqinova",
  nftBalance: 85000,
  gradesThisWeek: 15, // Haftalik olingan 5 baholar soni
  gradeLimit: 20,     // Ota-ona qo'ygan maqsad (limit)
  rewardAmount: 100000, // Limitga yetsa beriladigan pul
  cardNumber: "NFT-7788-2026"
})

const canteenLogs = ref([
  { id: 1, title: "Somsalar va Choy", price: 12000, time: "Bugun, 12:30", type: 'out' },
  { id: 2, title: "Hamyon to'ldirildi", price: 50000, time: "Kecha, 09:00", type: 'in' },
  { id: 3, title: "Mevali sharbat", price: 5500, time: "24 Fevral, 10:15", type: 'out' }
])

const handleTopUp = () => {
  if(walletData.value.gradesThisWeek >= walletData.value.gradeLimit) {
    alert("Tabriklaymiz! Farzandingiz maqsadga erishdi. 100,000 so'm o'tkazilmoqda...")
  } else {
    alert("Hali limitga yetilmadi!")
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex">
    <aside class="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
      <div class="p-8">
        <h1 class="text-2xl font-black text-blue-600 tracking-tight italic">ZUKKOPAY</h1>
      </div>
      <nav class="flex-1 px-4 space-y-2">
        <NuxtLink to="/parent/dashboard" class="flex items-center gap-3 p-4 text-slate-500 hover:bg-slate-50 rounded-2xl transition font-medium">
          <span class="text-xl">🏠</span> Dashboard
        </NuxtLink>
        <NuxtLink to="/parent/wallet" class="flex items-center gap-3 p-4 rounded-2xl font-bold bg-blue-600 text-white shadow-lg shadow-blue-100">
          <span class="text-xl">💳</span> Hamyon va Baho
        </NuxtLink>
      </nav>
    </aside>

    <main class="flex-1 p-8">
      <header class="mb-12">
        <h2 class="text-3xl font-black text-slate-900">Hamyon va Baho Nazorati 💳</h2>
        <p class="text-slate-500 font-medium italic">Farzandingiz NFT kartasini boshqaring.</p>
      </header>

      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-7 bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
          <div class="flex justify-between items-center mb-8">
            <h3 class="text-xl font-black text-slate-900 italic">Haftalik Maqsad (Baholar)</h3>
            <span class="bg-blue-50 text-blue-600 px-5 py-2 rounded-2xl font-black">{{ walletData.gradesThisWeek }} / {{ walletData.gradeLimit }}</span>
          </div>

          <p class="text-slate-400 font-medium mb-4 text-sm">
            Farzandingiz haftasiga <span class="text-slate-900 font-black">{{ walletData.gradeLimit }} ta "5"</span> baho olsa, uning kartasiga <span class="text-emerald-500 font-black">{{ walletData.rewardAmount.toLocaleString() }} so'm</span> o'tkazishingiz mumkin bo'ladi.
          </p>

          <div class="h-8 bg-slate-50 rounded-full p-1.5 border border-slate-100 mb-10 relative">
            <div 
              class="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-1000 shadow-md"
              :style="{ width: (walletData.gradesThisWeek / walletData.gradeLimit * 100) + '%' }"
            ></div>
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {{ Math.round((walletData.gradesThisWeek / walletData.gradeLimit * 100)) }}% bajarildi
            </span>
          </div>

          <button 
            @click="handleTopUp"
            :disabled="walletData.gradesThisWeek < walletData.gradeLimit"
            :class="walletData.gradesThisWeek >= walletData.gradeLimit ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' : 'bg-slate-200 cursor-not-allowed text-slate-400'"
            class="w-full py-5 rounded-[24px] font-black text-white shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <span>NFT KARTAGA PUL O'TKAZISH</span>
            <span v-if="walletData.gradesThisWeek >= walletData.gradeLimit">🚀</span>
          </button>
        </div>

        <div class="col-span-5 space-y-8">
          <div class="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
            <p class="text-slate-400 font-bold text-[10px] uppercase tracking-[3px] mb-2">Farzand NFT Balansi</p>
            <h3 class="text-5xl font-black mb-10 tracking-tighter">{{ walletData.nftBalance.toLocaleString() }} <span class="text-blue-500 text-lg uppercase">uzs</span></h3>
            
            <div class="flex justify-between items-end">
              <div>
                <p class="text-[10px] text-slate-500 font-black uppercase tracking-widest">Karta raqami</p>
                <p class="font-mono text-sm">{{ walletData.cardNumber }}</p>
              </div>
              <div class="w-12 h-8 bg-white/10 rounded-lg border border-white/10 flex items-center justify-center font-black italic text-xs">NFT</div>
            </div>
            <div class="absolute -right-10 -top-10 text-[150px] opacity-10 rotate-12 select-none">💳</div>
          </div>

          <div class="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
            <h3 class="text-lg font-black text-slate-900 mb-6 italic">Oshxona xarajatlari</h3>
            <div class="space-y-4">
              <div v-for="log in canteenLogs" :key="log.id" class="flex justify-between items-center group">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-8 rounded-full" :class="log.type === 'in' ? 'bg-emerald-400' : 'bg-red-400'"></div>
                  <div>
                    <p class="font-black text-slate-800 text-sm leading-none mb-1">{{ log.title }}</p>
                    <p class="text-[10px] text-slate-400 font-bold uppercase">{{ log.time }}</p>
                  </div>
                </div>
                <p class="font-black text-sm" :class="log.type === 'in' ? 'text-emerald-500' : 'text-slate-900'">
                  {{ log.type === 'in' ? '+' : '-' }}{{ log.price.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>