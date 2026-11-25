---
title: Exercicis
---
# <img src="../../img/php_azul.svg" width="40"> Exercicis

## Exercici 100

Posada en marxa del nostre repositori de pràctiques.

Per a això:

1. Crea un repositori en local amb el nom **DWES_elteunom**.
2. Crea el teu fitxer **.gitignore** (per a això copia este [fitxer](../sources/gitignore.txt){:target="_blank"}).
3. Crea un repositori github, amb el nom **DWES_elteunom**, i sincronitza'l amb el teu local.
4. Assigna el teu tutor, **arturoblasco@iesmre.com**, com a col·laborador del teu repositori github.


## Exercici 101

Busca en Internet quins són els tres *frameworks PHP* més utilitzats, i indica:

- Nom i URL
- Any de creació
- Última versió

## Exercici 102

Busca tres ofertes de treball de *desenvolupament de programari* en *Infojobs* a la Comunitat Valenciana que citen PHP i anota:

- Empresa + lloc de treball + frameworks PHP + requisits + sou + enllaç a l'oferta.

## Exercici 103

Instal·la mitjançant Docker la parella **Apache+Php2** (trobaràs la descàrrega en la secció *Descàrregues* d'esta unitat).

Utilitza el port 8082 per a Apache (en el fitxer *docker-compose.yml*).

Estructura del contenidor:

```bash
ApachePhp2/
│
├── docker-compose.yml
└── .docker/    # Carpeta de configuración
│  └── php.ini  # Fichero configuración php
└── src/	    # Carpeta del proyecto
```

## Exercici 104

Instal·la (mitjançant Docker) la parella **Nginx+Php2**  (trobaràs la descàrrega en la secció *Descàrregues* d'esta unitat).

Utilitza el port 8083 per a Nginx (en el fitxer *docker-compose.yml*).

```bash
NginxPhp/
│
├── docker-compose.yml
└── .docker/      # Carpeta de configuración
│  └── nginx/    
│     └── conf.d
│        └── default.conf # Fichero configuración de servidor 
└── src/          # Carpeta del proyecto
    └── img/
    └── index.php
    └── phpinfo.php
```

## Exercici 105

Si finalment has instal·lat mitjançant *dockers* els dos servidors web, instal·la també el *docker Portainer* i fes-hi una ullada (fent diverses captures).

```bash
sudo docker volume create portainer_data

sudo docker run -d -p 8000:8000 -p 9443:9443 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

## Exercici 106

Una vegada arrancat el servei PHP (mitjançant XAMPP o Docker), crea el fitxer `info.php` i afig el fragment de codi següent:

```php
<?php phpinfo() ?>
```

Anota els valors de:

- Versió de PHP
- `Loaded Configuration File`
- `memory_limit`
- `DOCUMENT_ROOT`

## Exercici 107

En el docker de l'*Exercici 103*:

* Crea una carpeta amb el nom **`up01`**
* Descarrega el fitxer següent **<a download="index.html" href="../../sources/">index.html</a>** en la carpeta `src/up01`.

> En el fitxer *index.html* descarregat s'han utilitzat les llibreries següents per a conformar la interfície d'usuari:
> 
> * [Bootstrap 5.2](https://getbootstrap.com/){target=_blank rel="noopener noreferrer"}, per al disseny d'interfícies responsives.
> * Tema [Flatly](https://www.bootstrapcdn.com/bootswatch/){target=_blank rel="noopener noreferrer"} basat en bootstrap, que proporciona el full d'estils de la interfície.
> * [Font awesome 6.2](https://fontawesome.com/){target=_blank rel="noopener noreferrer"}, per a la utilització d'icones.

Si ens fixem en el contingut del fitxer *index.html* proporcionat, no es diferencia en res (excepte en la utilització de les llibreries anteriors) d'una de les pàgines estàtiques programades durant el primer curs del cicle:

<div style="text-align: center;"><img src="../../img/ut01/ejercicio107a.png" alt="index.html" style="zoom:45%; border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 1.37: Pàgina principal estàtica Exercici 107</figcaption></div>

Començarem a incrustar PHP en el codi HTML.

### a) Utilització de plantilles

El primer pas que farem és trossejar el codi HTML proporcionat. ¿*Per què*? Perquè hi ha determinades parts que sempre es repetixen en cadascuna de les pàgines: la **capçalera** i el **peu de pàgina**.

Així, crearem una carpeta **`templates`** (plantilles, en anglés) dins de *src*, per a emmagatzemar tots aquells fragments de codi HTML que podem reutilitzar d'una pàgina a una altra.

Dins de templates crearem dos fitxers: **`header.php`** i **`footer.php`**.

L'estructura, de moment, queda de la manera següent:

<div style="text-align: center;"><img src="../../img/ut01/ejercicio107b.png" alt="estructura de carpetes i fitxers" style="zoom:70%; border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 1.38: Estructura de carpetes i fitxers de l'Exercici 107</figcaption></div>

> En **classe**: analitzarem *index.html* i debatrem com segmentar el codi. A continuació reorganitzem el codi d'index.html entre *footer.php* i *header.php*.

Una vegada configurades les plantilles, queda molt poc codi HTML en *index.html*. Ara posarem la resta del codi HTML en **index.php** i buidarem per complet *index.html* (després d'això eliminem este fitxer).

El fitxer *index.php* quedaria de la manera següent:

```html
<div class="container">

</div>
```

¿*Com podem ara tornar a estructurar la pàgina d'inici amb les plantilles*? Ho veiem a continuació.

### b) Conformació de les pàgines de l'aplicació

Per a poder estructurar les pàgines de l'aplicació basant-nos en les plantilles, podem utilitzar la instrucció [include](https://www.php.net/manual/es/function.include.php){target=_blank rel="noopener noreferrer"}. Modificant el fitxer *index.php*, quedaria de la manera següent:

```php
<?php  include("templates/header.php"); ?>

<div class="container">

</div>

<?php  include("templates/header.php"); ?>
```

Ara, amb el contenidor *Docker* iniciat, si refresquem la pàgina, tornarem a obtindre el mateix resultat que amb la pàgina web estàtica:

<div style="text-align: center;"><img src="../../img/ut01/ejercicio107c.png" alt="Fitxer index.php" style="zoom:45%; border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 1.39: Pàgina principal dinàmica Exercici 107</figcaption></div>

Sembla que no haja canviat res, però PHP ja està treballant per a nosaltres. Hem passat d'una pàgina web estàtica, recollida en un sol document, a una pàgina modular generada amb PHP. En un lloc web amb multitud de pàgines això pot ser un gran avantatge.

Ara, com a bons programadors, ens preguntem: ¿*`include` ens servix per a tots els casos o hi ha altres possibilitats per a incloure fitxers en PHP*? Ho veiem en l'apartat següent.

### c) Inclusió de fitxers en PHP

La idea d'utilitzar diferents fitxers és la reutilització del codi, cosa que comporta una major modularitat i un millor manteniment d'este. Un fitxer no ha de ser necessàriament una plantilla, com hem vist fins ara, sinó que també podria ser codi PHP que poguérem arribar a utilitzar en diferents parts de l'aplicació. També es poden donar diferents circumstàncies, i és per això que disposem de diverses opcions:

* `include(ruta/archivo);`
* **`include_once(ruta/archivo);`**
* `require(ruta/archivo);`
* `require_once(ruta/archivo);`

> NOTA: Si el fitxer es troba a la mateixa altura (en el sistema de fitxers) que el fitxer en què s'inclou, aleshores només cal especificar el nom del fitxer que s'ha d'incloure; si els dos fitxers no es troben a la mateixa altura, aleshores és possible especificar la ruta ([absoluta o relativa](https://desktop.arcgis.com/es/arcmap/latest/tools/supplement/pathnames-explained-absolute-relative-unc-and-url.htm){target=_blank rel="noopener noreferrer"}) del fitxer que s'ha d'incloure.

Les particularitats de cada instrucció són:

* **require**: llança un error fatal si no troba el fitxer.
* **include**: si no troba el fitxer, emet una advertència (warning).
* Les funcions **\_once** només es carreguen una vegada; si ja ha sigut inclòs prèviament, no ho torna a fer, i s'eviten bucles.

!!!examplephp "Exemple d'inclusió de codi"
    === "biblioteca.php"

        Per exemple, col·loquem les funcions següents en el fitxer biblioteca.php:

        ```php
        <?php
        function suma(int $a, int $b) : int {
            return $a + $b;
        }

        function resta(int $a, int $b) : int {
            return $a - $b;
        }
        ?>
        ```

    === "ficheroEjemplo.php"

        I posteriorment en un altre fitxer incloem l'anterior:

        ```php
        <?php

        include_once("biblioteca.php");

        echo suma(10,20);

        echo resta(40,20);

        ?>
        ```

### d) Completem la resta de pàgines

En este apartat completarem les pàgines i les plantilles de l'aplicació per a poder afegir-los posteriorment codi PHP.

#### d.1) **index.php**

Introduirem un projecte de prova perquè es puga visualitzar en la pàgina d'inici; quedaria de la manera següent:

<div style="text-align: center;"><img src="../../img/ut01/ejercicio107d.png" alt="Fitxer index.php" style="zoom:45%; border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 1.40: Pàgina index.php de l'Exercici 107</figcaption></div>

Utilitzarem una imatge per a cada projecte. Per a poder fer això hem d'emmagatzemar les imatges en l'estructura de directoris; per això creem una carpeta *static* dins de src, i dins de static en crearem una altra anomenada *images*:

<div style="text-align: center;"><img src="../../img/ut01/ejercicio107e.png" alt="Estructura del projecte" style="zoom:70%; border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 1.41: Estructura de carpetes i fitxers de l'Exercici 107</figcaption></div>

> NOTA: si has de descarregar imatges d'Internet, assegura't que la llicència d'eixes imatges t'ho permet. Utilitza, si cal, un lloc com [pixabay.com](http://pixabay.com/){target=_blank rel="noopener noreferrer"} per a descarregar imatges amb llicència lliure.

Descarrega't una imatge en la carpeta *images*, canvia-li el nom a **projecte1.png** (ací tens la imatge de l'exemple **<a download="projecte1.png" href="../../sources/projecte1.png">projecte1.png</a>** si vols utilitzar la mateixa) i completa el fitxer *index.php* amb el codi següent:

```php
<?php include("templates/header.php"); ?>

<div class="container">
    <a href="#">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="static/images/projecte1.png" alt="Projecte 1">
            <div class="card-body">
                <h5 class="card-title">Projecte 1</h5>
                <p class="card-text">Descripció del projecte 1.</p>
            </div>
        </div>
    </a>
</div>

<?php include("templates/footer.php"); ?>
```

Ara hauria d'aparéixer un projecte en la pàgina principal.

#### d.2) **proyecto.php**

Creem este nou fitxer a l'altura d'*index.php* i afegim el contingut següent:

```php
<?php include("templates/header.php"); ?>

<div class="container">
    <h2>Títol de mostra</h2>
    <h4><a href="#">Any</a></h4>
    <span>Categories: </span>
    <a href="#"><button class="btn btn-sm btn-default">Categoria 1</button></a>
    <br> <br>
    <div class="row">
        <div class="col-sm">
            <img src="static/images/projecte1.png" alt="Projecte 1" class="img-responsive"><br>
        </div>
        <div class="col-sm">Descripció</div>
    </div>
</div>

<?php include("templates/footer.php"); ?>
```

Per a consultar el resultat, introduïm en la barra de navegació la URL **localhost:8081/proyecto.php**:

<div style="text-align: center;"><img src="../../img/ut01/ejercicio107f.png" alt="Estructura del projecte" style="zoom:45%; border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 1.42: Pàgina proyecto.php de l'Exercici 107</figcaption></div>

#### d.3) **contacto.php**

Descarreguem esta **<a download="contacte.png" href="../../sources/contacte.png">contacte.png</a>** en el directori corresponent (amb el nom businessman.png), creem contacto.php a l'altura d'index.php, i inserim el codi següent:

```php
<?php include("templates/header.php"); ?>

<div class="container">
    <h2 class="mb-5">Contacte</h2>
    <div class="row">
        <div class="col-md">
            <img src="static/images/contacte.png" class="img-fluid rounded">
        </div>
        <div class="col-md">
            <h3>Nom i cognoms</h3>
            <p>Cicle Superior DAW.</p>
            <p>Apasionat del mon de la programació en general, i de les tecnologies web en particular.</p>
            <p>Si tens algun dubte contacta amb mí per favor.</p>
            <p>Telèfon: 123456789</p>
        </div>
    </div>
</div>

<?php include("templates/footer.php"); ?>
```

El resultat, en consultar la URL localhost/contacto.php, hauria de ser el següent:

<div style="text-align: center;"><img src="../../img/ut01/ejercicio107g.png" alt="Pàgina contacto.php" style="zoom:45%; border: 2px solid #83abd4;" /><figcaption class="figure-caption-small">🖼️ Figura 1.43: Pàgina contacto.php de l'Exercici 107</figcaption></div>

En este moment ja tenim moltes coses preparades per a poder començar a afegir dinamisme a la nostra aplicació. En els apartats següents veurem les diferents estructures que ens ho permetran.

