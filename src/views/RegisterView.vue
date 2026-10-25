<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '@/models/user.model';

const router = useRouter();

const form = reactive({
  ime: '',
  prezime: '',
  email: '',
  lozinka: '',
  telefon: '',
  adresa: '',
  omiljeneBiljke: 'Sobne biljke'
});

const handleRegister = () => {
  const newUser: User = {
    ime: form.ime,
    prezime: form.prezime,
    email: form.email,
    telefon: form.telefon,
    adresa: form.adresa,
    omiljeneBiljke: form.omiljeneBiljke
  };

  localStorage.setItem('flora_user', JSON.stringify(newUser));
  window.dispatchEvent(new Event('storage'));
  router.push('/profile');
};
</script>

<template>
  <div class="max-w-lg mx-auto mt-6 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
    <div class="text-center mb-6 space-y-2">
      <div class="inline-flex items-center justify-center bg-emerald-100 dark:bg-emerald-950/60 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
        <i class="fa-solid fa-user-plus text-2xl"></i>
      </div>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Registracija korisnika</h2>
      <p class="text-xs text-slate-600 dark:text-slate-400">Unesite sve podatke profila da biste kreirali nalog u FloraOazi</p>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Ime</label>
          <input v-model="form.ime" type="text" required placeholder="Ana" class="w-full p-2.5 rounded-xl border dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Prezime</label>
          <input v-model="form.prezime" type="text" required placeholder="Anić" class="w-full p-2.5 rounded-xl border dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Email</label>
          <input v-model="form.email" type="email" required placeholder="ana@example.com" class="w-full p-2.5 rounded-xl border dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Lozinka</label>
          <input v-model="form.lozinka" type="password" required placeholder="••••••••" class="w-full p-2.5 rounded-xl border dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Telefon</label>
          <input v-model="form.telefon" type="text" required placeholder="+381 60 123 456" class="w-full p-2.5 rounded-xl border dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Omiljene vrste</label>
          <input v-model="form.omiljeneBiljke" type="text" required placeholder="Sobne biljke" class="w-full p-2.5 rounded-xl border dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Adresa</label>
        <input v-model="form.adresa" type="text" required placeholder="Nemanjina 12, Beograd" class="w-full p-2.5 rounded-xl border dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
      </div>

      <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm transition shadow-lg mt-2">
        Registruj se i kreiraj profil
      </button>
    </form>

    <div class="mt-6 text-center text-xs text-slate-600 dark:text-slate-400">
      Već imate nalog? 
      <router-link to="/login" class="text-emerald-600 dark:text-emerald-400 font-bold hover:underline ml-1">Prijavite se</router-link>
    </div>
  </div>
</template>