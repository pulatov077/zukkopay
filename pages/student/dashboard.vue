<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()

// O'quvchi ma'lumotlarini olish
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.value?.id)
  .single()

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/')
}

// O'quvchi uchun statistikalar
const stats = ref([
  { name: "Mening Balansim", value: "1,250", icon: "💰", color: "bg-amber-500", label: "Zukko Coins" },
  { name: "Maktabda", value: "12-o'rin", icon: "🏆", color: "bg-blue-600", label: "Umumiy reyting" },
  { name: "Sinfda", value: "2-o'rin", icon: "🥇", color: "bg-emerald-500", label: "9-A sinfida" }
])

// Oxirgi olingan coinlar
const recentTransactions = ref([
  { id: 1, reason: "Matematika darsida faollik", amount: "+50", date: "Bugun", icon: "📚" },
  { id: 2, reason: "Choraklik yakuni mukofoti", amount: "+500", date: "Kecha", icon: "🎁" },
  { id: 3, reason: "Maktab tadbirida ishtirok", amount: "+100", date: "24 Fevral", icon: "🎭" }
])
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex">
    <aside class="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
      <div class="p-8">
        <h1 class="text-2xl font-black text-blue-600 tracking-tight italic">ZUKKOPAY</h1>
      </div>
      
      <nav class="flex-1 px-4 space-y-2">
        <NuxtLink to="/student/dashboard" 
          class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-300 bg-blue-600 text-white shadow-lg shadow-blue-100">
          <span class="text-xl">🏠</span> Dashboard
        </NuxtLink>

        <NuxtLink to="/student/reyting" 
          class="flex items-center gap-3 p-4 text-slate-500 hover:bg-slate-50 rounded-2xl transition font-medium">
          <span class="text-xl">🏆</span> Reyting
        </NuxtLink>

        <NuxtLink to="/student/history" 
          class="flex items-center gap-3 p-4 text-slate-500 hover:bg-slate-50 rounded-2xl transition font-medium">
          <span class="text-xl">⏳</span> Mening tarixim
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-slate-100">
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition">
          <span>Chiqish</span> 🚪
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8">
      <header class="flex justify-between items-center mb-12">
        <div>
          <h2 class="text-3xl font-black text-slate-900 leading-tight">Salom, {{ profile?.full_name?.split(' ')[0] || 'O\'quvchi' }}! ✨</h2>
          <p class="text-slate-500 mt-1 font-medium italic text-sm">Bilim — eng katta boylik, Zukko Coin esa uning mevasi!</p>
        </div>
        
        <div class="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-sm border border-slate-100">
          <div class="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner border-2 border-white">
            {{ profile?.full_name?.[0] }}
          </div>
          <div>
            <p class="font-bold text-slate-900 leading-none">{{ profile?.full_name }}</p>
            <p class="text-[10px] text-amber-600 font-black uppercase tracking-widest mt-1">O'quvchi • {{ profile?.username }}</p>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-3 gap-8 mb-12">
        <div v-for="stat in stats" :key="stat.name" class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
          <div :class="stat.color" class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-opacity-20 group-hover:scale-110 transition-transform">
            {{ stat.icon }}
          </div>
          <p class="text-slate-400 font-bold text-xs uppercase tracking-widest">{{ stat.name }}</p>
          <div class="flex items-baseline gap-2">
            <p class="text-4xl font-black text-slate-900 mt-1">{{ stat.value }}</p>
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-8 bg-white rounded-[48px] p-10 shadow-sm border border-slate-100">
          <h3 class="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
             <span class="bg-blue-50 p-2 rounded-xl text-blue-600">📊</span> Oxirgi daromadlar
          </h3>
          <div class="space-y-4">
            <div v-for="item in recentTransactions" :key="item.id" class="flex items-center justify-between p-5 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100 group">
              <div class="flex items-center gap-5">
                <span class="text-3xl">{{ item.icon }}</span>
                <div>
                  <p class="font-black text-slate-800">{{ item.reason }}</p>
                  <p class="text-xs text-slate-400 font-bold">{{ item.date }}</p>
                </div>
              </div>
              <p class="text-2xl font-black text-emerald-500">{{ item.amount }} <span class="text-xs">ZK</span></p>
            </div>
          </div>
        </div>

        <div class="col-span-4 space-y-8">
          <div class="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
            <h3 class="text-xl font-black mb-6 relative z-10 italic">🎁 Sovg'aga yaqinmiz!</h3>
            <p class="text-slate-400 text-sm mb-6 relative z-10">2,000 ZK to'planganda "Maktab formasi uchun vaucher"ga ega bo'lasiz!</p>
            
            <div class="relative z-10">
              <div class="flex justify-between text-xs font-black uppercase mb-2">
                <span class="text-blue-400">Progress</span>
                <span>65%</span>
              </div>
              <div class="h-4 bg-white/10 rounded-full border border-white/10 p-1">
                <div class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style="width: 65%"></div>
              </div>
            </div>
            
            <div class="absolute -right-10 -bottom-10 text-[150px] opacity-10 rotate-12 select-none">🎮</div>
          </div>

          <div class="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[40px] p-8 text-white shadow-lg shadow-amber-200 group cursor-pointer">
            <h3 class="text-xl font-black mb-2">🏆 TOP O'quvchi</h3>
            <p class="text-white/80 text-sm font-medium mb-4">Sinfingizda 2-o'rindasiz! 1-o'rin bilan farq: <span class="font-black underline">120 ZK</span></p>
            <div class="bg-white/20 py-2 px-4 rounded-xl text-center font-black text-xs uppercase tracking-widest group-hover:bg-white/30 transition">
              Reytingni ko'rish
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>