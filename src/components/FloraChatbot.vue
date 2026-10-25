<script setup lang="ts">
import { ref } from 'vue';

const showChatbot = ref(false);
const chatInput = ref('');
const chatMessages = ref([
  { sender: 'bot', text: 'Zdravo! Ja sam Flora Bot 🌿 Kako vam mogu pomoći oko izbora, zalivanja ili rezervacije biljaka danas?' }
]);

const chatbotOptions = [
  { title: 'Koje biljke su najbolje za početnike?', reply: 'Za početnike najtoplije preporučujemo Zamioculcas, Sansevieria (Inat jezik) i Epipremnum. Traže minimalnu negu!' },
  { title: 'Kako funkcioniše rezervacija?', reply: 'Rezervacijom stavljate biljku u korpu, a nakon preuzimanja dostave možete je oceniti i ostaviti utisak u sistemu.' },
  { title: 'Da li imate dostavu?', reply: 'Dostava se vrši na teritoriji cele Srbije u roku od 2 do 3 radna dana.' }
];

const sendChatMessage = (textToSend?: string) => {
  const messageText = textToSend || chatInput.value;
  if (!messageText.trim()) return;

  chatMessages.value.push({ sender: 'user', text: messageText });
  if (!textToSend) chatInput.value = '';

  setTimeout(() => {
    let botReply = 'Hvala na pitanju! Naš tim stručnjaka će vam rado pomoći oko toga. Možete pogledati i naš katalog u gornjem meniju.';
    
    const lower = messageText.toLowerCase();
    if (lower.includes('pocetnik') || lower.includes('početnik') || lower.includes('lako')) {
      botReply = 'Za početnike su idealne biljke koje ne traže često zalivanje, poput kaktusa, sukulenata i Zamiokulkasa.';
    } else if (lower.includes('popust') || lower.includes('cena') || lower.includes('jeftino')) {
      botReply = 'Trenutno imamo sjajan izbor sobnog bilja sa redovnim ažuriranjem stanja u korpi rezervacija!';
    } else if (lower.includes('zdravo') || lower.includes('cao') || lower.includes('čaо')) {
      botReply = 'Ćao! Kako tebi i tvojim biljkama ide danas?';
    }

    chatMessages.value.push({ sender: 'bot', text: botReply });
  }, 600);
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Floating Dugme -->
    <button v-if="!showChatbot" @click="showChatbot = true" class="bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition transform hover:scale-105 border-2 border-emerald-400">
      <i class="fa-solid fa-robot text-2xl"></i>
    </button>

    <!-- Chat Prozor -->
    <div v-if="showChatbot" class="w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all">
      <!-- Header -->
      <div class="bg-emerald-800 dark:bg-emerald-950 text-white p-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="bg-emerald-600 p-2 rounded-xl"><i class="fa-solid fa-robot"></i></div>
          <div>
            <h4 class="font-bold text-sm">Flora Bot Asistent</h4>
            <span class="text-[10px] text-emerald-200 flex items-center gap-1">● Online</span>
          </div>
        </div>
        <button @click="showChatbot = false" class="text-white hover:text-emerald-200 text-xl font-bold">&times;</button>
      </div>

      <!-- Poruke -->
      <div class="p-4 h-64 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950 text-xs">
        <div v-for="(m, idx) in chatMessages" :key="idx" :class="m.sender === 'bot' ? 'text-left' : 'text-right'">
          <span :class="m.sender === 'bot' ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm' : 'bg-emerald-600 text-white'" class="inline-block p-3 rounded-2xl max-w-[85%] text-left">
            {{ m.text }}
          </span>
        </div>
      </div>

      <!-- Brze opcije -->
      <div class="p-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-1 overflow-x-auto no-scrollbar">
        <button v-for="(opt, idx) in chatbotOptions" :key="idx" @click="sendChatMessage(opt.reply)" class="bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-[11px] whitespace-nowrap shadow-sm transition">
          {{ opt.title }}
        </button>
      </div>

      <!-- Input -->
      <form @submit.prevent="sendChatMessage()" class="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input v-model="chatInput" type="text" placeholder="Napišite poruku botu..." class="flex-grow p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs dark:text-white focus:outline-none focus:border-emerald-500">
        <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  </div>
</template>