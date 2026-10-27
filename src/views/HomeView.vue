<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { plantService } from '@/services/plant.service';
import type { Plant, PlantReview } from '@/models/plant.model';
import type { User } from '@/models/user.model';

const props = defineProps<{
  currentUser: User | null;
  reviews: PlantReview[];
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
  nameQuery: '',
  descriptionQuery: '',
  plantingQuery: '',
  careQuery: '',
  reviewQuery: '',
  category: '',
  plantType: '',
  climate: '',
  season: '',
  targetGroup: '',
  minPrice: 0,
  maxPrice: 5000,
  minRating: 0,
  fromDate: '',
  toDate: ''
});

onMounted(async () => {
  loading.value = true;
  plants.value = await plantService.fetchPlants();
  loading.value = false;
});

const filteredPlants = computed(() => {
  const nameQuery = filters.value.nameQuery.trim().toLowerCase();
  const descriptionQuery = filters.value.descriptionQuery.trim().toLowerCase();
  const plantingQuery = filters.value.plantingQuery.trim().toLowerCase();
  const careQuery = filters.value.careQuery.trim().toLowerCase();
  const reviewQuery = filters.value.reviewQuery.trim().toLowerCase();

  // Svaki kriterijum se proverava odvojeno, pa korisnik može da kombinuje više filtera.
  return plants.value.filter(p => {
    const reviews = getReviews(p);
    const matchName = !nameQuery || `${p.name} ${p.latin_name}`.toLowerCase().includes(nameQuery);
    const matchDescription = !descriptionQuery || p.description.toLowerCase().includes(descriptionQuery);
    const matchPlanting = !plantingQuery || p.planting_instructions.toLowerCase().includes(plantingQuery);
    const matchCare = !careQuery || p.care_instructions.toLowerCase().includes(careQuery);
    const matchReviewQuery = !reviewQuery || reviews.some(review => review.comment.toLowerCase().includes(reviewQuery));
    const matchCategory = !filters.value.category || p.category === filters.value.category;
    const matchType = !filters.value.plantType || p.plant_type === filters.value.plantType;
    const matchClimate = !filters.value.climate || p.climate === filters.value.climate;
    const matchSeason = !filters.value.season || p.season === filters.value.season;
    const matchGroup = !filters.value.targetGroup || p.target_audience === filters.value.targetGroup;
    const matchPrice = p.price >= filters.value.minPrice && p.price <= filters.value.maxPrice;
    const matchRating = averageRating(p) >= filters.value.minRating;
    const matchDate = (!filters.value.fromDate || p.production_date >= filters.value.fromDate) &&
      (!filters.value.toDate || p.production_date <= filters.value.toDate);

    return matchName && matchDescription && matchPlanting && matchCare && matchReviewQuery &&
      matchCategory && matchType && matchClimate && matchSeason && matchGroup &&
      matchPrice && matchRating && matchDate;
  });
});

const uniqueValues = (key: 'plant_type' | 'climate' | 'season' | 'target_audience') =>
  computed(() => [...new Set(plants.value.map(plant => plant[key]))].sort());
const plantTypes = uniqueValues('plant_type');
const climates = uniqueValues('climate');
const seasons = uniqueValues('season');
const targetGroups = uniqueValues('target_audience');

const getReviews = (plant: Plant): PlantReview[] => [
  ...plant.reviews,
  ...props.reviews.filter(review => review.plantId === plant.id)
];

const averageRating = (plant: Plant) => {
  const reviews = getReviews(plant);
  if (!reviews.length) return 0;
  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
};

