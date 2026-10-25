<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue';
import type { User } from '@/models/user.model';
import type { CartItem } from '@/models/plant.model';

const props = defineProps<{
  currentUser: User | null;
  cart: CartItem[];
}>();

const emit = defineEmits<{
  (e: 'save-profile', user: User): void;
  (e: 'go-catalog'): void;
}>();

const activeReservationCount = computed(() =>
  props.cart.filter(item => item.status !== 'otkazano').length
);

// Lokalna forma koja se popunjava podacima trenutnog korisnika
const form = reactive<User>({
  ime: props.currentUser?.ime || '',
  prezime: props.currentUser?.prezime || '',
  email: props.currentUser?.email || '',
  telefon: props.currentUser?.telefon || '',
  adresa: props.currentUser?.adresa || '',
  omiljeneBiljke: props.currentUser?.omiljeneBiljke || ''
});

// Sinhronizacija ako se korisnik promeni spolja
watch(() => props.currentUser, (newUser) => {
  if (newUser) {
    form.ime = newUser.ime;
    form.prezime = newUser.prezime;
    form.email = newUser.email;
    form.telefon = newUser.telefon;
    form.adresa = newUser.adresa;
    form.omiljeneBiljke = newUser.omiljeneBiljke;
  }
}, { immediate: true });

const handleSave = () => {
  emit('save-profile', { ...form, email: form.email.trim().toLowerCase() });
};
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
      <div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Moj Profil i Podešavanja</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Upravljajte vašim ličnim podacima, adresom za dostavu i preferencama.</p>
      </div>
      <button @click="emit('go-catalog')" class="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-xl font-semibold text-slate-700 dark:text-slate-200 transition">
        <i class="fa-solid fa-arrow-left"></i> Nazad na katalog
      </button>
    </div>

    <div v-if="!currentUser" class="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm">
      <i class="fa-solid fa-user-lock text-5xl text-slate-300 dark:text-slate-600 mb-4"></i>
      <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Niste prijavljeni</h3>
      <p class="text-slate-500 dark:text-slate-400 text-sm mb-6">Molimo vas da se prijavite da biste videli podatke profila.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Leva kolona: Info kartica i Statistika -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div class="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
            {{ currentUser.ime ? currentUser.ime.charAt(0).toUpperCase() : 'K' }}
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ currentUser.ime }} {{ currentUser.prezime || '' }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ currentUser.email }}</p>
          <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-left text-xs space-y-2 text-slate-600 dark:text-slate-300">
            <p><strong class="text-slate-900 dark:text-white">Telefon:</strong> {{ currentUser.telefon || 'Nije uneto' }}</p>
            <p><strong class="text-slate-900 dark:text-white">Adresa:</strong> {{ currentUser.adresa || 'Nije uneto' }}</p>
          </div>
        </div>

        <div class="bg-emerald-800 dark:bg-emerald-950 text-white p-6 rounded-3xl shadow-sm space-y-3">
          <h4 class="font-bold text-sm tracking-wide text-emerald-200 uppercase">Statistika Naloga</h4>
          <div class="flex justify-between items-center text-sm border-b border-emerald-700/50 pb-2">
            <span>Rezervisane biljke:</span>
            <span class="font-bold text-amber-300">{{ activeReservationCount }}</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span>Status profila:</span>
            <span class="font-bold bg-emerald-500/30 px-2.5 py-0.5 rounded-full text-xs">Aktivan</span>
          </div>
        </div>
      </div>

      <!-- Desna kolona: Forma za izmenu podataka -->
      <div class="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">Izmena Ličnih Podataka</h3>
        
        <form @submit.prevent="handleSave" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Ime</label>
              <input v-model="form.ime" type="text" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm dark:text-white">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Prezime</label>
              <input v-model="form.prezime" type="text" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm dark:text-white">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Email adresa</label>
              <input v-model="form.email" type="email" required class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm dark:text-white">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Kontakt telefon</label>
              <input v-model="form.telefon" type="text" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm dark:text-white">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Adresa za dostavu</label>
            <input v-model="form.adresa" type="text" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm dark:text-white">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Omiljene vrste biljaka / Napomena</label>
            <input v-model="form.omiljeneBiljke" type="text" placeholder="npr. Sobne biljke, kaktusi..." class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm dark:text-white">
          </div>

          <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md">
            Sačuvaj Izmene
          </button>
        </form>
      </div>
    </div>

    <section v-if="currentUser" class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div>
        <h3 class="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <i class="fa-solid fa-clock-rotate-left text-emerald-600"></i> Istorija i arhiva rezervacija
        </h3>
        <p class="text-xs text-slate-600 dark:text-slate-400">Pregled biljaka iz vaših rezervacija.</p>
      </div>

      <div class="divide-y divide-slate-100 dark:divide-slate-800">
        <div v-for="item in cart" :key="item.cartId" class="py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div class="flex items-center gap-3">
            <span class="font-bold text-slate-800 dark:text-slate-200">{{ item.name }}</span>
            <span
              class="text-xs px-2 py-0.5 rounded-full font-semibold"
              :class="item.status === 'pristiglo'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : item.status === 'otkazano'
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'"
            >
              {{ item.status }}
            </span>
          </div>
          <span class="text-xs text-slate-500 dark:text-slate-400">
            {{ item.kolicina }} kom. · {{ (item.price * item.kolicina).toLocaleString('sr-RS') }} {{ item.currency }}
          </span>
        </div>
        <p v-if="cart.length === 0" class="text-xs text-slate-500 py-4 italic text-center">
          Nemate prethodnih rezervacija u arhivi.
        </p>
      </div>
    </section>
  </div>
</template>