<script setup lang="ts">
import { computed } from 'vue';
import type { CartItem } from '@/models/plant.model';

const props = defineProps<{
  cart: CartItem[];
}>();

const emit = defineEmits<{
  (e: 'remove', cartId: number): void;
  (e: 'set-status', cartId: number, status: CartItem['status']): void;
  (e: 'save-rating', item: CartItem): void;
  (e: 'confirm'): void;
  (e: 'go-catalog'): void;
}>();

// Ispravljeno na item.price (jer API vraća price, ne cena)
const cartTotal = computed(() => {
  return props.cart
    .filter(item => item.status !== 'otkazano')
    .reduce((sum, item) => sum + (item.price * item.kolicina), 0);
});

const activeItems = computed(() => props.cart.filter(item => item.status !== 'otkazano'));
const reservedItems = computed(() => props.cart.filter(item => item.status === 'rezervisano'));
const arrivedItems = computed(() => props.cart.filter(item => item.status === 'pristiglo'));
const arrivedTotal = computed(() => {
  return arrivedItems.value.reduce((sum, item) => sum + (item.price * item.kolicina), 0);
});

const printReceipt = () => window.print();

const formatDate = (dateStr: string) => {
  if (!dateStr) return '2023-01-01';
  return new Date(dateStr).toLocaleDateString('sr-RS');
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
      <div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Moja Korpa Rezervacija</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Pregledajte, modifikujte rezervisane biljke ili ocenite pristigle pošiljke.</p>
      </div>
      <button @click="emit('go-catalog')" class="print-hidden text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-xl font-semibold text-slate-700 dark:text-slate-200 transition">
        <i class="fa-solid fa-arrow-left"></i> Nazad na Katalog Biljaka
      </button>
    </div>

    <section class="print-only" aria-label="Potvrda pristiglih rezervacija">
      <h1 class="text-2xl font-bold">Flora Dom — potvrda rezervacije</h1>
      <p class="mt-1 text-sm">Datum: {{ new Date().toLocaleDateString('sr-RS') }}</p>
      <p class="mt-1 text-sm">Pristigle rezervacije: {{ arrivedItems.length }}</p>
      <p class="mt-1 text-sm font-bold">Ukupno: {{ arrivedTotal.toLocaleString('sr-RS') }} RSD</p>
      <hr class="my-4">
    </section>

    <!-- Empty State -->
    <div v-if="cart.length === 0" class="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto my-8">
      <div class="bg-emerald-100 dark:bg-emerald-950/50 w-20 h-20 mx-auto flex items-center justify-center rounded-full text-emerald-600 dark:text-emerald-400 text-3xl mb-4">
        <i class="fa-solid fa-basket-shopping"></i>
      </div>
      <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Vaša korpa je prazna</h3>
      <p class="text-slate-500 dark:text-slate-400 text-sm mb-6">Izgleda da još uvek niste izabrali nijednu biljku.</p>
      <button @click="emit('go-catalog')" class="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-500 shadow-lg transition">
        Idi na katalog biljaka
      </button>
    </div>

    <!-- Lista stavki u korpi -->
    <div v-else class="print-cart-layout grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="print-cart-list lg:col-span-2 space-y-4">
        <div v-for="item in cart" :key="item.cartId" :class="{ 'print-hidden': item.status !== 'pristiglo' }" class="print-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col sm:flex-row gap-5">
          <!-- Ispravljeno item.image i item.name -->
          <img :src="item.image_url" :alt="item.name" class="w-full sm:w-28 h-28 object-cover rounded-xl bg-slate-100 dark:bg-slate-800">
          
          <div class="flex-grow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-lg text-slate-900 dark:text-white">{{ item.name }}</h4>
                <span :class="{
                  'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800': item.status === 'rezervisano',
                  'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800': item.status === 'pristiglo',
                  'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800': item.status === 'otkazano'
                }" class="text-xs font-bold px-3 py-1 rounded-full uppercase border">
                  {{ item.status }}
                </span>
              </div>
              
              <!-- Ispravljeno item.type i item.category (ili šta već imaš u modelu) -->
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {{ item.plant_type }} · {{ item.category }} · {{ item.climate }} · {{ item.season }} ·
                {{ item.target_audience }} · Proizvodnja: {{ formatDate(item.production_date) }}
              </p>
              <div class="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <p><strong>Opis:</strong> {{ item.description }}</p>
                <p><strong>Sadnja:</strong> {{ item.planting_instructions }}</p>
                <p><strong>Nega:</strong> {{ item.care_instructions }}</p>
              </div>

              <div v-if="item.status === 'rezervisano'" class="mt-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <label class="block font-semibold text-slate-600 dark:text-slate-300 mb-1">Napomena za dostavu / Količina:</label>
                <input v-model="item.napomena" type="text" placeholder="Dodajte napomenu..." class="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 dark:text-white mb-2">
                <div class="flex items-center gap-3">
                  <span class="font-semibold text-slate-600 dark:text-slate-300">Količina:</span>
                  <button @click="item.kolicina > 1 ? item.kolicina-- : null" class="w-6 h-6 bg-slate-200 dark:bg-slate-700 dark:text-white rounded font-bold">-</button>
                  <span class="font-bold text-sm dark:text-white">{{ item.kolicina }}</span>
                  <button @click="item.kolicina++" class="w-6 h-6 bg-slate-200 dark:bg-slate-700 dark:text-white rounded font-bold">+</button>
                </div>
              </div>

              <div v-if="item.status === 'pristiglo'" class="print-hidden mt-3 bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50 text-xs">
                <template v-if="item.ocenaSacuvana">
                  <p class="font-bold text-emerald-900 dark:text-emerald-300">Hvala na oceni: {{ item.mojaOcena }} / 5</p>
                  <p v-if="item.mojaRecenzija" class="mt-1 text-slate-600 dark:text-slate-300">{{ item.mojaRecenzija }}</p>
                </template>
                <template v-else>
                  <p class="font-bold text-emerald-900 dark:text-emerald-300 mb-1"><i class="fa-solid fa-star text-amber-500"></i> Ocenite pristiglu biljku:</p>
                  <div class="flex items-center gap-2 mb-2">
                    <div class="flex text-amber-400 text-base">
                      <button v-for="star in 5" :key="star" type="button" :aria-label="`Oceni sa ${star} od 5`" :aria-pressed="item.mojaOcena === star" @click="item.mojaOcena = star" class="p-0.5">
                        <i :class="star <= (item.mojaOcena ?? 0) ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
                      </button>
                    </div>
                    <span class="font-bold text-slate-700 dark:text-slate-300">({{ item.mojaOcena ?? 0 }} / 5)</span>
                  </div>
                  <input v-model="item.mojaRecenzija" type="text" placeholder="Napišite vaše utiske..." class="w-full p-2 border border-emerald-300 dark:border-emerald-800 rounded-lg text-xs bg-white dark:bg-slate-900 dark:text-white">
                  <button @click="emit('save-rating', item)" :disabled="item.mojaOcena === null" class="mt-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold px-3 py-1.5 rounded-lg text-xs transition">
                    Sačuvaj ocenu i recenziju
                  </button>
                </template>
              </div>

              <p v-if="item.status === 'otkazano'" class="mt-3 text-xs text-rose-700 dark:text-rose-300">
                Rezervacija je otkazana i nije uključena u ukupnu cenu.
              </p>
            </div>

            <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 mt-3">
              <!-- Ispravljeno item.price -->
              <div class="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                {{ (item.price * item.kolicina).toLocaleString('sr-RS') }} RSD
              </div>
              <div class="print-hidden flex items-center gap-3">
                <template v-if="item.status === 'rezervisano'">
                  <button @click="emit('set-status', item.cartId, 'pristiglo')" class="text-xs text-emerald-700 dark:text-emerald-400 underline hover:text-emerald-800">Simuliraj pristizanje</button>
                  <button @click="emit('set-status', item.cartId, 'otkazano')" class="text-xs text-rose-700 dark:text-rose-400 underline hover:text-rose-800">Otkaži rezervaciju</button>
                </template>
                <button v-if="item.status === 'pristiglo'" @click="emit('remove', item.cartId)" class="bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/50 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center gap-1">
                  <i class="fa-solid fa-trash-can"></i> Obriši
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Suma Rezervacije -->
      <div class="print-hidden bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md h-fit space-y-4">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">Suma Rezervacije</h3>
        <div class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <div class="flex justify-between">
            <span>Broj stavki:</span>
            <span class="font-bold text-slate-800 dark:text-white">{{ activeItems.length }}</span>
          </div>
          <div class="flex justify-between">
            <span>Isporuka:</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400">Besplatno</span>
          </div>
        </div>
        <div class="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between items-center">
          <span class="text-base font-bold text-slate-800 dark:text-white">Ukupno:</span>
          <span class="text-2xl font-black text-emerald-700 dark:text-emerald-400">{{ cartTotal.toLocaleString('sr-RS') }} RSD</span>
        </div>
        <button v-if="arrivedItems.length > 0" @click="printReceipt" class="w-full border border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold py-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition flex items-center justify-center gap-2 text-sm">
          <i class="fa-solid fa-file-arrow-down"></i> Preuzmi potvrdu (PDF / Štampa)
        </button>
        <button @click="emit('confirm')" :disabled="reservedItems.length === 0" class="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm">
          <i class="fa-solid fa-paper-plane"></i> Potvrdi Rezervaciju
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.print-only {
  display: none;
}

@media print {
  .print-only {
    display: block !important;
  }

  .print-hidden {
    display: none !important;
  }

  .print-cart-layout {
    display: block !important;
  }

  .print-cart-list {
    width: 100% !important;
  }

  .print-card {
    color: #111 !important;
    background: white !important;
    border-color: #aaa !important;
    box-shadow: none !important;
    break-inside: avoid;
  }

  .print-card :where(*) {
    color: #111 !important;
  }
}
</style>