<script setup lang="ts">
import { ref } from 'vue';

const showChatbot = ref(false);
const chatInput = ref('');
const chatMessages = ref([
  { sender: 'bot', text: 'Zdravo! Ja sam Flora Bot 🌿 Kako vam mogu pomoći oko izbora, zalivanja ili rezervacije biljaka danas?' }
]);

const chatbotOptions = [
  'Koje biljke su najbolje za početnike?',
  'Kako često treba zalivati biljke?',
  'Da li imate dostavu?'
];

const replies = [
  {
    keywords: ['zdravo', 'cao', 'ćao', 'dobar dan', 'dobro jutro', 'dobro vece', 'dobro veče'],
    answer: 'Zdravo! 🌿 Rado ću pomoći oko izbora biljaka, nege ili rezervacije. Šta vas zanima?'
  },
  {
    keywords: ['pocetnik', 'početnik', 'lako', 'pocetnike', 'početnike'],
    answer: 'Za početnike su dobar izbor zamiokulkas, sanseverija i epipremnum. Uglavnom su otporne biljke i ne traže često zalivanje. Ipak, proverite zemlju pre nego što ih zalijete.'
  },
  {
    keywords: ['zaliv', 'voda', 'suva zemlja', 'suvo tlo'],
    answer: 'Učestalost zalivanja zavisi od vrste biljke, svetlosti i godišnjeg doba. Pre zalivanja dodirnite zemlju; zalijte kada se njen gornji sloj prosuši i ne ostavljajte biljku da stoji u vodi.'
  },
  {
    keywords: ['svetl', 'sunce', 'prozor', 'mesto za biljku'],
    answer: 'Većini sobnih biljaka prija svetlo mesto bez jakog direktnog podnevnog sunca. Ipak, potrebe se razlikuju od vrste do vrste — recite mi naziv biljke za konkretniji savet.'
  },
  {
    keywords: ['zuti list', 'žuti list', 'listovi zute', 'listovi žute', 'list opada', 'opadaju listovi'],
    answer: 'Žuti listovi mogu biti posledica previše ili premalo vode, promene svetlosti ili prirodnog starenja. Proverite vlažnost zemlje i da li saksija ima drenažne otvore. Koja je biljka u pitanju?'
  },
  {
    keywords: ['kaktus', 'sukul'],
    answer: 'Kaktusi i sukulenti vole mnogo svetlosti i dobro dreniranu zemlju. Zalivajte ih tek kada se zemlja potpuno osuši; zimi im obično treba manje vode.'
  },
  {
    keywords: ['ljubim', 'mack', 'mačk', 'pas', 'dete', 'otrov'],
    answer: 'Bezbednost zavisi od tačne vrste biljke, a neke sobne biljke mogu biti štetne ako se pojedu. Proverite naziv vrste sa pouzdanim izvorom i držite biljke van domašaja dece i ljubimaca.'
  },
  {
    keywords: ['dostav', 'isporuk'],
    answer: 'Prema informacijama u ovoj demonstraciji, dostava je dostupna širom Srbije i traje oko 2–3 radna dana.'
  },
  {
    keywords: ['rezerv', 'korpa', 'naruc', 'naruč'],
    answer: 'Biljku možete rezervisati iz kataloga. Rezervacija se prikazuje u korpi, gde možete pregledati i upravljati izabranim biljkama.'
  },
  {
    keywords: ['cena', 'cenovnik', 'popust', 'jeftin', 'skup'],
    answer: 'Cene i dostupnost proverite u katalogu biljaka. Ovaj demo chatbot nema pristup podacima o trenutnim popustima.'
  },
  {
    keywords: ['hvala'],
    answer: 'Nema na čemu! 🌱 Slobodno pitajte ako vam treba još neki savet.'
  }
];

// Bot odgovara samo na ključnee reči.
const getBotReply = (message: string): string => {
  const normalizedMessage = message.toLocaleLowerCase('sr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const matchedReply = replies.find(({ keywords }) =>
    keywords.some(keyword => normalizedMessage.includes(
      keyword.toLocaleLowerCase('sr').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    ))
  );

  return matchedReply?.answer
    ?? 'Mogu da pomognem sa osnovama nege biljaka, zalivanjem, svetlošću i rezervacijama. Napišite naziv biljke ili malo više detalja o pitanju.';
};

const sendChatMessage = (textToSend?: string) => {
  const messageText = textToSend || chatInput.value;
  if (!messageText.trim()) return;

  chatMessages.value.push({ sender: 'user', text: messageText });
  if (!textToSend) chatInput.value = '';

  setTimeout(() => {
    chatMessages.value.push({ sender: 'bot', text: getBotReply(messageText) });
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
        <button v-for="(option, idx) in chatbotOptions" :key="idx" @click="sendChatMessage(option)" class="bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-[11px] whitespace-nowrap shadow-sm transition">
          {{ option }}
        </button>
      </div>

      <!-- Input samo -->
      <form @submit.prevent="sendChatMessage()" class="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input v-model="chatInput" type="text" placeholder="Napišite poruku botu..." class="flex-grow p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs dark:text-white focus:outline-none focus:border-emerald-500">
        <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  </div>
</template>