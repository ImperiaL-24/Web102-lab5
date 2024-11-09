# Lab 5 - Web 102

În acest lab va trebui să lucrați cu un frontend React și cu un backend script în Typescript, cu ajutorul bibliotecii [express.js](https://expressjs.com/). Cum acestea sunt 2 entități diferite, va trebui să le rulați pe ambele in paralel.

## Rularea task-urilor
> Note: Lab-ul a fost gândit să ruleze pe Windows sau pe Linux (nu WSL). Orice altceva poate să producă probleme.
>
Pentru acest lab o să aveți nevoie de `node.js` instalat, care ar trebui să fie instalat din lab-urile anterioare.



Va trebui să instalați `tsx`, un utilitar pentru rularea fișierelor typescript cu node:
```
npm i -D tsx
```


Fiecare task va fi un proiect React cu un server express. Înainte să începeți un task, va trebui să intrați în folderul taskului respectiv și să instalați dependențele necesare:

```
cd task1
npm i
```
> Note: Dependențele (puse în `node_modules`) au în ~100MB per task, așa că asigurați-vă ca aveți destul spatiu pe disk.
>

> Note: Cănd trimiteți tema pe Acadnet este recomandat să trimiteți fară folderele `node_modules` de la fiecare task. Asta vă reduce mărimea lab-ului la cațiva MB.
>

După ce intrați în folder-ul unui task, va trebui să porniți și proiectul React, și serverul express. Pentru asta recomandăm să deschideți 2 terminale în Visual Studio Code cu split terminal (`Ctrl + Shift + 5`) ca săpe aveți pe ambele pe ecran. După rulați in fiecare terminal comenzile următoare pentru a rula.

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

- Din motive de securitate funcția `fetch()` urmărește așa-numitul [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), care blochează orice fetch de pe alte website-uri sau locații care nu sunt din aceași origine (adică același protocol, port și host) ceea ce face fetch-ul relativ limitat în ceea ce poate să facă. Orice fetch către alte origini sunt controlare de [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Pe scurt, orice server web are o listă de origini cu care poate comunica, care implicit este goală. Dacă o origine nu este pe listă, atunci server-ul nu va răspunde (Când se face un fetch trecut prin CORS, se va face un request HTTP de tip OPTIONS, numit preflight request, care ca cere configurația server-ului pe CORS. Datele după vor fi cached).  Noi trebuie să specificăm in `server.ts` să accepte request-uri de la aplicația noastră React, pusă în acest lab pe portul 5173 (server-ul este pus pe portul 3000, deci origini diferite). În express, cofigurarea cors se face cu biblioteca [cors](https://expressjs.com/en/resources/middleware/cors.html).
