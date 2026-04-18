<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()

// Profil ma'lumotlari
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.value?.id)
  .single()

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/')
}

const menuItems = [
  { name: 'Dashboard', path: '/student/dashboard', icon: '🏠' },
  { name: 'Reyting', path: '/student/reyting', icon: '🏆' },
  { name: 'Mening tarixim', path: '/student/history', icon: '⏳' },
  { name: 'NFT Karta', path: '/student/nft-card', icon: '💳' },
  { name: 'Darsliklar', path: '/student/books', icon: '📚' },
  { name: 'Hamyonim', path: '/student/wallet', icon: '💰' },
  { name: 'Profil', path: '/student/profile', icon: '👤' },
]

const stats = ref([
  { name: "Balans (ZK)", value: "2,450", change: "+320 bu hafta", icon: "💰", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Maktab Reytingi", value: "#12", change: "Top 5%", icon: "🏆", color: "text-amber-500", bg: "bg-amber-500/10" },
  { name: "Sinf Reytingi", value: "#3", change: "+2 pozitsiya", icon: "🥇", color: "text-emerald-500", bg: "bg-emerald-500/10" }
])

const recentActivity = ref([
  { id: 1, title: "Matematika uy vazifasi", time: "2 soat oldin", amount: "+50", icon: "📚", color: "text-blue-400" },
  { id: 2, title: "Science Quiz - Top Score", time: "5 soat oldin", amount: "+120", icon: "🧪", color: "text-amber-400" },
  { id: 3, title: "Haftalik davomat bonusi", time: "Kecha", amount: "+80", icon: "✅", color: "text-emerald-400" }
])
</script>

<template>
  <div class="min-h-screen bg-[#0B0F17] text-slate-200 flex font-sans selection:bg-blue-500/30">
    
    <aside class="w-72 bg-[#111827]/80 backdrop-blur-xl border-r border-white/5 flex flex-col sticky top-0 h-screen z-50">
      <div class="p-8">
        <div class="flex items-center gap-3 group">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] group-hover:rotate-12 transition-all">
            <span class="text-white font-black italic text-xl">Z</span>
          </div>
          <h1 class="text-2xl font-black tracking-tighter italic text-white">ZUKKOPAY</h1>
        </div>
      </div>
      
      <nav class="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <NuxtLink v-for="item in menuItems" :key="item.path" :to="item.path" 
          class="flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 group relative overflow-hidden"
          :class="route.path === item.path 
            ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' 
            : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'">
          <span class="text-xl group-hover:scale-110 transition-transform">{{ item.icon }}</span>
          <span class="tracking-tight">{{ item.name }}</span>
          <div v-if="route.path === item.path" class="absolute right-0 w-1 h-6 bg-blue-500 rounded-l-full shadow-[0_0_15px_#3b82f6]"></div>
        </NuxtLink>
      </nav>

      <div class="p-6 mt-auto">
        <button @click="handleLogout" class="w-full group flex items-center justify-center gap-3 p-4 bg-red-500/5 hover:bg-red-500 transition-all rounded-2xl border border-red-500/20 hover:border-red-500">
          <span class="text-red-500 group-hover:text-white font-black uppercase text-xs tracking-widest transition-colors">Chiqish</span>
          <span class="group-hover:translate-x-1 transition-transform">🚪</span>
        </button>
      </div>
    </aside>

    <main class="flex-1 p-10 overflow-y-auto">
      
      <header class="flex justify-between items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <div class="flex items-center gap-6">
          <div class="relative">
            <div class="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-500/20 uppercase">
               {{ profile?.full_name?.[0] }}
            </div>
            <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0B0F17] rounded-full"></div>
          </div>
          <div>
            <h2 class="text-3xl font-black text-white leading-tight italic">What's good, {{ profile?.full_name?.split(' ')[0] }}!</h2>
            <p class="text-slate-500 font-medium italic text-sm">Har bir coin sizni ulug'likka yaqinlashtiradi.</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <button class="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all relative">
            <span class="text-xl">🔔</span>
            <span class="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </button>
          <div class="h-10 w-[1px] bg-white/10 mx-2"></div>
          <div class="text-right">
            <p class="font-black text-white text-sm uppercase">{{ profile?.username }}</p>
            <p class="text-[10px] text-blue-500 font-black tracking-widest uppercase">9-A O'quvchisi</p>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-3 gap-8 mb-12">
        <div v-for="stat in stats" :key="stat.name" 
          class="bg-[#161B26] p-8 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer relative overflow-hidden shadow-2xl">
          <div class="flex justify-between items-start mb-6">
            <div :class="stat.bg" class="p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500">
              <span class="text-2xl">{{ stat.icon }}</span>
            </div>
            <span class="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">{{ stat.change }}</span>
          </div>
          <p class="text-slate-400 font-bold text-xs uppercase tracking-[2px] mb-1">{{ stat.name }}</p>
          <p class="text-4xl font-black text-white italic tracking-tighter group-hover:translate-x-2 transition-transform">{{ stat.value }}</p>
          <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-all"></div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-8 mb-12 italic">
        
        <div class="col-span-7">
          <p class="text-[10px] font-black uppercase tracking-[4px] text-slate-500 mb-4">NFT PASS</p>
          <div class="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 h-72 rounded-[40px] p-10 text-white shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] overflow-hidden group">
             <div class="flex justify-between items-start mb-16 relative z-10">
                <div class="space-y-1">
                  <p class="text-[10px] uppercase tracking-widest opacity-70">Digital Identity</p>
                  <p class="text-2xl font-black tracking-tighter">ZUKKOPAY</p>
                </div>
                <div class="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center">
                   <span class="text-2xl">💳</span>
                </div>
             </div>
             
             <div class="relative z-10 flex justify-between items-end">
                <div>
                  <p class="font-mono text-2xl tracking-[6px] mb-4">4592 **** **** 7821</p>
                  <p class="text-xs font-bold uppercase tracking-widest opacity-80">{{ profile?.full_name }}</p>
                </div>
                <div class="text-right">
                  <p class="text-[8px] uppercase tracking-widest opacity-50 mb-1">Valid Thru</p>
                  <p class="font-black">06/27</p>
                </div>
             </div>

             <div class="absolute top-[-20%] right-[-10%] w-80 h-80 bg-white/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
        </div>

        <div class="col-span-5 bg-[#161B26] rounded-[40px] p-10 border border-white/5 relative overflow-hidden shadow-xl">
          <div class="flex items-center gap-3 mb-8">
            <span class="text-2xl bg-amber-500/10 p-2 rounded-xl">🎁</span>
            <h3 class="text-xl font-black text-white italic">Keyingi Sovg'a</h3>
          </div>
          <h4 class="text-2xl font-black text-white mb-2">School Uniform Voucher</h4>
          <p class="text-slate-500 text-sm mb-8">Yana 500 ZK to'plang va vaucherni oching!</p>
          
          <div class="space-y-4">
             <div class="flex justify-between text-[10px] font-black uppercase tracking-widest text-blue-500">
                <span>Progress</span>
                <span>1,300 / 2,000 ZK</span>
             </div>
             <div class="h-4 bg-white/5 rounded-full p-1 border border-white/5">
                <div class="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" style="width: 65%"></div>
             </div>
          </div>
          <div class="absolute -right-4 -bottom-4 text-9xl opacity-5 rotate-12">🎮</div>
        </div>
      </div>

      <div class="bg-[#161B26] rounded-[40px] p-10 border border-white/5 shadow-2xl italic">
        <div class="flex justify-between items-center mb-10">
          <h3 class="text-xl font-black text-white flex items-center gap-3">
             <span class="w-2 h-8 bg-blue-600 rounded-full"></span> Oxirgi amallar
          </h3>
          <button class="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Hammasini ko'rish</button>
        </div>

        <div class="space-y-4">
          <div v-for="item in recentActivity" :key="item.id" 
            class="flex items-center justify-between p-6 bg-[#1F2937]/50 rounded-[28px] border border-white/5 hover:bg-blue-600 transition-all duration-300 group cursor-pointer">
            <div class="flex items-center gap-6">
              <span class="text-3xl group-hover:scale-125 transition-transform duration-300">{{ item.icon }}</span>
              <div>
                <p class="font-black text-slate-200 group-hover:text-white transition-colors text-lg">{{ item.title }}</p>
                <p class="text-xs text-slate-500 group-hover:text-blue-100 transition-colors">{{ item.time }}</p>
              </div>
            </div>
            <div class="text-right">
               <p class="text-2xl font-black text-emerald-400 group-hover:text-white transition-all">{{ item.amount }} <span class="text-xs italic">ZK</span></p>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
</style>