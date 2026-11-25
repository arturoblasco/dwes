---
title: Examen 2
---
# Examen 2

> **Laravel (backend, MVC, configuració i accés a dades)**

> Desenvolupament Web en Entorn Servidor (DWES)
> Nivell: 2n de Cicle Formatiu de Grau Superior (DAW)  

> Projecte: Gestor d'incidències en un centre educatiu

> *Realitzar esta prova després d'haver muntat les tres primeres unitats pràctiques de laravel*.


## Part A. Qüestionari – Preguntes curtes

### 1. Entorn de programació en servidor (0,5 pt)

???questionlaravel "1.a: Enumera almenys **4 components de programari** necessaris per a desenvolupar i executar una aplicació web amb Laravel en local (per exemple: intèrpret, servidor, SGBD, eines…)"
    - Intèrpret **PHP** (per exemple, PHP 8.x).
    - Servidor web **Apache** o **Nginx**.
    - **SGBD**: MySQL / MariaDB.
    - **Composer** (gestor de dependències de PHP).  
    - *(Opcionalment: Node.js + npm per a compilar assets frontend.)*

???questionlaravel "1.b: Explica breument quin paper té **PHP** dins d'eixe conjunt"
    El servidor web crida PHP per a executar el codi de l'aplicació (controladors, models, vistes Blade compilades, etc.) i generar l'HTML/JSON que s'envia al navegador.

---

### 2. Composer i ecosistema PHP (0,5 pt)

???questionlaravel "2.a: Explica amb les teues paraules què és **Composer** i quin problema resol en projectes PHP moderns"
    Permet declarar en `composer.json` les llibreries que necessita un projecte (Laravel, paquets de tercers, etc.) i s'encarrega de **descarregar-les, actualitzar-les i de l'autoload** (càrrega automàtica de classes).

