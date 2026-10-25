# FloraOaza — prototip digitalne prodavnice biljaka

Interaktivni Vue prototip omogućava pregled i pretragu kataloga biljaka, rezervisanje proizvoda, upravljanje korpom i profilom kupca. Podaci se simuliraju lokalno; projekat ne zahteva bazu podataka ni spoljašnji API.

## Pokretanje

Potrebni su Node.js 22.18+ i npm.

```sh
npm install
npm run dev
```

Za proveru tipova i produkcioni build:

```sh
npm run build
```

## Funkcije prototipa

- Lokalni katalog sa 20 biljaka, opisima, uputstvima za sadnju i negu i demonstracionim recenzijama.
- SVG ilustracije biljaka iz `https://plants.pequla.com/`, preuzete u `public/plants/` da bi se prikazivale i bez internet veze.
- Pretraga po nazivu, opisu, sadnji, nezi, tipu i tekstu recenzija, uz filtre za kategoriju, tip, podneblje, sezonu, ciljnu grupu, datum proizvodnje, raspon cene i ocenu.
- Registracija i prijava kupca; korpa i profil dostupni su samo prijavljenom korisniku.
- Korpa sa odvojenim podacima po email adresi naloga. Rezervisane stavke mogu da se uređuju i otkažu, pristigle da se ocene i obrišu, a otkazane se isključuju iz ukupne cene.
- Izmena profila, istorija rezervacija, štampanje potvrde za pristigle stavke i simulirani Flora Bot.

Biljke i početne recenzije u `src/data/plants.ts` su demonstracioni podaci. Ilustracije su vektorske slike, ne fotografije. Rezervacije, nalozi i korisničke ocene čuvaju se lokalno u pregledaču i nisu namenjeni stvarnoj prodaji ili autentifikaciji.

## Dokumentacija za predaju

PDF dokument sa po jednim prikazom stranice i opisom funkcije nalazi se u [docs/Prototip-dokumentacija.pdf](./docs/Prototip-dokumentacija.pdf). HTML izvor dokumenta i slike nalaze se u direktorijumu `docs/`.
