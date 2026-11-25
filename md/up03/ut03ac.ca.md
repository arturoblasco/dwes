---
title: Exercicis
---
# <img src="../../img/php_azul.svg" width="40"> Exercicis

### Exercici 301 Investigació
Investiga la diferència entre un paradigma orientat a objectes basat en classes (*PHP*) respecte a un basat en prototips (*JavaScript*).<br /><br />

<hr>


### Exercici 302

`302Empleado.php`: crea una classe `Empleado` amb el seu *nom*, *cognoms* i *sou*. Encapsula les propietats mitjançant *getters*/*setters* i afig mètodes per a:


-  `getNombreCompleto(): string`  : obtindre el seu nom complet

- `debePagarImpuestos(): bool` : que retorne un booleà que indique si ha de pagar impostos o no (es paguen quan el sou és superior a 3333€).


### Exercici 303
`303EmpleadoTelefonos.php`: copia la classe de l'exercici anterior i modifica-la. Afig una propietat privada que emmagatzeme un *array de números de telèfon*. Afig els mètodes següents:

- `public function anyadirTelefono(int $telefono) : void` : afig un telèfon a l'array.
- `public function listarTelefonos(): string` : mostra els telèfons separats per comes.
- `public function vaciarTelefonos(): void` : elimina tots els telèfons.

### Exercici 304
`304EmpleadoConstructor.php`: copia la classe de l'exercici anterior i modifica-la. Elimina els *setters* de `nombre` i `apellidos`, de manera que estes dades s'assignen mitjançant el constructor (utilitza la sintaxi de PHP7). Si el constructor rep un tercer paràmetre, serà el sou de l'`Empleado`. Si no, se li assignarà *1000€* com a sou inicial.

`304EmpleadoConstructor8.php`: modifica la classe i utilitza la sintaxi de PHP 8 de promoció de les propietats del constructor.

### Exercici 305
`305EmpleadoConstante.php`: copia la classe de l'exercici anterior i modifica-la. Afig una constant `SUELDO_TOPE` amb el valor del sou a partir del qual s'han de pagar impostos, i modifica el codi per a utilitzar la constant.

### Exercici 306
`306EmpleadoSueldo.php`: copia la classe de l'exercici anterior i modifica-la. Canvia la constant per una variable estàtica `sueldoTope`, de manera que mitjançant *getter*/*setter* pugues modificar-ne el valor.

### Exercici 307
`307EmpleadoStatic.php`: copia la classe de l'exercici anterior i modifica-la.

Completa la classe amb el mètode següent, que mostre les dades d'un empleat dins d'un paràgraf i tots els telèfons mitjançant una llista ordenada en HTML (per a això, hauràs de crear un *getter* per als telèfons): `public static function toHtml(Empleado $emp): string`

### Exercici 308
<div style="text-align: center;"><figure><img src="../../img/ut03/ejer08.png" alt="ejer08" style="zoom:95%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.4: La classe Empleado hereta de la classe Persona (exercici 308)</figcaption></figure></div>

Copia la classe de l'exercici anterior en **`308Empleado.php`** i modifica-la.

Crea una classe `Persona` (en **`308Persona.php`**) que siga mare de la classe `Empleado`, de manera que `Persona` continga el *nom* i els *cognoms*, i en `Empleado` quede el *salari* i els *telèfons*.

### Exercici 309
Copia les classes de l'exercici anterior i modifica-les (**`309PersonaH.php`** i **`309EmpleadoH.php`**). Crea en `Persona` el mètode estàtic *`toHtml(Persona $p)`* i modifica en `Empleado` el mateix mètode *`toHtml(Persona $p)`*, però canvia la signatura perquè reba una `Persona` com a paràmetre.

Per a accedir a les propietats de l'empleat amb la persona que rebem com a paràmetre, en comprovarem el tipus:

```php
<?php
class Empleado extends Persona {
   // resto del código

   public static function toHtml(Persona $p): string {
      if ($p instanceof Empleado) {
          // Aqui ya podemos acceder a las propiedades y métodos de Empleado
      }
   }
}
```

### Exercici 310
Copia les classes de l'exercici anterior i modifica-les (**`310PersonaE.php`** i **`310EmpleadoE.php`**).

Afig en `Persona` un atribut *`edad`*.

A l'hora de saber si un empleat ha de pagar impostos, ho farà sempre que tinga més de *21 anys* i depenga del valor del seu sou. Modifica tot el codi necessari per a mostrar i/o editar l'edat quan siga necessari.

