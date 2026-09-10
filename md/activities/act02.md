---
title: Actividad guiada
---
# <img src="../../img/laravel_azul.svg" width="40"> Actividad guiada 2


???prpr "Paso 1. Configurar fichero `.env` y crear/ejecutar migraciones"

    Vamos a crear un proyecto que gestione empleados y notas.

    1. Crea un proyecto laravel de nombre, por ejemplo, **practica2**.
    ```
    composer crearte-project laravel/laravel practica2
    ```

    2. **Base de datos**
    En la raíz del proyecto, encontramos el fichero de configuración `.env`, modificamos parámetros:
    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3307
    DB_DATABASE=practica2
    DB_USERNAME=root
    DB_PASSWORD=
    ```

    3. Crear la tabla **`employees`** mediante una migración con la siguiente estructura:
   
    | Campo | Tipo | Restricciones |
    | --- | --- | --- |
    | `id` |  | Clave primaria, autoincremental, no nulo |
    | `firstname` | `string(100)` | No nulo |
    | `lastname` | `string(100)` | No nulo |
    | `birth_date` | `date` | No nulo |
    | `hire_date` | `date` | No nulo |
    | `salary` | `decimal(8,2)` | Puede ser nulo |
    | `created_at` | `timestamp` | Automático |
    | `updated_at` | `timestamp` | Automático |

    ```
    php artisan make:migration create_employees_table
    ```
    Ahora, en la ruta `database/migrations` encontraremos un fichero como **`xxxx_xx_xx_xxxxxx_create_employees_table`**:
    ```
    Schema::create('employees', function (Blueprint $table) {
        $table->id();
        $table->string('firstname', 100);
        $table->string('lastname', 100);
        $table->date('birth_date');
        $table->date('hire_date');
        $table->decimal('salary',10,2)->nullable();
        $table->timestamps();
    });
    ```
    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_p2_001.png"
            alt="crear migración employees"
            class="figure-img-highlight"
            style="max-width: 80%; height: auto;" />
        <figcaption class="figure-caption-small">
            crear migración employees
        </figcaption>
    </figure>
    </div>
    Ejecutamos la migración:
    ```
    php artisan migrate
    ```
    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_p2_002.png"
            alt="ejecutar todas las migraciones"
            class="figure-img-highlight" 
            style="max-width: 80%; height: auto;" />
        <figcaption class="figure-caption-small">
            ejecutar todas las migraciones
        </figcaption>
    </figure>
    </div>

    4. Crear el **modelo `Employee`** configurado y operativo (tabla, clave primaria, tipos y **asignación masiva** coherentes con la estructura anterior).
    ```
    php artisan make:model Employee
    ```

    !!!tenencuenta "Carga de datos de prueba: importa el anexo SQL"
        En los recursos de esta actividad hay un fichero **[employees.sql](../sources/employees.sql){:target="blank"}** con 100 empleados ficticios para importar en la tabla `employees`.


???prpr "Paso 2. Crear el controlador y sus métodos"
    Implementarás **rutas** y un **controlador** que devuelvan listados ordenados y filtrados, y mostrarás los datos en una **vista Blade** mediante una tabla HTML con columnas homogéneas.

    Crea un controlador **`EmployeeController`** para centralizar la lógica de consulta de empleados. Dentro de él implementarás, como mínimo, los métodos que devuelvan colecciones de empleados según los criterios indicados más abajo. Cada método debe:

    ```
    php artisan make:controller EmployeeController
    ```

    * Obtener los empleados aplicando el **criterio de ordenación o filtrado** correspondiente.
    * Enviar el resultado a una **vista Blade** común (ver punto 3) mediante una variable llamada exactamente `employees`.

    Métodos a implementar:

    - **Listado por ID ascendente** (nombre **`byId`**): devuelve todos los empleados ordenados por `emp_id` de menor a mayor.
    - **Listado por apellidos y nombre** (nombre **`byLastName`**): devuelve todos los empleados ordenados por `lastname` (ascendente) y, en caso de empate, por `firstname` (ascendente).
    - **Subconjunto por letra inicial de apellido** (nombre **`lastNameStartsWith`**): devuelve solo los empleados cuyo `emp_lastname` **empiece por una letra** (si no se pasa ninguna letra, el sistema asume la letra “*A*” por defecto), ordenados por `lastname` y `emp_firstname` (ascendente).
    - **Subconjunto por año de nacimiento** (nombre **`bornIn`**): devuelve solo los empleados **nacidos en un año** (si no se pasa ningún año, el sistema asume "*1980*” por defecto), ordenados por `lastname` y `firstname` (ascendente).

    Todos los métodos devolverán la misma vista (ver punto 3) y **no** deben repetir lógica de presentación en el controlador.

    Métodos del controlador `EmployeeController`:
    ```php
    <?php
    
    namespace App\Http\Controllers;
    
    use Illuminate\Http\Request;
    use App\Models\Employee;
    
    class EmployeeController extends Controller
    {
        public function byId(){
            $employees = Employee::orderBy('id', 'asc')->get();
            return view('employees.index', compact('employees'));
        }

        public function byLastName(){
            $employees = Employee::orderBy('emp_lastname', 'asc')
                                ->orderBy('emp_firstname','asc')
                                ->get();

            return view('employees.index', compact('employees'));
        }

        public function lastNameStartsWith(string $letter='B'){
            $employees = Employee::where('emp_lastname', 'LIKE', "$letter%")
                                ->orderBy('emp_lastname', 'asc')
                                ->orderBy('emp_firstname','asc')
                                ->get();

            return view('employees.index', compact('employees'));
        }
    
        public function bornIn(string $year='1980'){
            $employees = Employee::where('emp_birth_date','like', "$year%")
                                ->orderBy('emp_lastname', 'asc')
                                ->orderBy('emp_firstname','asc')
                                ->get();
            
            return view('employees.index', compact('employees'));
        }    
    }
    ```

???prpr "Paso 3. Definir las rutas"

    Declara rutas **GET** que apunten a los métodos anteriores. Utiliza exactamente estas URL para homogeneizar correcciones:

    | Ruta | Método del controlador | Descripción |
    | --- | --- | --- |
    | `/employees/by-id` | `byId` | Listado ordenado por `emp_id` ascendente. |
    | `/employees/by-lastname` | `byLastName` | Listado ordenado por apellidos y nombre. |
    | `/employees/filter-letter` | `lastNameStartsWith` | Subconjunto: apellidos que empiezan por “A”. |
    | `/employees/filter-year` | `bornIn` | Subconjunto: nacidos en el año 1990. |

    **Requisitos de las rutas**:

    * Todas deben retornar **la misma vista** con la variable `employees`.
    * Usa **nombres de ruta** coherentes para cada una (por ejemplo, `employees.byId`, `employees.byLastName`, `employees.starts`, `employees.born`).

    **Rutas**

    Las rutas se encuentran en `routes/`**`web.php`**:
    ```php
    <?php
    // ...    
    use App\Http\Controllers\EmployeeController;
    
    // ...
    Route::get('employees/by-id', [EmployeeController::class,'byId'])->name('employees.byId');
    Route::get('employees/by-lastname', [EmployeeController::class,'byLastName'])->name('employees.byLastName');
    Route::get('employees/filter-letter/{letter?}', [EmployeeController::class,'lastNameStartsWith'])->name('employees.starts');
    Route::get('employees/filter-year/{year?}', [EmployeeController::class,'bornIn'])->name('employees.born');
    ```

???prpr "Paso 4. Crear vista"
    Crea una vista única `employees/index.blade.php` para los cuatro casos. Esta vista debe:

    1. Mostrar un **título** claro del listado.
    2. Si no hay registros en `employees`, mostrar un **mensaje**: “No hay empleados que cumplan el criterio.”
    3. En caso contrario, presentar una **tabla HTML** con las siguientes columnas y en este orden exacto:

    | Columna mostrada | Procede del campo |
    | --- | --- |
    | **ID** | `emp_id` |
    | **Apellidos** | `emp_lastname` |
    | **Nombre** | `emp_firstname` |
    | **Edad** | calculada a partir de `emp_birth_date` |
    | **Fecha de contratación** | `emp_hire_date` formateada en `YYYY-MM-DD` |

    Mostrar, sobre la tabla o como “caption”, el **total de registros** del listado.

    Vista **`resources/views/employees/index.blade.php`**:
    ```php
    @extends('layouts.app')

    @section('title', 'listar empleados')

    @section('content')
    <h1>LISTADO DE EMPLEADOS</h1>

    {{-- No se hace @forelse para no sacar primero sí o sí la cabecera de la tabla --}}
    @if ($employees->isEmpty())
        <p class="no-results">No hay empleados que cumplan el criterio.</p>
    @else
        <table border=1>
            <caption>Total de empleados: {{ $employees->count() }}</caption>
            <thead>
                <tr>
                    <th>id</th>
                    <th>apellidos</th>
                    <th>nombre</th>
                    <th>fecha nacimiento</th>
                    <th>edad</th>
                    <th>fecha de contratación</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($employees as $item)
                    @php
                        // utilizamos la librería Carbon para utilizar métodos de fechas
                        // como age() o format()
                        $birthDate = \Carbon\Carbon::parse($item->birth_date);
                        $hireDate  = \Carbon\Carbon::parse($item->hire_date);
                    @endphp
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>{{ $item->lastname }}</td>
                        <td>{{ $item->firstname }}</td>
                        <td>{{ $birthDate->format('d-m-Y') }}</td>                        
                        <td>{{ $birthDate->age }}</td>
                        <td>{{ $hireDate->format('d-m-Y') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif
    @endsection
    ```

    **Notas de presentación**:

    * La **edad** debe calcularse a partir de la fecha de nacimiento. Puedes calcularla en el controlador o en la vista, pero debe mostrarse como número entero de años.
    * La **fecha de contratación** debe mostrarse en formato `YYYY-MM-DD`.
    * Usa una **tabla legible**: cabecera con títulos, filas con celdas alineadas, y un estilo simple pero claro. No es necesario usar CSS avanzado.

???prpr "Paso 5. Comprobaciones parciales"
    LLegados a este punto, verifica manualmente que:

    1. **`/employees/by-id`**: muestra todos los registros ordenados por ID ascendente y las 5 columnas requeridas.
    2. **`/employees/by-lastname`**: muestra todos los registros ordenados por apellidos y, en empates, por nombre. Se ven las 5 columnas.
    3. **`/employees/filter-letter`**: muestra solo apellidos que empiezan por **A**. Ordenación por apellidos y nombre.
    4. **`/employees/filter-year`**: muestra únicamente los empleados nacidos en **1990**. Ordenación por apellidos y nombre.
    5. En todos los casos:
    
        - Se muestra el **total** de registros listados.
        - Si no hay coincidencias, aparece el **mensaje** de “*No hay empleados que cumplan el criterio.*”

    ---

    Deberás realizar **capturas de pantalla**:

    6. De cada ruta funcionando:
                
          - `/employees/by-id`
          - `/employees/by-lastname`
          - `/employees/filter-letter`
          - `/employees/filter-year`
    
     7. Del **Listado de rutas** definido (solo nombres y URIs, sin código fuente).
     8. **Descripción breve** de cómo calculas la **Edad** y cómo **formateas** la **Fecha de contratación** (dos o tres líneas).
     9. **Evidencia de datos cargados**: captura del total de filas o vista parcial de la tabla `employees` en tu gestor de BD.


---

???prpr "Paso 6. Plantilla Blade y partials"
    !!!tenencuenta "Recursos para realizar los ejemplos de este punto"

        - Fichero **[`notes.sql`](../sources/notes.sql){:target="blank"}** con 15 productos ficticios para importar en la tabla **`notes`**.
        - Iconos: **[vista](../sources/view.svg){:target="blank"}**, **[editar](../sources/edit.svg){:target="blank"}**, **[eliminar](../sources/delete.svg){:target="blank"}**, **[añadir](../sources/add.svg){:target="blank"}**.
        - Puedes mejorar la apariencia de tu aplicación utilizando CSS (ejemplo de estilos: **[`style1.css`](../sources/style1.css){:target="blank"}**).

    **Crear plantilla/layout**

    Antes de crear nuestras tablas, modelos, controladores y rutas, vamos a diseñar una plantilla de vista blade que nos sirva para todas las siguientes vistas que creemos (que "*extiendan*" de la plantilla):

    Crear un layout base en la ruta `resources/views/`**`layouts/app.blade.php`**:

    ```
    <!DOCTYPE html> 
    <html lang="es"> 
        <head>     
            <meta charset="UTF-8">     
            <title>
                @yield('title')
            </title> 
            <link rel="stylesheet" href="{{ asset('assets/css/style1.css') }}">
        </head> 
    <body>     
        <header>         
            <h1>Mi Aplicación de Notas</h1>         
            @include('partials.nav')
        </header>     
        <main>         
            @yield('content')     
        </main>
        @stack('scripts)
    </body> 
    </html>
    ```

    De esta plantilla `app.blade.php` observamos:

    - Tiene dos referencias `@yield` que después, en la vista que extienda, deberemos hacer referencia con su correspondiente `@section`.
    - Tiene una hoja de estilo que apunta a un fichero `style1.css` de la carpeta pública `assets/img/` (se utiliza `{{ asset('assets/css/style1.css') }}`).
    - Tiene una referencia `@stack` que utilizaremos para ir añadiendo código (en este caso scripts).
    - Tiene código incluido `nav.blade.php` que se encuentra en la ruta `resources/views/partials`.

    **Crear partial**

    Partial en `resources/views/`**`partials/nav.blade.php`**:
    ``` 
    <nav>             
        <a href="{{ route('notes.index') }}">Notas</a> |             
        <a href="{{ route('employee.byId') }}">Empleados</a>         
    </nav>  
    ```

???prpr "Paso 7. Crear un circuito MVC rápido para rutas dinámicas"

    **1) Migración + tabla**

    Utilizar la tabla **`notes`** con los campos:

    * `id` (entero, autoincremental)
    * `title` (string)
    * `description` (text)
    * `date_at` (date)
    * `done` (boolean)

    Crear la migración de la nota y el controlador:
        
    a. Crear Migración y después el Modelo:
    ```
    php artisan make:migration create_notes_table
    php artisan make:model Note
    ```
        
    b. 🔝 O podemos crear el modelo, la migración y el controlador con un solo comando:
    ```
    php artisan make:model Note -mc
    ```

    De esta forma se crean estos tres recursos con la sintaxis adecuada (**`Note`**, **`xxxx_xx_xx_xxxxxx_create_notes_table`** y **`NoteController`**).

    Abrimos archivo de migración `database/migrations/`**`xxxx_xx_xx_create_notes_table.php`** y añadimos los campos:"

    ``` 
    public function up() {     
        Schema::create('notes', function (Blueprint $table) {         
            $table->id();         
            $table->string('title')->unique();      
            $table->text('description')->nullable();         
            $table->date('date_at');         
            $table->boolean('done')->default(false);         
            $table->timestamps();     
        }); 
    } 
    
    public function down() {     
        Schema::dropIfExists('notes'); 
    } 
    ```

    Por último, ejecutamos la migración:

    ```
    php artisan migrate
    ```

    !!!tenencuenta "Resetear Migraciones"
        Si tenemos algún problema porque no hemos creado la base de datos desde cero, podemos eliminar las migraciones anteriores con:

        ```
        php artisan migrate:reset
        ```

    **2) Modelo `Note`**

    Ahora vamos a implementar el modelo `Note`. Vamos a definir los campos que se pueden asignar masivamentes:

    ``` 
    namespace App\Models; 

    use Illuminate\Database\Eloquent\Model;  

    class Note extends Model {     
    protected $fillable = [ 'title', 
                            'description', 
                            'date_at', 
                            'done'
                          ];     

    } 
    ```
        
    * **`$fillable`**: define qué campos se pueden asignar en masa.
    * `$guarded`: define qué campos **no** se pueden asignar.

    **3) Controlador `NoteController`**:

    !!!tenencuenta "Ejecuta solo si no se ha ejecutado la orden `php artisan make:model Note -mc`"
        ```
        php artisan make:controller NoteController
        ```

    Codificación del método `show()` en el controlador `app/Http/Controllers/NoteController.php`:
    
    ```
    //...
    use App\Models\Note;

    //...
    public function show(Note $note)
    {
        return view('notes.show', compact('note'));
    }
    ```

    **4) Ruta asociada:**

    Ahora que ya tenemos el controlador y el método que manejará la ruta, y el modelo que se conectará con la base de datos, vamos a definir la ruta en `routes/web.php`:
        
    ``` 
    //...
    use App\Http\Controllers\NoteController;  
    
    //...
    Route::get('notes/{note}', [NoteController::class, 'show'])->name('notes.show'); 
    ```

    **5) Vista asociada:**

    Por último nos queda crear la vista que mostrará la información de la nota con el ID recibido:

    ``` 
    @extends('layouts.app')
    
    @section('title', "nota $note->id")
    
    @section('content')
        <h1>nota {{ $note->id }}</h1>
    @endsection
    ```    


???prpr "Paso 8. CRUD. Listar todas las notas"
    **1) Ruta de listar notas**        
    ``` 
    //...
    use App\Http\Controllers\NoteController;  

    //...
    Route::get('/', [NoteController::class, 'index'])->name('notes.index'); 
    ```

    **2) Controlador**

    Método index, para listar todas las notas"
        
    ```
    //...
    use App\Models\Note;

    //...
    public function index()
    {
        $notes = Note::all();
        return view('notes.index', compact('notes'));
    }
    ```

    **3) Vista de Listado `resources/views/notes/index.blade.php`:**
    ```blade
    @extends('layouts.app')

    @section('title', 'listar notas')

    @section('content')
        <h1>LISTADO DE NOTAS</h1>

        <a href="{{ route('notes.create') }}" style="display:inline-block; text-decoration:none;">
            <img src="{{ asset('assets/img/add.svg') }}" alt="Añadir Nota" title="Añadir Nota">
        </a>

        @if ($notes->isEmpty())
            <p class="no-results">No hay notas que cumplan el criterio.</p>
        @else
            <table>
                <caption>Total de notas: {{ $notes->count() }}</caption>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>título</th>
                        <th>descripción</th>
                        <th>fecha</th>
                        <th>realizada</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($notes as $item)
                        @php
                            $date = \Carbon\Carbon::parse($item->date_at);
                        @endphp
                        <tr class="{{ $item->done ? 'done-yes' : 'done-no' }}">
                            <td>{{ $item->id }}</td>
                            <td>{{ $item->title }}</td>
                            <td>{{ $item->description }}</td>
                            <td>{{ $date->format('d-m-Y') }}</td>  
                            <td>{{ $item->done ? 'checked' : '' }}</td>       

                            <td>
                                <div style="display: flex; gap: 0.5rem;">
                                    <a href="{{ route('notes.show', $item) }}" style="display:inline-block; text-decoration:none;">
                                        <img src="{{ asset('assets/img/view.svg') }}" alt="Vista" title="Vista">
                                    </a>

                                    <a href="{{ route('notes.edit', $item) }}" style="display:inline-block; text-decoration:none;">
                                        <img src="{{ asset('assets/img/edit.svg') }}" alt="Editar" title="Editar">
                                    </a>

                                    <form action="{{ route('notes.destroy', $item) }}" method="POST" style="display:inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" style="border: none; background: none; padding: 0; cursor: pointer;">
                                            <img src="{{ asset('assets/img/delete.svg') }}" alt="Eliminar" title="Eliminar">
                                        </button>
                                    </form>
                                </div>
                            </td>
                            
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    @endsection
    ```
    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_vista_index1.png"
            alt="vista index"
            class="figure-img-highlight"
            style="max-width: 80%; height: auto;" />
        <figcaption class="figure-caption-small">
        vista notes/index.blade.php
        </figcaption>
    </figure>
    </div>

???prpr "Paso 9. CRUD. Mostrar nota individual"
    **1) Ruta para mostrar:**    
    ```
    Route::get('/notes/show/{note}', [NoteController::class, 'show'])->name('notes.show');
    ```

    **2) Controlador:**

    En este caso también tenemos dos formas de recibir el parámetro `Note $note`. En esta primer caso recibimos la *nota* y `laravel` por inyección de modelo la busca por nosotros y en el segundo caso recibimos el *ID* y buscamos la nota nosotros.

    **Método `show`**

    - 🔝 Por inyección de modelo:
    ``` 
    public function show(Note $note) {     
        return view('notes.show', compact('note')); 
    } 
    ```

    - Buscando por ID:   
    ``` 
    public function show($id) {     
        $note = Note::findOrFail($id);     
        return view('notes.show', compact('note')); 
    } 
    ```

    **3) Vista `resources/views/notes/show.blade.php` actualizada:**

    ``` 
    @extends('layouts.app')
    
    @section('title')
        nota: {{ $note->id }}
    @endsection
    
    @section('content')
        <h1>nota {{ $note->id }}</h1>
    
        <table>
        <tbody>
            <tr>
                <td>título</td>
                <td>{{ $note->title }}</td>
            </tr>
            <tr>
                <td>descripción</td>
                <td>{{ $note->description }}</td>
            </tr>
            <tr>
                <td>fecha</td>
                <td>{{ $note->date_at->format('d/m/Y') }}</td>
            </tr>
            <tr>
                <td>realizada</td>
                <td>{{ $note->done ? 'sí' : 'no' }}</td>
            </tr>
            </tbody>
        </table>
        <a href="{{ route('notes.index') }}"> <--Volver </a>
    @endsection
    ```

    Podemos observar que esta vista:
    
    - Aplica la plantilla `app.blade.php`.
    - Muestra en la pestaña del navegador el número de nota.
    - En el campo de tipo fecha se le aplica el método `format('d/m/Y)`.
    - Muestra el valor del campo `done` (que es de tipo `boolean`) realiza una ternaria.
    - Tiene un enlace, al final, para volver a la vista que lista notas y lo hace con el método `route` y el nombre de la ruta (`notes.index`).

    Con esto, accediendo a `/notes/3` veremos:
        
    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_vista_show1.png"
            alt="vista show"
            class="figure-img-highlight"
            style="max-width: 80%; height: auto;" />
        <figcaption class="figure-caption-small">
        vista notes/show.blade.php
        </figcaption>
    </figure>
    </div>

???prpr "Paso 10. CRUD. Crear una Nueva Nota"
    Para poder crear una nota necesitamos tres cosas:

    **1) Ruta**
    ```
    Route::get('/notes/create', [NoteController::class, 'create'])->name('notes.create');
    ```

    **2) Controlador** 
    Método create, para mostrar el formulario de creación:
    ``` 
    public function create() {     
        return view('notes.create'); 
    } 
    ```

    **3) Vista de Creado `resources/views/notes/index.blade.php`**

    Una vista que contenga el formulario de creación: **`resources/views/notes/create.blade.php`**.
        
    ``` 
    @extends('layouts.app')
    
    @section('title', 'Crear Nota')
    
    @section('content')
        <h1>CREAR NUEVA NOTA</h1>
        
        <form action="{{ route('notes.store') }}" method="POST">
            @csrf
            <table>
            <caption>Formulario de Creación de Nota</caption>
            <thead>
                <tr>
                    <th>Campo</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><label for="title">Título:</label></td>
                    <td><input type="text" id="title" name="title" required></td>
                </tr>
                <tr>
                    <td><label for="description">Descripción:</label></td>
                    <td><textarea id="description" name="description" 
                                    placeholder="Escribe la descripción" required></textarea></td>
                </tr>
                <tr>
                    <td><label for="date">Fecha:</label></td>
                    <td><input type="date" id="date" name="date_at" required></td>
                </tr>
                <tr>
                    <td><label for="done">Completada:</label></td>
                    <td><input type="checkbox" id="done" name="done" value="1"></td>
                </tr>
            </tbody>
            </table>

            <div style="margin-top: 1rem;">
                <button type="submit">Guardar</button>

                <a href="{{ route('notes.index') }}" style="margin-left: 10px; text-decoration: none; color: blue;">Cancelar</a>
            </div>
        </form>
    @endsection
    ```

    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_vista_create1.png"
            alt="vista create"
            class="figure-img-highlight"
            style="max-width: 80%; height: auto;" />
        <figcaption class="figure-caption-small">
        vista notes/create.blade.php
        </figcaption>
    </figure>
    </div>

???prpr "Paso 11. CRUD. Guardar la Nueva Nota"
    Al igual que en el caso anterior, para guardar la nota necesitamos dos cosas. Una ruta que maneje el envío del formulario y un método en el controlador que procese los datos y guarde la nota en la base de datos. Al final, redirigiremos a la lista de notas.

    **1) Ruta para guardar:**    

    ``` 
    Route::post('/notes/store', [NoteController::class, 'store'])->name('notes.store'); 
    ```

    **2) Controlador:**

    Para guardar la nota, podemos usar diferentes métodos. 

    Aquí mostramos dos formas:
    
    ``` 
    public function store(Request $request) {     
        $note = new Note();     
        $note->title = $request->input('title');     
        $note->description = $request->input('description');     
        $note->date = $request->input('date_at');     
        $note->done = $request->input('done') ? 1 : 0;     
        $note->save();     // Redirigir a la lista de notas     
        return redirect()->route('notes.index'); 
    } 
    ```
    
    🔝 Mejor utilizando el método `create`:
        
    ``` 
    public function store(Request $request) {     
        Note::create($request->all());     
        return redirect()->route('notes.index'); 
    } 
    ```

    **Explicaciones Adicionales:**

    * `@csrf` protege contra ataques CSRF (Cross-Site Request Forgery).
    * `$request->all()` devuelve todos los datos enviados en el formulario.
    * Laravel valida automáticamente que el token CSRF esté presente. Si no lo está, lanzará un error.

    !!!tenencuenta "Cómo funciona CSRF?"
      * Laravel genera un token único para cada sesión de usuario.
      * Este token se incluye en cada formulario generado por Laravel.
      * Cuando se envía el formulario, Laravel verifica que el token enviado coincida con el de la sesión.
      * Si no coinciden, Laravel lanza un error 419 (Page Expired).
      * Esto previene que un atacante envíe formularios en nombre del usuario sin su consentimiento.



