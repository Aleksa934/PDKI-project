import type { Plant } from '@/models/plant.model';

export const plants: Plant[] = [
  {
    id: 1, name: 'Zamiokulkas', latin_name: 'Zamioculcas zamiifolia',
    description: 'Otporna sobna biljka sjajnih listova, pogodna za stanove i kancelarije.',
    planting_instructions: 'Posadite u saksiju sa drenažnim otvorima i rastresitim supstratom.',
    care_instructions: 'Zalivajte tek kada se zemlja potpuno prosuši; podnosi slabije svetlo.',
    plant_type: 'Sobna biljka', target_audience: 'Početnici', light_requirement: 'Indirektna svetlost',
    watering: 'Retko, nakon sušenja zemlje', intended_use: 'Dekoracija enterijera',
    production_date: '2026-02-10', price: 1250, currency: 'RSD', image_url: '/plants/biljka-010.svg',
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
    production_date: '2026-01-22', price: 980, currency: 'RSD', image_url: '/plants/biljka-009.svg',
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
    production_date: '2026-03-14', price: 1890, currency: 'RSD', image_url: '/plants/biljka-001.svg',
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
    production_date: '2026-02-28', price: 740, currency: 'RSD', image_url: '/plants/biljka-003.svg',
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
    production_date: '2026-03-05', price: 690, currency: 'RSD', image_url: '/plants/biljka-031.svg',
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
    production_date: '2026-03-20', price: 520, currency: 'RSD', image_url: '/plants/biljka-041.svg',
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
    production_date: '2026-04-08', price: 390, currency: 'RSD', image_url: '/plants/biljka-092.svg',
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
    production_date: '2026-03-30', price: 460, currency: 'RSD', image_url: '/plants/biljka-076.svg',
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
    production_date: '2026-02-18', price: 580, currency: 'RSD', image_url: '/plants/biljka-042.svg',
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
    production_date: '2026-01-12', price: 4200, currency: 'RSD', image_url: '/plants/biljka-111.svg',
    image_alt: 'Mlado ukrasno drvo japanskog javora', is_available: true, stock_quantity: 8,
    category_id: 7, category: 'Drveće i žbunje', climate_id: 1, climate: 'Umerena klima',
    season_id: 3, season: 'Jesen',
    reviews: [
      { id: 1001, plantId: 10, author: 'Tamara', rating: 5, comment: 'Prelepa boja lista i pažljivo upakovana sadnica.' },
      { id: 1002, plantId: 10, author: 'Filip', rating: 4, comment: 'Sadnica je kvalitetna, potrebno joj je malo više pažnje.' }
    ]
  },
  {
    id: 11, name: 'Spatifilum', latin_name: 'Spathiphyllum wallisii',
    description: 'Sobna biljka sa tamnozelenim listovima i elegantnim belim cvetovima.',
    planting_instructions: 'Posadite u propustan supstrat za sobne biljke, u saksiju sa drenažnim otvorima.',
    care_instructions: 'Držite u polusenci i zalivajte kada se površinski sloj zemlje prosuši.',
    plant_type: 'Saksijska biljka', target_audience: 'Iskusni uzgajivači', light_requirement: 'Polusenka',
    watering: 'Umereno', intended_use: 'Dekoracija enterijera',
    production_date: '2026-05-31', price: 1700, currency: 'RSD', image_url: '/plants/biljka-011.svg',
    image_alt: 'Ilustracija biljke Spatifilum', is_available: true, stock_quantity: 5,
    category_id: 4, category: 'Sobne biljke', climate_id: 4, climate: 'Tropsko',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 1101, plantId: 11, author: 'Jovana', rating: 5, comment: 'Lepo cveta i prija joj svetlo mesto bez direktnog sunca.' },
      { id: 1102, plantId: 11, author: 'Milan', rating: 4, comment: 'Stigao je zdrav, uz korisna uputstva za zalivanje.' }
    ]
  },
  {
    id: 12, name: 'Aglaonema', latin_name: 'Aglaonema commutatum',
    description: 'Dekorativna sobna biljka sa šarenim listovima koja uspeva na indirektnoj svetlosti.',
    planting_instructions: 'Koristite rastresit supstrat za sobne biljke i saksiju sa drenažom.',
    care_instructions: 'Postavite u polusenku i održavajte zemlju blago vlažnom, ne natopljenom.',
    plant_type: 'Saksijska biljka', target_audience: 'Ljubitelji dekorativnih biljaka', light_requirement: 'Polusenka',
    watering: 'Umereno', intended_use: 'Dekoracija enterijera',
    production_date: '2026-06-13', price: 1830, currency: 'RSD', image_url: '/plants/biljka-012.svg',
    image_alt: 'Ilustracija biljke Aglaonema', is_available: true, stock_quantity: 22,
    category_id: 4, category: 'Sobne biljke', climate_id: 4, climate: 'Tropsko',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 1201, plantId: 12, author: 'Maja', rating: 5, comment: 'Listovi su još lepši uživo, lako se uklopila u dnevnu sobu.' },
      { id: 1202, plantId: 12, author: 'Ivan', rating: 4, comment: 'Dobro napreduje na mestu sa indirektnom svetlošću.' }
    ]
  },
  {
    id: 13, name: 'Difenbahija', latin_name: 'Dieffenbachia seguine',
    description: 'Ukrasna biljka velikih prošaranih listova za svetle, tople prostorije.',
    planting_instructions: 'Posadite u hranljiv, propustan supstrat i obezbedite saksiju sa otvorima.',
    care_instructions: 'Držite na toplom u polusenci i zalivajte umereno kada se površina prosuši.',
    plant_type: 'Saksijska biljka', target_audience: 'Hobisti', light_requirement: 'Polusenka',
    watering: 'Umereno', intended_use: 'Dekoracija enterijera',
    production_date: '2026-06-26', price: 1970, currency: 'RSD', image_url: '/plants/biljka-013.svg',
    image_alt: 'Ilustracija biljke Difenbahija', is_available: true, stock_quantity: 39,
    category_id: 4, category: 'Sobne biljke', climate_id: 4, climate: 'Tropsko',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 1301, plantId: 13, author: 'Lena', rating: 5, comment: 'Veliki dekorativni listovi i odličan kvalitet sadnice.' },
      { id: 1302, plantId: 13, author: 'Boris', rating: 4, comment: 'Lepo raste u toploj prostoriji i polusenci.' }
    ]
  },
  {
    id: 14, name: 'Kalathea orbifolija', latin_name: 'Goeppertia orbifolia',
    description: 'Tropska sobna biljka prepoznatljiva po velikim okruglim listovima sa prugama.',
    planting_instructions: 'Koristite blago, vazdušasto zemljište koje zadržava malo vlage.',
    care_instructions: 'Obezbedite polusenku, vlažniji vazduh i redovno, ali pažljivo zalivanje.',
    plant_type: 'Saksijska biljka', target_audience: 'Porodice', light_requirement: 'Polusenka',
    watering: 'Umereno i redovno', intended_use: 'Dekoracija enterijera',
    production_date: '2026-07-09', price: 2110, currency: 'RSD', image_url: '/plants/biljka-014.svg',
    image_alt: 'Ilustracija biljke Kalathea orbifolija', is_available: true, stock_quantity: 19,
    category_id: 4, category: 'Sobne biljke', climate_id: 4, climate: 'Tropsko',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 1401, plantId: 14, author: 'Sofija', rating: 5, comment: 'Listovi su prelepi, biljka je stigla pažljivo zapakovana.' },
      { id: 1402, plantId: 14, author: 'Nemanja', rating: 4, comment: 'Odgovara joj mesto bez direktnog sunca.' }
    ]
  },
  {
    id: 15, name: 'Maranta', latin_name: 'Maranta leuconeura',
    description: 'Kompaktna sobna biljka sa dekorativnim šarama na listovima.',
    planting_instructions: 'Posadite u lagan supstrat za sobne biljke u saksiju sa drenažom.',
    care_instructions: 'Držite u polusenci i zalivajte kada se gornji sloj zemlje prosuši.',
    plant_type: 'Saksijska biljka', target_audience: 'Početnici', light_requirement: 'Polusenka',
    watering: 'Umereno', intended_use: 'Dekoracija enterijera',
    production_date: '2026-07-22', price: 2240, currency: 'RSD', image_url: '/plants/biljka-015.svg',
    image_alt: 'Ilustracija biljke Maranta', is_available: true, stock_quantity: 36,
    category_id: 4, category: 'Sobne biljke', climate_id: 4, climate: 'Tropsko',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 1501, plantId: 15, author: 'Una', rating: 5, comment: 'Kompaktna i veoma dekorativna biljka.' },
      { id: 1502, plantId: 15, author: 'Vuk', rating: 4, comment: 'Lepo napreduje u svetloj prostoriji bez direktnog sunca.' }
    ]
  },
  {
    id: 16, name: 'Alokazija', latin_name: 'Alocasia amazonica',
    description: 'Atraktivna tropska biljka sa tamnim listovima i izraženim svetlim nervima.',
    planting_instructions: 'Upotrebite rastresit supstrat za sobne biljke i saksiju sa drenažnim otvorima.',
    care_instructions: 'Držite u polusenci na toplom mestu i izbegavajte prekomerno zalivanje.',
    plant_type: 'Saksijska biljka', target_audience: 'Iskusni uzgajivači', light_requirement: 'Polusenka',
    watering: 'Umereno', intended_use: 'Dekoracija enterijera',
    production_date: '2026-08-04', price: 2380, currency: 'RSD', image_url: '/plants/biljka-016.svg',
    image_alt: 'Ilustracija biljke Alokazija', is_available: true, stock_quantity: 16,
    category_id: 4, category: 'Sobne biljke', climate_id: 4, climate: 'Tropsko',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 1601, plantId: 16, author: 'Nina', rating: 5, comment: 'Izuzetno upečatljivi listovi i kvalitetna sadnica.' },
      { id: 1602, plantId: 16, author: 'Andrej', rating: 4, comment: 'Traži pažljivije zalivanje, ali izgleda sjajno.' }
    ]
  },
  {
    id: 17, name: 'Strelicija', latin_name: 'Strelitzia reginae',
    description: 'Egzotična ukrasna biljka poznata po listovima i cvetovima nalik na rajsku pticu.',
    planting_instructions: 'Posadite u plodan, propustan supstrat i ostavite prostor za rast korena.',
    care_instructions: 'Obezbedite mnogo svetla, toplinu i umereno zalivanje tokom rasta.',
    plant_type: 'Saksijska biljka', target_audience: 'Ljubitelji dekorativnih biljaka', light_requirement: 'Svetlo mesto',
    watering: 'Umereno', intended_use: 'Dekoracija enterijera',
    production_date: '2026-08-17', price: 320, currency: 'RSD', image_url: '/plants/biljka-017.svg',
    image_alt: 'Ilustracija biljke Strelicija', is_available: true, stock_quantity: 33,
    category_id: 4, category: 'Sobne biljke', climate_id: 2, climate: 'Suptropsko',
    season_id: 4, season: 'Proleće',
    reviews: [
      { id: 1701, plantId: 17, author: 'Luka', rating: 5, comment: 'Prelepa tropska biljka, dobro se prilagodila novom prostoru.' },
      { id: 1702, plantId: 17, author: 'Mina', rating: 4, comment: 'Zdrava sadnica, voli svetao prozor.' }
    ]
  },
  {
    id: 18, name: 'Sobna palma', latin_name: 'Chamaedorea elegans',
    description: 'Manja palma pogodna za uređenje doma i svetlijih kancelarijskih prostora.',
    planting_instructions: 'Posadite u propustan supstrat u saksiju koja odgovara korenovom busenu.',
    care_instructions: 'Držite u polusenci, dalje od grejnih tela, i zalivajte umereno.',
    plant_type: 'Saksijska biljka', target_audience: 'Hobisti', light_requirement: 'Polusenka',
    watering: 'Umereno', intended_use: 'Dekoracija enterijera',
    production_date: '2026-08-30', price: 460, currency: 'RSD', image_url: '/plants/biljka-018.svg',
    image_alt: 'Ilustracija biljke Sobna palma', is_available: true, stock_quantity: 13,
    category_id: 4, category: 'Sobne biljke', climate_id: 4, climate: 'Tropsko',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 1801, plantId: 18, author: 'Teodora', rating: 5, comment: 'Lepo izgleda u dnevnoj sobi i ne traži mnogo mesta.' },
      { id: 1802, plantId: 18, author: 'Pavle', rating: 4, comment: 'Stigla je zdrava i dobro zaštićena.' }
    ]
  },
  {
    id: 19, name: 'Areka palma', latin_name: 'Dypsis lutescens',
    description: 'Dekorativna palma sa perastim listovima koja unosi tropski izgled u enterijer.',
    planting_instructions: 'Koristite kvalitetan, dobro dreniran supstrat za sobne biljke.',
    care_instructions: 'Obezbedite polusenku, izbegavajte hladan vazduh i održavajte umerenu vlagu.',
    plant_type: 'Saksijska biljka', target_audience: 'Porodice', light_requirement: 'Polusenka',
    watering: 'Umereno', intended_use: 'Dekoracija enterijera',
    production_date: '2026-09-12', price: 590, currency: 'RSD', image_url: '/plants/biljka-019.svg',
    image_alt: 'Ilustracija biljke Areka palma', is_available: true, stock_quantity: 30,
    category_id: 4, category: 'Sobne biljke', climate_id: 4, climate: 'Tropsko',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 1901, plantId: 19, author: 'Ivana', rating: 5, comment: 'Unela je baš lep tropski izgled u prostoriju.' },
      { id: 1902, plantId: 19, author: 'Miloš', rating: 4, comment: 'Lepo napreduje uz umereno zalivanje.' }
    ]
  },
  {
    id: 20, name: 'Dracena marginata', latin_name: 'Dracaena marginata',
    description: 'Izdržljiva sobna biljka uskih listova koja se lako uklapa u različite prostore.',
    planting_instructions: 'Posadite u rastresit supstrat i saksiju sa dobrom drenažom.',
    care_instructions: 'Držite u polusenci na toplom mestu i pustite da se zemlja prosuši između zalivanja.',
    plant_type: 'Saksijska biljka', target_audience: 'Početnici', light_requirement: 'Polusenka',
    watering: 'Umereno', intended_use: 'Dekoracija enterijera',
    production_date: '2026-09-25', price: 730, currency: 'RSD', image_url: '/plants/biljka-020.svg',
    image_alt: 'Ilustracija biljke Dracena marginata', is_available: true, stock_quantity: 10,
    category_id: 4, category: 'Sobne biljke', climate_id: 2, climate: 'Suptropsko',
    season_id: 1, season: 'Cele godine',
    reviews: [
      { id: 2001, plantId: 20, author: 'Filip', rating: 5, comment: 'Odličan izbor za početnike, jednostavna za negu.' },
      { id: 2002, plantId: 20, author: 'Sara', rating: 4, comment: 'Stigla je u dobrom stanju i brzo se prilagodila.' }
    ]
  }
];
