<script setup>
const searchQuery = ref('')
const topStudents = ref([
  { rank: 1, name: "Asilbek To'lqinova", coins: 2500, class: "9-A" },
  { rank: 2, name: "Jasur Jumaboyev", coins: 2350, class: "11-B" },
  { rank: 3, name: "Malika Akramova", coins: 2200, class: "10-A" },
  { rank: 4, name: "Sirojiddin Fayz", coins: 2100, class: "8-C" },
  { rank: 5, name: "Guli Anvarova", coins: 1950, class: "9-A" }
])

const topClasses = ref([
  { name: "9-A", totalCoins: 15400, color: "bg-blue-500" },
  { name: "10-B", totalCoins: 12100, color: "bg-purple-500" },
  { name: "11-C", totalCoins: 10500, color: "bg-emerald-500" },
  { name: "8-B", totalCoins: 9800, color: "bg-amber-500" }
])

const handleLogout = async () => {
  const supabase = useSupabaseClient()
  await supabase.auth.signOut()
  navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex">
    <aside class="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
      <div class="p-8">
        <h1 class="text-2xl font-black text-blue-600 tracking-tight italic">ZUKKOPAY</h1>
      </div>
      <nav class="flex-1 px-4 space-y-2">
        <NuxtLink to="/director/dashboard" class="flex items-center gap-3 p-4 text-slate-500 hover:bg-slate-50 rounded-2xl transition font-medium">
          <span>📊</span> Dashboard
        </NuxtLink>
        <div class="flex items-center gap-3 p-4 text-slate-500 hover:bg-slate-50 rounded-2xl transition cursor-pointer font-medium">
          <span>👥</span> O'quvchilar
        </div>
        <NuxtLink to="/director/davomat" class="flex items-center gap-3 p-4 text-slate-500 hover:bg-slate-50 rounded-2xl transition font-medium">
          <span>📅</span> Davomat
        </NuxtLink>
        <NuxtLink to="/director/reyting" class="flex items-center gap-3 p-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100">
          <span>🏆</span> Reyting
        </NuxtLink>
        <div class="flex items-center gap-3 p-4 text-slate-500 hover:bg-slate-50 rounded-2xl transition cursor-pointer font-medium">
          <span>⚙️</span> Sozlamalar
        </div>
      </nav>
      <div class="p-4 border-t border-slate-100">
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition">
          <span>Logout</span> 🚪
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8 overflow-y-auto">
      <div class="flex justify-between items-center mb-12">
        <div>
          <h1 class="text-3xl font-black text-slate-900 leading-tight">🏆 Maktab Reytingi</h1>
          <p class="text-slate-500 font-medium">Eng faol o'quvchilar va sinflar ro'yxati</p>
        </div>
        <div class="relative w-96 group">
          <input v-model="searchQuery" type="text" placeholder="Ism yoki sinf orqali qidirish..." class="w-full p-5 pl-14 bg-white rounded-3xl border border-slate-100 outline-none focus:ring-4 focus:ring-blue-500/5 shadow-sm transition-all" />
          <span class="absolute left-6 top-5 opacity-40 text-xl group-focus-within:text-blue-600 transition-colors cursor-default">🔍</span>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-8 bg-white rounded-[48px] p-10 shadow-sm border border-slate-100">
          <h3 class="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
             <span class="bg-amber-100 p-2 rounded-xl">⭐</span> Top 10 O'quvchi
          </h3>
          <div class="space-y-3">
            <div v-for="std in topStudents" :key="std.rank" class="flex items-center justify-between p-5 bg-slate-50 rounded-[28px] hover:bg-blue-50 hover:scale-[1.01] transition-all cursor-pointer border border-transparent hover:border-blue-100 group">
              <div class="flex items-center gap-6">
                <span :class="std.rank === 1 ? 'bg-amber-400' : std.rank === 2 ? 'bg-slate-300' : 'bg-white'" class="w-12 h-12 flex items-center justify-center font-black rounded-2xl text-lg shadow-sm group-hover:shadow-md transition">
                  {{ std.rank }}
                </span>
                <div>
                  <p class="font-black text-slate-800 group-hover:text-blue-600 transition">{{ std.name }}</p>
                  <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest">{{ std.class }} SINF</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-2xl font-black text-slate-900">{{ std.coins.toLocaleString() }} <span class="text-amber-500 text-xs">ZK</span></p>
                <p class="text-[10px] text-slate-400 font-black uppercase">To'plangan ball</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-4 space-y-8">
          <div class="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
            <div class="relative z-10">
              <h3 class="text-xl font-black mb-10 italic flex items-center gap-2">
                🏆 Kuchli Sinflar
              </h3>
              <div class="space-y-8">
                <div v-for="(cls, index) in topClasses" :key="cls.name" class="relative">
                  <div class="flex justify-between mb-3 items-end">
                    <span class="font-black text-sm uppercase tracking-widest text-slate-400">{{ cls.name }} Sinf</span>
                    <span class="text-amber-400 font-black text-lg">{{ cls.totalCoins.toLocaleString() }} ZK</span>
                  </div>
                  <div class="h-4 bg-white/5 rounded-full p-1 border border-white/5">
                    <div class="h-full rounded-full transition-all duration-1000" :class="cls.color" :style="{ width: (100 - index * 15) + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/40 transition-all"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>