???prpr "Paso 12. CRUD. Editar una Nota"
    **1) Ruta para edición**

    ```
    Route::get('/notes/edit/{note}', [NoteController::class, 'edit'])->name('notes.edit');
    ```

    **2) Controlador**

    Tenemos varias formas de recibir el parámetro `note`. En esta primer recibimos el ID y buscamos la nota, para poder pasarla a la vista:

    ``` 
    public function edit($id) {     
        $note = Note::findOrFail($id);     
        return view('notes.edit', compact('note')); 
    } 
    ```

    🔝 En esta segunda forma, recibimos el modelo `Note`. De esta manera es Laravel el que se encarga de buscar la nota. Cuando trabajamos con modelos, esta es la forma recomendada (con inyección de modelo):

    ``` 
    public function edit(Note $note) {     
        return view('notes.edit', compact('note')); 
    } 
    ```

    **3) Vista de Editar `resources/views/notes/edit.blade.php`**

    En este caso la ruta la hemos definido con el método `PUT`. Este método es el que se utiliza para actualizar los datos de un recurso existente. Pero ¿cómo hacerlo si las opciones de `form` solo permiten `GET` y `POST`?. Laravel nos ofrece una solución sencilla: la directiva `@method('PUT')`. Esta directiva simula el método PUT en formularios HTML. Esta directiva debe estar dentro del formulario y antes de los inputs.

    ```
    <form id="sample-form" action="somepage.php" method="POST">     
    @csrf     
    @method('PUT')
        <!-- Otros campos del formulario --> 
    </form> 
    ```

    Con este formato el formulario se enviará como un PUT, aunque el método del formulario sea POST.
        
    ``` 
    @extends('layouts.app')

    @section('title', 'Editar Nota')

    @section('content')
        <h1>EDITAR NOTA {{ $note->id }}</h1>

        <form action="{{ route('notes.update', $note->id) }}" method="POST">
            @csrf
            @method('PUT')
            <table>
                <caption>Formulario de Edición de Nota</caption>
                <thead>
                    <tr>
                        <th>Campo</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><label for="title">Título:</label></td>
                        <td><input type="text" id="title" name="title" value="{{ $note->title }}" required></td>
                    </tr>
                    <tr>
                        <td><label for="description">Descripción:</label></td>
                        <td><textarea id="description" name="description" required>
                            {{ $note->description }}
                        </textarea></td>
                    </tr>
                    <tr>
                        <td><label for="date_at">Fecha:</label></td>
                        <td><input type="date" id="date" name="date_at" value="{{ $note->date_at) }}" required></td>
                    </tr>
                    <tr>
                        <td><label for="done">Completada:</label></td>
                        <td>
                            <input type="hidden" name="done" value="0"> 
                            <input type="checkbox" id="done" name="done" value="1" {{ $note->done ? 'checked' : '' }}>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style="margin-top: 1rem;">
                <button type="submit">Actualizar</button>

                <a href="{{ route('notes.index') }}" style="margin-left: 10px; text-decoration: none; color: blue;">Cancelar</a>
            </div>
        </form>
    @endsection
    ```
        
    - `@method('PUT')` simula el método HTTP PUT en formularios HTML (que solo permiten GET y POST).


