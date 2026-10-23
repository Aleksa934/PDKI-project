<script setup lang="ts">
import { computed } from 'vue';
import type { CartItem } from '@/models/plant.model';

const props = defineProps<{
  cart: CartItem[];
}>();

const emit = defineEmits<{
  (e: 'remove', cartId: number): void;
  (e: 'toggle-status', item: CartItem): void;
  (e: 'save-rating', item: CartItem): void;
  (e: 'confirm'): void;
  (e: 'go-catalog'): void;
}>();

const cartTotal = computed(() => {
  return props.cart.reduce((sum, item) => sum + (item.cena * item.kolicina), 0);
});

const formatDate = (dateStr: string) => {
  if (!dateStr) return '2023-01-01';
  return new Date(dateStr).toLocaleDateString('sr-RS');
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Moja Korpa Rezervacija</h2>
        <p class="text-sm text-slate-500">Pregledajte, modifikujte rezervisane biljke ili ocenite pristigle pošiljke.</p>
      </div>
      <button @click="emit('go-catalog')" class="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl font-semibold text-slate-700">
        <i class="fa-solid fa-arrow-left"></i> Nazad na katalog
      </button>
    </div>

    <div v-if="cart.length === 0" class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto my-8">
      <i class="fa-solid fa-basket-shopping text-6xl text-slate-300 mb-4"></i>
      <h3 class="text-xl font-bold text-slate-800 mb-2">Vaša korpa je prazna</h3>
      <p class="text-slate-500 text-sm mb-6">Niste rezervisali nijednu biljku.</p>
      <button @click="emit('go-catalog')" class="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 shadow-lg transition">
        Razgledaj Katalog Biljaka
      </button>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-4">
        <div v-for="item in cart" :key="item.cartId" class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row gap-5">
          <img :src="item.slika" :alt="item.naziv" class="w-full sm:w-28 h-28 object-cover rounded-xl bg-slate-100">
          <div class="flex-grow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-lg text-slate-900">{{ item.naziv }}</h4>
                <span :class="{
                  'bg-amber-100 text-amber-800 border-amber-300': item.status === 'rezervisano',
                  'bg-emerald-100 text-emerald-800 border-emerald-300': item.status === 'pristiglo',
                  'bg-rose-100 text-rose-800 border-rose-300': item.status === 'otkazano'
                }" class="text-xs font-bold px-3 py-1 rounded-full uppercase border">
                  {{ item.status }}
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">Tip: {{ item.tip }} | Proizvodnja: {{ formatDate(item.datumProizvodnje) }}</p>

              <div v-if="item.status === 'rezervisano'" class="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <label class="block font-semibold text-slate-600 mb-1">Napomena za dostavu / Količina:</label>
                <input v-model="item.napomena" type="text" placeholder="Dodajte napomenu..." class="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white mb-2">
                <div class="flex items-center gap-3">
                  <span class="font-semibold text-slate-600">Količina:</span>
                  <button @click="item.kolicina > 1 ? item.kolicina-- : null" class="w-6 h-6 bg-slate-200 rounded font-bold">-</button>
                  <span class="font-bold text-sm">{{ item.kolicina }}</span>
                  <button @click="item.kolicina++" class="w-6 h-6 bg-slate-200 rounded font-bold">+</button>
                </div>
              </div>

              <div v-if="item.status === 'pristiglo'" class="mt-3 bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs">
                <p class="font-bold text-emerald-900 mb-1"><i class="fa-solid fa-star text-amber-500"></i> Ocenite pristiglu biljku:</p>
                <div class="flex items-center gap-2 mb-2">
                  <div class="flex text-amber-400 text-base cursor-pointer">
                    <i v-for="star in 5" :key="star" @click="item.mojaOcena = star" :class="star <= item.mojaOcena ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
                  </div>
                  <span class="font-bold text-slate-700">({{ item.mojaOcena }} / 5)</span>
                </div>
                <input v-model="item.mojaRecenzija" type="text" placeholder="Napišite vaše utiske..." class="w-full p-2 border border-emerald-300 rounded-lg text-xs bg-white">
                <button @click="emit('save-rating', item)" class="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition">
                  Sačuvaj Ocenu
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between border-t border-slate-100 pt-3 mt-3">
              <div class="text-sm font-extrabold text-emerald-700">
                {{ (item.cena * item.kolicina).toLocaleString('sr-RS') }} RSD
              </div>
              <div class="flex items-center gap-2">
                <button @click="emit('toggle-status', item)" class="text-xs text-slate-500 underline hover:text-slate-800">Simuliraj Status</button>
                <button v-if="item.status === 'pristiglo'" @click="emit('remove', item.cartId)" class="bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center gap-1">
                  <i class="fa-solid fa-trash-can"></i> Obriši
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-md h-fit space-y-4">
        <h3 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Suma Rezervacije</h3>
        <div class="space-y-2 text-sm text-slate-600">
          <div class="flex justify-between">
            <span>Broj stavki:</span>
            <span class="font-bold text-slate-800">{{ cart.length }}</span>
          </div>
          <div class="flex justify-between">
            <span>Isporuka:</span>
            <span class="font-bold text-emerald-600">Besplatno</span>
          </div>
        </div>
        <div class="border-t border-slate-100 pt-3 flex justify-between items-center">
          <span class="text-base font-bold text-slate-800">Ukupno:</span>
          <span class="text-2xl font-black text-emerald-700">{{ cartTotal.toLocaleString('sr-RS') }} RSD</span>
        </div>
        <button @click="emit('confirm')" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm">
          <i class="fa-solid fa-paper-plane"></i> Potvrdi Rezervaciju
        </button>
      </div>
    </div>
  </div>
</template>