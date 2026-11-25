---
title: Exercicis
---
# <img src="../../img/php_azul.svg" width="40"> Exercicis

### Exercici 401

- `401server.php`: igual que l'exemple vist en els apunts, mostra els valors de `$_SERVER` en executar un script en el teu ordinador.
- Prova a passar-li paràmetres (p. ex. *nom* i *cognoms*) per GET des de `401get.html`.
- En un altre exemple, `401getNada.html`, no li passes cap paràmetre.
- Prepara un formulari (`401post.html`) que faça un enviament per POST (p. ex. *nom* i *cognoms*) i torna a comprovar-ho.

- Crea una pàgina (`401enlace.html`) que tinga un enllaç a `401server.php` i comprova el valor de `HTTP_REFERER`.

<hr>
## Formularis

### Exercici 402

`402formulario.html` i `402formulario.php`: Crea un formulari que sol·licite:

- Nom i cognoms.
- Correu electrònic.
- URL de la pàgina personal.
- Sexe (*radio*).
- Nombre de convivents en el domicili.
- Aficions (*checkboxes*) – posa com a mínim 4 valors.
- Menú favorit (*llista de selecció múltiple*) – posa com a mínim 4 valors.

Mostra els valors carregats en una taula resum.

### Exercici 403

`403validacion.php`: a partir del formulari anterior, introduïx validacions en HTML mitjançant l'atribut `required` dels camps (usa també els tipus adequats per a cada camp), i comprova els tipus de les dades i que complixen els valors esperats (per exemple, en els checkboxes, que els valors recollits formen part de tots els possibles). 

Prova a passar-li dades errònies via URL i comprova'n el comportament.

!!!note "Nota"
    Investiga l'ús de la funció `filter_var`.

### Exercici 404

`404subida.html` i `404subida.php`: crea un formulari que permeta pujar un fitxer al servidor. A més del fitxer, ha de demanar en el mateix formulari dos camps numèrics que sol·liciten l'*amplària* i l'*altura*. Comprova que tant el fitxer com les dades arriben correctament.

### Exercici 405

`405subidaImagen.php`: modifica l'exercici anterior perquè únicament permeta pujar imatges (comprova la propietat `type` del fitxer pujat). Si l'usuari selecciona un altre tipus de fitxer, se l'ha d'informar de l'error i permetre-li que pugen un nou fitxer.

En el cas de pujar el tipus correcte, visualitza la imatge amb l'amplària i l'altura rebudes com a paràmetre.

<hr>
## Cookies i sessió

### Exercici 406

`406contadorVisitas.php`: Mitjançant l'ús de cookies, informa l'usuari de si és la seua primera visita o, si no ho és, mostra'n el valor (valor d'un comptador). A més, has de permetre que l'usuari reinicialitze el seu comptador de visites.

### Exercici 407

`407fondo.php`: Mitjançant l'ús de cookies, crea una pàgina amb un desplegable amb diversos colors, de manera que l'usuari puga canviar el color de fons de la pàgina (atribut `bgcolor`). En tancar la pàgina, esta ha de recordar, almenys durant 24h, el color triat, i la pròxima vegada que es carregue la pàgina, ho ha de fer amb l'últim color seleccionat.

### Exercici 408

`408fondoSesion1.php`: Modifica l'exercici anterior per a emmagatzemar el color de fons en la sessió i no emprar cookies. A més, ha de contindre un enllaç al fitxer següent. 

`408fondoSesion2.php`: Ha de mostrar el color i donar la possibilitat de:

- tornar a la pàgina anterior mitjançant un enllaç
- i, mitjançant un altre enllaç, buidar la sessió i tornar a la pàgina anterior.

### Exercici 409

Fent ús de la sessió, dividirem el formulari de l'exercici `402formulario.php` en 2 subformularis:

- `409formulario1.php` envia les dades (nom i cognoms, correu electrònic, url i sexe) a `409formulario2.php`.
- `409formulario2.php` llig les dades i les posa en la sessió. A continuació, mostra la resta de camps del formulari que cal omplir (convivents, aficions i menú). Envia estes dades a `409formulario3.php`.
- `409formulario3.php` recull les dades enviades en el pas anterior i, juntament amb les que ja estaven en la sessió, es mostren totes les dades en una taula/llista desordenada.

<hr>
## Autenticació

En els exercicis següents muntarem una estructura d'inici de sessió semblant a la vista en els apunts.

### Exercici 410

`410index.php`: formulari d'inici de sessió

### Exercici 411

