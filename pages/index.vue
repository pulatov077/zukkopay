<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
    <div class="mb-12 text-center">
      <div class="bg-blue-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-xl shadow-blue-200">
        ZP
      </div>
      <h1 class="text-5xl font-black text-slate-900 tracking-tighter">
        ZUKKO<span class="text-blue-600">PAY</span>
      </h1>
      <p class="text-slate-400 mt-4 text-lg">Kelajak ta'lim ekotizimiga xush kelibsiz</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
      
      <NuxtLink to="/register?role=parent" class="group bg-slate-50 hover:bg-blue-600 p-10 rounded-[40px] border border-slate-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-200 text-center">
        <div class="text-5xl mb-6 group-hover:scale-125 transition duration-500">👨‍👩‍👧</div>
        <h3 class="font-black text-2xl group-hover:text-white transition">Ota-ona</h3>
        <p class="text-slate-400 group-hover:text-blue-100 mt-3 text-sm">Farzandingiz faoliyatini nazorat qiling</p>
      </NuxtLink>

      <NuxtLink to="/register?role=student" class="group bg-slate-50 hover:bg-emerald-500 p-10 rounded-[40px] border border-slate-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-emerald-200 text-center">
        <div class="text-5xl mb-6 group-hover:scale-125 transition duration-500">🎓</div>
        <h3 class="font-black text-2xl group-hover:text-white transition">O'quvchi</h3>
        <p class="text-slate-400 group-hover:text-emerald-50 mt-3 text-sm">O'qing, yuting va ballar jamlang</p>
      </NuxtLink>

    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>