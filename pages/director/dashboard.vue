<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()

// Oynalarni boshqarish
const showNotifications = ref(false)

// Direktor profil ma'lumotlarini olish
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.value?.id)
  .single()

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/')
}

const stats = ref([
  { name: "O'quvchilar", value: "1,240", icon: "👥", color: "bg-blue-500" },
  { name: "Zukko Coins", value: "45,000", icon: "💰", color: "bg-amber-500" },
  { name: "Sinflar", value: "24", icon: "🏫", color: "bg-emerald-500" }
])

// Bildirishnomalar uchun dummy ma'lumotlar
const notifications = ref([
  { id: 1, title: "Yangi o'quvchi", message: "Ali Valiyev 9-A sinfga qo'shildi", time: "Bugun, 14:00", icon: "👤", color: "text-blue-500" },
  { id: 2, title: "Katta o'tkazma", message: "10-B sinfi 500 ZK yig'di", time: "Kecha, 16:20", icon: "🔥", color: "text-amber-500" },
  { id: 3, title: "Tizim yangilanishi", message: "Reyting algoritmi yangilandi", time: "24 Fevral", icon: "🛠️", color: "text-emerald-500" }
])
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex relative overflow-hidden">
    
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div v-if="showNotifications" class="fixed right-0 top-0 h-full w-[400px] bg-[#1E293B] z-50 shadow-2xl p-8 text-white border-l border-white/10">
        <div class="flex justify-between items-center mb-10">
          <h3 class="text-2xl font-black italic tracking-tight">Bildirishnomalar</h3>
          <button @click="showNotifications = false" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition text-2xl">×</button>
        </div>

        <div class="space-y-6">
          <div v-for="note in notifications" :key="note.id" class="relative pl-6 border-l-2 border-white/10 group hover:border-blue-500 transition-colors">
            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#1E293B] border-2 border-blue-500 group-hover:scale-125 transition-transform"></div>
            <div class="mb-1 flex justify-between items-start">
              <span class="font-black text-sm text-blue-400 uppercase tracking-widest">{{ note.title }}</span>
              <span class="text-[10px] text-slate-500 font-bold uppercase">{{ note.time }}</span>
            </div>
            <p class="text-slate-300 text-sm font-medium leading-relaxed">{{ note.message }}</p>
          </div>
        </div>

        <button class="absolute bottom-8 left-8 right-8 py-4 bg-blue-600 rounded-2xl font-black text-sm hover:bg-blue-700 transition">Barchasini ko'rish</button>
      </div>
    </Transition>

    <aside class="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen z-40">
      <div class="p-8">
        <h1 class="text-2xl font-black text-blue-600 tracking-tight italic uppercase">ZUKKOPAY</h1>
      </div>
      
      <nav class="flex-1 px-4 space-y-2">
        <NuxtLink to="/director/dashboard" 
          class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-300"
          :class="route.path === '/director/dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'">
          <span class="text-xl">📊</span> Dashboard
        </NuxtLink>

        <NuxtLink to="/director/davomat" 
          class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-300"
          :class="route.path === '/director/davomat' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'">
          <span class="text-xl">📅</span> Davomat
        </NuxtLink>

        <NuxtLink to="/director/reyting" 
          class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-300"
          :class="route.path === '/director/reyting' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'">
          <span class="text-xl">🏆</span> Reyting
        </NuxtLink>

        <NuxtLink to="/director/history" 
          class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-300"
          :class="route.path === '/director/history' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'">
          <span class="text-xl">⏳</span> Tarix
        </NuxtLink>

        <NuxtLink to="/director/profile" 
          class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all duration-300"
          :class="route.path === '/director/profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'">
          <span class="text-xl">⚙️</span> Profil
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
          <h2 class="text-3xl font-black text-slate-900 leading-tight">Salom, {{ profile?.full_name || 'Direktor' }}! 👋</h2>
          <p class="text-slate-500 mt-1 font-medium italic">Maktab hayotini raqamlarda kuzating</p>
        </div>
        
        <div class="flex items-center gap-6">
          <button @click="showNotifications = true" class="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-all active:scale-90 group">
            <span class="text-2xl group-hover:rotate-12 transition-transform">🔔</span>
            <span class="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
          </button>

          <NuxtLink to="/director/profile" class="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-sm border border-slate-100 hover:shadow-md transition group">
            <div class="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner border-2 border-white group-hover:scale-105 transition-transform">
              {{ profile?.full_name?.[0] }}
            </div>
            <div class="hidden sm:block">
              <p class="font-bold text-slate-900 leading-none truncate w-32">{{ profile?.full_name }}</p>
              <p class="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-1">Boshqaruvchi</p>
            </div>
          </NuxtLink>
        </div>
      </header>

      <div class="grid grid-cols-3 gap-8 mb-12">
        <div v-for="stat in stats" :key="stat.name" class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div :class="stat.color" class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
            {{ stat.icon }}
          </div>
          <p class="text-slate-400 font-bold text-sm uppercase tracking-wider">{{ stat.name }}</p>
          <p class="text-4xl font-black text-slate-900 mt-1">{{ stat.value }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-8 mb-12">
        <div class="relative overflow-hidden bg-slate-900 rounded-[48px] p-12 text-white shadow-2xl group cursor-default">
          <div class="relative z-10">
            <h3 class="text-3xl font-black mb-4 tracking-tight text-amber-400 italic">🎁 Choraklik Sovg'alar</h3>
            <p class="text-slate-400 font-medium mb-8 leading-relaxed max-w-xs text-sm">
              Chorak yakunlanishiga 12 kun qoldi. Eng yaxshi natija ko'rsatgan o'quvchilarni taqdirlashga tayyormisiz?
            </p>
            <NuxtLink to="/director/reyting" class="inline-block bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-amber-400 transition-all active:scale-95 text-sm uppercase tracking-tighter">
              Reytingni tekshirish
            </NuxtLink>
          </div>
          <div class="absolute -right-10 -bottom-10 text-[180px] opacity-10 rotate-12 select-none group-hover:scale-110 transition-transform duration-500">🏆</div>
        </div>

        <div class="relative overflow-hidden bg-blue-600 rounded-[48px] p-12 text-white shadow-2xl shadow-blue-100 group">
          <div class="relative z-10">
            <h3 class="text-3xl font-black mb-4 tracking-tight italic">🚀 Tezkor Harakat</h3>
            <p class="text-blue-100 font-medium mb-8 text-sm opacity-90">Sinf rahbarlariga ko'rsatma bering yoki tizimga yangi iqtidorlarni qo'shing.</p>
            <div class="flex gap-4">
              <button class="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all text-xs uppercase">
                + O'quvchi
              </button>
              <button class="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all text-xs uppercase">
                💰 Coin tarqatish
              </button>
            </div>
          </div>
          <div class="absolute -right-10 -bottom-10 text-[180px] opacity-20 select-none group-hover:-rotate-12 transition-transform duration-500">💳</div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Bildirishnomalar uchun chiroyli o'tish */
.v-enter-active, .v-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>