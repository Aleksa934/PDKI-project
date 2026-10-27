<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { authenticateAccount } from '@/services/auth.service';

const router = useRouter();
const route = useRoute();
const email = ref('');
const lozinka = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';
  const user = await authenticateAccount(email.value, lozinka.value);

  if (!user) {
    errorMessage.value = 'Nalog ne postoji ili je lozinka pogrešna. Registrujte se ako još nemate nalog.';
    return;
  }

  localStorage.setItem('flora_user', JSON.stringify(user));
  window.dispatchEvent(new Event('flora-user-updated'));
  const requestedRedirect = typeof route.query.redirect === 'string' ? route.query.redirect : '';
  const redirect = requestedRedirect.startsWith('/') && !requestedRedirect.startsWith('//')
    ? requestedRedirect
    : '/profile';
  router.push(redirect);
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
    <div class="text-center mb-6 space-y-2">
      <div class="inline-flex items-center justify-center bg-emerald-100 dark:bg-emerald-950/60 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
        <i class="fa-solid fa-right-to-bracket text-2xl"></i>
      </div>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Prijava na nalog</h2>
      <p class="text-xs text-slate-600 dark:text-slate-400">Unesite vaše podatke za pristup korpi i rezervacijama</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <p v-if="errorMessage" role="alert" class="text-sm text-red-600 dark:text-red-400">
        {{ errorMessage }}
      </p>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Email adresa</label>
        <input v-model="email" type="email" required placeholder="korisnik@example.com" class="w-full p-3 rounded-xl border dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Lozinka</label>
        <input v-model="lozinka" type="password" required placeholder="••••••••" class="w-full p-3 rounded-xl border dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
      </div>
      <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm transition shadow-lg">
        Prijavi se
      </button>
    </form>

    <div class="mt-6 text-center text-xs text-slate-600 dark:text-slate-400">
      Nemate nalog? 
      <router-link to="/register" class="text-emerald-600 dark:text-emerald-400 font-bold hover:underline ml-1">Registrujte se</router-link>
    </div>
  </div>
</template>