const highlightedParts = (text: string) => {
  const query = filters.value.nameQuery.trim();
  if (!query) return [{ text, matched: false }];

  const parts: { text: string; matched: boolean }[] = [];
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  let cursor = 0;
  let matchIndex = lowerText.indexOf(lowerQuery, cursor);

  while (matchIndex !== -1) {
    if (matchIndex > cursor) {
      parts.push({ text: text.slice(cursor, matchIndex), matched: false });
    }
    parts.push({ text: text.slice(matchIndex, matchIndex + query.length), matched: true });
    cursor = matchIndex + query.length;
    matchIndex = lowerText.indexOf(lowerQuery, cursor);
  }

  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), matched: false });
  }

  return parts;
};

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
    nameQuery: '',
    descriptionQuery: '',
    plantingQuery: '',
    careQuery: '',
    reviewQuery: '',
    category: '',
    plantType: '',
    climate: '',
    season: '',
    targetGroup: '',
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    fromDate: '',
    toDate: ''
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
      
      <div class="grid grid-cols-1 md:grid-cols-6 gap-3 bg-white p-3 rounded-2xl text-slate-800 shadow-2xl">
        <div class="md:col-span-2">
          <label class="block text-xs font-bold text-slate-500 mb-1" for="plant-name-search">Naziv biljke</label>
          <input id="plant-name-search" v-model="filters.nameQuery" type="search" placeholder="Naziv ili latinski naziv" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
        </div>
        <div class="md:col-span-2">
          <label class="block text-xs font-bold text-slate-500 mb-1" for="plant-description-search">Opis biljke</label>
          <input id="plant-description-search" v-model="filters.descriptionQuery" type="search" placeholder="Pretražite opis" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
        </div>
        <div class="md:col-span-1">
          <label class="block text-xs font-bold text-slate-500 mb-1" for="plant-category-filter">Kategorija</label>
          <select id="plant-category-filter" v-model="filters.category" class="w-full py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white">
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
        <button @click="showAdvancedFilters = !showAdvancedFilters" class="md:mt-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 border border-slate-300">
          <i class="fa-solid fa-sliders"></i> {{ showAdvancedFilters ? 'Sakrij Filtere' : 'Napredni Filteri' }}
        </button>
      </div>
    </div>

    <!-- Napredni Filteri -->
    <div v-if="showAdvancedFilters" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1" for="planting-search">Uputstvo za sadnju</label>
        <input id="planting-search" v-model="filters.plantingQuery" type="search" placeholder="Pretražite sadnju" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1" for="care-search">Uputstvo za negu</label>
        <input id="care-search" v-model="filters.careQuery" type="search" placeholder="Pretražite negu" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Ciljna Grupa</label>
        <select v-model="filters.targetGroup" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
          <option value="">Sve grupe</option>
          <option v-for="group in targetGroups" :key="group" :value="group">{{ group }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Tip biljke</label>
        <select v-model="filters.plantType" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
          <option value="">Svi tipovi</option>
          <option v-for="type in plantTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Podneblje</label>
        <select v-model="filters.climate" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
          <option value="">Sva podneblja</option>
          <option v-for="climate in climates" :key="climate" :value="climate">{{ climate }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Sezona</label>
        <select v-model="filters.season" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
          <option value="">Sve sezone</option>
          <option v-for="season in seasons" :key="season" :value="season">{{ season }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Cena (RSD)</label>
        <div class="flex gap-2">
          <input v-model.number="filters.minPrice" type="number" min="0" :max="filters.maxPrice" aria-label="Minimalna cena" placeholder="Od" class="w-1/2 p-2.5 rounded-xl border border-slate-200 text-sm">
          <input v-model.number="filters.maxPrice" type="number" :min="filters.minPrice" aria-label="Maksimalna cena" placeholder="Do" class="w-1/2 p-2.5 rounded-xl border border-slate-200 text-sm">
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Datum proizvodnje od</label>
        <input v-model="filters.fromDate" type="date" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Datum proizvodnje do</label>
        <input v-model="filters.toDate" type="date" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Minimalna ocena</label>
        <select v-model.number="filters.minRating" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
          <option :value="0">Sve ocene</option>
          <option :value="3">3+ zvezdice</option>
          <option :value="4">4+ zvezdice</option>
          <option :value="4.5">4.5+ zvezdice</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Reči iz recenzije</label>
        <input v-model="filters.reviewQuery" type="search" placeholder="npr. lako za negu" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm">
      </div>
    </div>

    <!-- Lista Biljaka -->
    <div v-if="loading" class="text-center py-16">
      <i class="fa-solid fa-circle-notch fa-spin text-4xl text-emerald-600 mb-3"></i>
      <p class="text-slate-500 font-medium">Učitavanje kataloga biljaka...</p>
    </div>

    <div v-else-if="filteredPlants.length === 0" class="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
      <div class="bg-emerald-50 w-20 h-20 mx-auto flex items-center justify-center rounded-full text-emerald-600 text-3xl mb-4">
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <h3 class="text-lg font-bold text-slate-700 mb-1">Nismo pronašli biljku sa tim kriterijumom</h3>
      <p class="text-sm text-slate-500">Pokušajte sa drugim pojmom ili resetujte filtere.</p>
      <button @click="resetFilters" class="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition">Resetuj filtere</button>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="plant in filteredPlants" :key="plant.id" class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col overflow-hidden group">
        <div class="relative h-52 bg-slate-100 overflow-hidden">
          <img :src="plant.image_url" :alt="plant.image_alt" class="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500">
          <span class="absolute top-3 left-3 bg-slate-900/70 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">{{ plant.category }}</span>
          <span class="absolute top-3 right-3 bg-emerald-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg">★ {{ averageRating(plant).toFixed(1) }} · {{ getReviews(plant).length }}</span>
        </div>
        <div class="p-5 flex-grow flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-emerald-700 font-semibold uppercase">{{ plant.target_audience }}</span>
              <span class="text-xs text-slate-400">{{ formatDate(plant.production_date) }}</span>
            </div>
            <button @click="openQuickView(plant)" class="text-left text-lg font-bold text-slate-900 hover:text-emerald-700 mb-1">
              <span v-for="(part, index) in highlightedParts(plant.name)" :key="index" :class="part.matched ? 'bg-emerald-100 text-emerald-800 rounded-sm' : ''">{{ part.text }}</span>
            </button>
            <p class="text-xs italic text-slate-500 mb-2">
              <span v-for="(part, index) in highlightedParts(plant.latin_name)" :key="index" :class="part.matched ? 'bg-emerald-100 text-emerald-800 rounded-sm' : ''">{{ part.text }}</span>
            </p>
            <p class="text-xs text-slate-600 line-clamp-2 mb-4">
              <span v-for="(part, index) in highlightedParts(plant.description)" :key="index" :class="part.matched ? 'bg-emerald-100 text-emerald-800 rounded-sm font-semibold' : ''">{{ part.text }}</span>
            </p>
            <p class="text-xs text-slate-500 mb-3">{{ getReviews(plant).length }} recenzije · Pročitajte komentare u detaljima</p>
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
    <Teleport to="body">
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
          <p><strong>Tip biljke:</strong> {{ selectedPlantForQuickView.plant_type }}</p>
          <p><strong>Datum proizvodnje sadnice/semena:</strong> {{ formatDate(selectedPlantForQuickView.production_date) }}</p>
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
          <div class="border-t border-slate-200 dark:border-slate-700 pt-3">
            <h4 class="font-bold text-sm mb-2">Ocene i recenzije korisnika</h4>
            <p class="text-emerald-700 dark:text-emerald-400 font-bold mb-2">★ {{ averageRating(selectedPlantForQuickView).toFixed(1) }} / 5 · {{ getReviews(selectedPlantForQuickView).length }} recenzije</p>
            <ul class="space-y-2">
              <li v-for="review in getReviews(selectedPlantForQuickView)" :key="review.id" class="rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                <p class="font-semibold">{{ review.author }} · <span class="text-amber-500">★ {{ review.rating }} / 5</span></p>
                <p class="text-slate-600 dark:text-slate-300 mt-1">{{ review.comment }}</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex items-center justify-between border-t pt-4">
          <span class="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">{{ selectedPlantForQuickView.price.toLocaleString('sr-RS') }} {{ selectedPlantForQuickView.currency }}</span>
          <button @click="handleReserve(selectedPlantForQuickView); selectedPlantForQuickView = null;" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition">
            Rezerviši Odmah
          </button>
        </div>
      </div>
      </div>
    </Teleport>
  </div>
</template>