<script setup lang="ts">
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-12 py-6">
    <div class="text-center space-y-4">
      <div class="inline-flex items-center justify-center bg-emerald-100 dark:bg-emerald-950/60 p-4 rounded-3xl text-emerald-600 dark:text-emerald-400 mb-2 shadow-inner">
        <i class="fa-solid fa-seedling text-4xl"></i>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Dobrodošli u <span class="text-emerald-600 dark:text-emerald-400">FloraDom</span>
      </h1>
      <p class="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
         Za sve ljubitelje sobnog bilja. Spajamo strast prema prirodi sa modernom tehnologijom kako bismo vam olakšali izbor, negu i rezervaciju vaših omiljenih biljaka.
      </p>
    </div>

    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
          <i class="fa-solid fa-bullseye text-lg"></i>
        </div>
        <h3 class="font-bold text-slate-900 dark:text-white text-lg">Naša Misija</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Da ozelenimo svaki dom i kancelariju, pružajući pouzdane informacije o održavanju i jednostavan sistem rezervacije biljaka preko intuitivnog interfejsa.
        </p>
      </div>

      <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
          <i class="fa-solid fa-eye text-lg"></i>
        </div>
        <h3 class="font-bold text-slate-900 dark:text-white text-lg">Naša Vizija</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Postati vodeća digitalna platforma za edukaciju i kupovinu biljaka, uz podršku pametnog asistenta (Dom Bota) koji odgovara na sva pitanja u hodu.
        </p>
      </div>

      <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
          <i class="fa-solid fa-code text-lg"></i>
        </div>
        <h3 class="font-bold text-slate-900 dark:text-white text-lg">Tehnologije</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Razvijeno korišćenjem modernog Vue 3 (Composition API) okvira, Vite alata, Tailwind CSS-a za dizajn, i naprednog upravljanja stanjem u lokalnoj memoriji.
        </p>
      </div>
    </div>

   
    <div class="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="space-y-2 text-center md:text-left">
        <h3 class="text-xl font-bold">Imate pitanja ili predloge?</h3>
        <p class="text-xs text-emerald-200 max-w-md">
          Naš tim stručnjaka i Dom Bot asistent su uvek tu da vam pomognu oko izbora savršene biljke za vaš prostor.
        </p>
      </div>
      <router-link to="/" class="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-6 py-3 rounded-2xl text-xs transition shadow-lg whitespace-nowrap">
        Pogledaj Katalog Biljaka
      </router-link>
    </div>
  </div>
</template>