`411login.php`: fa de controlador, per la qual cosa ha de comprovar les dades rebudes (només permet l'entrada de `usuario / usuario`) i, si tot és correcte, cedir el control a la vista de l'exercici següent. No conté codi HTML.

### Exercici 412

`412peliculas.php`: vista que mostra com a títol "Llistat de pel·lícules", i una llista desordenada amb tres pel·lícules.

### Exercici 413

`413logout.php`: buida la sessió i ens porta de nou al formulari d'inici de sessió. No conté codi HTML

### Exercici 414

`414series.php`: Afig una nova vista semblant a `412peliculas.php` que mostre un "Llistat de sèries" amb una llista desordenada amb tres sèries. Tant `412pelicuas.php` com la vista acabada de crear han de tindre un xicotet menú (senzill, mitjançant enllaços) que permeta passar d'un llistat a l'altre. Comprova que, si s'accedix directament a qualsevol de les vistes via URL del navegador sense tindre un usuari identificat, no es mostra el llistat.

### Exercici 415

Modifica tant el controlador com les vistes perquè:

- les dades les obtinga el controlador (emmagatzema en la sessió un array de pel·lícules i un altre de sèries)
- col·loca les dades en la sessió
- En les vistes, les dades es recuperen de la sessió i es *pinten* en la llista desordenada recorrent l'array corresponent.

<hr>

## Projecte Videoclub 3.0

### Exercici 416

Per al Videoclub, crearem una pàgina `index.php` amb un formulari que continga un formulari de login/password. Es comprovaran les dades en `login.php`. Els possibles usuaris són admin/admin o usuario/usuario

- Si l'usuari és correcte, en `main.php` mostra un missatge de benvinguda amb el nom de l'usuari, juntament amb un enllaç per a tancar la sessió, que el portaria de nou al login.
- Si l'usuari és incorrecte, ha de tornar a carregar el formulari i informar l'usuari que l'accés és incorrecte.

### Exercici 417

Si l'usuari és administrador, es carregaran en la sessió les dades de suports i clients del videoclub que teníem en les nostres proves. En la unitat següent les obtindrem de la base de dades. En `mainAdmin.php`, a més de la benvinguda, ha de mostrar:

- Llistat de clients
- Llistat de suports

### Exercici 418

Modificarem la classe `Cliente` per a emmagatzemar el `user` i la `password` de cada client. Després de codificar els canvis, modifica el llistat de clients de `mainAdmin.php` per a afegir l'usuari al llistat.

### Exercici 419

Si l'usuari que accedix no és administrador i coincidix amb algun dels clients que tenim carregats després del login, ha de carregar `mainCliente.php`, on es mostrarà un llistat dels lloguers del client. Per a això, modificarem la classe `Cliente` per a oferir el mètode `getAlquileres() : array`, que cridarem i després recorrerem per a mostrar el llistat sol·licitat.

<div style="text-align: center;"><figure><img src="../../img/ut04/act01esquemaNavegacion.png" alt="act01esquemaNavegacion" style="zoom:90%;" /><figcaption class="figure-caption-small">🖼️ Figura 4.9: Lògica de l'estructura de pàgines de l'exercici 423</figcaption></figure></div>

<hr>

Ara tornem a la part d'administració:

### Exercici 420

A més de mostrar el llistat de clients, oferirem l'opció de donar d'alta un nou client en `formCreateCliente.php`. Les dades s'enviaran mitjançant POST a `createCliente.php`, que les introduirà en la sessió. Una vegada creat el client, ha de tornar a carregar `mainAdmin.php`, on es podrà veure el client inserit. Si hi ha alguna dada incorrecta, ha de tornar a carregar el formulari d'alta.

### Exercici 421

Crea en `formUpdateCliente.php` un formulari que permeta editar les dades d'un client. Has de recollir les dades en `updateCliente.php`. Les dades del client s'han de poder modificar des de la mateixa pàgina d'un client, així com des del llistat de l'administrador.

### Exercici 422

Des del llistat de clients de l'administrador has d'oferir la possibilitat d'esborrar un client. En el navegador, abans de redirigir al servidor, l'usuari ha de confirmar mitjançant JS que realment vol eliminar el client. Finalment, en `removeCliente.php` elimina el client de la sessió. Una vegada eliminat, ha de tornar al llistat de clients.

<div style="text-align: center;"><figure><img src="../../img/ut04/act02esquemaNavegacionVideoclub.png" alt="act02esquemaNavegacionVideoclub" style="zoom:90%;" /><figcaption class="figure-caption-small">🖼️ Figura 4.10: Lògica de l'estructura de pàgines de l'exercici 426</figcaption></figure></div>
