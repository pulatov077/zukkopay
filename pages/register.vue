<script setup>
const supabase = useSupabaseClient()
const route = useRoute()
const role = route.query.role || 'student'

const form = ref({
  fullName: '',
  username: '', 
  password: ''
})

const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  try {
     const pseudoEmail = `${form.value.username}.user@zukkopay.local`

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: pseudoEmail,
      password: form.value.password,
    })

    if (authError) throw authError

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: form.value.fullName,
          role: role,
          username: form.value.username 
        })

      if (profileError) throw profileError

      alert(`Ro'yxatdan o'tdingiz! Login: ${form.value.username}`)
      navigateTo(`/login?role=${role}`)
    }
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
      <NuxtLink to="/" class="text-blue-600 font-bold mb-8 inline-block hover:translate-x-[-5px] transition">← Tanlashga qaytish</NuxtLink>
      
      <h2 class="text-3xl font-black text-slate-900 mb-2 capitalize">{{ role }} profili yaratish</h2>
      <p class="text-slate-400 mb-10 text-sm">Ma'lumotlarni to'ldiring va tizimga a'zo bo'ling.</p>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ism-sharif</label>
          <input v-model="form.fullName" required type="text" placeholder="Ali Valiyev" class="w-full mt-1 p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all duration-300" />
        </div>
        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Login (Username)</label>
          <input v-model="form.username" required type="text" placeholder="ali2024" class="w-full mt-1 p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all duration-300" />
        </div>
        <div>
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Parol</label>
          <input v-model="form.password" required type="password" placeholder="••••••••" class="w-full mt-1 p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all duration-300" />
        </div>
        
        <button :disabled="loading" type="submit" class="w-full bg-blue-600 text-white py-5 rounded-2xl font-black shadow-lg hover:bg-blue-700 active:scale-95 transition disabled:opacity-50">
          {{ loading ? 'Yaratilmoqda...' : 'Profil yaratish' }}
        </button>
      </form>

      <div class="mt-8 pt-6 border-t border-slate-100 text-center">
        <p class="text-slate-500 text-sm">
          Akkauntingiz bormi? 
          <NuxtLink :to="`/login?role=${role}`" class="text-blue-600 font-black ml-1 hover:underline decoration-2">
            Tizimga kirish
          </NuxtLink>
        </p>
      </div>

    </div>
  </div>
</template>