### Exercici 311
Copia les classes de l'exercici anterior i modifica-les (**`311PersonaS.php`** i **`311EmpleadoS.php`**).
Afig nous mètodes que facen una representació de totes les propietats de les classes `Persona` i `Empleado`, de manera semblant als realitzats en HTML, però sense que siguen estàtics, de manera que obtinga les dades mitjançant *`$this`*:

- `function public __toString(): string`

> El mètode `__toString()` és un mètode màgic (**magic method**) que s'invoca automàticament quan volem obtindre la representació en cadena d'un objecte.
    

### Exercici 312
Copia les classes de l'exercici anterior i modifica-les (**`312PersonaA.php`** i **`312EmpleadoA.php`**).

Transforma `Persona` en una classe abstracta on el seu mètode estàtic *`toHtml(Persona $p)`* haja de ser redefinit en tots els seus fills. 

### Exercici 313
Copia les classes de l'exercici anterior i modifica-les (**`313PersonaX.php`** i **`313EmpleadoX.php`**) i crea les classes `Trabajador` (**`313TrabajadorX.php`**) i `Gerente`(**`313GerenteX.php`**) tal com es mostra en la figura.

- Canvia l'estructura de classes d'acord amb el gràfic respectant tots els mètodes que ja estan fets.

- `Trabajador` és una classe abstracta que ara emmagatzema els *`telefonos`* i on *`calcularSueldo()`* i *`debePagarImpuestos(): bool`* són mètodes abstractes, de manera que:

    - El sou d'un `Empleado` es calcula a partir de les hores treballades i el que cobra per hora.
  
    - Per als `Gerente`*s*, el seu sou s'incrementa percentualment en funció de la seua edat: `salario + salario*edad/100`

<div style="text-align: center;"><figure><img src="../../img/ut03/ejer13.png" alt="ejer13" style="zoom:100%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.5: Estructura d'herència de classes de l'exercici 313</figcaption></figure></div>

### Exercici 314

Utilitzant les classes dels exercicis anteriors (per a una millor comprensió copia les classes anteriors a **`314PersonaY.php`**, **`314TrabajadorY.php`**, **`314EmpleadoY.php`** i **`314GerenteY.php`**):

- Crea una classe `Empresa` (**`314EmpresaY.php`**) que, a més del *nom* i l'*adreça*, continga una propietat amb un array de `Trabajador`*s*, ja siguen `Empleado`*s* o `Gerente`*s*.

- Afig *getters/setters* per al nom i l'adreça.

- Afig mètodes per a afegir i llistar els treballadors:

    - `public function anyadirTrabajador(Trabajador $t)`
    - `public function listarTrabajadoresHtml() : string` (utilitza `Trabajador::toHtml(Persona $p)`).

- Afig un mètode per a obtindre el cost total en nòmines.

    - `public function getCosteNominas(): float` (recorre els treballadors i invoca el mètode `calcularSueldo()`).

### Exercici 315
Copia les classes de l'exercici anterior i modifica-les (per a una millor comprensió copia les classes anteriors a **`315PersonaI.php`**, **`315TrabajadorI.php`**, **`315EmpleadoI.php`** i **`315GerenteI.php`**):

 a) Crea una interfície `JSerializable` (**`315jSerializable.php`**), de manera que oferisca els mètodes:

