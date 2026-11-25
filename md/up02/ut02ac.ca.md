---
title: Exercicis
---
# <img src="../../img/php_azul.svg" width="40"> Exercicis

## Php bàsic

### Exercici 201

Visualitza el [**vídeo**](https://youtu.be/DWEDUZgBZ8Y?si=2wF4cCrhmQfyEtAN&t=210){:target="_blank"} de *Jesús Amieiro* sobre PHP en 2020 a partir del minut 3:32 (són 40 minuts aproximadament).

- Quina relació hi ha entre PHP i Facebook?
- Pel que fa al rendiment, quina versió mínima hauríem d'utilitzar?
- Per què PHP té mala fama?

### Exercici 202

`202tresfrases.php`: Mostra 3 frases, cadascuna en un paràgraf distint, utilitzant les tres possibilitats que hi ha de mostrar contingut. Després, introduïx dos comentaris, un de bloc i un altre d'una línia.

### Exercici 203

`203calculos.php`: Escriu un programa que utilitze les variables `$x` i `$y`. Assigna'ls els valors `166` i `999 `respectivament.

A continuació, mostra per pantalla el valor de cada variable, la suma, la resta, la divisió i la multiplicació.

### Exercici 204

`204datosPersonales.php`: Escriu un programa que emmagatzeme en variables *el teu nom*, *primer cognom*, *segon cognom*, *email*, *any de naixement* i *telèfon*. Després mostra'ls per pantalla dins d'una taula.

<div style="text-align: center;"><figure><img src="../../img/ut02/img00.png" alt="img00" style="zoom:60%; border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 2.52: Taula resultant de l'exercici 204</figcaption></figure></div>

### Exercici 205

`205datosPersonales.html` i `205datosPersonales.php`: És el mateix exercici que l'anterior, però separant la lògica. En el primer fitxer crearem el formulari per a introduir les dades, i després recollim les dades i generem la taula en el segon fitxer.

### Exercici 206

`206madlib.html` i `206madlib.php`: A partir d'un *nom*, un *verb*, un *adjectiu* i un *adverbi*, crea una història que continga estos elements. Per exemple:

- Entrada: *gos* / *caminar* / *blau* / *ràpidament*
- Eixida: *T'agrada caminar amb el teu gos blau ràpidament?*
- `206madlib2.html` i `206madlib2.php` Crea un madlib més extens, llegint més dades d'entrada.

### Exercici 207

`207anyos.php`: Després de llegir l'edat d'una persona, mostrar l'edat que tindrà d'ací a 10 anys i la que tenia fa 10 anys. A més, mostra quin any serà en cada un dels casos. Finalment, mostra l'any de jubilació suposant que treballaràs fins als 67 anys. En este cas, no cal que prèviament cregues un formulari, pots provar l'exercici via URL: `207anyos.php?edad=33`.

!!!note "**A tindre en compte**"
 	`$anyoActual = date("Y");`

### Exercici 208

`208dinero.php`: A partir d'una quantitat de diners, mostrar-ne la descomposició en bitllets (500, 200, 100, 50, 20, 10, 5) i monedes (2, 1), perquè el nombre d'elements siga mínim. No s'ha d'utilitzar cap instrucció condicional. Per exemple, en introduir `139` ha de mostrar:

```php
1 billete de 100
0 billete de 50
1 billete de 20
1 billete de 10
1 billete de 5
2 moneda de 2
```

!!!note "**A tindre en compte**"
 	Pots forçar la divisió entera mitjançant la funció `intdiv($dividendo, $divisor) `o, per a passar un número flotant a enter, pots usar la funció `intval()`.

### Exercici 209

`209posnegcero.php`: A partir d'un número, mostra per pantalla si el número és `positivo`, `negativo` o `cero`.

### Exercici 210

`210mayor3.php`: Sense fer ús de condicions que utilitzen dins de la condició els operadors lògics, mostra el major de tres números (a, b i c).

`210mayor3c.php`: Utilitza en les condicions els operadors lògics.

### Exercici 211

`211nombreEdad.php`: A partir d'una edat mostra per pantalla:

- *nadó* si té menys de 3 anys
- *xiquet* si té entre 3 i 12 anys
- *adolescent* entre 13 i 17 anys
- *adult* entre 18 i 66
- *jubilat* a partir de 67

### Exercici 212

`212reloj.php`: Escriu un programa que funcione de manera semblant a un rellotge, de manera que a partir dels valors d'*hora*, *minut* i *segon* mostre l'hora que serà d'ací a un segon. Després de les *23:59:59* seran les *0:0:0*.

### Exercici 213

`213calendario.php`: Escriu un programa semblant a un calendari de manera que a partir de *dia*, *mes* i *anyo* mostre la data d'un dia després. Has de tindre en compte que no tots els mesos tenen 30 dies. En este cas, no tindrem en compte els anys de traspàs.

### Exercici 214

`214ecuacion2g.php`: Crea un programa que resolga una equació de 2n grau del tipus `ax² + bx + c = 0`. Tin en compte que pot tindre 2 solucions, 1 o cap, depenent del valor del discriminant `b²-4ac`.

<div style="text-align: center;"><figure><img src="../../img/ut02/img01.png" alt="img01" style="zoom:80%; border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 2.53: Equació de segon grau per a l'exercici 214</figcaption></figure></div>

!!!note "**A tindre en compte**"
 	Per a calcular l'arrel quadrada hauràs d'utilitzar la funció `sqrt()`.

### Exercici 215

Investiga per a què servix l'operador nau espacial, disponible des de PHP7 ([**https://www.php.net/manual/es/migration70.new-features.php**](https://www.php.net/manual/es/migration70.new-features.php){:target="_blank"}). Explica amb un parell de línies el seu propòsit i demostra'n l'ús mitjançant codi.

### Exercici 216

Investiga per a què servix la instrucció `match()`, disponible des de PHP8 ([**https://www.php.net/manual/es/control-structures.match.php**](https://www.php.net/manual/es/control-structures.match.php){:target="_blank"}). Explica amb un parell de línies el seu propòsit i demostra'n l'ús mitjançant codi.

## Bucles

### Exercici 221

`221pares050.php`: Escriu un programa que mostre els números parells del 0 al 50 (dins d'una llista no ordenada).

`221paresAB.php`: A partir de l'anterior, refactoritzar perquè funcione amb `inicio` i `fin`.

### Exercici 222

`222suma110.php`: Escriu un programa que sume els números de l'1 al 10.

`222sumaAB.php`: A partir de l'anterior, refactoritzar perquè funcione amb `inicio` i `fin`.

### Exercici 223

`223potencia.php`: A partir d'una base i un exponent, mitjançant l'acumulació de productes, calcula la potència utilitzant la instrucció `for`.

`223potenciaWhile.php`: Reescriu l'exercici anterior fent ús només de `while`.

`223potenciaDoWhile.php`: Reescriu l'exercici anterior fent ús només de `do-while`.

### Exercici 224

`224tablaMultiplicar.php`: Mostra dins d'una taula HTML la taula de multiplicar del número que reba com a paràmetre. Utilitza `<thead>` amb els seus respectius `<th>` i `<tbody>` per a dibuixar la taula. Per exemple:

| **a** | ***** | **b** | **=** | **a\*b** |
| ----- | ----- | ----- | ----- | -------- |
| 7     | *     | 1     | =     | 7        |
| 7     | *     | 2     | =     | 14       |
| ...   |       |       |       |          |
| 7     | *     | 10    | =     | 70       |

### Exercici 225

`225formulario.html`: Crea un formulari que permeta llegir una quantitat.

`225leerDatos.php`: a partir de la quantitat, prepara un formulari amb tantes caixes de dades com indique el seu valor.

Finalment, en `225sumarDatos.php`: a partir de les dades de totes les caixes de la pàgina anterior, suma-les i mostra el total.

!!!note "**A tindre en compte**"
 	Per a guardar una dada oculta pots utilitzar un camp de formulari de tipus ocult: `<input type="hidden" name="cantidad" value="33" />`.

### Exercici 226

`226formulario.html` i `226tabla.php`: A partir d'un nombre de `filas` i `columnas`, crear una taula amb eixa grandària. Les cel·les han d'estar emplenades amb els valors de les coordenades de cada cel·la.

### Exercici 227

`227formulario.html` i `227cuadrado.php`: Basant-te en l'exercici anterior, emplena la taula de manera que només les vores tinguen contingut i la resta de cel·les queden en blanc.

### Exercici 228

`228formulario.html` i `228equis.php`: Basant-te en l'exercici anterior, ara només ha d'aparéixer el contingut de les dues diagonals.

### Exercici 229

`229cuadradoMultiplicar.php`: Crea un programa que mostre per pantalla un quadrat exactament igual (fixa't bé en els encapçalaments, tant de les files com de les columnes) al de la imatge amb les taules de multiplicar.

<div style="text-align: center;"><figure><img src="../../img/ut02/img02.png" alt="img02" style="zoom:90%; border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 2.54: Quadrat 12x12</figcaption></figure></div>

## Arrays

### Exercici 231

`231aleatorios50.php`: Emplena un array amb 50 números aleatoris compresos entre el 0 i el 99.

Després mostra'l en una llista no ordenada.

> Per a crear un número aleatori, utilitza la funció `rand(inicio, fin)`.
> 
> Per exemple:
> 
> ```php
> $num = rand(0, 99);
> ```

### Exercici 232

`232bola8.html`: Prepara un formulari amb una caixa de text que faça una pregunta a l'usuari.

`232bola8.php`: A partir de l'anterior, crea un programa que mostre la pregunta rebuda i genere una resposta de manera aleatòria entre un conjunt de respostes predefinides, emmagatzemades en un array: *Sí, no, potser, i tant que sí, per descomptat que no, no ho tinc clar, segur, jo diria que sí, ni de broma, etc...*.

> Este exercici es basa en el joc de la [**Bola 8 màgica**](https://es.wikipedia.org/wiki/Magic_8-Ball){:target="_blank"}.

### Exercici 233

`233mates.php`: A partir de l'exercici 231, genera un array aleatori de 33 elements amb números compresos entre el 0 i 100 i calcula:

- El major
- El menor
- La mitjana

### Exercici 234

`234sexos.php`: Emplena un array de 100 elements de manera aleatòria amb valors `M` o `F` (per exemple `["M", "M", "F", "M", ...]`). Una vegada completat, torna a recórrer-lo i calcula quants elements hi ha de cada un dels valors, emmagatzemant el resultat en un array associatiu `['M' => 44, 'F' => 66]` (no utilitzes variables per a comptar les `M` o les `F`). Finalment, mostra el resultat per pantalla

### Exercici 235

`235monedas.php`: Torna a fer l'exercici 207, el de les monedes (500, 200, 100, 50, 20, 10, 5, 2, 1), però fent ús d'arrays i un bucle. Emmagatzema el resultat en un array associatiu. Mostra el resultat en una llista no ordenada únicament amb les quantitats que tenen algun valor.

### Exercici 236

`236alturas.php`: Mitjançant un array associatiu, emmagatzema el nom i l'altura de 5 persones (`nombre => altura`). Posteriorment, recorre l'array i mostra'l en una taula HTML. Finalment afig una última fila a la taula amb l'altura mitjana.

### Exercici 237

`237personas.php`: Mitjançant un array bidimensional, emmagatzema el nom, l'altura i l'email de 5 persones. Per a fer-ho, crea un array de persones, on cada persona és un array associatiu: `[ ['nombre'=>'Aitor', 'altura'=>182, 'email'=>'aitor@correo.com'],[…],… ]` Posteriorment, recorre l'array i mostra'l en una taula HTML.

### Exercici 238

`238leerCantidad.html` i `238leerPersonas.php`: a partir d'un formulari amb un camp de `cantidad` de persones, generar un nou formulari per a llegir el nom, l'altura i l'email de `cantidad` persones.

`238gestionarPersonas.php`: A partir de les persones introduïdes, mostrar les seues dades en una taula i, posteriorment, destacar les dades del més alt i del més baix.

### Exercici 239

`239tablaDistintos.php`: Emplena un array bidimensional de 6 files per 9 columnes amb números aleatoris compresos entre 100 i 999 (tots dos inclosos). Tots els números han de ser distints, és a dir, no se'n pot repetir cap.
Mostra a continuació per pantalla el contingut de l'array de tal manera que:

- La columna del màxim ha d'aparéixer en blau.
- La fila del mínim ha d'aparéixer en verd
- La resta de números han d'aparéixer en negre.

## Funcions

### Exercici 241

`241arrayPar.php`: Crea les funcions següents:

- Una funció que esbrine si un número és parell: `esPar(int $num): bool`
- Una funció que retorne un array de grandària `$tam` amb números aleatoris compresos entre `$min` i `$max`: `arrayAleatorio(int $tam, int $min, int $max) : array`
- Una funció que reba un `$array` per referència i retorne la quantitat de números parells que hi ha emmagatzemats: `arrayPares(array &$array): int`

### Exercici 242

`242parametrosVariables.php`: Crea les funcions següents:

- Una funció que retorne el major de tots els números rebuts com a paràmetres: `function mayor(): int`. Utilitza les funcions `func_get_args()`, etc... No pots usar la funció `max()`.
- Una funció que concatene tots els paràmetres rebuts separant-los amb un espai: `function concatenar(...$palabras) : string`. Utilitza l'operador ....

### Exercici 243

`243matematicas.php`: Afig les funcions següents:

- `digitos(int $num): int` → retorna la quantitat de dígits d'un número.
- `digitoN(int $num, int $pos): int` → retorna el dígit que ocupa, començant per l'esquerra, la posició `$pos`.
- `quitaPorDetras(int $num, int $cant): int` → li lleva per darrere (dreta) `$cant` dígits.
- `quitaPorDelante(int $num, int $cant): int` → li lleva per davant (esquerra) `$cant` dígits.

Per a provar les funcions, fes ús tant del pas d'arguments posicionals com d'arguments amb nom.

### Exercici 244

`244biblioteca.php`: crea un fitxer amb funcions per a sumar, restar, multiplicar i dividir dos números.

`244arrayFunciones.php`: fent ús d'un array que emmagatzeme el nom de les funcions del fitxer anterior, a partir de dos números rebuts per URL, recorre l'array i invoca les funcions de manera dinàmica fent ús de funcions variable.

### Exercici 245

`245euros.php`: Crea una biblioteca amb dues funcions:

- peseta2euros: passa de pessetes a euros
- euros2pesetas: passa d'euros a pessetes

Cada funció ha de rebre dos paràmetres:

- La quantitat que s'ha de transformar
- La cotització, amb un paràmetre per defecte amb el factor de transformació.

`245calculadoraEuros.php`: utilitza `244euros.php` i prova les funcions passant tant quantitats amb la cotització per defecte com amb noves cotitzacions. Recorda que 1 euro són/eren 166.36 pessetes.

### Exercici 246

`246preparaTiquetCompra.php`: A partir d'una quantitat de productes, llegir el nom i el cost de la quantitat de productes indicada (semblant a l'exercici 237, però esta vegada no cal crear el formulari amb la quantitat, es rep mitjançant un paràmetre GET via URL).

`246imprimeTiquetCompra.php`: Després de llegir les dades del tiquet de compra, enumera en una taula els productes, amb el seu preu en euros i pessetes, i finalment, en una última fila, totalitza en les dues monedes.

### Exercici 247

A partir dels fitxers creats en l'exercici anterior, crea una plantilla mitjançant includes: `247preparaCompra.php`: semblant a *246preparaTiquetCompra.php*, però separant l'encapçalament (Supermercat Severo en `h1`) i el peu (El teu supermercat de confiança) en fitxers externs i fent-hi referència mitjançant `include`.

<div style="text-align: center;"><figure><img src="../../img/ut02/img03.png" alt="img03" style="zoom:100%; border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 2.55: Ús de plantilles en l'Exercici 247</figcaption></figure></div>

`247listaCompra.php`: rep les dades de l'anterior, i reutilitza part de *246imprimeTiquetCompra.php* canviant la taula per una llista no ordenada dels productes juntament amb el seu preu.

### Exercici 248

Simularem un formulari d'accés:

- `248login.php`: el formulari d'entrada, que sol·licita l'usuari i la contrasenya.
- `248compruebaLogin.php`: rep les dades i comprova si són correctes (els usuaris es guarden en un array associatiu) i passa el control mitjançant l'ús d'`include` a:
  - `248ok.php`: L'usuari introduït és correcte
  - `248ko.php`: L'usuari és incorrecte. Informar si tots dos estan malament o només la contrasenya. Tornar a mostrar el formulari d'accés.

## Funcions predefinides

Tots els exercicis s'han de fer creant noves funcions per a encapsular el codi. A més de la funció mateixa, l'exercici ha de contindre codi per a poder provar-lo.

### Exercici 251

`251fraseImpares.php`: Llig una frase i retorna'n una de nova amb només els caràcters de les posicions imparells.

### Exercici 252

`252vocales.php`: A partir d'una frase, retorna la quantitat de cada una de les vocals, i el total.

### Exercici 253

`253analizador.php`: A partir d'una frase amb paraules separades només per espais, retornar

- Lletres totals i quantitat de paraules
- Una línia per cada paraula indicant-ne la grandària

!!!note "**A tindre en compte**"
 	No es pot usar `str_word_count`.

`253analizadorWC.php`: Investiga què fa la funció `str_word_count`, i torna a fer l'exercici.

### Exercici 254

`254cani.php`: EsCrIu UnA fUnCiÓ qUe TrAnSfOrMe UnA cAdEnA eN cAnI.

### Exercici 255

`255palindromo.php`: Escriu una funció que retorne un booleà indicant si una paraula és palíndroma (es llig igual d'esquerra a dreta que de dreta a esquerra, per exemple, “ligar es ser agil”).

### Exercici 256

`256codificar.php`: Utilitzant les funcions per a treballar amb caràcters, a partir d'una cadena i un desplaçament:

- Si el desplaçament és 1, substituïx la A per B, la B per C, etc.
- El desplaçament no pot ser negatiu
- Si s'ix de l'abecedari, ha de tornar a començar
- Cal respectar els espais, punts i comes.

### Exercici 257

`257filtrado.html`: Crea un programa que permeta a l'usuari llegir un conjunt de números separats per espais.

`257filtrado.php`: El programa filtrarà els números llegits per a tornar a mostrar únicament els números parells i indicarà la quantitat que n'hi ha.

```processing
Dame números: 1 4 7 9 23 10 8
Los 3 números pares son: 4 10 8
```

### Exercici 258

`258investiga.php`: Investiga les funcions de cadena següents (explica per a què servixen mitjançant comentaris, i programa un xicotet exemple de cada una): `ucwords`, `strrev`, `str_repeat` i `md5`.

Els exercicis següents es basen en la generació de números aleatoris.

### Exercici 259

`259generador.php`: Crea una funció que permeta generar una lletra aleatòria, majúscula o minúscula.

### Exercici 260

`260generaContrasenya.php`: Crea una funció que, a partir d'una grandària, genere una contrasenya aleatòria composta de lletres i dígits de manera aleatòria.

### Exercici 261

`261quinielas.php`: Crea les funcions següents:

- `quinigol() : array` → Genera un array multidimensional amb 6 resultats aleatoris amb combinacions [012M, 012M].
- `quiniela() : array` → Genera un array amb una combinació de quiniela generada de manera aleatòria: 14 resultats amb 1X2 i el ple al quinze amb [012M, 012M].
- `tabla(array $quiniela) : string`→ transforma un array d'una quiniela en una taula HTML.

## Altres exercicis

Ací trobaràs exercicis genèrics de programació per a usar amb qualsevol llenguatge. Són genèrics perquè et poden servir amb qualsevol llenguatge que vulgues aprendre.

- Exercicis [**PHP de W3Schools**](https://www.w3schools.com/php/php_examples.asp){:target="_blank"}
- Exercicis [**PHP de JavaTpoint**](https://www.javatpoint.com/php-programs){:target="_blank"}

## Exercicis del concurs ACEPTA EL RETO

Estos són 10 exercicis per a resoldre de l'excel·lent proposta [**Acepta el Reto**](https://aceptaelreto.com/){:target="_blank"} .

*Haurien de resoldre's en menys de 2 h cadascun (com a màxim).*

1) [**Codis de barres**](https://aceptaelreto.com/problem/statement.php?id=106){:target="_blank"}

2) [**Encriptació de missatges**](https://aceptaelreto.com/problem/statement.php?id=102&potw=1){:target="_blank"}

3) [**Quants números capicua?**](https://aceptaelreto.com/problem/statement.php?id=259&cat=63){:target="_blank"}

4) [**Feliç no aniversari**](https://aceptaelreto.com/problem/statement.php?id=232&cat=64){:target="_blank"}

5) [**Accepta la suma**](https://aceptaelreto.com/problem/statement.php?id=240&cat=65){:target="_blank"}

6) [**Sudokus correctes**](https://aceptaelreto.com/problem/statement.php?id=345&cat=65){:target="_blank"}

7) [**Lliga de pàdel**](https://aceptaelreto.com/problem/statement.php?id=109){:target="_blank"}

8) [**Escuts de l'exèrcit romà**](https://aceptaelreto.com/problem/statement.php?id=119){:target="_blank"}

9) [**Les cartes de l'avi**](https://aceptaelreto.com/problem/statement.php?id=132){:target="_blank"}

10) [**Manies, en tenim tots**](https://aceptaelreto.com/problem/statement.php?id=175){:target="_blank"}