???prpr "Paso 13. CRUD. Actualizar la Nota"
    **1) Ruta para actualizar:**
    ``` 
    Route::put('/notes/update/{note}', [NoteController::class, 'update'])->name('notes.update'); 
    ```

    **2) Controlador:**

    En este caso también tenemos dos formas de recibir el parámetro `Note $note`. En esta primer caso recibimos la *nota* y `laravel` por inyección de modelo la busca por nosotros y en el segundo caso recibimos el *ID* y buscamos la nota nosotros.
        
    - 🔝 Por inyección de modelo:
    ``` 
    public function update(Request $request, Note $note) {     
        $note->update($request->all());     
        return redirect()->route('notes.index'); 
    } 
    ```

    - Buscando por ID:    
    ``` 
    public function update(Request $request, $id) {     
        $note = Note::findOrFail($id);     
        $note->update($request->all());     
        return redirect()->route('notes.index'); 
    } 
    ```

???prpr "Paso 14. CRUD. Eliminar una Nota"
    **1) Ruta para eliminar:**        
    ```
    Route::delete('/notes/destroy/{note}', [NoteController::class, 'destroy'])->name('notes.destroy');
    ```

    **2) Controlador:**
    Como en los casos anteriores, tenemos dos formas de recibir el parámetro `Note $note`. En esta primer caso recibimos la *nota* y `laravel` por inyección de modelo la busca por nosotros y en el segundo caso recibimos el *ID* y buscamos la nota nosotros.

    - 🔝 Por inyección de modelo:
    ``` 
    public function destroy(Note $note) {     
        $note->delete();     
        return redirect()->route('notes.index'); 
    } 
    ```

    - Buscando por ID:   
    ``` 
    public function destroy($id) {     
        $note = Note::findOrFail($id);     
        $note->delete();     
        return redirect()->route('notes.index'); 
    } 
    ```