- `toJSON(): string` → utilitza la funció [**json_encode(mixed)**](https://www.php.net/manual/es/function.json-encode.php){target="_blank"}. Tin en compte que, com que tenim les propietats dels objectes privades, has de recórrer les propietats i col·locar-les en un mapa. Per exemple:

```php
<?php
    public function toJSON(): string {
        $mapa = [];
        
        foreach ($this as $clave => $valor) {
            $mapa->$clave = $valor;
        }
        return json_encode($mapa);
    }
?>
```

- `toSerialize(): string` → utilitza la funció [**serialize(mixed)**](https://www.php.net/manual/es/function.serialize.php){target="_blank"}

 b) Modifica totes les classes que no són abstractes perquè implementen la interfície creada.


<hr>

## Projecte Videoclub

???+ies "Git del projecte"
    Abans de res, crea un repositori privat en *GitHub* i puja el projecte actual de **`Videoclub`**. Una vegada creat, convida *el teu professor* al repositori com a *col·laborador*.
    
    Recorda els passos que cal seguir per a crear un repositori:
    
    1. Inicialitza en local el teu repositori de *git*, mitjançant **`git init`**.
    2. Afig i puja els canvis al teu repositori, mitjançant **`git add .`** i després **`git commit -m 'Iniciar proyecto'`**.
    3. Connecta el teu repositori amb GitHub i puja els canvis (mira les instruccions de GitHub: comandaments `git remote` i `git push`).
    4. Abans de començar amb este projecte, crea una etiqueta mitjançant **`git tag Videoclub`** i puja els canvis a GitHub.
    
    A partir d'este moment, a cada exercici hauràs de fer un *commit* amb el nom de l'exercici (per exemple, quan acabes l'*Exercici 320* hauràs d'executar l'ordre *git commit -m "ejercicio 320"*).


> - El projecte **Videoclub** següent està pensat des d'un punt de vista formatiu (no és un **projecte real**). Algunes de les decisions que es prenen no s'han d'usar (com fer `echo` dins de les classes) o provar el codi comparant el resultat en el navegador.
> 
> - En els exercicis següents simularem un xicotet projecte d'un videoclub (basat en la proposta que fa el tutorial de desarrolloweb.com), que realitzarem mitjançant un desenvolupament incremental.
> 
> - Cada classe ha d'anar en un fitxer php separat. 
> 
> - Per a facilitar-ne la implementació, es mostra l'estructura UML del model i un fragment de codi per a provar les classes.

### Exercici 320
<div style="text-align: center;"><figure><img src="../../img/ut03/pro01.png" alt="pro01" style="zoom:100%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.6: Estructura de la classe Soporte de l'exercici 321</figcaption></figure></div>

Crea una classe per a emmagatzemar suports (`Soporte.php`). Esta classe serà la classe mare dels diferents suports amb què treballe el nostre videoclub (*cintes de vídeo*, *videojocs*, etc...):

- Crea el constructor que inicialitze les seues propietats. Fixa't que la classe no té mètodes *setters*.
- Definix una constant mitjançant una propietat privada i estàtica anomenada `IVA` amb un valor del *21%*.
- Crea un fitxer (`inicio.php`) per a usar les classes i copia el fragment següent:

???examplephp "Exemple"
	=== "inicio.php"
        ```php
        <?php
            include_once ("Soporte.php");
	
            $soporte1 = new Soporte("Tenet", 22, 3); 
            echo "<strong>" . $soporte1->titulo . "</strong>"; 
            echo "<br>Precio: " . $soporte1->getPrecio() . " €"; 
            echo "<br>Precio con IVA: " . $soporte1->getPrecioConIVA() . " €";
    		echo "<br/><br/><br/>";

            $soporte1->muestraResumen();
        ```
    === "Resultat"
    	<div style="text-align: center;"><figure><img src="../../img/ut03/e321.png" alt="e321" style="zoom:90%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.7: Resultat de la pàgina inicio.php</figcaption></figure></div>

### Exercici 321
<div style="text-align: center;"><figure><img src="../../img/ut03/pro02.png" alt="pro02" style="zoom:100%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.8: La classe CintaVideo hereta de la classe Soporte (exercici 322)</figcaption></figure></div>

Crea la classe `CintaVideo`, que hereta de `Soporte`. Afig l'atribut `duracion` i sobreescriu tant el constructor com el mètode `muestraResumen` (des de `CintaVideo` hauràs de cridar el mètode `muestraResumen` del pare).

Afig a `inicio.php` el codi per a provar la classe:
???examplephp "Exemple"
	=== "inicio.php"
        ```php
        <?php
            include_once "CintaVideo.php";

            $miCinta = new CintaVideo("Los cazafantasmas", 23, 3.5, 107); 
            echo "<strong>" . $miCinta->titulo . "</strong>"; 
            echo "<br>Precio: " . $miCinta->getPrecio() . " €"; 
            echo "<br>Precio con IVA: " . $miCinta->getPrecioConIva() . " €";
            echo "<br/><br/><br/>";
    
            $miCinta->muestraResumen();
        ```
    === "Resultat"
    	<div style="text-align: center;"><figure><img src="../../img/ut03/e322.png" alt="e322" style="zoom:90%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.9: Resultat de la pàgina inicio.php</figcaption></figure></div>



### Exercici 322
<div style="text-align: center;"><figure><img src="../../img/ut03/pro03.png" alt="pro03" style="zoom:100%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.10: Les classes CintaVideo i Dvd hereten de la classe Soporte (exercici 323)</figcaption></figure></div>

Crea la classe `Dvd`, que hereta de `Soporte`. Afig els atributs `idiomas` (que siga un array com "es", "en", ...) i `formatoPantalla`. A continuació sobreescriu tant el constructor com el mètode `muestraResumen`.

Afig a `inicio.php` el codi per a provar la classe:
???examplephp "Exemple"
	=== "inicio.php"
        ```php
        <?php
            include_once "Dvd.php";

            $miDvd = new Dvd("Origen", 24, 15, ["es","en","fr"], "16:9"); 
            echo "<strong>" . $miDvd->titulo . "</strong>"; 
            echo "<br>Precio: " . $miDvd->getPrecio() . " €"; 
            echo "<br>Precio con IVA: " . $miDvd->getPrecioConIva() . " €";
    		echo "<br/><br/><br/>";
    		
            $miDvd->muestraResumen();
        ```
    === "Resultat"
    	<div style="text-align: center;"><figure><img src="../../img/ut03/e323.png" alt="e323" style="zoom:90%;" style="zoom:100%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.11: Resultat de la pàgina inicio.php</figcaption></figure></div>



### Exercici 323
Crea la classe `Juego`, que hereta de `Soporte`. Afig els atributs `consola`, `minNumJugadores` i `maxNumJugadores`. 

A continuació afig el mètode `muestraJugadoresPosibles`, que ha de mostrar *Per a un jugador*, *Per a X jugadors* o *De X a Y jugadors* depenent dels valors dels atributs creats. 

Finalment, sobreescriu tant el constructor com el mètode `muestraResumen`.

Afig a `inicio.php` el codi per a provar la classe:
???examplephp "Exemple"
	=== "inicio.php"
        ```php
        <?php
            include_once "Juego.php";

            $miJuego = new Juego("The Last of Us Part II", 49.99, "PS4", 1, 1); 
            echo "<strong>" . $miJuego->titulo . "</strong>"; 
            echo "<br>Precio: " . $miJuego->getPrecio() . " €"; 
            echo "<br>Precio con IVA: " . $miJuego->getPrecioConIva() . " €";
    		echo "<br/><br/><br/>";
    		
            $miJuego->muestraResumen();
        ```
    === "Resultat"
    	<div style="text-align: center;"><figure><img src="../../img/ut03/e324.png" alt="e324" style="zoom:90%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.12: Resultat de la pàgina inicio.php</figcaption></figure></div>

Arribats a este punt, el nostre model és semblant al diagrama següent:

<div style="text-align: center;"><figure><img src="../../img/ut03/pro05.png" alt="pro05" style="zoom:85%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.13: Estructura d'herència per a l'exercici 324</figcaption></figure></div>

### Exercici 324
<div style="text-align: center;"><figure><img src="../../img/ut03/pro06.png" alt="pro06" style="zoom:95%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.14: Estructura de la classe Cliente per a l'exercici 325</figcaption></figure></div>

Crea la classe `Cliente`. El constructor rebrà el `nombre`, `numero` i `maxAlquilerConcurrente`, este últim opcional i amb *3* com a valor per defecte. 

Després, afig *getter/setter* únicament a `numero`, i un *getter* a `numSoportesAlquilados` (este camp emmagatzemarà un comptador del total de lloguers que ha realitzat). 

L'array de suports llogats `$soportesAlquilados` contindrà classes que hereten de `Soporte`. 

Finalment, afig el mètode `muestraResumen` que mostre el *nom* i la *quantitat de lloguers* (grandària de l'array `soportesAlquilados`).

### Exercici 325
Dins de `Cliente`, afig les operacions següents:

- `tieneAlquilado(Soporte $s): bool` : recorre l'array de suports i comprova si hi està el suport llogat.
- `alquilar(Soporte $s): bool` : ha de comprovar si el suport està llogat i si no ha superat el límit de lloguers. En llogar, incrementarà `numSoportesAlquilados` i emmagatzemarà el suport en l'array. Per a cada cas ha de mostrar un missatge que informe del que ha passat.

### Exercici 326
Continuem amb `Cliente` per a afegir les operacions:

- `devolver(int $numSoporte): bool` : ha de comprovar que el suport estava llogat i actualitzar la quantitat de suports llogats. Per a cada cas ha de mostrar un missatge que informe del que ha passat.
- `listarAlquileres(): void` : informa de quants lloguers té el client i els mostra.

Crea el fitxer `inicio2.php` amb el codi font següent per a provar la classe:
???examplephp "Exemple"
	=== "inicio2.php"
        ```php
        <?php
            include_once "CintaVideo.php";
            include_once "Dvd.php";
            include_once "Juego.php";
            include_once "Cliente.php";

            //instanciamos un par de objetos cliente
            $cliente1 = new Cliente("Bruce Wayne", 23);
            $cliente2 = new Cliente("Clark Kent", 33);
    
    		echo "<br/>";
            //mostramos el número de cada cliente creado 
            echo "<br>El identificador del cliente 1 es: " . $cliente1->getNumero();
            echo "<br>El identificador del cliente 2 es: " . $cliente2->getNumero();
    
            //instancio algunos soportes 
            $soporte1 = new CintaVideo("Los cazafantasmas", 3.5, 107);
            $soporte2 = new Juego("The Last of Us Part II", 49.99, "PS4", 1, 1);  
            $soporte3 = new Dvd("Origen", 15, ["es","en","fr"], "16:9");
            $soporte4 = new Dvd("El Imperio Contraataca", 3, ["es","en"],"16:9");
    
            //alquilo algunos soportes
            $cliente1->alquilar($soporte1);
            $cliente1->alquilar($soporte2);
            $cliente1->alquilar($soporte3);
    
            //voy a intentar alquilar de nuevo un soporte que ya tiene alquilado
            $cliente1->alquilar($soporte1);
            //el cliente tiene 3 soportes en alquiler como máximo
            //este soporte no lo va a poder alquilar
            $cliente1->alquilar($soporte4);
            //este soporte no lo tiene alquilado
            $cliente1->devolver(4);
            //devuelvo un soporte que sí que tiene alquilado
            $cliente1->devolver(2);
            //alquilo otro soporte
            $cliente1->alquilar($soporte4);
            //listo los elementos alquilados
            $cliente1->listarAlquileres();
            //este cliente no tiene alquileres
            $cliente2->devolver(2);
        ```
    === "Resultat"
    	<div style="text-align: center;"><figure><img src="../../img/ut03/e327.png" alt="e327" style="zoom:100%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.15: Resultat de la pàgina inicio2.php</figcaption></figure></div>

### Exercici 327
Arribats a este punt, relacionarem els clients i els suports mitjançant la classe `Videoclub`. Així doncs, crea la classe que representa la imatge posterior, tenint en compte que:

- `productos` és un array de `Soporte`.
- `socios` és un array de `Cliente`.
- Els mètodes públics d'incloure algun suport crearan la classe i cridaran el mètode privat `incluirProducto`, que és l'encarregat d'introduir-lo dins de l'array.

El model complet quedarà de la manera següent:

<div style="text-align: center;"><figure><img src="../../img/ut03/pro07.png" alt="pro07" style="zoom:70%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.16: Estructura d'herència de les classes implicades (exercici 328)</figcaption></figure></div>

I per a provar el projecte, dins d'inicio3.php col·locarem:
???examplephp "Exemple"
	=== "inicio3.php"
        ```php
        <?php
           include_once "Videoclub.php"; // No incluimos nada más
	
           $vc = new Videoclub("Videoclub CataDAW"); 
    
           //Incluir unos cuantos soportes de prueba 
           $vc->incluirJuego("God of War", 19.99, "PS4", 1, 1); 
           $vc->incluirJuego("The Last of Us Part II", 49.99, "PS4", 1, 1);
           $vc->incluirDvd("Torrente", 4.5, ["es"],"16:9"); 
           $vc->incluirDvd("Origen", 4.5, ["es","en","fr"], "16:9"); 
           $vc->incluirDvd("El Imperio Contraataca", 3, ["es,en"],"16:9"); 
           $vc->incluirCintaVideo("Los cazafantasmas", 3.5, 107); 
           $vc->incluirCintaVideo("El nombre de la Rosa", 1.5, 140); 
    
           //Listar los productos 
           $vc->listarProductos(); 
    
           //Crear algunos socios 
           $vc->incluirSocio("Elsa Pato"); 
           $vc->incluirSocio("Lola Mento", 2); 

           $vc->alquilarSocioProducto(1,1);     
           $vc->alquilarSocioProducto(1,2); 
           $vc->alquilarSocioProducto(1,3); 

           //Alquilar otra vez el soporte 2 al socio 1. 
           // no debe dejarme porque ya lo tiene alquilado 
           $vc->alquilarSocioProducto(1,2); 

           //Alquilar el soporte 6 al socio 1. 
           //no se puede porque el socio 1 tiene 2 alquileres como máximo 
           $vc->alquilarSocioProducto(1,6); 
    
           //Listar los socios 
           $vc->listarSocios();
        ```
    === "Resultat"
    	<div style="text-align: center;"><figure><img src="../../img/ut03/e328.png" alt="e328" style="zoom:100%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.17: Resultat de la pàgina inicio3.php</figcaption></figure></div>


### Exercici 328
Transforma `Soporte` en una classe abstracta i comprova que tot continua funcionant. Què aconseguim en fer-la abstracta?

### Exercici 329
Crea una interfície `Resumible` de manera que les classes que la implementen hagen d'oferir el mètode `muestraResumen()`.

Modifica la classe `Soporte` i fes que implemente la interfície. Cal que també la implementen els fills?

<hr>

## Projecte Videoclub 2.0

> - Per a començar amb este segon projecte (que, al capdavall, és la continuació de l'anterior), copia la carpeta Videoclub amb el nom **Videoclub2**. 
> 
> - Abans de començar amb la segona part del videoclub, crea una etiqueta mitjançant **`git tag Videoclub2`** i puja els canvis a GitHub.


### Exercici 330
Modifica les operacions de llogar, tant en `Cliente` (mètodes `alquilar`, `devolver`) com en `Videoclub`  (mètodes `incluirProducto`, `incluirCintaVideo`, `incluirDvd`, `incluirJuego`, `incluirSocio`, `listarProductos`, `listarSocios`, `alquilarSocioProducto`) , per a donar suport a l'encadenament de mètodes. 

Posteriorment, modifica el codi de prova per a utilitzar esta tècnica.

I per a provar el projecte, dins d'inicio4.php col·locarem:
???examplephp "Exemple"
	=== "inicio4.php"
        ```php
        <?php
        include_once "Videoclub.php"; // No incluimos nada más

        $vc = new Videoclub("Videoclub CataDAW");

        echo "VIDEOCLUB 2.0:<br/><br/>";

        // Incluir soportes y crear socios mediante encadenamiento
        $vc->incluirJuego("God of War", 19.99, "PS4", 1, 1)
        ->incluirJuego("The Last of Us Part II", 49.99, "PS4", 1, 1)
        ->incluirDvd("Torrente", 4.5, ["es"], "16:9")
        ->incluirDvd("Origen", 4.5, ["es", "en", "fr"], "16:9")
        ->incluirDvd("El Imperio Contraataca", 3, ["es", "en"], "16:9")
        ->incluirCintaVideo("Los cazafantasmas", 3.5, 107)
        ->incluirCintaVideo("El nombre de la Rosa", 1.5, 140)

        // Mostrar los productos registrados
        ->listarProductos()

        // Registrar socios
        ->incluirSocio("Elsa Pato")
        ->incluirSocio("Lola Mento", 2)

        // Alquileres del socio 1
        ->alquilarSocioProducto(1, 2)
        ->alquilarSocioProducto(1, 3)
        ->alquilarSocioProducto(1, 2) // Soporte ya alquilado

        // Alquileres del socio 2 (máximo 2)
        ->alquilarSocioProducto(2, 5)
        ->alquilarSocioProducto(2, 6)
        ->alquilarSocioProducto(2, 7) // Supera el límite

        // Comprobar cliente y soporte inexistentes
        ->alquilarSocioProducto(99, 1)
        ->alquilarSocioProducto(1, 99)

        // Mostrar socios
        ->listarSocios();
        ```
    === "Resultat"
    	<div style="text-align: center;"><figure><img src="../../img/ut03/e329.png" alt="e328" style="zoom:100%;" /><figcaption class="figure-caption-small">🖼️ Figura 3.18: Resultat de la pàgina inicio4.php</figcaption></figure></div>


???+ies "Git del projecte"
    Recorda, per a cada exercici, fer un *commit* amb el seu nom (per exemple, quan acabes este últim exercici hauràs d'executar l'ordre *git commit -m "ejercicio 330"*).

### Exercici 331
Fent ús de *namespaces*:

- Col·loca totes les classes/interfícies en `Dwes\ProyectoVideoclub`.
- Cada classe ha de fer `include_once` dels recursos que empra.
- Col·loca el fitxer o els fitxers de prova en l'arrel (sense espai de noms).
- Des del fitxer de proves, utilitza `use` per a poder fer accessos sense qualificar:

```php
<?php
include_once "Videoclub.php";

use Dwes\ProyectoVideoclub\Videoclub;

$vc = new Videoclub("Videoclub CataDAW");

// Incluir soportes de prueba y crear algunos socios con encadenamiento de métodos
$vc->incluirJuego("God of War", 19.99, "PS4", 1, 1)
   ->incluirJuego("The Last of Us Part II", 49.99, "PS4", 1, 1)
   ->incluirDvd("Torrente", 4.5, ["es"], "16:9")
   ->incluirDvd("Origen", 4.5, ["es", "en", "fr"], "16:9")
   ->incluirDvd("El Imperio Contraataca", 3, ["es", "en"], "16:9")
   ->incluirCintaVideo("Los cazafantasmas", 3.5, 107)
   ->incluirCintaVideo("El nombre de la Rosa", 1.5, 140)
   ->listarProductos() // Listar productos después de añadirlos
   ->incluirSocio(Elsa Pato") 
   ->incluirSocio("Lola Mento", 2)
   ->alquilarSocioProducto(1, 2)
   ->alquilarSocioProducto(1, 3)
   ->alquilarSocioProducto(1, 2) // Intento de alquilar un soporte ya alquilado
   ->alquilarSocioProducto(2, 6) // Intento de alquilar más de lo permitido
   ->listarSocios(); // Listar socios después de realizar las operaciones de alquiler
?>
```

> **Git del projecte**
> 
> Etiqueta els canvis com a `v0.331`.

### Exercici 332
Reorganitza les carpetes tal com hem vist en els apunts: `app`, `test` i`vendor`.

- Crea un fitxer `autoload.php` per a registrar la ruta on trobar les classes
- Modifica tot el codi necessari, incloent-hi `autoload.php` on calga i esborrant els *includes* previs.

### Exercici 333
A continuació crearem un conjunt d'excepcions d'aplicació. Estes excepcions són simples, no necessiten sobreescriure cap mètode. Així doncs, crea l'excepció d'aplicació `VideoclubException` en el *namespace* `Dwes\ProyectoVideoclub\Util`. Posteriorment crea els fills següents (han d'heretar de `VideoclubException`), cadascun en el seu propi fitxer:

- `SoporteYaAlquiladoException`.
- `CupoSuperadoException`.
- `SoporteNoEncontradoException`.
- `ClienteNoEncontradoException`.

### Exercici 334
En `Cliente`, modifica els mètodes `alquilar` i `devolver`, perquè facen ús de les noves excepcions (llançant-les quan siga necessari) i funcionen com a mètodes encadenats. Cal destacar que en estos mètodes no es capturen estes excepcions, **només es llancen**. 

En `Videoclub`, modifica `alquilarSocioProducto` per a **capturar totes les excepcions** que ara llança `Cliente` i informar l'usuari en conseqüència.

### Exercici 335
Modificarem el projecte perquè el videoclub sàpia quins productes estan llogats i quins no:

- En `Soporte`, crea una propietat pública el nom de la qual siga `alquilado`, que inicialment estarà a `false`. Quan es llogue, es posarà a `true`. En retornar-lo, la tornarem a posar a `false`.
- En `Videoclub`, crea dues noves propietats `numProductosAlquilados` i `numTotalAlquileres` i els seus mètodes *getters*.<br />

### Exercici 336
Crea un nou mètode en `Videoclub` anomenat `alquilarSocioProductos(int numSocio, array numerosProductos)`, que ha de rebre un array amb els productes que cal llogar.

Abans de llogar-los, ha de comprovar que tots els suports estiguen disponibles, de manera que si un no ho està, no se'n llogue cap.

### Exercici 337
Crea dos nous mètodes en `Videoclub` i, mitjançant la definició, deduïx què han de fer:

- `devolverSocioProducto(int numSocio, int numeroProducto)`
- `devolverSocioProductos(int numSocio, array numerosProductos)`

Han de suportar l'encadenament de mètodes. Recorda actualitzar la propietat `alquilado` dels diferents suports.



> **Git del projecte**
> 
> Quan hages fet tots els exercicis, crea una etiqueta mitjançant `git tag` amb el nom `v0.338` i puja els canvis a GitHub.