???questionlaravel "2.b: Com crearies un projecte laravel?"
    ```bash
    composer create-project laravel/laravel incidents
    ```

    (o bé, si tens l'instal·lador global):

    ```bash
    laravel new incidents
    ```

---

### 3. Estructura bàsica d'un projecte Laravel (0,5 pt)
Indica la finalitat principal de cadascun dels elements següents:

???questionlaravel "3.a:  `app/`"
    Conté el codi principal de l'aplicació: models, controladors, middleware, etc. És la lògica de negoci.

???questionlaravel "3.b:  `resources/views/`"
    Carpeta on es guarden les vistes Blade (`.blade.php`), és a dir, les plantilles que generen l'HTML.
 
???questionlaravel "3.c:  `routes/web.php"
    Fitxer on es definixen les rutes web (GET/POST…) que retornen vistes HTML i criden controladors.

???questionlaravel "3.d:  `database/migrations/`"
    Conté les migracions que descriuen l'estructura de les taules de la base de dades (creació, modificació, etc.).

???questionlaravel "3.e:  `.env`"
    Fitxer de **configuració d'entorn** (no es puja al repositori): credencials de BD, APP_URL, APP_ENV, claus, etc.

---

### 4. Vistes, plantilles Blade i separació de responsabilitats (0,5 pt)


???questionlaravel "4.a: Explica la diferència entre **una vista Blade** individual i **una plantilla (layout)** en Laravel"
    
    - Una **vista Blade individual** és un fitxer que mostra una pàgina concreta (per exemple, `incidents/index.blade.php`).
    
    - Una **plantilla (layout)** (`layouts/app.blade.php`) definix l'estructura comuna (HTML base, capçalera, menú, peu) que després les vistes filles estenen.


???questionlaravel "4.b: Quins avantatges oferix Blade per a **separar lògica i presentació**? Anomena'n almenys dos (per exemple, herència de vistes, seccions, directives, etc.)"
    - Permet **herència de vistes** (`@extends`) i **seccions** (`@section`, `@yield`) per a reutilitzar estructura.
    - Té **directives** (`@if`, `@foreach`, `@auth`, etc.) que simplifiquen la lògica mínima en les vistes.
    - Escapa automàticament les dades (`{{ }}`) i ajuda a la seguretat (prevenció de XSS).

???questionlaravel "4.c: Indica com es passaria des d'un controlador una col·lecció d'objectes `$products` a una vista `products/index.blade.php` (esmenta el retorn del controlador, no cal escriure la vista)"
    ```php
    public function index()
    {
        $products = Product::all();

        return view('products.index', [
            'products' => $products,
        ]);
        // o: return view('products.index', compact('products'));
    }
    ```

---

### 5. Rutes i controladors (0,5 pt)

???questionlaravel "5.a: Explica breument la diferència entre definir una ruta amb una *funció anònima* i definir-la apuntant a un *mètode de controlador*"
    - Ruta amb **funció anònima**:
    
    ```php
    Route::get('/hola', function () {
        return 'Hola';
    });
    ```
    
    S'usa per a coses simples; la lògica queda dins del fitxer de rutes.
    
    - Ruta apuntant a un **mètode de controlador**:
    
    ```php
    Route::get('/courses', [CourseController::class, 'index']);
    ```
    
    La lògica va en la classe controlador: més organitzat, reutilitzable i testable.

???questionlaravel "5.b: Escriu la línia de ruta que registraries en `routes/web.php` per a gestionar un recurs `Course` mitjançant un controlador `CourseController` per a mostrar un sol curs usant el sistema de recursos de Laravel"
    ```php
    Route::resource('courses', CourseController::class);
    ```

    Esta línia registra, entre altres, la ruta per a mostrar un curs concret (`courses.show` → GET `/courses/{course}`).

???questionlaravel "5.c:  Anomena *quatre mètodes* típics que genera un controlador de recurs i explica en una frase la finalitat de cadascun"
    - `index()` → Mostra el llistat de recursos.
    - `create()` → Mostra el formulari per a crear un nou recurs.
    - `store()` → Rep el formulari de creació i guarda en BD.
    - `show()` → Mostra un recurs concret.
    - `edit()` → Mostra el formulari per a editar un recurs existent.
    - `update()` → Actualitza en BD un recurs existent.
    - `destroy()` → Elimina un recurs.
    
    
    (Qualsevol 4 d'estos amb la seua explicació.)

---

### 6. Migracions, models i seeders (0,5 pt)

???questionlaravel "6.a: Què és una *migració* en Laravel i quin avantatge aporta en un projecte d'equip? "
    Una **migració** és un fitxer PHP que descriu canvis en l'estructura de la BD (crear taules, afegir columnes…).  
    Permet tindre la BD **versionada i sincronitzada** entre tots els membres de l'equip (`php artisan migrate` crea la mateixa estructura en tots els entorns).

???questionlaravel "6.b: Crea una migració de creació de la taula `courses`"
    Per a executar la migració que crea la taula `courses`:

    ```bash
    php artisan make:migration create_courses_table
    ```

    (després d'haver generat la migració i configurat la BD en `.env`).

???questionlaravel "6.c: Com s'executa la migració anterior?"
    ```bash
    php artisan migrate
    ```

???questionlaravel "6.d: Explica què representa un **model Eloquent** i com es relaciona amb les taules de la base de dades"
    Un **model Eloquent** representa una **taula de la BD** (per convenció `Course` ↔ `courses`).  
    Cada instància del model representa una fila, i Eloquent oferix mètodes per a **consultar, inserir, actualitzar i esborrar** registres, a més de gestionar relacions (`hasMany`, `belongsTo`, etc.).

???questionlaravel "6.e: Per a què servixen els **seeders**? Indica un exemple de quan és útil usar-los (en quina fase del desenvolupament / proves)"
    Els **seeders** servixen per a **omplir la BD amb dades inicials o de prova** (usuaris d'exemple, categories, etc.).  
    Són molt útils en començar un projecte o per a entorns de desenvolupament/test, per a poder treballar amb dades sense haver d'introduir-les a mà cada vegada.

---

## PART B. Desenvolupament – Pràctic

**Context**
Dissenyaràs una aplicació Laravel per a gestionar **incidències de suport tècnic** en un centre educatiu.

- Els **usuaris** (taula `users` ja existent) poden crear **incidències**.
- Cada incidència pertany a una categoria (per exemple, *“Hardware”*, *“Software”*, *“Xarxa”*).
- Les incidències tenen un **estat** (*abierta*, *en_proceso*, *resuelta*) i una **prioritat**.

Taules que treballaràs:

- `users` (ja creada per Laravel)
- `categories`  
- `incidents`

Relacions:

- Un **usuari** pot crear moltes incidències.  
- Una **incidència** pertany a un usuari.  
- Una **categoria** té moltes incidències.  
- Una **incidència** pertany a una categoria.



### B.1. Creació del projecte (1 pt)

Crea un projecte laravel amb el nom `incidents` des de Composer.

???questionlaravel "B1"
    ```bash
    composer create-project laravel/laravel incidents
    cd incidents
    php artisan serve
    ```
    (O bé: `laravel new incidents` si tens l'instal·lador de Laravel.)

---

### B.2. Definició de migracions (2 punts)

#### B.2.1. Migració de `categories` (0,75 pt)

a. Crea la migració per a `categories`.
???questionlaravel "B2.1.a"
    ```bash
    php artisan make:migration create_categories_table
    ```

b. Escriu el codi del mètode `up()` de la migració que crea la taula `categories` amb els camps:
    - `id` 	  (autoincremental)  
    - `name`  (string, únic)  
    - `description`   (text opcional)  
    - `created_at`  i  `updated_at`  (timestamps)
  
dins de `Schema::create()`:
    
<div style="text-align: center;"><img src="../../img/others/examen2_imag1.png" alt="ut03" style="max-width: 40%;" /></div>


???questionlaravel "B2.1.b"
    ```php
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();                               // id autoincremental
            $table->string('name')->unique();           // nombre único
            $table->text('description')->nullable();    // descripción opcional
            $table->timestamps();                       // created_at y updated_at
        });
    }
    ```

---

#### B.2.2. Migració de `incidents` (1,25 pt)
Escriu el codi del mètode `up()` de la migració que crea la taula `incidents` amb els camps:

- `id`  
- `title`  (string)  
- `description` (text llarg/opcional)  
- `status` (enum, per exemple: abierta, en_proceso, resuelta)  
- `priority` (enum o integer, per exemple: baja, media, alta – per defecte baja)
- `user_id` (clau forana a users)  
- `category_id` (clau forana a categories)  
- `created_at` i `updated_at`

Inclou les **claus foranes** adequades (foreignId o similar) i les seues referències.

???questionlaravel "B2.2"
    ```php
    public function up()
    {
        Schema::create('incidents', function (Blueprint $table) {
            $table->id();

            $table->string('title');                    // título
            $table->text('description')->nullable();    // descripción larga opcional

            $table->enum('status', ['abierta', 'en_proceso', 'resuelta'])
                ->default('abierta');                   // estado

            $table->enum('priority', ['baja', 'media', 'alta'])
                ->default('baja');                      // prioridad por defecto baja

            // Claves foráneas
            $table->foreignId('user_id')
                ->constrained()                         // por defecto a tabla users, id
                ->onDelete('cascade');

            $table->foreignId('category_id')
                ->constrained()                         // tabla categories, id
                ->onDelete('cascade');

            $table->timestamps();                       // created_at, updated_at
        });
    }
    ```

---

### B.3. Models i relacions Eloquent (1,5 punts)

#### B.3.1. Model `Category` (0,5 pt)

- Crea el model `Category` i escriu la classe mínima indicant:
- `Namespace` correcte.  
- Ús de `HasFactory` (si ho consideres).  
- L'array de camps emplenables massivament.
- Mètode de relació per a obtindre totes les incidències (`incidents()`).

???questionlaravel "B.3.1"
    ```php
    <?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class Category extends Model
    {
        use HasFactory;

        // Campos asignables masivamente
        protected $fillable = [
            'name',
            'description',
        ];

        // Una categoría tiene muchas incidencias
        public function incidents()
        {
            return $this->hasMany(Incident::class);
        }
    }
    ```

---

#### B.3.2. Model `Incident` (1 pt)

> Usa les funcions de relació adequades (hasOne, hasMany, belongsTo, belongsToMany, etc.) i anomena-les de manera coherent.

- Crea el model `Incident` i escriu la classe mínima indicant:
- `Namespace` correcte (`App\Models`).  
- L'array de camps emplenables massivament.
- Relació per a accedir al seu **usuari creador**.  
- Relació per a accedir a la seua **categoria**.  

???questionlaravel "B.3.2"
    ```php
    <?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class Incident extends Model
    {
        use HasFactory;

        protected $fillable = [
            'title',
            'description',
            'status',
            'priority',
            'user_id',
            'category_id',
        ];

        // Incidencia pertenece a un usuario
        public function user()
        {
            return $this->belongsTo(User::class);
        }

        // Incidencia pertenece a una categoría
        public function category()
        {
            return $this->belongsTo(Category::class);
        }
    }
    ```

---

### B.4. Seeders per a dades inicials (1 punt)
Volem omplir la base de dades amb dades d'exemple usant **arrays** i **bucles** en PHP.

#### B.4.1. `CategorySeeder` (0,5 pt)

En el mètode `run()` del seeder `CategorySeeder`:

- Crea el seeder.
- Declara un **array PHP** amb els noms de les categories: "*Hardware*", "*Software*", "*Red*".
- Recorre l'array amb un `foreach` i inserix cada categoria en la taula `categories` (pots usar el model `Category::create()`).

???questionlaravel "B.4.1"
    ```bash
    php artisan make:seeder CategorySeeder
    ```

    ```php
    <?php

    namespace Database\Seeders;

    use App\Models\Category;
    use Illuminate\Database\Seeder;

    class CategorySeeder extends Seeder
    {
        public function run(): void
        {
            $names = ['Hardware', 'Software', 'Red'];

            foreach ($names as $name) {
                Category::create([
                    'name'        => $name,
                    'description' => 'Incidencias de ' . strtolower($name),
                ]);
            }
        }
    }
    ```

---

#### B.4.2. `IncidentSeeder` (0,5 pt)

En el mètode `run()` del seeder `IncidentSeeder`:
1.	Crea el seeder.
2.	Declara un array d'incidències (cada element pot ser un array associatiu amb *title*, *status*, *priority*, *user_id*, *category_id*, *etc*.).  
3.	Recorre l'array amb un `foreach` i crea els registres en la taula `incidents`.  


???questionlaravel "B.4.2"
    ```bash
    php artisan make:seeder IncidentSeeder
    ```

    ```php
    <?php

    namespace Database\Seeders;

    use App\Models\Incident;
    use Illuminate\Database\Seeder;

    class IncidentSeeder extends Seeder
    {
        public function run(): void
        {
            $incidents = [
                [
                    'title'       => 'El ordenador del aula 1 no enciende',
                    'description' => 'Parece fallo de fuente de alimentación',
                    'status'      => 'abierta',
                    'priority'    => 'alta',
                    'user_id'     => 1,   // admin
                    'category_id' => 1,   // Hardware
                ],
                [
                    'title'       => 'No funciona el proyector en el aula 3',
                    'description' => 'Problema con drivers de la tarjeta gráfica',
                    'status'      => 'en_proceso',
                    'priority'    => 'media',
                    'user_id'     => 1,
                    'category_id' => 1,   // Hardware
                ],
                [
                    'title'       => 'El programa de notas se cierra solo',
                    'description' => 'Error de aplicación al abrir informes',
                    'status'      => 'abierta',
                    'priority'    => 'media',
                    'user_id'     => 1,
                    'category_id' => 2,   // Software
                ],
                [
                    'title'       => 'Sin conexión a Internet en secretaría',
                    'description' => 'Posible problema de switch o cableado',
                    'status'      => 'resuelta',
                    'priority'    => 'alta',
                    'user_id'     => 1,
                    'category_id' => 3,   // Red
                ],
            ];

            foreach ($incidents as $data) {
                Incident::create($data);
            }
        }
    }
    ```

---

### B.5. Rutes, controlador i accions bàsiques (1,5 punts)

#### B.5.1. Rutes de recurs (0,5 pt)

a. Escriu la línia de ruta resource que afegiries en `routes/web.php` per a registrar totes les rutes CRUD del controlador `IncidentController`.

???questionlaravel "B.5.1.a"
    ```php
    use App\Http\Controllers\IncidentController;

    Route::resource('incidents', IncidentController::class);
    ```

b. Indica **dos exemples** d'URL i mètode HTTP que generarà eixa ruta de recurs (per exemple, veure el llistat d'incidències, mostrar una incidència concreta).

???questionlaravel "B.5.1.b"
    Dos exemples de rutes generades pel resource:

    - **Llistat d'incidències**  

        - Mètode HTTP: `GET`  
        - URL: `/incidents`  
        - Acció: `IncidentController@index`

    - **Mostrar una incidència concreta**  

        - Mètode HTTP: `GET`  
        - URL: `/incidents/{id}` (per exemple, `/incidents/5`)  
        - Acció: `IncidentController@show`

    - Altres possibles:

        - `POST /incidents` → `store`, 
        - `PUT/PATCH /incidents/{incident}` → `update`, 
        - `DELETE /incidents/{incident}` → `destroy`.

---

#### B.5.2. Mètode `index()` amb paginació (0,5 pt)

Escriu el cos aproximat del mètode `index()` d'`IncidentController` que:

- Obtinga totes les incidències,  
- Carregue també la seua categoria i el seu usuari creador,  
- Pagine els resultats de 10 en 10,  
- Retorne la vista `incidents.index` passant-hi la col·lecció paginada.
  
> No cal escriure la vista Blade, només el mètode del controlador.

???questionlaravel "B.5.2"
    ```php
    <?php

    namespace App\Http\Controllers;

    use App\Models\Incident;

    class IncidentController extends Controller
    {
        public function index()
        {
            // Cargar incidencias con su usuario y categoría, paginadas de 10 en 10
            $incidents = Incident::with(['category', 'user'])
                                ->paginate(10);

            return view('incidents.index', compact('incidents'));
        }

        // ...
    }
    ```

---

#### B.5.3. Mètode `store()` amb validació (0,5 pt)

Escriu el mètode `store()` d'`IncidentController` que:

- Valide els camps del formulari (a través de `$request`):

    - title: obligatori, mínim 3 caràcters.  
    - category_id: obligatori i ha d'existir en categories.  
    - priority: obligatori.  

- Redirigisca al llistat d'incidències amb un **missatge d'èxit** (per exemple, usant `with('success', '...')`).


???questionlaravel "B.5.3"
    ```php
    <?php

    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Models\Incident;

    class IncidentController extends Controller
    {
        public function store(Request $request)
        {
            // 1. Validar campos
            $validated = $request->validate([
                'title'       => 'required|min:3',
                'category_id' => 'required|exists:categories,id',
                'priority'    => 'required',
                'description' => 'nullable',
            ]);

            // Asignar valores adicionales
            $validated['status']   = 'abierta';           // estado inicial
            $validated['user_id']  = auth()->id();        // usuario logueado (creador)

            // 2. Crear la incidencia
            Incident::create($validated);

            // 3. Redirigir con mensaje de éxito
            return redirect()
                ->route('incidents.index')
                ->with('success', 'Incidencia creada correctamente.');
        }
    }
    ```

---

### B.6. Vistes i plantilles Blade (1 punt)

Volem estructurar les vistes usant **plantilles Blade**.

#### B.6.1. Plantilla base `layouts/app.blade.php` (0,5 pt)

a. Explica breument quin paper té `layouts/app.blade.php` en un projecte Laravel.

???questionlaravel "B.6.1.a"
    `layouts/app.blade.php` sol ser la **plantilla base** de l'aplicació: conté l'HTML general (capçalera, `<head>`, `<body>`, menú, etc.).   
    La resta de vistes **estenen** este layout i omplin la secció `@yield('content')`, i així s'evita repetir la mateixa estructura.

b. Escriu un fragment simplificat de Blade que continga:

    - La declaració d'un `<!DOCTYPE html>` i etiquetes `<html>`, `<head>`, `<body>`.  
    - Una secció on es mostre un títol general del lloc (per exemple, “Gestor d'incidències”).  
    - Una crida a `@yield('content')` perquè les vistes filles inserisquen el seu contingut.

???questionlaravel "B.6.1.b"
    Fragment simplificat:

    ```blade
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Gestor de incidencias</title>
    </head>
    <body>
        <header>
            <h1>Gestor de incidencias</h1>
        </header>

        <main>
            @yield('content')
        </main>
    </body>
    </html>
    ```

---

#### B.6.2. Vista `incidents/index.blade.php` (0,5 pt)

Escriu un fragment simplificat de Blade per a la vista `incidents/index.blade.php` que:

- **Estenga** de `layouts/app.blade.php`.
- Definisca una secció `content` on:  
  
    - Es recórrega la col·lecció d'incidències (`$incidents`) amb un `@foreach`.
    - Per cada incidència es mostre el títol, la categoria i l'estat. 

> No cal HTML detallat, n'hi ha prou amb l'estructura Blade bàsica.


???questionlaravel "B.6.2"
    ```blade
    {{-- resources/views/incidents/index.blade.php --}}
    @extends('layouts.app')

    @section('content')
        <h2>Listado de incidencias</h2>

        @foreach($incidents as $incident)
            <div>
                <strong>{{ $incident->title }}</strong><br>
                Categoría: {{ $incident->category->name }}<br>
                Estado: {{ $incident->status }}
            </div>
            <hr>
        @endforeach

        {{-- Si estamos usando paginación --}}
        {{ $incidents->links() }}
    @endsection
    ```
