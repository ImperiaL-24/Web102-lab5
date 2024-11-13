# Lab 5 Web 102 - Minesweeper

În acest lab va trebui să lucrați cu un frontend React și cu un backend script în Typescript, cu ajutorul bibliotecii [express.js](https://expressjs.com/). Cum acestea sunt 2 entități diferite, va trebui să le rulați pe ambele in paralel.

## Prezentare

Minesweeper este un joc logic care presupune un grid de "plăci" (tile în engleză) sub care se pot afla bombe. Scopul jocului este să descoperi unde sunt toate bombele prin marcarea lor cu un steag.
În acest lab veți face o implementare a jocului, împreună cu un backend pentru cele mai bune timpuri de rezolvare (leaderboard).

## Descrierea Jocului

Jocul începe cu o tablă de tile-uri nedescoperite, și un număr de steaguri. Putem descoperi un tile dacă dăm click pe acel tile. Odată descoperit, tile - ul poate fi o bombă, situație în care am pierdut jocul, sau un număr, care reprezintă numărul de bombe din vecinătatea acelui tile.

Un scenariu de joc (F = Steag, Spatiu = cifra 0, # = Nedescoperit)
```
# # # # #     # # # # #     # # # # #     # # # # #     2 F 3 2 F
# # # # #     # # # # #     # # F # #     # F F 2 2     2 F F 2 2
# # # # #     1 2 # # #     1 2 3 # #     1 2 3 1 1     1 2 3 1 1
# # # # #       1 # # #       1 2 F #       1 2 F 1       1 2 F 1
# # # # #       1 # # #       1 F 2 #       1 F 2 1       1 F 2 1
```
Cu aceste reguli, putem majoritatea timpului să ne dăm seama de toate bombele.

După ce o rundă este terminată, timpul luat pentru a rezolva jocul este salvat și utilizatorul are posibilitatea de a posta pe leaderboard timpul lui, împreună cu un nume.

În acest lab, dimensiunea tabelei de joc o să fie de 5x5, ca să nu dureze foarte mult o rundă.  

## API

Aici este specificația API-ul server-ului pe care trebuie să îl faceți.

`GET /leaderboard` -> imi obtine top 10 cele mai bune timpuri de rezolvare care s-au înregistrat. Aceast endpoint va returna un `JSON` care conține un `Entry[]`:

```ts
interface Entry {
    name: string,
    time: number
}
```
timpul este stocat in milisecunde.

`POST /leaderboard` -> imi adaugă timpul meu la leaderboard. Va trebui postat un `Entry` prin body-ul request-ului.

## Schelete de cod & Task-uri

În acest schelete de cod, NU vom folosi React Redux. Așadar, vom avea toate store-urile aplicației noaste în `App`, și le vom pasa de la componentă la componentă.

În `App`, vom avea 4 `useState`:
- `[table, setTable]`, care va stoca starea curentă a tablei de joc.
- `[start, setStart]`, care va stoca timpul de start a jocului curent.
- `[time, setTime]`, care va stoca timpul În care am terminat ultimul joc.
- `[leaderboard, setLeaderboard]`, care va stoca leaderboard-ul luat de pe server.

### Task-uri
1. Implementarea funcțiilor din `App`

Sunt diferite funcții comune care ne simplifică treaba.

2. Implementarea componentei `Table`
3. Implementarea componentei `Tile`
4. Implementarea componentei `Leaderboard`
5. Implementarea HTTP Endpoint-ului `GET /leaderboard`
6. Implementarea HTTP Endpoint-ului `POST /leaderboard`

## Rularea lab-ului
> Note: Lab-ul a fost gândit să ruleze pe Windows sau pe Linux (nu WSL). Orice altceva poate să producă probleme.
>
Pentru acest lab o să aveți nevoie de `node.js` instalat, care ar trebui să fie instalat din lab-urile anterioare.


Va trebui să instalați `tsx`, un utilitar pentru rularea fișierelor typescript cu node:
```
npm i -D tsx
```


Înainte să începeți laboratorul, va trebui să instalați dependențele necesare:

```
npm i
```
> Note: Dependențele (puse în `node_modules`) au ~100MB, așa că asigurați-vă ca aveți destul spatiu pe disk.
>

> Note: Cănd trimiteți tema pe Acadnet este recomandat să trimiteți fară folder-ul `node_modules`. Asta vă reduce mărimea lab-ului la cațiva MB.
>

După instalarea dependențelor, va trebui să porniți și proiectul React, și serverul express. Pentru asta recomandăm să deschideți 2 terminale în Visual Studio Code cu split terminal (`Ctrl + Shift + 5`) ca să le aveți pe ambele pe ecran. După rulați in fiecare terminal comenzile următoare pentru a porni serverele de backend/frontend.

```
# Terminal 1, pentru React
npm run dev

# Terminal 2, pentru Server
npm run server
```

## Fortificare intelectuală

- Putem creea comenzi personalizate `npm`. `npm run server` este o astfel de comandă, definită in `package.json`, la `scripts`. 
Puteți observa cum defapt comanda rulează `npx tsx ./server/server.ts`.

- Pentru server se folosim o bibliotecă numită [vite-express](https://github.com/szymmis/vite-express) pentru HMR (Hot Module Replacement), adică să nu fiți nevoiți să reporniți server-ul la fiecare modificare făcută.

- Din motive de securitate funcția `fetch()` urmărește așa-numitul [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), care blochează orice fetch de pe alte website-uri sau locații care nu sunt din aceași origine (adică același protocol, port și host) ceea ce face fetch-ul relativ limitat în ceea ce poate să facă. Orice fetch către alte origini sunt controlare de [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Pe scurt, orice server web are o listă de origini cu care poate comunica, care implicit este goală. Dacă o origine nu este pe listă, atunci server-ul nu va răspunde (Când se face un fetch trecut prin CORS, se va face un request HTTP de tip OPTIONS, numit preflight request, care cere configurația server-ului pe CORS. Datele după vor fi cached).  Noi trebuie să specificăm in `server.ts` să accepte request-uri de la aplicația noastră React, pusă în acest lab pe portul 5173 (server-ul este pus pe portul 3000, deci origini diferite). În express, cofigurarea cors se face cu biblioteca [cors](https://expressjs.com/en/resources/middleware/cors.html).

- `fetch()` nu este singura modalitate de a interacționa cu un API. Elementul HTML `<form>` este capabil să posteze (prin POST) date către un API Endpoint.