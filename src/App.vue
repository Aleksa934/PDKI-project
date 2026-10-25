<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { Plant, CartItem } from '@/models/plant.model';
import type { User } from '@/models/user.model';
import FloraChatbot from './components/FloraChatbot.vue';

const router = useRouter();
const route = useRoute();

const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem('flora_cart') || '[]'));
const currentUser = ref<User | null>(JSON.parse(localStorage.getItem('flora_user') || 'null'));
const notification = reactive<{ message: string; type: 'success' | 'error' | 'info' }>({
  message: '',
  type: 'success'
});
let toastTimeout: ReturnType<typeof setTimeout> | undefined;

// Dark mode state sa automatskim dodavanjem/uklanjanjem klase sa html elementa
const isDark = ref<boolean>(JSON.parse(localStorage.getItem('flora_dark') || 'false'));

const applyTheme = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Primeni temu odmah pri pokretanju aplikacije
applyTheme(isDark.value);

watch(cart, (newCart) => {
  localStorage.setItem('flora_cart', JSON.stringify(newCart));
}, { deep: true });

watch(currentUser, (newUser) => {
  if (newUser) {
    localStorage.setItem('flora_user', JSON.stringify(newUser));
  } else {
    localStorage.removeItem('flora_user');
  }
}, { deep: true });

const syncCurrentUser = () => {
  const storedUser = localStorage.getItem('flora_user');
  currentUser.value = storedUser ? JSON.parse(storedUser) as User : null;
};

onMounted(() => window.addEventListener('flora-user-updated', syncCurrentUser));
onUnmounted(() => window.removeEventListener('flora-user-updated', syncCurrentUser));

watch(isDark, (val) => {
  localStorage.setItem('flora_dark', JSON.stringify(val));
  applyTheme(val);
});

const toggleDark = () => {
  isDark.value = !isDark.value;
};

const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
  notification.message = msg;
  notification.type = type;
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    if (notification.message === msg) {
      notification.message = '';
    }
  }, 3500);
};

onUnmounted(() => {
  if (toastTimeout) clearTimeout(toastTimeout);
});

// Zaštita za korpu i profil - preusmerava na /login umesto otvaranja modala
const goTo = (path: string) => {
  if ((path === '/cart' || path === '/profile') && !currentUser.value) {
    router.push('/login');
    showToast('Morate biti prijavljeni da biste pristupili ovoj stranici.', 'info');
    return;
  }
  router.push(path);
};

const handleReserve = (plant: Plant) => {
  if (!currentUser.value) {
    router.push('/login');
    showToast('Prijavite se da biste izvršili rezervaciju!', 'info');
    return;
  }
  const existing = cart.value.find(i => i.id === plant.id && i.status === 'rezervisano');
  if (existing) {
    existing.kolicina++;
  } else {
    cart.value.push({
      ...plant,
      cartId: Date.now() + Math.random(),
      status: 'rezervisano',
      kolicina: 1,
      napomena: '',
      mojaOcena: 5,
      mojaRecenzija: ''
    });
  }
  showToast(`Uspešno rezervisano: ${plant.name}!`);
};

const removeCartItem = (id: number) => {
  cart.value = cart.value.filter(item => item.cartId !== id);
  showToast('Rezervacija je uklonjena iz korpe.', 'error');
};