???prpr "Paso 15. CRUD. Testeo completo"
    Ahora vamos probar todas las funcionalidades del CRUD:

    !!!tenencuenta "Aspecto del ejemplo"
        Al no utilizar nada de CSS, el aspecto es muy básico. En un proyecto real, se debería aplicar estilos CSS para mejorar la apariencia y usabilidad.

    1) **Listar Notas:** Accede a la ruta `/` para ver el listado de notas.
        
    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_vista_index1.png"
                    alt="vista /notes/index.blade.php"
                    class="figure-img-highlight"
                    style="max-width: 90%; height: auto;" />
        <figcaption class="figure-caption-small">
                vista /notes/index.blade.php
        </figcaption>
    </figure>
    </div>

    2) **Crear Nota:** Haz clic en el botón "*Añadir Nota*", rellena el formulario y envíalo.

    Al hacer click en "*Añadir Nota*" se accede a `/notes/create`:
        
    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_vista_create2.png"
                    alt="vista /notes/create.blade.php"
                    class="figure-img-highlight"
                    style="max-width: 80%; height: auto;" />
        <figcaption class="figure-caption-small">
                vista /notes/create.blade.php
        </figcaption>
    </figure>
    </div>

    Una vez rellenado el formulario lo enviamos al servidor (ruta `/notes/store`) y volvemos al listado de notas.
        
    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_vista_create3.png"
                    alt="vista /notes/index.blade.php"
                    class="figure-img-highlight" 
                    style="max-width: 95%; height: auto;" />
        <figcaption class="figure-caption-small">
                vista /notes/index.blade.php después de añadir una nueva nota.
        </figcaption>
    </figure>
    </div>

    Podemos ver la nota creada y como aparecen los enlaces para editar y eliminar.

    3) **Editar Nota:** Haz clic en "Editar" junto a una nota, modifica los datos y envía el formulario.

    Al hacer click en "Editar" se accede a `/notes/edit/{id}`:
        
    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_vista_edit1.png"
                    alt="vista /notes/edit.blade.php"
                    class="figure-img-highlight" 
                    style="max-width: 75%; height: auto;" />
        <figcaption class="figure-caption-small">
                vista /notes/edit.blade.php
        </figcaption>
    </figure>
    </div>

    Una vez modificado el formulario lo enviamos al servidor (ruta `/notes/update/{id}`) que actualiza la nota y nos redirecciona al listado de notas.
        
    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_vista_edit2.png"
                    alt="vista /notes/index.blade.php"
                    class="figure-img-highlight" />
        <figcaption class="figure-caption-small">
                vista /notes/index.blade.php después de modificar la nota 5
        </figcaption>
    </figure>
    </div>

    4) **Mostrar Nota:** Haz clic en el título de una nota para ver sus detalles.

    Al hacer click en el título de una nota se accede a `/notes/show/{id}`:
        
    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_vista_show2.png"
                    alt="vista /notes/show.blade.php"
                    class="figure-img-highlight"
                    style="max-width: 80%; height: auto;" />
        <figcaption class="figure-caption-small">
                vista /notes/show.blade.php de la nota 7
        </figcaption>
    </figure>
    </div>

    Una vez vista pulsamos volver y nos redirecciona al listado de notas.

    5) **Eliminar Nota:** Haz clic en "*Eliminar*" junto a una nota.
    
    Al hacer click en "*Eliminar*" se envía un formulario con método `DELETE` a la ruta `/notes/destroy/{id}` que elimina la nota y nos redirecciona al listado de notas.

    !!!tenencuenta "Confirmación de Eliminación"
        En un proyecto real, es recomendable añadir una confirmación antes de eliminar una nota para evitar eliminaciones accidentales.

    Un ejemplo sería este:

    6) Cambia en el fichero `resources/views/notes/index.blade.php` el código para eliminar una fila:
    ```
    <form id="delete-form-{{ $item->id }}" 
          action="{{ route('notes.destroy', $item->id) }}" 
          method="POST" 
          style="display:inline">
    @csrf
    @method('DELETE')
        <button type="button" 
                onclick="confirmDelete({{ $item->id }})"
                style="border: none; background: none; padding: 0; cursor: pointer;">
            <img src="{{ asset('assets/img/delete.svg') }}" alt="Eliminar" title="Eliminar">
        </button>
    </form>
    ```

    7) Añade al final del fichero `resources/views/notes/index.blade.php` el `@push('scripts')`:
    ```
    @push('scripts')
        <script>
            function confirmDelete(id) {
                Swal.fire({
                    title: '¿Estás seguro que deseas eliminar esta nota con ID ' + id + '?',
                    text: '¡Este cambio no se puede deshacer!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#769248ff',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.getElementById('delete-form-' + id).submit();  // Enviar el formulario
                    }
                });
            }
        </script>
    @endpush
    ```

    8) Y en la plantilla `resources/views/layouts/app.blade.php` añade la línea:
    ```
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    ```

    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_vista_destroy1.png"
                    alt="vista /notes/destroy.blade.php"
                    class="figure-img-highlight" 
                    style="max-width: 85%; height: auto;" />
        <figcaption class="figure-caption-small">
                vista /notes/destory.blade.php de la eliminación de la nota 6
        </figcaption>
    </figure>
    </div>

    <div class="figure-center">
    <figure>
        <img src="../../img/laravel/laravel_vista_destroy2.png"
                    alt="vista /notes/index.blade.php"
                    class="figure-img-highlight" />
        <figcaption class="figure-caption-small">
                vista /notes/index.blade.php después de la eliminación de la nota 6
        </figcaption>
    </figure>
    </div>

