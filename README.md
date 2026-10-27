# Flora Dom — prototip prodavnice biljaka

Interaktivni Vue prototip omogućava pregled i pretragu kataloga biljaka, rezervisanje proizvoda, upravljanje korpom i profilom kupca. Podaci se simuliraju lokalno

## Pokretanje

Potrebni su Node.js i npm.

```sh
npm install
npm run dev
```

Za proveru tipova i produkcioni build:

```sh
npm run build
```

## Funkcije prototipa

- Lokalni katalog sa  biljaka, opisima, uputstvima za sadnju i negu i demonstracionim recenzijama
- Odvojena pretraga po nazivu, opisu, uputstvu za sadnju, uputstvu za negu i tekstu recenzija, uz filtre za kategoriju, tip, podneblje, sezonu, ciljnu grupu, datum proizvodnje, raspon cene i ocenu
- Registracija i prijava kupca; korpa i profil dostupni su samo prijavljenom korisniku.
- Korpa sa odvojenim podacima po email adresi naloga. Rezervisane stavke mogu da se uređuju i otkažu, pristigle da se ocene i obrišu, a otkazane se isključuju iz ukupne cene
- Izmena profila i lozinke, istorija rezervacija, štampanje potvrde za pristigle stavke i simulirani chat Bota

Biljke i početne recenzije su demonstracioni podaci
Rezervacije nalozi i korisničke ocene čuvaju se lokalno u pregledaču i nisu namenjeni stvarnoj prodaji ili autentifikaciji

