<script setup>
const route = useRoute()
const selectedDate = ref(new Date().toISOString().substr(0, 10))
const stats = ref({ total: 1200, present: 1140, absent: 60 })

const absentStudents = ref([
  { id: 1, name: "Ali Valiyev", class: "9-A", reason: "Sababli" },
  { id: 2, name: "Olim Hakimov", class: "10-B", reason: "Sababsiz" },
  { id: 3, name: "Zuhra Karima", class: "11-C", reason: "Kasal" }
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
        <NuxtLink to="/director/davomat" class="flex items-center gap-3 p-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100">
          <span>📅</span> Davomat
        </NuxtLink>
        <NuxtLink to="/director/reyting" class="flex items-center gap-3 p-4 text-slate-500 hover:bg-slate-50 rounded-2xl transition font-medium">
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

    <main class="flex-1 p-8">
      <header class="flex justify-between items-center mb-10">
        <div>
          <h2 class="text-3xl font-black text-slate-900">📅 Davomat Nazorati</h2>
          <p class="text-slate-500 font-medium">Kunlik davomat hisobotlarini kuzatib boring</p>
        </div>
        <input type="date" v-model="selectedDate" class="p-4 bg-white rounded-2xl border border-slate-200 font-bold text-blue-600 outline-none focus:ring-2 focus:ring-blue-600 shadow-sm" />
      </header>

      <div class="grid grid-cols-3 gap-8 mb-10">
        <div class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
          <p class="text-slate-400 font-bold text-sm uppercase mb-2">Jami O'quvchilar</p>
          <p class="text-4xl font-black text-slate-900">{{ stats.total }}</p>
        </div>
        <div class="bg-emerald-500 p-8 rounded-[40px] shadow-lg shadow-emerald-100 text-white">
          <p class="font-bold text-sm uppercase opacity-80 mb-2">Kelganlar</p>
          <p class="text-4xl font-black">{{ stats.present }} (95%)</p>
        </div>
        <div class="bg-red-500 p-8 rounded-[40px] shadow-lg shadow-red-100 text-white">
          <p class="font-bold text-sm uppercase opacity-80 mb-2">Kelmaganlar</p>
          <p class="text-4xl font-black">{{ stats.absent }} ta</p>
        </div>
      </div>

      <div class="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
        <h3 class="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
           Sinfda yo'qlar ro'yxati <span class="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full uppercase">{{ selectedDate }}</span>
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-50">
                <th class="pb-6">Ism-familiya</th>
                <th class="pb-6">Sinf</th>
                <th class="pb-6">Sabab</th>
                <th class="pb-6 text-right">Amal</th>
              </tr>
            </thead>
            <tbody class="text-slate-700">
              <tr v-for="std in absentStudents" :key="std.id" class="border-b border-slate-50 last:border-none group">
                <td class="py-6 font-bold group-hover:text-blue-600 transition">{{ std.name }}</td>
                <td class="py-6"><span class="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-black text-xs">{{ std.class }}</span></td>
                <td class="py-6">
                  <span :class="std.reason === 'Sababsiz' ? 'text-red-500 bg-red-50' : 'text-amber-500 bg-amber-50'" class="px-4 py-2 rounded-xl text-xs font-black">
                    ● {{ std.reason }}
                  </span>
                </td>
                <td class="py-6 text-right"><button class="text-blue-600 font-black hover:underline underline-offset-4">Ota-onaga xabar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>