???prpr "Paso 16. CRUD. Repaso"
    
    **Desarrollo de un CRUD de Productos**
    
    El objetivo de esta práctica es aprender a **aplicar formularios, rutas, controladores y vistas** en Laravel para desarrollar un **CRUD completo para el recurso `Product`**.
    
    Con esta actividad, aprenderás a trabajar con el patrón **MVC (Modelo-Vista-Controlador)**, a gestionar datos con formularios y a usar las herramientas de Eloquent para crear, leer, actualizar y eliminar productos en la base de datos. Además, practicarás la implementación de vistas con **Blade** y el uso de rutas dinámicas.
    
    Al finalizar, deberás ser capaz de:
    
    * Crear y ejecutar migraciones para definir la estructura de una base de datos.
    * Implementar un controlador con todos los métodos CRUD.
    * Crear vistas Blade para presentar datos y manejar formularios.
    * Gestionar datos de entrada y salida mediante formularios, con las directivas `@csrf` y `@method`.
    
    #### Instrucciones
    
    Sigue los pasos a continuación. Verifica que todo funciona correctamente antes de pasar al siguiente paso.
    
    Si alguna parte del proceso no está clara, consulta la documentación anterior o busca ejemplos dentro del proyecto que has trabajado anteriormente.
    
    
    #### Preparar el entorno
    
    1) **Accede a tu proyecto Laravel.**

    Si no tienes un proyecto en marcha, puedes usar el que creaste en la prueba anterior o crear uno nuevo con `composer create-project laravel/laravel nombre_del_proyecto` (por ejemplo nombre del proyecto `testear`).

    2) **Inicia el servidor.**
    
    Asegúrate de que tu servidor esté funcionando, inicia `docker compose up -d` (o si usas Laragon, arranca los servicios correspondientes a Ngingx y Mysql).

    3) **Crea un nuevo modelo y migración para el recurso `Product`.**
    
    Utiliza el comando de Artisan para crear un modelo `Product` junto con su migración. Esto generará un archivo para crear la tabla de productos en la base de datos.
    
    
    #### Crear la tabla y el modelo
    
    4) **Edita la migración de productos.**
    
    Abre el archivo de migración generado y define los siguientes campos para la tabla `products`. Estos campos incluyen el nombre del producto, una descripción, precio, stock y las fechas de creación/actualización automáticas.
    
    La estructura de la tabla deberá ser:
    
    | Campo | Tipo de dato | Restricciones / Descripción |
    | --- | --- | --- |
    | `id` | `bigIncrements` | Clave primaria, autoincremental |
    | `name` | `string(255)` | Nombre del producto, no nulo |
    | `description` | `text` | Descripción del producto |
    | `price` | `decimal(8,2)` | Precio del producto, no nulo |
    | `stock` | `integer` | Cantidad en stock, no nulo, por defecto 0 |
    | `created_at` | `timestamp` | Fecha de creación (automático) |
    | `updated_at` | `timestamp` | Fecha de actualización (automático) |
    
    5) **Ejecuta la migración**.
    
    Una vez hayas definido los campos, ejecuta la migración para crear la tabla en la base de datos.
            
    ```
    php artisan migrate
    ```
    
    Verifica que la tabla se haya creado correctamente en la base de datos.
    
    !!!tenencuenta "Datos de prueba"
        En los recursos de esta actividad hay un fichero **[`products.sql`](../sources/products.sql){:target="blank"}** con 15 productos ficticios para importar en la tabla `products`.

    6) **Configura el modelo `Product`.**
    
    En el archivo del modelo `Product`, debes definir las propiedades que permiten la asignación masiva de los campos. Esto se hace con la propiedad `$fillable`:
    
    ```
    protected $fillable = ['name', 'description', 'price', 'stock'];
    ```
    
    #### Crear el controlador *resource*
    
    7) **Genera el controlador de recursos.**
    
    Utiliza Artisan para crear un controlador de recursos. Esto generará automáticamente los métodos necesarios para manejar las operaciones CRUD. Los métodos a implementar serán: `index`, `create`, `store`, `show`, `edit`, `update` y `destroy`.
        
    ```
    php artisan make:controller ProductController --resource
    ```
    
    8) **Configura el controlador.**
    
    En el archivo generado `ProductController.php`, implementa la lógica necesaria para gestionar los productos. Recuerda que Laravel ya genera los métodos básicos (`index`, `create`, `store`, etc.), pero tendrás que completar la lógica específica de cada uno.
    
    - **`index`**: muestra todos los productos.
    - **`create`**: muestra el formulario para crear un nuevo producto.
    - **`store`**: guarda el nuevo producto en la base de datos.
    - **`show`**: muestra los detalles de un producto específico.
    - **`edit`**: muestra el formulario para editar un producto.
    - **`update`**: actualiza un producto existente en la base de datos.
    - **`destroy`**: elimina un producto de la base de datos.
    
    #### Definir las rutas
    
    9) **Declara las rutas necesarias para el CRUD.**
    
    En `routes/web.php`, añade la ruta de tipo *resource* para el controlador `ProductController`. Laravel generará automáticamente todas las rutas necesarias.
    
    Agrega esta línea:
    
    ```
    //...
    use App\Http\Controllers\ProductController;

    //...
    Route::resource('products', ProductController::class);
    ```
    
    Esto creará las rutas necesarias para manejar las operaciones CRUD para el recurso `Product`.
    
    10) **Verifica que las rutas se han registrado correctamente.**
    
    Usa el comando `php artisan route:list --path=products` para asegurarte de que las rutas están definidas correctamente.
    
    
    #### Crear las vistas
    
    11) **Crea la carpeta para las vistas.**
    
    En `resources/views`, crea una nueva carpeta llamada `products`. En esta carpeta crearás las vistas para las operaciones CRUD.

    **Vistas necesarias**:

    Crea las siguientes vistas dentro de la carpeta `product/`:

    12)   **`index.blade.php`**: Muestra todos los productos en una tabla. Esta vista debe listar todos los productos y permitir enlaces para crear, editar y eliminar productos.
   
    13)   **`create.blade.php`**: Formulario para crear un nuevo producto.
   
    14)   **`edit.blade.php`**: Formulario para editar un producto existente.
   
    15)   **`show.blade.php`**: Muestra los detalles de un producto.
    
    
    #### Probar el CRUD completo
    
    16)   Accede a `/product` para ver el listado de productos.
   
    17)   Crea un nuevo producto y verifica que aparece en el listado.
   
    18) Edita un producto y confirma que se actualiza correctamente.
   
    19) Muestra los detalles de un producto desde el enlace.
   
    20) Elimina un producto y asegúrate de que desaparezca del listado.
        
    #### CSS (opcional)
    
    Puedes crear un archivo CSS para la vista `index.blade.php` y otro para los formularios `create.blade.php`, `edit.blade.php` y `show.blade.php`. 

    !!!tenencuenta "Recuerda"
        Para mostrar archivos que tengamos en la carpeta `public`, crea (es conveniente) una carpeta dentro de nombre `assets/css` y aloja tu css allí mismo.
        
        Además, en Laravel, podrás acceder a estos con la cláusula `asset`:
        ```
        <link rel="stylesheet" href="{{ asset('assets/css/style1.css') }}">
        ```
    
    **Asegúrate de enlazar estos archivos CSS en las vistas correspondientes.**
    

