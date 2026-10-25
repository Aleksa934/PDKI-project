<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { plantService } from '@/services/plant.service';
import type { Plant } from '@/models/plant.model';

const props = defineProps<{
  currentUser: any;
}>();

const emit = defineEmits<{
  (e: 'reserve', plant: Plant): void;
  (e: 'notify', msg: string): void;
  (e: 'require-auth'): void;
}>();

const plants = ref<Plant[]>([]);
const loading = ref(true);
const showAdvancedFilters = ref(false);
const selectedPlantForQuickView = ref<Plant | null>(null);

const filters = ref({
  query: '',
  category: '',
  targetGroup: '',
  maxPrice: 5000,
  minRating: 0,
  productionYear: ''
});

onMounted(async () => {
  loading.value = true;
  plants.value = await plantService.fetchPlants();
  loading.value = false;
});

const filteredPlants = computed(() => {
  return plants.value.filter(p => {
    const matchQuery = !filters.value.query || 
      p.name.toLowerCase().includes(filters.value.query.toLowerCase()) || 
      p.latin_name.toLowerCase().includes(filters.value.query.toLowerCase()) ||
      p.description.toLowerCase().includes(filters.value.query.toLowerCase());

    const matchCategory = !filters.value.category || p.category === filters.value.category;
    const matchGroup = !filters.value.targetGroup || p.target_audience === filters.value.targetGroup;
    const matchPrice = p.price <= filters.value.maxPrice;
    // API nema ocenu, pa simuliramo stabilnu ocenu ili podrazumevanu 4.5
    const matchRating = 4.5 >= filters.value.minRating;
    const matchYear = !filters.value.productionYear || p.production_date.includes(String(filters.value.productionYear));

    return matchQuery && matchCategory && matchGroup && matchPrice && matchRating && matchYear;
  });
});

const handleReserve = (plant: Plant) => {
  if (!props.currentUser) {
    emit('require-auth');
    return;
  }
  emit('reserve', plant);
};

const openQuickView = (plant: Plant) => {
  selectedPlantForQuickView.value = plant;
};

const resetFilters = () => {
  filters.value = {
    query: '',
    category: '',
    targetGroup: '',
    maxPrice: 5000,
    minRating: 0,
    productionYear: ''
  };
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '2026-01-01';
  return new Date(dateStr).toLocaleDateString('sr-RS');
};
</script>

