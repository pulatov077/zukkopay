<script setup>
const supabase = useSupabaseClient()
const route = useRoute()
const role = route.query.role || 'student'

const form = ref({
  username: '', // Bu yerga foydalanuvchi 'admin07' yoki emailini kiritishi mumkin
  password: ''
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    let emailToAuth = form.value.username

    // 1. Mantiq: Agar foydalanuvchi @ belgisiz login kiritsa (masalan: admin07),
    // uni biz Supabase'da yaratgan haqiqiy emailga aylantirib olamiz.
    // DIQQAT: Agar siz hamma adminlarni @gmail.com bilan ochsangiz, shunga moslang.
    if (!form.value.username.includes('@')) {
      // Hozircha siz ochgan foydalanuvchi uchun to'g'ridan-to'g'ri emailni yozamiz
      // Keyinchalik buni avtomatlashtirish mumkin
      if (form.value.username === 'admin07') {
         emailToAuth = 'zukkopay.admin@gmail.com'
      } else {
         emailToAuth = `${form.value.username}@zukkopay.local`
      }
    }

    // 2. Supabase orqali kirish
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailToAuth,
      password: form.value.password
    })

    if (error) throw error

    // 3. Profilni tekshirish (Roli to'g'rimi?)
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile && profile.role !== role) {
      // Agar direktor talaba sahifasidan kirmoqchi bo'lsa to'xtatamiz
      throw new Error(`Siz ushbu bo'limga ${profile.role} sifatida kira olmaysiz!`)
    }

    alert("Xush kelibsiz!")
    navigateTo(`/${role}/dashboard`)

  } catch (e) {
    alert("Xatolik: " + e.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div class="bg-white w-full max-w-md rounded-[40px] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
      <NuxtLink to="/" class="text-blue-600 font-bold mb-8 inline-block hover:translate-x-[-5px] transition">← Ortga qaytish</NuxtLink>
      
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-black text-slate-900 mb-2 capitalize">{{ role }} Kirish</h2>
        <div class="h-1 w-12 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Login yoki Email</label>
          <input v-model="form.username" required type="text" placeholder="admin07" class="w-full mt-1 p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all duration-300" />
        </div>
        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Maxfiy parol</label>
          <input v-model="form.password" required type="password" placeholder="••••••••" class="w-full mt-1 p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all duration-300" />
        </div>
        
        <button :disabled="loading" type="submit" class="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all duration-300 disabled:opacity-50">
          {{ loading ? 'Yuklanmoqda...' : 'Tizimga kirish' }}
        </button>
      </form>
    </div>
  </div>
</template>