---

???prpr "Paso 17. Validar"
    !!!tenencuenta "Recuerda"

        Siempre debemos validar los datos **antes de almacenarlos** y **antes de actualizarlos**. Nunca debemos asumir que lo que llega del formulario es seguro o correcto.

    **Crear el FormRequest personalizado**

    1) Genera una nueva clase de validación `StoreProductRequest`
   
    2) Añade las siguientes reglas de validación:

       * `name`: obligatorio, cadena de texto, entre 3 y 255 caracteres.
       * `description`: obligatorio, cadena de texto, mínimo 10 caracteres.
       * `price`: obligatorio, numérico, mínimo 0.01.
       * `stock`: obligatorio, entero, mínimo 0.
  
    3) (Opcional) Si tu formulario contiene checkboxes u otros campos que necesiten ser adaptados antes de validar, puedes usar el método `prepareForValidation()` para normalizarlos.

    **Aplicar el FormRequest en el controlador**

    4) Realiza los cambios necesarios en el controlador `ProductController` para usar el `StoreProductRequest`, para validar los datos en los métodos `store()` y `update()`.

    5) Añade también mensajes `flash` para las operaciones que redirigen al listado de productos, para que el usuario reciba retroalimentación.

    Mensajes:

    ```bash
    - Producto creado correctamente.
    ```
    ```bash
    - Producto actualizado correctamente.
    ```
    ```bash      
    - Producto eliminado correctamente.
    ```

