# Ejemplo API Rest en tabla productos

## Crear tabla productos

Antes de crear nuestra API en tabla `Productos` deberemos tener dicha tabla migrada en nuestro sistema. Para ello:

​	**(1)** Crear **migración** para la tabla `productos`:

!!!note "Recuerda"
	El nombre de la migración contiene palabras reservadas para como son *create* y *table*.

```php
php artisan make:migration create_productos_table
# ó, si no funciona, probar:
# sudo docker-compose exec myapp php artisan make:migration create_productos_table
```

<div style="text-align: center;"><img src="../../img/ud11/apirestful_001.png" alt="img" style="max-width: 90%;" /></div>

<div style="text-align: center;"><img src="../../img/ud11/apirestful_002.png" alt="img" style="max-width: 40%;" /></div>

​	**(2)** Añadir al fichero generado (en la carpeta `migrations` y en el ejemplo anterior *2024_01_08_102832_create_productos_table.php*) el resto de campos que se requieran en la tabla `productos`:

```php
public function up(): void
{
  Schema::create('productos', function (Blueprint $table) {
    $table->id();
    $table->string('nombre');
    $table->text('descripcion');
    $table->decimal('precio', 8, 2);
    $table->timestamps();
 });
}
```

​	**(3)** Ejecutar migración:

```php
php artisan migrate
# ó, si no funciona, probar:
# sudo docker-compose exec myapp php artisan migrate
```

<div style="text-align: center;"><img src="../../img/ud11/apirestful_003.png" alt="img" style="max-width: 90%;" /></div>

<div style="text-align: center;"><img src="../../img/ud11/apirestful_004.png" alt="img" style="max-width: 90%;" /></div>

​	**(4)** Crear un `seeder` para realizar una carga de datos:

Introducimos información en esta tabla nueva, creando un fichero en la carpeta `database/seeders` de nombre `ProductoSeeder.php`:

```php
<?php
  namespace Database\Seeders;
  use Illuminate\Database\Seeder;
  use Illuminate\Support\Facades\DB;

  class ProductoSeeder extends Seeder {
      
    public function run() {
      // insertar datos prueba 
      DB::table('productos')->insert([
         'nombre' => 'producto prueba 1',
         'descripcion' => 'esta es una descripción para el producto prueba 1',
         'precio' => 19.99,
      ]);

      DB::table('productos')->insert([
         'nombre' => 'producto prueba 2',
         'descripcion' => 'esta es una descripción para el producto prueba 2',
         'precio' => 29.99,
      ]);
    }
}
```

​	**(5)** Ejecutar el `seeder`:

```php
php artisan db:seed --class=ProductoSeeder
# ó, si no funciona, probar:
# sudo docker-compose exec myapp php artisan db:seed --class=ProductoSeeder
```

<div style="text-align: center;"><img src="../../img/ud11/apirestful_005.png" alt="img" style="max-width: 90%;" /></div>

<div style="text-align: center;"><img src="../../img/ud11/apirestful_006.png" alt="img" style="max-width: 90%;" /></div>

## Crear controlador ProductoController

Crear un controlador donde establezcamos los métodos que nosotros queramos realizar a la hora de trabajar con los datos.

​	**(1)** **Crear** desde consola un controlador para la tabla `productos`:

```sh
php artisan make:controller ProductoController
# ó, si no funciona, probar:
# sudo docker-compose exec myapp php artisan make:controller ProductoController
```

<div style="text-align: center;"><img src="../../img/ud11/apirestful_007.png" alt="img" style="max-width: 90%;" /></div>

<div style="text-align: center;"><img src="../../img/ud11/apirestful_007b.png" alt="img" style="max-width: 90%;" /></div>

La estructura de este archivo es un poco diferente a los controladores que ya hemos visto anteriormente. Ahora tenemos los siguientes métodos creados de manera automática:

- **`index()`** normalmente para listar (en nuestro caso los chollos).
- **`create()`** para crear plantillas (no lo vamos a usar).
- **`store()`** para guardar los datos que pasemos a la API.
- **`update()`** para actualizar un dato ya existente en la BD.
- **`delete()`** para eliminar un dato ya existente en la BD.