// Odjava sa potvrdom
const logout = () => {
  if (window.confirm('Da li ste sigurni da želite da se odjavite?')) {
    currentUser.value = null;
    router.push('/');
    showToast('Odjavljeni ste.', 'info');
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 relative">
    <!-- Header -->
    <header class="bg-emerald-800 dark:bg-emerald-950 text-white shadow-lg sticky top-0 z-40 border-b border-emerald-700/40 dark:border-emerald-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div class="flex items-center space-x-3 cursor-pointer" @click="goTo('/')">
          <div class="bg-emerald-500 p-2.5 rounded-2xl text-white"><i class="fa-solid fa-leaf text-2xl"></i></div>
          <div>
            <span class="text-2xl font-bold tracking-tight">FloraOaza</span>
            <span class="block text-xs text-emerald-200 font-light">Digitalna Prodavnica Biljaka</span>
          </div>
        </div>

        <nav class="hidden md:flex items-center space-x-2">
          <button @click="goTo('/')" :class="route.path === '/' ? 'bg-emerald-700 dark:bg-emerald-900 font-semibold' : 'hover:bg-emerald-700/60'" class="px-4 py-2 rounded-xl transition text-sm flex items-center gap-2">
            <i class="fa-solid fa-store"></i> Katalog Biljaka
          </button>
          <button @click="goTo('/cart')" :class="route.path === '/cart' ? 'bg-emerald-700 dark:bg-emerald-900 font-semibold' : 'hover:bg-emerald-700/60'" class="px-4 py-2 rounded-xl transition text-sm flex items-center gap-2 relative">
            <i class="fa-solid fa-basket-shopping"></i> Korpa Rezervacija
            <span v-if="cart.length > 0" class="bg-amber-400 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">{{ cart.length }}</span>
          </button>
          <button @click="goTo('/profile')" :class="route.path === '/profile' ? 'bg-emerald-700 dark:bg-emerald-900 font-semibold' : 'hover:bg-emerald-700/60'" class="px-4 py-2 rounded-xl transition text-sm flex items-center gap-2">
            <i class="fa-solid fa-user-gear"></i> Moj Profil
          </button>
          <button @click="goTo('/about')" :class="route.path === '/about' ? 'bg-emerald-700 dark:bg-emerald-900 font-semibold' : 'hover:bg-emerald-700/60'" class="px-4 py-2 rounded-xl transition text-sm flex items-center gap-2">
            <i class="fa-solid fa-circle-info"></i> O Nama
          </button>
        </nav>

        <div class="flex items-center space-x-3">
          <!-- Dark Mode Toggle Button -->
          <button @click="toggleDark" class="p-2.5 bg-emerald-700 dark:bg-emerald-900 hover:bg-emerald-600 rounded-xl text-white transition" title="Promeni temu">
            <i :class="isDark ? 'fa-solid fa-sun text-amber-300' : 'fa-solid fa-moon text-slate-100'"></i>
          </button>

          <div v-if="currentUser" class="hidden sm:flex items-center space-x-3 bg-emerald-900/60 px-3 py-1.5 rounded-full border border-emerald-600/40">
            <span class="text-sm font-medium">{{ currentUser.ime }}</span>
            <button @click="logout" class="text-xs text-emerald-200 hover:text-white underline ml-2">Odjava</button>
          </div>
          <button v-else @click="router.push('/login')" class="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-4 py-2 rounded-xl text-sm transition">
            Prijava
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
      <router-view 
        :current-user="currentUser" 
        :cart="cart"
        @reserve="handleReserve"
        @remove="removeCartItem"
        @toggle-status="(item: CartItem) => item.status = item.status === 'rezervisano' ? 'pristiglo' : 'rezervisano'"
        @save-rating="(item: CartItem) => showToast('Ocena uspešno sačuvana!')"
        @confirm="() => { cart.forEach(i => i.status = 'pristiglo'); showToast('Rezervacija uspešno potvrđena!'); }"
        @go-catalog="router.push('/')"
        @require-auth="router.push('/login')"
        @save-profile="(u: User) => { currentUser = u; showToast('Profil uspešno sačuvan!'); }"
      />
    </main>

    <!-- Toast Notification -->
    <transition name="fade">
      <div v-if="notification.message" :class="{
        'bg-emerald-900 border-emerald-700 text-emerald-100': notification.type === 'success',
        'bg-rose-900 border-rose-700 text-rose-100': notification.type === 'error',
        'bg-slate-900 border-slate-700 text-white': notification.type === 'info'
      }" class="fixed bottom-6 left-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border text-sm">
        <i :class="{
          'fa-solid fa-circle-check text-emerald-400': notification.type === 'success',
          'fa-solid fa-circle-exclamation text-rose-400': notification.type === 'error',
          'fa-solid fa-circle-info text-blue-400': notification.type === 'info'
        }" class="text-lg"></i>
        <span>{{ notification.message }}</span>
        <button @click="notification.message = ''" class="text-slate-400 hover:text-white ml-2 font-bold">&times;</button>
      </div>
    </transition>

    <!-- Plivajući Chatbot u donjem desnom uglu -->
    <FloraChatbot />

    <!-- Footer -->
    <footer class="bg-slate-900 dark:bg-slate-950 text-slate-400 text-xs py-8 border-t border-slate-800 dark:border-slate-900 mt-12 text-center">
      <p class="font-semibold text-slate-300">Programiranje i Dizajn Korisničkih Interfejsa - Projekat</p>
    </footer>
  </div>
</template>