???prpr "Paso 18. Mostrar errores en los formularios"

    1) En los formularios de creación y edición de productos muestra una lista con los errores de validación al inicio del formulario. Si no hay errores no mestrestes nada.
   
    2) Los errores estarán en un `div` con la clase `alert alert-danger`. Puedes utilizar CSS para darle estilo.
   
    3) Debajo de cada campo del formulario, muestra el error específico usando la directiva `@error`. Estos errores pueden mostrase en una etiqueta `<small>` o algún contenedor `<div>` como prefieras. Tendrán el estilo `alert alert-danger` o un estilo personalizado. Podemos usar CSS para darle estilo.
   
    4) Recuerda usar `old()` para mantener los valores introducidos por el usuario en caso de error de validación.

    **Crear el partial para los mensajes del sistema**

    5) Crea un `partial` llamado `messages.blade.php` para mostrar los mensajes flash.

    * Si el mensaje es de éxito, usa la clase `flash alert alert-success`.
    * Si el mensaje es de error, usa la clase `flash alert alert-danger`.
    
    6) Añade el `partial` en el layout principal para que se muestre en todas las vistas. De esta forma, cualquier mensaje flash aparecerá automáticamente en todas las vistas.


???prpr "Paso 19. Comprobar las rutas del CRUD"

    1) Mostrar las rutas del proyecto:

    ```bash
    php artisan route:list --path=product
    ```

    2) Comprueba que se listan todas las rutas REST del recurso `product`, incluyendo `index`, `create`, `store`, `edit`, `update`, `show` y `destroy`.

    **Probar las validaciones y los mensajes**

    3) Intenta crear un producto con menos de 3 caracteres en el nombre o sin descripción.
    → Debes ver mensajes de error en el formulario.
    
    4) Crea un producto válido.
    → Debe redirigir al listado con el mensaje **“Producto creado correctamente.”**
    
    5) Edita un producto y cambia los valores.
    → Debe mostrar **“Producto actualizado correctamente.”**
    
    6) Elimina un producto.
    → Debe mostrar **“Producto eliminado correctamente.”**


