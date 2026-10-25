import type { Plant } from '@/models/plant.model';

const illustration = (symbol: string, color: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><rect width="640" height="400" rx="32" fill="${color}"/><text x="320" y="255" text-anchor="middle" font-size="180">${symbol}</text></svg>`)}`;

export const plants: Plant[] = [
  {
    id: 1, name: 'Zamiokulkas', latin_name: 'Zamioculcas zamiifolia',
    description: 'Otporna sobna biljka sjajnih listova, pogodna za stanove i kancelarije.',
    planting_instructions: 'Posadite u saksiju sa drenažnim otvorima i rastresitim supstratom.',
    care_instructions: 'Zalivajte tek kada se zemlja potpuno prosuši; podnosi slabije svetlo.',
    plant_type: 'Sobna biljka', target_audience: 'Početnici', light_requirement: 'Indirektna svetlost',
    watering: 'Retko, nakon sušenja zemlje', intended_use: 'Dekoracija enterijera',
    production_date: '2026-02-10', price: 1250, currency: 'RSD', image_url: illustration('🪴', '#d9f2df'),
    image_alt: 'Zamiokulkas u saksiji', is_available: true, stock_quantity: 24,
    category_id: 1, category: 'Sobne biljke', climate_id: 1, climate: 'Umerena klima',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 101, plantId: 1, author: 'Milica', rating: 5, comment: 'Odlična biljka za početnike, veoma je jednostavna za negu.' },
      { id: 102, plantId: 1, author: 'Nikola', rating: 4, comment: 'Stigla je zdrava i lepo upakovana.' }
    ]
  },
  {
    id: 2, name: 'Sanseverija', latin_name: 'Dracaena trifasciata',
    description: 'Izdržljiva sobna biljka uspravnih listova koja dobro podnosi suv vazduh.',
    planting_instructions: 'Koristite propustan supstrat i saksiju koja nije prevelika.',
    care_instructions: 'Zalivajte umereno i obezbedite svetlo mesto bez jakog podnevnog sunca.',
    plant_type: 'Sobna biljka', target_audience: 'Početnici', light_requirement: 'Svetlo ili polusenka',
    watering: 'Kada se supstrat osuši', intended_use: 'Dekoracija enterijera',
    production_date: '2026-01-22', price: 980, currency: 'RSD', image_url: illustration('🌿', '#d7edcf'),
    image_alt: 'Sanseverija sa uspravnim listovima', is_available: true, stock_quantity: 31,
    category_id: 1, category: 'Sobne biljke', climate_id: 1, climate: 'Umerena klima',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 201, plantId: 2, author: 'Jelena', rating: 5, comment: 'Lepa i laka za održavanje.' },
      { id: 202, plantId: 2, author: 'Marko', rating: 4, comment: 'Dobro napreduje i u hodniku sa manje svetla.' }
    ]
  },
  {
    id: 3, name: 'Monstera', latin_name: 'Monstera deliciosa',
    description: 'Upečatljiva tropska sobna biljka sa velikim dekorativnim listovima.',
    planting_instructions: 'Posadite u hranljiv, prozračan supstrat uz potporu za rast.',
    care_instructions: 'Držite na svetlom mestu sa indirektnom svetlošću i zalivajte kada se površina osuši.',
    plant_type: 'Sobna biljka', target_audience: 'Hobisti', light_requirement: 'Jaka indirektna svetlost',
    watering: 'Umereno, bez zadržavanja vode', intended_use: 'Dekoracija enterijera',
    production_date: '2026-03-14', price: 1890, currency: 'RSD', image_url: illustration('🌱', '#d1ead5'),
    image_alt: 'Mlada monstera sa velikim listovima', is_available: true, stock_quantity: 15,
    category_id: 1, category: 'Sobne biljke', climate_id: 2, climate: 'Topla i vlažna klima',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 301, plantId: 3, author: 'Ana', rating: 5, comment: 'Prelepi listovi, biljka je stigla u odličnom stanju.' },
      { id: 302, plantId: 3, author: 'Stefan', rating: 5, comment: 'Uz potporu brzo raste.' }
    ]
  },
  {
    id: 4, name: 'Epipremnum', latin_name: 'Epipremnum aureum',
    description: 'Puzavica sa srcolikim listovima, prikladna za viseće saksije i police.',
    planting_instructions: 'Posadite u univerzalni supstrat sa dobrom drenažom.',
    care_instructions: 'Zalivajte kada se gornji sloj zemlje prosuši i povremeno skratite izdanke.',
    plant_type: 'Sobna puzavica', target_audience: 'Početnici', light_requirement: 'Indirektna svetlost',
    watering: 'Umereno', intended_use: 'Viseća dekoracija',
    production_date: '2026-02-28', price: 740, currency: 'RSD', image_url: illustration('🍃', '#d8efc9'),
    image_alt: 'Epipremnum sa visećim izdancima', is_available: true, stock_quantity: 28,
    category_id: 1, category: 'Sobne biljke', climate_id: 1, climate: 'Umerena klima',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 401, plantId: 4, author: 'Ivana', rating: 4, comment: 'Lepo izgleda na polici i lako se razmnožava.' },
      { id: 402, plantId: 4, author: 'Petar', rating: 5, comment: 'Odlična biljka, stigla bez oštećenja.' }
    ]
  },
  {
    id: 5, name: 'Aloe vera', latin_name: 'Aloe barbadensis miller',
    description: 'Sukulent mesnatih listova koji čuva vodu i voli sunčana mesta.',
    planting_instructions: 'Koristite mešavinu za kaktuse i saksiju sa drenažom.',
    care_instructions: 'Postavite na svetlo mesto; zalijte tek kada se zemlja potpuno osuši.',
    plant_type: 'Sukulent', target_audience: 'Početnici', light_requirement: 'Jaka svetlost',
    watering: 'Retko', intended_use: 'Dekoracija i kolekcija sukulenata',
    production_date: '2026-03-05', price: 690, currency: 'RSD', image_url: illustration('🌵', '#e2efc8'),
    image_alt: 'Aloe vera u saksiji', is_available: true, stock_quantity: 42,
    category_id: 2, category: 'Sukulenti i kaktusi', climate_id: 3, climate: 'Suva i topla klima',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 501, plantId: 5, author: 'Mina', rating: 5, comment: 'Zdrava biljka i jasna uputstva za negu.' },
      { id: 502, plantId: 5, author: 'Luka', rating: 4, comment: 'Lepo se uklopila na osunčan prozor.' }
    ]
  },
  {
    id: 6, name: 'Lavanda', latin_name: 'Lavandula angustifolia',
    description: 'Mirisna višegodišnja biljka ljubičastih cvetova, pogodna za baštu i saksije.',
    planting_instructions: 'Sadite na sunčanom mestu u propusno, ne previše vlažno zemljište.',
    care_instructions: 'Obezbedite puno sunca, umereno zalivanje i orezivanje posle cvetanja.',
    plant_type: 'Baštenska cvetnica', target_audience: 'Hobisti', light_requirement: 'Puno sunca',
    watering: 'Umereno, otporna na sušu', intended_use: 'Bašta i mirisni vrt',
    production_date: '2026-03-20', price: 520, currency: 'RSD', image_url: illustration('💜', '#e9def4'),
    image_alt: 'Lavanda u cvetu', is_available: true, stock_quantity: 55,
    category_id: 3, category: 'Baštensko cveće', climate_id: 1, climate: 'Umerena klima',
    season_id: 2, season: 'Proleće i leto',
    reviews: [
      { id: 601, plantId: 6, author: 'Sanja', rating: 5, comment: 'Lep miris i dobro se primila u bašti.' },
      { id: 602, plantId: 6, author: 'Dušan', rating: 4, comment: 'Odgovara joj sunčano mesto, lako se održava.' }
    ]
  },
  {
    id: 7, name: 'Čeri paradajz', latin_name: 'Solanum lycopersicum var. cerasiforme',
    description: 'Sadnica rodnog paradajza za baštu, plastenik ili veću terasu.',
    planting_instructions: 'Presadite nakon poslednjeg mraza u hranljivo zemljište i postavite oslonac.',
    care_instructions: 'Zalivajte pri osnovi biljke, redovno uklanjajte zaperke i obezbedite sunce.',
    plant_type: 'Povrtarska sadnica', target_audience: 'Hobisti', light_requirement: 'Puno sunca',
    watering: 'Redovno, bez kvašenja listova', intended_use: 'Povrtnjak i terasa',
    production_date: '2026-04-08', price: 390, currency: 'RSD', image_url: illustration('🍅', '#f7dfd4'),
    image_alt: 'Sadnica čeri paradajza sa plodovima', is_available: true, stock_quantity: 64,
    category_id: 4, category: 'Povrće', climate_id: 1, climate: 'Umerena klima',
    season_id: 2, season: 'Proleće i leto',
    reviews: [
      { id: 701, plantId: 7, author: 'Bojana', rating: 5, comment: 'Sadnica se lepo razvila i dala mnogo plodova.' },
      { id: 702, plantId: 7, author: 'Vladimir', rating: 4, comment: 'Dobro uspeva na osunčanoj terasi.' }
    ]
  },
  {
    id: 8, name: 'Jagoda mesečarka', latin_name: 'Fragaria × ananassa',
    description: 'Sadnica jagode koja daje plodove tokom većeg dela tople sezone.',
    planting_instructions: 'Posadite u humusno zemljište, ostavljajući srce biljke iznad zemlje.',
    care_instructions: 'Zalivajte redovno, održavajte zemljište vlažnim i uklanjajte oštećene listove.',
    plant_type: 'Voćna sadnica', target_audience: 'Porodice', light_requirement: 'Puno sunca',
    watering: 'Redovno i umereno', intended_use: 'Bašta, saksija i terasa',
    production_date: '2026-03-30', price: 460, currency: 'RSD', image_url: illustration('🍓', '#f8dce0'),
    image_alt: 'Sadnica jagode sa zrelim plodom', is_available: true, stock_quantity: 37,
    category_id: 5, category: 'Voće', climate_id: 1, climate: 'Umerena klima',
    season_id: 2, season: 'Proleće i leto',
    reviews: [
      { id: 801, plantId: 8, author: 'Katarina', rating: 5, comment: 'Deca obožavaju plodove, sadnica se brzo primila.' },
      { id: 802, plantId: 8, author: 'Miloš', rating: 4, comment: 'Dobar izbor za uzgoj u saksiji.' }
    ]
  },
  {
    id: 9, name: 'Ruzmarin', latin_name: 'Salvia rosmarinus',
    description: 'Aromatični zimzeleni žbun čiji se listovi koriste kao začin.',
    planting_instructions: 'Sadite u propusno zemljište na toplom, sunčanom mestu.',
    care_instructions: 'Zalivajte umereno; biljka ne voli dugotrajno zadržavanje vode.',
    plant_type: 'Aromatična biljka', target_audience: 'Hobisti', light_requirement: 'Puno sunca',
    watering: 'Umereno, kada se zemlja prosuši', intended_use: 'Začin i ukrasna bašta',
    production_date: '2026-02-18', price: 580, currency: 'RSD', image_url: illustration('🌿', '#d7e9d4'),
    image_alt: 'Ruzmarin u saksiji', is_available: true, stock_quantity: 29,
    category_id: 6, category: 'Začinsko i aromatično bilje', climate_id: 3, climate: 'Topla klima',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 901, plantId: 9, author: 'Jovana', rating: 5, comment: 'Miriše divno i lepo raste na balkonu.' },
      { id: 902, plantId: 9, author: 'Ognjen', rating: 4, comment: 'Zdrav žbun, stigao sa jasnim uputstvom za sadnju.' }
    ]
  },
  {
    id: 10, name: 'Japanski javor', latin_name: 'Acer palmatum',
    description: 'Ukrasno drvo prepoznatljivo po elegantnim listovima i živim jesenjim bojama.',
    planting_instructions: 'Sadite u blago kiselo, drenirano zemljište na mestu zaštićenom od vetra.',
    care_instructions: 'Održavajte ravnomernu vlagu i zaštitite od jakog popodnevnog sunca.',
    plant_type: 'Ukrasno drvo', target_audience: 'Iskusni uzgajivači', light_requirement: 'Polusenka',
    watering: 'Redovno, bez natapanja', intended_use: 'Ukrasna bašta',
    production_date: '2026-01-12', price: 4200, currency: 'RSD', image_url: illustration('🍁', '#f3dfd1'),
    image_alt: 'Mlado ukrasno drvo japanskog javora', is_available: true, stock_quantity: 8,
    category_id: 7, category: 'Drveće i žbunje', climate_id: 1, climate: 'Umerena klima',
    season_id: 3, season: 'Jesen',
    reviews: [
      { id: 1001, plantId: 10, author: 'Tamara', rating: 5, comment: 'Prelepa boja lista i pažljivo upakovana sadnica.' },
      { id: 1002, plantId: 10, author: 'Filip', rating: 4, comment: 'Sadnica je kvalitetna, potrebno joj je malo više pažnje.' }
    ]
  }
];
