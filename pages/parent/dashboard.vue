<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()

// Ota-ona profil ma'lumotlarini olish
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.value?.id)
  .single()

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/')
}

// Farzandining statistikasi (Real loyihada databasedan keladi)
const childStats = ref({
  name: "Asilbek To'lqinova",
  class: "9-A",
  totalCoins: 1250,
  nftBalance: "85,000",
  attendance: "Kelgan",
  rank: 12
})

// Dashboarddagi asosiy statlar
const stats = ref([
  { name: "Farzand balansi", value: "1,250", icon: "💰", color: "bg-amber-500", unit: "ZK", link: "/parent/dashboard" },
  { name: "NFT Hamyon", value: "85,000", icon: "💳", color: "bg-blue-600", unit: "SO'M", link: "/parent/wallet" },
  { name: "Bugungi davomat", value: "Maktabda", icon: "✅", color: "bg-emerald-500", unit: "08:15 da kirdi", link: "/parent/attendance" }
])

const childHistory = ref([
  { id: 1, teacher: "O'qituvchi: Ravshanov J.", reason: "Matematika darsida faollik", amount: "+50", time: "Bugun, 10:45" },
  { id: 2, teacher: "Direktorat", reason: "Choraklik yakuni mukofoti", amount: "+500", time: "Kecha, 14:20" },
  { id: 3, teacher: "O'qituvchi: Karimova S.", reason: "Odob-axloq qoidalariga rioya", amount: "+20", time: "24 Fevral" }
])
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex">
    <aside class="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
      <div class="p-8">
        <h1 class="text-2xl font-black text-blue-600 tracking-tight italic uppercase">ZUKKOPAY</h1>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[3px] mt-1">Ota-ona nazorati</p>
      </div>
      
      <nav class="flex-1 px-4 space-y-2">
        <NuxtLink to="/parent/dashboard" 
          class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-300"
          :class="route.path === '/parent/dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'">
          <span class="text-xl">🏠</span> Dashboard
        </NuxtLink>

        <NuxtLink to="/parent/wallet" 
          class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-300 text-slate-500 hover:bg-slate-50">
          <span class="text-xl">💳</span> Hamyon va Baho
        </NuxtLink>

        <NuxtLink to="/parent/attendance" 
          class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-300 text-slate-500 hover:bg-slate-50">
          <span class="text-xl">📅</span> Davomat Tarixi
        </NuxtLink>

        <NuxtLink to="/parent/rewards" 
          class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-300 text-slate-500 hover:bg-slate-50">
          <span class="text-xl">🎁</span> Sovg'alar ro'yxati
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-slate-100">
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all active:scale-95">
          <span>Chiqish</span> 🚪
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8 overflow-y-auto">
      <header class="flex justify-between items-center mb-12">
        <div>
          <h2 class="text-3xl font-black text-slate-900 leading-tight italic">Xush kelibsiz, {{ profile?.full_name?.split(' ')[0] || 'Ota-ona' }}!</h2>
          <p class="text-slate-500 mt-1 font-medium italic">Farzandingizning bugungi natijalari</p>
        </div>
        
        <div class="flex items-center gap-4 bg-slate-900 p-2 pr-6 rounded-full shadow-2xl border-4 border-white">
          <div class="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-black text-xl border-2 border-slate-700">
            {{ childStats.name[0] }}
          </div>
          <div>
            <p class="font-bold text-white leading-none text-sm">{{ childStats.name }}</p>
            <p class="text-[10px] text-blue-400 font-black uppercase tracking-widest mt-1">{{ childStats.class }} o'quvchisi</p>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-3 gap-8 mb-12">
        <NuxtLink v-for="stat in stats" :key="stat.name" :to="stat.link" 
          class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <div :class="stat.color" class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
            {{ stat.icon }}
          </div>
          <p class="text-slate-400 font-bold text-[10px] uppercase tracking-[2px]">{{ stat.name }}</p>
          <p class="text-3xl font-black text-slate-900 mt-1 uppercase">{{ stat.value }} <span class="text-xs text-slate-400 font-bold">{{ stat.unit }}</span></p>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-8 bg-white rounded-[48px] p-10 shadow-sm border border-slate-100 relative overflow-hidden">
          <h3 class="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 italic">
             <span class="bg-amber-100 p-2 rounded-xl text-amber-600 text-lg">📝</span> Oxirgi amallar
          </h3>
          
          <div class="space-y-6 relative z-10">
            <div v-for="item in childHistory" :key="item.id" class="flex items-center justify-between group p-4 hover:bg-slate-50 rounded-3xl transition-all">
              <div class="flex items-center gap-4">
                <div class="w-1.5 h-10 bg-blue-100 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                <div>
                  <p class="font-black text-slate-800 group-hover:text-blue-600 transition">{{ item.reason }}</p>
                  <p class="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{{ item.teacher }} • {{ item.time }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xl font-black text-emerald-500">{{ item.amount }} ZK</p>
              </div>
            </div>
          </div>
          
          <NuxtLink to="/parent/rewards" class="block w-full mt-10 py-4 bg-slate-50 text-center rounded-2xl font-black text-slate-400 hover:bg-blue-600 hover:text-white transition-all uppercase text-xs tracking-widest">
            Barcha tarixni ko'rish
          </NuxtLink>
        </div>

        <div class="col-span-4 space-y-8">
          <NuxtLink to="/parent/wallet" class="block bg-blue-600 rounded-[40px] p-8 text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
            <h3 class="text-xl font-black mb-2 italic">Hamyon va Baho</h3>
            <p class="text-blue-100 text-sm font-medium mb-6">Farzandingiz haftalik limitiga yetishi uchun oz qoldi!</p>
            <div class="bg-white/20 p-4 rounded-2xl flex items-center justify-between">
              <span class="font-black text-xs uppercase tracking-widest">Tekshirish</span>
              <span class="text-xl group-hover:translate-x-2 transition-transform">➡️</span>
            </div>
            <div class="absolute -right-5 -bottom-5 text-[100px] opacity-10 -rotate-12 select-none">💳</div>
          </NuxtLink>

          <div class="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
            <h3 class="text-lg font-black text-slate-900 mb-6 italic">🏆 Reyting ko'rsatkichlari</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-slate-400 font-bold text-xs uppercase tracking-wider">Sinfda:</span>
                <span class="font-black text-blue-600 text-xl">{{ childStats.rank }}-o'rin</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-400 font-bold text-xs uppercase tracking-wider">Maktabda:</span>
                <span class="font-black text-slate-800 text-xl">142-o'rin</span>
              </div>
            </div>
            <hr class="my-6 border-slate-50" />
            <p class="text-[10px] text-slate-400 font-black text-center leading-relaxed uppercase tracking-tighter">Reyting har dushanba yangilanadi</p>
            <div class="absolute -right-2 -bottom-2 text-5xl opacity-5 group-hover:scale-125 transition-transform duration-700">🥇</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>