???prpr "Paso 20. Creación de una API REST para `products`"
    En esta actividad vas a aplicar todo lo aprendido sobre **Laravel y la creación de APIs REST** para desarrollar un servicio completo que gestione productos (*Products*).

    Al finalizar, habrás implementado todos los elementos esenciales de una API moderna:
        
    * Definición de rutas API (`api.php`).
    * Creación de un controlador con métodos CRUD (`index`, `show`, `store`, `update`, `destroy`).
    * Uso de modelos y migraciones.
    * Validación de datos mediante *Form Request*.
    * Personalización de la salida con *API Resources*.
    * Pruebas de los endpoints con *Postman* o *REST Client*.
            
    #### Instrucciones
    
    Sigue los pasos **en orden**, comprobando el funcionamiento de cada parte antes de pasar a la siguiente.
    Puedes basarte en el ejemplo del tema anterior sobre *Notes*, adaptándolo al nuevo recurso *Product*. O continuar con el proyecto de las prácticas anteriores que ya trata sobre productos.
    
    #### Preparar el entorno
        
    1) Abre el proyecto de Laravel que has elegido.

    2) Asegúrate de tener las rutas API activadas. Si no lo hiciste antes, ejecuta:
    ```
    php artisan install:api
    ```

    3) Encender servicios:
 
    - opción 1) Con **Docker**: verifica que los contenedores de Docker estén funcionando:
    ```
    docker compose up -d
    ```

    - opción 2) Con **Laragon**: comprueba que esté en marcha los servidores Nginx y Mysql.

        
    #### Crear la tabla y el modelo de productos (opcional)
    
    Si todavía **no** tienes creada la tabla `products`:
    
    Crea una nueva migración y el modelo asociado. Si ya lo tienes continúa con el siguiente paso.
    
    - Genera la migración para la tabla `products`:
    ```
    php artisan make:migration create_products_table
    ```
    
    - Edita la migración para que incluya los siguientes campos:
    ```
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->decimal('price', 8, 2);
    $table->integer('stock');
    $table->timestamps();
    ```
    
    - Ejecuta las migraciones:
    ```
    php artisan migrate
    ```
    
    - Crea el modelo `Product`:
    ```
    php artisan make:model Product
    ```
    
    - Define en el modelo los campos permitidos para asignación masiva:
    ```
    protected $fillable = ['name', 'description', 'price', 'stock'];
    ```
                
    #### Crear el controlador API
    
    3) Crea el controlador `ProductController` en el espacio de nombres `api`.

    4) Implementa en él los cinco métodos principales (`index`, `store`, `show`, `update`, `destroy`) para manejar el CRUD. Puedes basarte en el ejemplo del recurso `Note` del tema.
    
        
    #### Definir las rutas
    
    5) Crea las rutas para manejar los productos (utiliza `apiResource`).

    6) Comprueba que se hayan creado las rutas con:
    ```
    php artisan route:list --path=api/products
    ```
    
    
    #### Crear el *API Resource*
    
    7)  Genera la clase `ProductResource`. Esta clase te permitirá personalizar la estructura de los datos JSON que devuelve la API.
    
    Un ejemplo de estructura sería:
    ```json
    {
        "id": 1,
        "nombre": "Camiseta",
        "precio": "$19.99",
        "stock": 25,
        "descripcion": "Camiseta de algodón"
    }
    ```
    
    8)  Usa esta clase en el controlador para las respuestas JSON.
    
    
    #### Validar los datos con una clase *Form Request*
    
    9)  Crea la clase `ProductRequest` para validar los datos de entrada al crear o actualizar un producto. Las reglas de validación podrían ser:
    
    * `name`: obligatorio, cadena de texto, mínimo 3 y máximo 255 caracteres.
    * `description`: obligatorio, cadena de texto, mínimo 10 caracteres.
    * `price`: obligatorio, numérico, mínimo 0, máximo 9999.99.
    * `stock`: obligatorio, entero, mínimo 0, máximo 10000.
    
    10)  Modifica los métodos `store()` y `update()` del controlador para usar esta clase.

    11)  Introduce el método `failedValidation` en la clase `ProductRequest` y los cambios en `resources/lang/es/validation` para que los errores de validación se muestren en castellano.
    
    
    #### Probar la API
    
    12)  Crea un archivo `products.rest` en la raíz del proyecto (o usa *Postman*).

    13)  Escribe las peticiones para probar todos los *endpoints*:
    
    * GET `/api/products` → Listar todos los productos
    * POST `/api/products` → Crear un nuevo producto
    * GET `/api/products/{id}` → Mostrar un producto
    * PUT `/api/products/{id}` → Modificar un producto
    * DELETE `/api/products/{id}` → Eliminar un producto

    14)  Escribe una petición que devuelva un error de validación (por ejemplo: precio negativo o stock como un string).

    15)  Comprueba que todas las operaciones devuelven los **códigos HTTP correctos** (`200`, `201`, `204`, etc.) y que la respuesta JSON tiene el formato definido en `ProductResource`.

???prpr "Paso 21. Autenticación básica (pru07)"


