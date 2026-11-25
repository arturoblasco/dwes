---
title: Exercicis
---
# <img src="../../img/php_azul.svg" width="40"> Exercicis

### Exercici 501

Crea una nova base de dades amb el nom **`lol`** i col·lació de dades `utf8mb4_unicode_ci`.

<hr>

### Exercici 502

En la nostra base de dades `lol`, que s'ha creat en l'exercici anterior, crearem la taula **`campeon`** amb els camps següents (no oblides posar el tipus de dades de cada un dels camps):

- id [*]
- nombre
- rol
- dificultad
- descripcion

[\*] *id serà la clau primària de la taula lol.*

<hr>

### Exercici 503

Omple la taula `campeon` amb almenys 10 registres, amb les dades que tu vulgues o, si ho preferixes, pots basar-te en la [**pàgina oficial del joc**](https://www.leagueoflegends.com/es-es/champions){:target="_blank"}, però **==NO ET POSES A JUGAR== !!**

!!!note "Ajuda SQL"
	Per a la creació de la taula `campeon` i les seues tuples d'exemple (Exercici 502 i Exercici 503), ací et deixe l'SQL que cal importar en la base de dades lol: [**lol_campeon.sql**](../../sources/lol_campeon.sql){:target="_blank"}


<hr>

## PDO

### Exercici 504

Crea **`504campeones.php`** i llista tots els campions del LOL que has posat en la teua base de dades (1r connexió a la BD i 2n `foreach` per a cada campió que tingues en la taula `campeon`).

<hr>

### Exercici 505

Modifica el fitxer `504campeones.php` i guarda'l com a **`505campeones.php`**. Posa al costat de cada un dels campions llistats un botó per a `editar` i un altre per a `borrar`. Cada un d'eixos botons farà la funció corresponent depenent de l'*id* del campió seleccionat:

- En fer clic en el botó **editar**, l'usuari serà redirigit al fitxer **`505editando.php`**, on es mostrarà un formulari amb els camps omplits amb les dades del campió seleccionat. En prémer el botó de `guardar`, les dades es guardaran en la base de dades i l'usuari serà redirigit a la llista de campions per a poder veure els canvis.
- En fer clic en el botó **borrar**, es preguntarà a l'usuari, a través d'un missatge de *JavaScript* (*prompt*), si està segur que vol esborrar el campió seleccionat. En el missatge de confirmació ha d'aparéixer el **nom del campió seleccionat**. Si l'usuari fa clic en *Aceptar*, el campió s'eliminarà de la base de dades i l'usuari serà redirigit novament al llistat de campions per a comprovar que, efectivament, eixe campió s'ha eliminat de la llista.

<hr>

## Filtres i comodins

### Exercici 506

Modifica el fitxer `504campeones.php` i guarda'l com a **`506campeones.php`** perquè es mostre com una taula amb les columnes de la mateixa taula de la base de dades, és a dir, *id*, *nombre*, *rol*, *dificultad*, *descripción*. Al costat del nom de cada columna, posa 2 icones que siguen **˄** **˅** i que cada una ordene el llistat en funció de la que s'haja premut.

- Si s'ha premut en *Nombre* la icona *˄*, el llistat ha d'aparéixer ordenat per nom ascendent. Si, al contrari, s'ha premut *˅*, s'haurà d'ordenar per nom descendent.
- Tingues en compte que cada icona ha de dur un enllaç al llistat que continga paràmetres en la URL que satisfacen les opcions seleccionades, així que feu ús de *$_GET* per a poder capturar-los i escriviu les consultes SQL que calguen per a fer cada un dels filtres.

!!!note "Icones"
	Pots usar [**Font Awesome**](https://fontawesome.com/){:target="_blank"} per a les icones, però és opcional.

<hr>

### Exercici 507

Aprofita el que vas fer en els exercicis del 501 al 504, però esta vegada utilitzant `PDO::FETCH_ASSOC`.

<hr>

### Exercici 508

Crea una taula nova dins de la base de dades `lol` que ja tens i crea un sistema de *login* amb usuaris. Introduïx en la base de dades almenys 3 usuaris diferents amb contrasenyes diferents. Recorda que:

- La taula nova s'ha d'anomenar `usuario`.
- Els camps que cal crear en la nova taula han de ser: <br />
&nbsp;&nbsp;&nbsp;&nbsp; - `id` [*]<br />
&nbsp;&nbsp;&nbsp;&nbsp; - `nombre`<br />
&nbsp;&nbsp;&nbsp;&nbsp; - `usuario`<br />
&nbsp;&nbsp;&nbsp;&nbsp; - `password`<br />
&nbsp;&nbsp;&nbsp;&nbsp; - `email`<br />
- Les contrasenyes s'han de xifrar abans de guardar les dades en la base de dades.
- Crea el formulari **`508registro.php`**, on l'usuari introduïsca les dades de registre, i vincula'l amb **`508nuevoUsuario.php`** perquè recullga les dades mitjançant POST i les inserisca en la base de dades si tot ha anat bé.
- Queda **TOTALMENT PROHIBIT** accedir a `608nuevoUsuario.php` sense el formulari omplit.
- La sentència d'INSERT ha d'estar controlada perquè no es puga introduir cap dada en blanc. Tingues en compte que estàs modificant la base de dades i no volem camps mal omplits.
- Si tot ha anat bé, mostra un missatge per pantalla que diga `El usuario XXX ha sido introducido en el sistema con la contraseña YYY`.

<hr>

## Fitxers

### Exercici 509

Entra en [**loremipsum.com**](https://www.lipsum.com/){:target="_blank"} i genera un text de 3 paràgrafs. Copia el text generat i guarda'l en un fitxer nou anomenat `509loremIpsum.txt`. Genera un fitxer PHP anomenat **`509loremIpsum.php`** i mostra per pantalla el text del fitxer txt que acabes de crear, la seua grandària en **Kilobytes**, la data de l'última modificació i l'ID d'usuari que va crear el fitxer.

<hr>

### Exercici 510

Torna a carregar el fitxer `506campeones.php` i canvia-li el nom a **`510campeones.php`**, però en compte de mostrar la taula per pantalla, genera un fitxer CSV `510campeones.csv` i un altre `510campeonesCSV.php` on mostres per pantalla el contingut del fitxer `510campeones.csv`.

<hr>
## Projecte CholloCenter
Treballarem amb una base de dades on emmagatzemarem la informació relacionada amb ofertes que publiquen els usuaris i les llistarem en funció de diversos filtres (noves, més votades, més vistes, més comentades, entre altres), a l'estil més pur de [**Chollometro**](https://www.chollometro.com/){:target="_blank"}.

<div style="text-align: center;"><figure><img src="../../img/ut05/img03_06-chollometro.gif" style="zoom:100%;border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 5.8: Pàgina web Chollómetro</figcaption></figure></div>

### Exercici 515

Estructura el projecte i pensa en les taules i bases de dades que necessiteu per a crear el projecte. Crea els UML necessaris amb noms com `515UMLnombreTabla`, posant-hi tots els camps que calguen, així com les relacions que consideres necessàries. Establix un sistema de fitxers per al projecte, tenint en compte que hi haurà imatges, CSS, funcions PHP, constants i fins i tot JavaScript (però bàsic) per a controlar els esdeveniments de l'usuari al llarg de la interfície.

<hr>

### Exercici 516

Crea un sistema de login/password amb els rols `administrador` i `usuario`. De moment, que es validen els usuaris correctament utilitzant xifratge en la contrasenya.

- `Administrador`: Pot veure tots els usuaris registrats, així com els administradors i les gangues creades en la base de dades.
- `Usuario`: Pot veure les seues pròpies gangues, editar-les i esborrar-les, a més de crear-ne de noves.

<hr>

### Exercici 517

Crea la vista per a posar noves gangues i recorda que **només poden entrar en esta vista usuaris registrats o administradors**.

<hr>

### Exercici 518

Crea la vista on es mostren totes les gangues creades. Esta vista la pot veure qualsevol usuari, registrat o no en el sistema. Tingues en compte que esta vista serà la vista general de la web, així que pots anomenar-la `index.php`, on després aplicarem filtres per $_GET.