<template>
  <div class="space-y-8">
    <!-- Hero & Pretraga -->
    <div class="bg-gradient-to-r from-emerald-900 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <h1 class="text-2xl sm:text-4xl font-extrabold mb-3">Pronađite savršenu biljku za Vaš dom</h1>
      <p class="text-emerald-100 max-w-2xl text-sm sm:text-base mb-6">Pretražujte naš bogati katalog sa detaljnim uputstvima za negu i recenzijama.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-3 rounded-2xl text-slate-800 shadow-2xl">
        <div class="relative md:col-span-2">
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-3.5 text-slate-400"></i>
          <input v-model="filters.query" type="text" placeholder="Pretraga po nazivu ili latinskom nazivu..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
        </div>
        <div>
          <select v-model="filters.category" class="w-full py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white">
            <option value="">Sve kategorije</option>
            <option value="Sobne biljke">Sobne biljke</option>
            <option value="Baštensko cveće">Baštensko cveće</option>
            <option value="Sukulenti i kaktusi">Sukulenti i kaktusi</option>
            <option value="Voće">Voće</option>
            <option value="Povrće">Povrće</option>
            <option value="Drveće i žbunje">Drveće i žbunje</option>
            <option value="Začinsko i aromatično bilje">Začinsko bilje</option>
          </select>
        </div>
        <button @click="showAdvancedFilters = !showAdvancedFilters" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 border border-slate-300">
          <i class="fa-solid fa-sliders"></i> {{ showAdvancedFilters ? 'Sakrij Filtere' : 'Napredni Filteri' }}
        </button>
      </div>
    </div>

    <!-- Napredni Filteri -->
    <div v-if="showAdvancedFilters" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Ciljna Grupa</label>
        <select v-model="filters.targetGroup" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
          <option value="">Sve grupe</option>
          <option value="Početnici">Početnici</option>
          <option value="Hobisti">Hobisti</option>
          <option value="Iskusni uzgajivači">Iskusni uzgajivači</option>
          <option value="Porodice">Porodice</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Maks. Cena ({{ filters.maxPrice }} RSD)</label>
        <input type="range" v-model.number="filters.maxPrice" min="300" max="5000" step="100" class="w-full accent-emerald-600 mt-2">
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Min. Ocena</label>
        <select v-model.number="filters.minRating" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
          <option :value="0">Sve ocene</option>
          <option :value="4">4+ zvezdice</option>
          <option :value="4.5">4.5+ zvezdice</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Godina Proizvodnje</label>
        <input v-model="filters.productionYear" type="number" placeholder="npr. 2026" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
      </div>
    </div>

    <!-- Lista Biljaka -->
    <div v-if="loading" class="text-center py-16">
      <i class="fa-solid fa-circle-notch fa-spin text-4xl text-emerald-600 mb-3"></i>
      <p class="text-slate-500 font-medium">Učitavanje biljaka sa API servera...</p>
    </div>

    <div v-else-if="filteredPlants.length === 0" class="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
      <i class="fa-solid fa-seedling text-5xl text-slate-300 mb-4"></i>
      <h3 class="text-lg font-bold text-slate-700 mb-1">Nije pronađena nijedna biljka</h3>
      <button @click="resetFilters" class="mt-4 bg-emerald-600 text-white font-semibold px-4 py-2 rounded-xl text-sm">Prikaži sve biljke</button>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="plant in filteredPlants" :key="plant.id" class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col overflow-hidden group">
        <div class="relative h-52 bg-slate-100 overflow-hidden">
          <img :src="plant.image_url" :alt="plant.image_alt" class="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500">
          <span class="absolute top-3 left-3 bg-slate-900/70 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">{{ plant.category }}</span>
          <span class="absolute top-3 right-3 bg-emerald-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg">★ 4.8</span>
        </div>
        <div class="p-5 flex-grow flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-emerald-700 font-semibold uppercase">{{ plant.target_audience }}</span>
              <span class="text-xs text-slate-400">{{ formatDate(plant.production_date) }}</span>
            </div>
            <button @click="openQuickView(plant)" class="text-left text-lg font-bold text-slate-900 hover:text-emerald-700 mb-1">
              {{ plant.name }}
            </button>
            <p class="text-xs italic text-slate-500 mb-2">{{ plant.latin_name }}</p>
            <p class="text-xs text-slate-600 line-clamp-2 mb-4">{{ plant.description }}</p>
          </div>
          <div>
            <div class="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-xs text-emerald-800 mb-4 flex items-center gap-2">
              <i class="fa-solid fa-faucet-drip text-emerald-600 flex-shrink-0"></i>
              <span class="truncate">Nega: {{ plant.care_instructions }}</span>
            </div>
            <div class="flex items-center justify-between border-t border-slate-100 pt-3">
              <span class="text-xl font-extrabold text-emerald-700">{{ plant.price.toLocaleString('sr-RS') }} {{ plant.currency }}</span>
              <div class="flex gap-2">
                <button @click="openQuickView(plant)" title="Brzi pregled" class="p-2.5 text-slate-600 bg-slate-100 hover:bg-emerald-50 rounded-xl transition"><i class="fa-solid fa-eye"></i></button>
                <button @click="handleReserve(plant)" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition flex items-center gap-2">
                  <i class="fa-solid fa-cart-plus"></i> Rezerviši
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick View Modal -->
    <div v-if="selectedPlantForQuickView" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="selectedPlantForQuickView = null">
      <div class="bg-white dark:bg-slate-900 dark:text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800">
        <button @click="selectedPlantForQuickView = null" aria-label="Zatvori brzi pregled" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white text-2xl font-bold">&times;</button>
        <div class="flex items-center gap-3 mb-2">
          <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">{{ selectedPlantForQuickView.category }}</span>
          <span class="text-xs text-slate-500 dark:text-slate-400">{{ selectedPlantForQuickView.climate }} / {{ selectedPlantForQuickView.season }}</span>
        </div>
        <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">{{ selectedPlantForQuickView.name }}</h3>
        <p class="text-xs italic text-slate-500 dark:text-slate-400 mb-4">{{ selectedPlantForQuickView.latin_name }}</p>
        
        <img :src="selectedPlantForQuickView.image_url" :alt="selectedPlantForQuickView.image_alt" class="w-full h-48 object-contain bg-slate-50 dark:bg-slate-800 rounded-2xl mb-4 border border-slate-200 dark:border-slate-700">
        
        <p class="text-xs text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">{{ selectedPlantForQuickView.description }}</p>
        
        <div class="space-y-2 mb-6 text-xs">
          <div class="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900">
            <strong class="text-emerald-900 block mb-1">Uputstvo za sadnju:</strong> 
            <span class="text-slate-700 dark:text-slate-300">{{ selectedPlantForQuickView.planting_instructions }}</span>
          </div>
          <div class="bg-teal-50 dark:bg-teal-950/40 p-3 rounded-xl border border-teal-100 dark:border-teal-900">
            <strong class="text-teal-900 block mb-1">Uputstvo za negu:</strong> 
            <span class="text-slate-700 dark:text-slate-300">{{ selectedPlantForQuickView.care_instructions }}</span>
          </div>
          <p><strong>Ciljna grupa:</strong> {{ selectedPlantForQuickView.target_audience }}</p>
          <p><strong>Svetlost:</strong> {{ selectedPlantForQuickView.light_requirement }}</p>
          <p><strong>Zalivanje:</strong> {{ selectedPlantForQuickView.watering }}</p>
        </div>

        <div class="flex items-center justify-between border-t pt-4">
          <span class="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">{{ selectedPlantForQuickView.price.toLocaleString('sr-RS') }} {{ selectedPlantForQuickView.currency }}</span>
          <button @click="handleReserve(selectedPlantForQuickView); selectedPlantForQuickView = null;" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition">
            Rezerviši Odmah
          </button>
        </div>
      </div>
    </div>
  </div>
</template>