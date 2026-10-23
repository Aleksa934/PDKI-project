<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { User } from '@/models/user.model';

const props = defineProps<{
  currentUser: User | null;
}>();

const emit = defineEmits<{
  (e: 'save-profile', user: User): void;
}>();

const profileForm = reactive<User>({
  ime: props.currentUser?.ime || '',
  prezime: props.currentUser?.prezime || '',
  email: props.currentUser?.email || '',
  telefon: props.currentUser?.telefon || '',
  adresa: props.currentUser?.adresa || '',
  omiljeneBiljke: props.currentUser?.omiljeneBiljke || ''
});

watch(() => props.currentUser, (newVal) => {
  if (newVal) {
    Object.assign(profileForm, newVal);
  }
}, { deep: true });

const onSubmit = () => {
  emit('save-profile', { ...profileForm });
};
</script>

<template>
  <div class="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
    <div class="flex items-center gap-4 border-b border-slate-100 pb-6 mb-6">
      <div class="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
        {{ currentUser ? currentUser.ime.charAt(0) + currentUser.prezime.charAt(0) : 'G' }}
      </div>
      <div>
        <h2 class="text-2xl font-bold text-slate-900">{{ currentUser ? currentUser.ime + ' ' + currentUser.prezime : 'Gost Korisnik' }}</h2>
        <p class="text-sm text-slate-500">Lični profil kupca i opcije za ažuriranje podataka</p>
      </div>
    </div>

    <form @submit.prevent="onSubmit" class="space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Ime</label>
          <input v-model="profileForm.ime" type="text" required class="w-full p-3 rounded-xl border border-slate-200 text-sm">
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Prezime</label>
          <input v-model="profileForm.prezime" type="text" required class="w-full p-3 rounded-xl border border-slate-200 text-sm">
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Email Adresa</label>
          <input v-model="profileForm.email" type="email" required class="w-full p-3 rounded-xl border border-slate-200 text-sm">
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Broj Telefona</label>
          <input v-model="profileForm.telefon" type="text" required class="w-full p-3 rounded-xl border border-slate-200 text-sm">
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Adresa za dostavu</label>
        <input v-model="profileForm.adresa" type="text" required class="w-full p-3 rounded-xl border border-slate-200 text-sm">
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Omiljene vrste biljaka</label>
        <input v-model="profileForm.omiljeneBiljke" type="text" placeholder="npr. Sukulenti, Orhideje" class="w-full p-3 rounded-xl border border-slate-200 text-sm">
      </div>
      <div class="pt-4 flex justify-end">
        <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition text-sm flex items-center gap-2">
          <i class="fa-solid fa-floppy-disk"></i> Sačuvaj Izmene Profila
        </button>
      </div>
    </form>
  </div>
</template>