​	**(2)** Como vamos a conectarnos a un modelo para traer la información de dicho modelo añadimos mediante `use`. También creamos la función `index` para listar todos los elementos de la tabla (en este caso `productos`):

```php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto; // <-- esta linea

class ProductoController extends Controller
{
    public function index(){
        return response()->json(Producto::all());
    }
}
```

!!!warning "Cuidado con el return"
	Porque ahora no estamos devolviendo una vista sino un array de datos en formato JSON.

​	**(3)** Crear un modelo en la carpeta `Models` de nombre `Producto.php`:

```php
<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class Producto extends Model {
        protected $fillable = ['nombre', 'descripcion', 'precio'];
    }
```

​	**(4)** Ir a fichero `web.php` (en la carpeta `routes`) y colocar nuestras rutas:

```php
// cargar el recurso del controlador ProductoController
use App\Http\Controllers\ProductoController
    

Route::prefix('productos')->group(function(){
  Route::get('/',[ProductoController::class, 'index']);
});
```

<div style="text-align: center;"><img src="../../img/ud11/apirestful_008.png" alt="img" style="max-width: 90%;" /></div>

La función anterior `index` nos devuelve todos los productos. Pero, qué pasa si queremos un producto en cuestión:

​	**(1)** En `ProductoController.php` añadimos otra función (show) en la que se le pasa por parámateros el `id` :

```php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto; // <-- esta linea

class ProductoController extends Controller
{
    public function index(){
        return response()->json(Producto::all());
    }
    public function show($id){
        return response()->json(Producto::find($id));
    }
}
```

​	**(2)** En `web.php` añadimos otra ruta en nuestro grupo:

```php
Route::prefix('productos')->group(function(){
    Route::get('/',[ProductoController::class, 'index']);
    Route::get('/{id}',[ProductoController::class, 'show']);
});
```

<div style="text-align: center;"><img src="../../img/ud11/apirestful_009.png" alt="img" style="max-width: 90%;" /></div>

​	**(3)** Para introducir datos utilizaremos el método `store`:

​	a) en `ProductoController.php`:

```php
    public function store(Request $request){
        $producto = Producto::create($request->all());
        return response()->json($producto, 201);
    }
```

​	b) en `web.php`:

```php
Route::prefix('productos')->group(function(){
    Route::get('/',[ProductoController::class, 'index']);
    Route::get('/{id}',[ProductoController::class, 'show']);
    Route::post('/',[ProductoController::class, 'store']);
});
```

​	**(4)** Para actualizar datos de un producto, utilizaremos el método `update`:

​	a) en `ProductoController.php`:

```php
    public function update(Request $request, $id){
        $producto = Producto::findOrFail($id);
        $producto -> update($request->all());

        return response()->json($producto, 200);
    }
```

b) en `web.php`:

```php
Route::prefix('productos')->group(function(){
    Route::get('/',[ProductoController::class, 'index']);
    Route::get('/{id}',[ProductoController::class, 'show']);
    Route::post('/',[ProductoController::class, 'store']);
    Route::put('/{id}',[ProductoController::class, 'update']);
});
```

​	**(5)** Y para eliminar un producto, el método `delete`:

​	a) en `ProductoController.php`:

```php
    public function destroy($id){
        Producto::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
```

​	b) en `web.php`:

```php
Route::prefix('productos')->group(function(){
    Route::get('/',[ProductoController::class, 'index']);
    Route::get('/{id}',[ProductoController::class, 'show']);
    Route::post('/',[ProductoController::class, 'store']);
    Route::put('/{id}',[ProductoController::class, 'update']);
    Route::delete('/{id}',[ProductoController::class, 'destroy']);
});
```


## Cómo funciona la API REST

Para ello vamos a utilizar un software que es una extensión de Visual Studio Code, de nombre `Thunder Client`:

<div style="text-align: center;"><img src="../../img/ud11/apirestful_010.png" alt="img" style="max-width: 75%;" /></div>

<div style="text-align: center;"><img src="../../img/ud11/apirestful_011.png" alt="img" style="max-width: 75%;" /></div>

### Listar todos los productos

<div style="text-align: center;"><img src="../../img/ud11/apirestful_012.png" alt="img" style="max-width: 75%;" /></div>

### Listar un producto en concreto

<div style="text-align: center;"><img src="../../img/ud11/apirestful_013.png" alt="img" style="max-width: 75%;" /></div>

### Introducir producto nuevo

!!!warning " "
	Si realizamos una nueva petición (new request) con método `post` y pasando (desde `body` y en `json`) un nuevo producto, va a mostrarnos un **error**. <br /><br />
	Esto se debe a que Laravel, por sus métodos de seguridad, necesita un *token* llamado `csrf`. <br /><br />
	Ya que, ahora mismo, estamos realizando pruebas, vamos a indicarle a Laravel que excluya la URL en cuestión de la verificación.<br /><br />
	Para ello accedemos al fichero `VerifyCsrfToken.php` de la carpeta `app\Http\Middleware`:
	```php
	<?php
	namespace App\Http\Middleware;
	

	use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
	
	class VerifyCsrfToken extends Middleware
	{
		/**
		 * The URIs that should be excluded from CSRF verification.
		 *
		 * @var array<int, string>
		 */
		protected $except = [
			"http://0.0.0.0:8000/productos",  // <-- esta excepción
		];
	}
	```
	
	<div style="text-align: center;"><img src="../../img/ud11/apirestful_014.png" alt="img" style="max-width: 100%;" /></div>
	
	<div style="text-align: center;"><img src="../../img/ud11/apirestful_014b.png" alt="img" style="max-width: 100%;" /></div>



### Actualizar un producto existente

!!!note "Recuerda"
	Añadir al fichero `VerifyCsrfToken.php` de la carpeta `app\Http\Middleware` la excepción:
	 ```php
	<?php
		// [..]
		protected $except = [
			"http://0.0.0.0:8000/productos", 
			"http://0.0.0.0:8000/productos/3",  // <-- esta nueva excepción
			];
		}
	```

<div style="text-align: center;"><img src="../../img/ud11/apirestful_015.png" alt="img" style="max-width: 80%;" /></div>

<div style="text-align: center;"><img src="../../img/ud11/apirestful_015b.png" alt="img" style="max-width: 80%;" /></div>



### Eliminar un producto

<div style="text-align: center;"><img src="../../img/ud11/apirestful_016.png" alt="img" style="max-width: 80%;" /></div>

<div style="text-align: center;"><img src="../../img/ud11/apirestful_016b.png" alt="img" style="max-width: 80%;" /></div>



<hr />

# Ejercicios propuestos

## Ejercicio 1

Sobre el proyecto **blog** de la sesión anterior, vamos a añadir estos cambios:

- Crea un controlador de tipo api llamado `PostController` en la carpeta `App\Http\Controllers\Api`, asociado al modelo `Post` que ya tenemos de sesiones previas. Rellena los métodos `index`, `show`, `store`, `update` y `destroy` para que, respectivamente, hagan lo siguiente:
  - `index` deberá devolver en formato JSON el listado de todos los posts, con un código 200
  - `show` deberá devolver la información del post que recibe, con un código 200
  - `store` deberá insertar un nuevo post con los datos recibidos, con un código 201, y utilizando el validador de posts que hiciste en la sesión 6. Para el usuario creador del post, pásale como parámetro JSON un usuario cualquiera de la base de datos.
  - `update` deberá modificar los campos del post recibidos, con un código 200, y empleando también el validador de posts que hiciste en la sesión 6.
  - `destroy` deberá eliminar el post recibido, devolviendo *null* con un código 204
- Crea una colección en *Thunder Client* llamada `Blog` que defina una petición para cada uno de los cinco servicios implementados. Comprueba que funcionan correctamente y exporta la colección a un archivo.



!!!note "Qué entregar?"
	Como entrega de esta sesión deberás comprimir el proyecto **blog** con los cambios incorporados, y eliminando las carpetas `vendor` y `node_modules` como se explicó en las sesiones anteriores. Añade dentro también la colección *Thunder Client* para probar los servicios. Renombra el archivo comprimido a `blog_11b.zip`.



