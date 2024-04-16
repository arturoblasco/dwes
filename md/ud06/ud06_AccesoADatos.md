---
   unit: unidad didáctica 6
   title: Acceso a datos
   language: ES
   author: Arturo Blasco
   subject: Desarrollo Web en Entorno Servidor
   keywords: [DWES, 2023, PHP]
   IES: IES Mestre Ramón Esteve (Catadau) [iesmre.es]
   header: ${unit}: ${title} - ${subject} (versión: ${today})
   footer: ${currentFileName}.pdf - ${author} - ${IES} - ${pageNo}|${pageCount}
   typora-root-url:${filename}/../
   typora-copy-images-to:${filename}/../assets

---







[TOC]

# duración y criterios de evaluación

En esta unidad vamos a aprender a acceder a datos que se encuentran en un servidor; recuperando, editando y creando dichos datos a través de una base de datos.

A través de las distintas capas o niveles, de las cuales 2 de ellas ya conocemos (*Apache*, *PHP*) y *MySQL* la que vamos a estudiar en este tema.

**Duración estimada**: 12 sesiones

------

**Resultado de aprendizaje y criterios de evaluación**:

RA6. Desarrolla aplicaciones de acceso a almacenes de datos, aplicando medidas para mantener la seguridad y la integridad de la información.

*a) Se han analizado las tecnologías que permiten el acceso mediante programación a la información disponible en almacenes de datos.*

*b) Se han creado aplicaciones que establezcan conexiones con bases de datos.* 

*c) Se ha recuperado información almacenada en bases de datos.* 

*d) Se ha publicado en aplicaciones web la información recuperada.* 

*e) Se han utilizado conjuntos de datos para almacenar la información.* 

*f) Se han creado aplicaciones web que permitan la actualización y la eliminación de información disponible en una base de datos.* 

*g) Se han probado y documentado las aplicaciones web.*

# instalación

**XAMPP**: simplemente nos descargaríamos el programa y lo activaríamos. Para descargar XAMPP [pulsa aquí](https://www.apachefriends.org/es/download.html).

**Docker**: utilizando el software de contenedores nos descargaremos la **imagen docker de esta unidad didáctica del curso** y lanzamos:

```bash
docker-compose up -d
```

Si todo ha salido bien y el contenedor está en marcha, podremos visitar la página de *phpMyAdmin* de la siguiente manera:

```bash
http://localhost:8000
```

<img src="/assets/img01_06-bbdd-phpMyAdmin-login.png" style="zoom:40%;" />

Para acceder debemos utilizar las siguientes credenciales que vienen configuradas en el archivo `docker-compose.yml`:

```sh
usuario: root
contraseña: 1234
```

> **Recuerda**
>
> Podemos utilizar también el docker *Portainer* para gestionar (lanzar, parar, acceder) a los contenedores generados en la imagen anterior.

# estructura de una base de datos

Echando un vistazo al módulo de primer curso *Bases de Datos* sabemos que una base de datos tiene muchos campos con sus nombres y valores; pero además sabemos que la base de datos debe tener un nombre. Por tanto, tendríamos la siguiente estructura para una base de datos:

```bash
NombreBaseDeDatos
    |__Tabla-#1
    |         |__DatosTabla-#1
    |
    |__Tabla-#2
    |         |__DatosTabla-#2
    |    
    |__Tabla-#3
    |         |__DatosTabla-#3
    [...]
```

Veámoslo en un ejemplo real:

```bash
Ryanair
    |__pasajero
    |     |__id[*]
    |     |__nombre
    |     |__apellidos
    |     |__edad
    |     |__id_vuelo[^]
    |
    |__vuelo
    |     |__id[*]
    |     |__n_plazas
    |     |__disponible
    |     |__id_pais[^]
    |
    |__pais
          |__id[*]
          |__nombre
```

[*] *Clave primaria*     [^] *Clave Foránea*

<img src="/assets/img02_06-bbdd-estructura.png" style="zoom: 50%;" />



# CholloSevero

A lo largo de esta unidad vamos a trabajar con una base de datos que iremos confeccionando conforme avancemos; donde almacenaremos la información relacionada con ofertas que publiquen los usuarios y los listaremos en función de varios filtros, nuevos, más votados, más vistos, más comentados entre otros, al más puro estilo [Chollometro](https://www.chollometro.com/).



![](/assets/img03_06-chollometro.gif)

# SQL

Utilizaremos el lenguaje de consulta estructurada (*Structured Query Language*) SQL para realizar las consultas a nuestras bases de datos y para mostrar el contenido en las distintas interfaces web que creemos a lo largo de la unidad. Si quieres saber más detalles visita [Wiki SQL](https://es.wikipedia.org/wiki/SQL).

Ejemplo de una sentencia SQL donde seleccionamos todas las filas y columnas de nuestra tabla llamada `pais`:

```sql
SELECT * FROM pais
```

Estas sentencias pueden invocarse desde la consola de comandos mediante el intérprete `mysql*`(previamente instalado en el sistema) o a través de la herramienta `phpMyAdmin`.

Las sentencias SQL también las podemos usar dentro de nuestro código php; de tal manera que cuando se cargue nuestra interfaz web, lance una sentecia SQL para mostrar los datos que queramos.

```php
<?php
	// Listado de clientes, ordenados por DNI de manera ASCendente
	$clientesOrdenadosPorDNI = "SELECT * FROM `pasajero` ORDER BY `dni` ASC";
?>
```

# phpMyAdmin

<img src="/assets/img04_06-bbdd-phpMyAdmin-logo.png" alt="phpMyAdmin" style="zoom:22%; float:right;" />Este software funciona bajo Apache y PHP y es una interfaz web para gestionar las bases de datos que tengamos disponibles en nuestro servidor local. Muchos *hostings* ofrecen esta herramienta por defecto para poder gestionar las BBDD que tengamos configuradas bajo nuestra cuenta.



## Creando una base de datos dentro de phpMyAdmin

1. Para crear una nueva base de datos debemos entrar en phpMyAdmin como **usuario root** y pinchar en la opción ***Nueva*** del menú de la izquierda.

2. En la nueva ventana de creación pondremos un **nombre** a nuestra bd.
   1. También estableceremos el **cotejamiento** `utf8m4_unicode_ci` para que nuestra bd soporte todo tipo de caracteres (como los asiáticos e incluso emojis :smile:).

3. Le damos al botón de **Crear** para crear la bd y comenzar a creaer las distintas tablas que vayamos a introducir en ella.

<img src="/assets/img05_06-bbdd-phpMyAdmin.gif" style="zoom:35%;" />

El sistema generará el código SQL para crear todo lo que le hemos puesto y creará la base de datos con las tablas que le hayamos insertado.

```sql
CREATE TABLE `persona` ( `id` INT NOT NULL AUTO_INCREMENT , `nombre` TINYTEXT NOT NULL , `apellidos` TEXT NOT NULL , `telefono` TINYTEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
```

## opciones en phpMyAdmin

Cuando seleccionamos una base de datos de la lista, el sistema nos muestra varias pestañas con las cuales interactuar con la base de datos en cuestión:

- `Estructura` : podemos ver las distintas tablas que consolidan nuestra base de datos.

- `SQL` : si queremos inyectar código SQL para que el sistema lo interprete.

- `Buscar` : para buscar por términos, en nuestra base de datos, aplicando distintos filtros de búsqueda.

- `Generar consulta` : parecido a SQL pero de forma gráfica, sin tener que saber nada del lenguaje.

- `Exportar` e `importar` : como su nombre indica, para hacer cualquiera de las 2 operaciones sobre la base de datos.

- `Operaciones` : distintas opciones avanzadas para realizar en nuestra base de datos, de la cual destacaremos la opción **Cotejamiento** donde podremos cambiar el cotejamiento de nuestra tabla .

  > **OJO CON ÉSTO **porque podemos eliminar datos sin querer, ya que al cambiar el cotejamiento podemos suprimir caracteres no soportados por el nuevo cotejamiento.

No vamos a profundizar en el resto de opciones, pero, en la pestaña **Más**, existe la opción **Diseñador** para poder editar las relaciones entre tablas de una manera gráfica (pinchando y arrastrando) que veremos más adelante.

# MySQLi

PHP hace uso de esta extensión mejorada para poder comunicarse con las bases de datos, ya sean MySQL (4.1 o superior) o MariaDB.

Cualquier consulta que queramos hacer a una base de datos necesitaremos hacer uso de la extensión `mysqli()`.

Veamos cómo conectarnos con una base de datos a través del código PHP:

```php
<?php
    // ▒▒▒▒▒▒▒ pruebas.php ▒▒▒▒▒▒▒

    // "SERVIDOR", "USUARIO", "CONTRASEÑA", "BASE DE DATOS"
    $conexion = mysqli_connect("d939ebf6a741","tuUsuario","tuContraseña","tuBaseDeDatos");

    // COMPROBAMOS LA CONEXIÓN
    if(mysqli_connect_errno()) {
       echo "Failed to connect to MySQL: " . mysqli_connect_error();
       exit();
    }

    echo "<h1>Bienvenid@ a MySQL !!</h1>";
?>
```

- `servidor`: el servidor donde se encuentra la base de datos que queremos usar suele ser **localhost**, pero en nuestro caso, al utilizar Docker será el nombre de la imagen **mysql:8.0** que aparece al dejar el ratón encima en el Visual Studio Code.

<img src="/assets/img06_06-mysql-servidor-docker.gif" style="zoom:50%;" />

- `usuarioDB`: el usuario de la base de datos.
- `passwordDB`: la contraseña para ese usuario de la base de datos.
- `baseDeDatos`: nombre de la base de datos que queramos usar.

Si todo ha salido bien habréis visto un mensaje diciendo **Bienvenid@ a MySQL !!**

## recuperando datos de una BD

Ahora que ya sabemos cómo conectarnos a una base de datos alojada en nuestro servidor, lo que necesitamos saber es cómo recuperar datos almacenados en la base de datos.

Durante la instalación de la imagen de Docker, se ha creado una tabla llamada **Pruebas** que contiene varios registros de distintas personas.

Vamos a recuperar esos datos para ver de qué forma se hace con PHP.

```php
<?php
   // ▒▒▒▒▒▒▒▒ pruebas.php ▒▒▒▒▒▒▒▒

   $conexion = mysqli_connect("d939ebf6a741", "usuario", "1234", "pruebadb");

   // COMPROBAMOS LA CONEXIÓN
   if (mysqli_connect_errno()) {
       echo "Failed to connect to MySQL: " . mysqli_connect_error();
       exit();
   }

   // CONSULTA A LA BASE DE DATOS
   $consulta = "SELECT * FROM `productos`";
   $listaproductos = mysqli_query($conexion, $consulta);

   // COMPROBAMOS SI EL SERVIDOR NOS HA DEVUELTO RESULTADOS
   if($listaproductos) {
       // RECORREMOS CADA RESULTADO QUE NOS DEVUELVE EL SERVIDOR
       foreach ($listaproductos as $elemento) {
       		echo "$elemento[id] - 
       			  $elemento[descripcion] - 
       			  $elemento[stock]
                   <br>
       		";
       }
   }
?>
```

Si todo ha salido bien, por pantalla verás el siguiente listado:

```processing
▒▒▒▒▒▒▒▒ http://localhost/pruebas.php ▒▒▒▒▒▒▒▒

1 leche 25
2 pan 12
3 galletas 5
4 gominolas 120
5 monster 2
6 kit kat 17
7 patatas fritas 7
8 donetes 5
```

# PHP Data Objects :: PDO

De la misma manera que hemos visto con mysqli, PHP Data Objects (o `PDO`) es un driver de PHP que se utiliza para trabajar bajo una interfaz de objetos con la base de datos. A día de hoy, es lo que más se utiliza para manejar información desde una base de datos, ya sea relacional o no relacional.

De igual manera que pasaba con los objetos en PHP nativos, en la interfaz de MySQL el momento de la conexión es distinta:

```php
<?php
   $conexion = new PDO('mysql:host=localhost; dbname=pruebadb', 'usuario', '1234');
```

> **en docker**
>
> Recordar cambiar *localhost* por ID del contenedor *mysql:8.0*.

Además, con PDO podemos usar las excepciones con `try`/`catch` para gestionar los errores que se produzcan en nuestra aplicación. Para ello, como hacíamos antes, debemos encapsular el código entre bloques try / catch:

```php
<?php
   // dsn (Nombre del Origen de Datos, DSN)
   $dsn = 'mysql:dbname=pruebadb; host=127.0.0.1'; // 127.0.01 -> ID contenedor mysql:8.0
   $usuario = 'usuario';
   $contrasenya = '1234';

   try {
        $mbd = new PDO($dsn, $usuario, $contrasenya);
        $mbd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   } catch (PDOException $e) {
        echo 'Fallo en la conexión: ' . $e->getMessage();
   }
```

Los pasos a seguir han sigo:

1º ) Creamos la conexión con la base de datos a través del constructor PDO pasándole la información de la base de datos. 

2º ) Establecemos los parámetros para manejar las excepciones, en este caso hemos utilizado:

- `PDO::ATTR_ERRMODE` indicándole a PHP que queremos un reporte de errores.

- `PDO::ERRMODE_EXCEPTION` con este atributo obligamos a que lance excepciones, además de ser la opción más humana y legible que hay a la hora de controlar errores.

3ª ) Cualquier error que se lance a través de PDO, el sistema lanzará una **PDOException**.

## fichero de configuración de la BD

De la misma manera que creamos nuestro archivo de funciones `funciones-php` y albergamos todas las funciones que se usan de manera global en la aplicación, podemos establecer un archivo de constantes donde definamos los parámetros de conexión con la base de datos.

```php
<?php

    // ▒▒▒▒▒▒▒▒ conexion.php ▒▒▒▒▒▒▒▒
    const DSN = "mysql:host=localhost; dbname=pruebadb"; // localhost -> ID contenedor mysql:8.0
    const USUARIO = "usuario";
    const PASSWORD = "1234";

    /* ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	 * ▒▒▒▒▒▒ NO SUBAS ESTE ARCHIVO A git ▒▒▒▒▒▒
	 * ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ */
```

> **OJO**  Este archivo contiene información **muy sensible** así que no es recomendable que subas este archivo a git.

## sentencias preparadas

Se trata de sentencias que se establecen como si fueran plantillas de la SQL que vamos a lanzar, aceptando parámetros que son establecidos a posteriori de la declaración de la sentencia preparada.

Las sentencias preparadas evitan la **injección de SQL** (SQL Injection) y mejoran el rendimiento de nuestras aplicaciónes o páginas web.

```php
<?php
    $sql = "INSERT INTO productos VALUES (?, ?, ?)";
```

Cada interrogante es un parámetro que estableceremos después unas cuantas líneas más abajo.

Una vez tenemos la plantilla de nuestra consulta, debemos seguir con la preparación junto con 3 métodos más de PHP para su completa ejecución:

1º ) `prepare`: prepara la sentencia antes de ser ejecutada.

2º ) `bind`: el tipo de unión (*bind*) de dato. Puede ser mediante  `? `  o  `:parametro ` .

3º ) `execute`: se ejecuta la consulta uniendo la plantilla con las variables o parámetros que hemos establecido.

## ejemplo parámetros

```php
<?php
    // ▒▒▒▒▒▒ Borrando con parámetros ▒▒▒▒▒▒
    include "config/database.inc.php";

    $conexion = null;

    try { 
        $cantidad = $_GET["cantidad"];

        $conexion = new PDO(DSN, USUARIO, PASSWORD);
        $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "DELETE FROM productos WHERE stock = ?";
        $sentencia = $conexion -> prepare($sql);

        $isOk = $sentencia -> execute([$cantidad]);
        $cantidadAfectada = $sentencia -> rowCount();

        echo $cantidadAfectada . " fila(s) afectada(s).";
        
    } catch (PDOException $e) {
        echo $e -> getMessage();
    }

    $conexion = null;
```

## ejemplo bindParam

Muy parecido a utilizar parámetros pero esta vez la variable está dentro de la sentencia SQL, en este caso la hemos llamado `:cant`

```php
<?php
    include "config/database.inc.php";

    $conexion=null;

    try {
        $cantidad = $_GET["cantidad"] ?? 0;

        $conexion = new PDO(DSN, USUARIO, PASSWORD);
        $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "DELETE FROM productos WHERE stock = :cant";

        $sentencia = $conexion -> prepare($sql);
        $sentencia -> bindParam(":cant", $cantidad);

        $isOk = $sentencia -> execute();

        $cantidadAfectada = $sentencia -> rowCount();

        echo $cantidadAfectada . " fila(s) afectada(s).";
        
    } catch (PDOException $e) {
        echo $e -> getMessage();
    }

    $conexion = null;
```

## bindValue VS bindParam

Utilizaremos `bindValue()` cuando tengamos que insertar datos sólo una vez. En cambio, deberemos usar `bindParam()` cuando tengamos que pasar datos múltiples, como por ejemplo, un array.

```php
<?php
   // ▒▒▒ FALTA CONEXIÓN A BD ▒▒▒▒
   // se asignan nombre a los parametros
   $sql = "DELETE FROM productos WHERE stock = :cant";
   $sentencia = $conexion -> prepare($sql);

  // bindValue enlaza por VALOR
  $cantidad = 0;
  $sentencia -> bindValue(":cant", $cantidad);
  $cantidad = 1;
  // se eliminan con cant = 0
  $isOk = $sentencia->execute();

  // bindParam enlaza por REFERENCIA
  $cantidad = 0;
  $sentencia -> bindParam(":cant", $cantidad);
  $cantidad = 1;
  // se eliminan con cant = 1
  $isOk = $sentencia -> execute();
```

Para más información y uso de las variables PDO [consulta el manual de PHP](https://www.php.net/manual/es/pdo.constants.php).

## insertando registros

A la hora de insertar registros en una base de datos, debemos tener en cuenta que en la tabla puede haber valores autoincrementados. Para salvaguardar esto, lo que debemos hacer es dejar vacío ese campo autoincrementado; pero a la hora de hacer la conexión, debemos recuperarlo con el método `lastInsertId()`.

```php
<?php
  include "config/database.inc.php";

  try{
    $descripcion = $_GET["descripcion"] ?? "PRODUCTO X";
    $stock = $_GET["stock"] ?? 0;

    $conexion = null;

    $conexion = new PDO(DSN, USUARIO, PASSWORD);
    $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql="insert into productos (descripcion, stock) values (:desc, :stock)";

    $sentencia = $conexion -> prepare($sql);
    $sentencia -> bindParam(":desc", $descripcion);
    $sentencia -> bindParam(":stock", $stock);

    $isOk = $sentencia -> execute();
    $idGenerado = $conexion -> lastInsertId();
        
  } catch(PDOException $e){
    echo $e->getMessage();
  }
```

## consultando registros

A la hora de recuperar los resultados de una consulta, bastará con invocar al método `PDOStatement::fetch` para listar las filas generadas por la consulta.

Pero debemos elegir el tipo de dato que queremos recibir entre los 3 que hay disponibles:

- `PDO::FETCH_ASSOC` : array indexado cuyos keys son el nombre de las columnas.
- `PDO::FETCH_NUM` : array indexado cuyos keys son números.
- `PDO::FETCH_BOTH` : valor por defecto. Devuelve un array indexado cuyos keys son tanto el nombre de las columnas como números.

<img src="/assets/img07_06-pdo-listado-fetch.png" style="zoom: 40%;" />

```php
<?php
  //  ▒▒▒▒▒▒ consulta con array asociativo.php ▒▒▒▒▒▒
  include "config/database.inc.php";

  $conexion = null;

  try{
    $conexion = new PDO(DSN, USUARIO, PASSWORD);
    $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "select * from productos";

    $sentencia = $conexion -> prepare($sql);
    $sentencia -> setFetchMode(PDO::FETCH_ASSOC);
    $sentencia -> execute();

    while($fila = $sentencia -> fetch()){
      echo "Id:" . $fila["id"] . "<br />";
      echo "Descripción:" . $fila["descripcion"] . "<br />";
      echo "Stock:" . $fila["stock"] . "<br /><br />";
    }

  }catch(PDOException $e) {
    echo $e -> getMessage();
  }

  $conexion = null;
```

Recuperando datos con una **matriz** como resultado de nuestra consulta:

```php
<?php
  // ▒▒▒▒▒▒ consulta con array asociativo ▒▒▒▒▒▒
  include "config/database.inc.php";

  $conexion = null;

  try{
    $conexion = new PDO(DSN, USUARIO, PASSWORD);
    $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
    $sql="SELECT * FROM productos";

    $sentencia = $conexion -> prepare($sql);
    $sentencia -> setFetchMode(PDO::FETCH_ASSOC);
    $sentencia -> execute();
    // recuperado en la matriz $productos
    $productos = $sentencia -> fetchAll();

    foreach($productos as $elemento) {
      echo"Id:" . $elemento["id"] . "<br />";
      echo"Descripción:" . $elemento["descripcion"] . "<br />";
      echo"Stock:" . $elemento["stock"] . "<br /><br />";        
    }

  }catch(PDOException $e) {
      echo $e -> getMessage();
  }

  $conexion = null;
```

 Pero si lo que queremos es leer datos con forma de objeto utilizando `PDO::FETCH_OBJ`, debemos crear un objeto con propiedades públicas con el mismo nombre que las columnas de la tabla que vayamos a consultar.

```php
<?php
  // ▒▒▒▒▒▒▒ consulta con formato de objeto ▒▒▒▒▒▒▒
  include "config/database.inc.php";

  $conexion = null;

  try{
    $conexion = new PDO(DSN, USUARIO, PASSWORD);
    $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
    $sql = "SELECT * FROM productos";

    $sentencia = $conexion -> prepare($sql);
    $sentencia -> setFetchMode(PDO::FETCH_OBJ);
    $sentencia -> execute();

    while($p = $sentencia -> fetch()) {
        echo"Id:" . $p -> id . "<br />";
        echo"Descripción:" . $p -> descripcion . "<br />";
        echo"Stock:" . $p -> stock . "<br />";
    }
        
  }catch(PDOException $e) {
    echo $e -> getMessage();
  }

  $conexion = null;
```

## consultas con modelos

Llevamos tiempo creando clases en PHP y las consultas también admiten este tipo de datos mediante el uso de `PDO::FETCH_CLASS`.

Si usamos este método, debemos tener en cuenta que los nombres de los atributos privados deben coincidir con los nombres de las columnas de la tabla que vayamos a manejar.

Así pues, si por lo que sea cambiamos la estructura de la tabla **DEBEMOS CAMBIAR** nuestra clase para que todo siga funcionando.

```php
<?php
  // ▒▒▒▒▒▒ clase Producto ▒▒▒▒▒▒
  class Producto {
    private int $id;
    private string $descripcion;
    private ? int $stock;

    public function getId() : int {
      return $this -> id;
    }

    public function getDescripcion() : string {
      return $this -> descripcion;
    }

    public function getStock() : ?int {
      return $this -> stock;
    }
  }
?>
<?php
  // ▒▒▒▒▒▒ Consultando a través de la clase Producto ▒▒▒▒▒▒
  $sql = "SELECT * FROM productos";
  $sentencia = $conexion -> prepare($sql);

  // Aquí 'Tienda' es el nombre de nuestra clase
  $sentencia -> setFetchMode(PDO::FETCH_CLASS, "Producto");
  $sentencia -> execute();

  while($p = $sentencia -> fetch()) {
    echo "Id: " . $p -> getId() . "<br />";
    echo "Descripcion: " . $p -> getDescripcion() . "<br />";
    echo "Stock: " . $p -> getStock() . "<br /><br />";

    //var_dump($p);
  }
```

Pero ¿qué pasa si nuestras clases tienen constructor? pues que debemos indicarle, al método FECTH, que rellene las propiedades después de llamar al constructor y para ello hacemos uso de `PDO::FETCH_PROPS_LATE`.

```php
<?php
  // ▒▒▒▒▒▒ clase Producto ▒▒▒▒▒▒
  class Producto {
    public function __construct (public int $id=1, 
                          public string $descripcion="x", 
                          public int $stock=1 ){  }

    public function getId() : int {
       return $this -> id;
    }
    public function getDescripcion() : string {
       return $this -> descripcion;
    }
    public function getStock() : int {
       return $this -> stock;
    }
  }
?>   
<?php
  // ▒▒▒▒▒▒ consulta con array asociativo.php ▒▒▒▒▒▒
  include "config/database.inc.php";
  $conexion = null;
  try{
     $conexion = new PDO(DSN, USUARIO, PASSWORD);
     $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $sql = "SELECT * FROM productos";

     $sentencia = $conexion -> prepare($sql);
     $sentencia -> setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, "Producto");

     $sentencia -> execute();

     //$productos = $sentencia -> fetchAll();
     while($p = $sentencia -> fetch()) {
        echo"Id:" . $p -> id . "<br />";
        echo"Descripción:" . $p -> descripcion . "<br />";
        echo"Stock:" . $p -> stock . "<br /><br />";
     }
  }catch(PDOException $e) {
     echo $e -> getMessage();
  }

  $conexion = null;
```

## consultas con LIKE

Para utilizar el comodín LIKE u otros comodines, debemos asociarlo al dato y NUNCA en la propia consulta.

```php
<?php
  // ▒▒▒▒▒▒ clase Producto ▒▒▒▒▒▒
  class Producto {
     public function __construct (public int $id=1, 
                         public string $descripcion="x", 
                         public int $stock=1 ){  }

     public function getId() : int {
         return $this -> id;
     }
     public function getDescripcion() : string {
         return $this -> descripcion;
     }
     public function getStock() : int {
         return $this -> stock;
     }
  }
?>
<?php
  $busqueda1 = $_POST["cadenaDescripcion"];
  $busqueda2 = $_POST["numStock"];
    
  // ▒▒▒▒▒▒ Utilizando comodines :: LIKE ▒▒▒▒▒▒
  include "config/database.inc.php";

  $conexion = null;
  try{
     $conexion = new PDO(DSN, USUARIO, PASSWORD);
     $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $sql = "SELECT * FROM productos where descripcion like :desc and stock = :stk";

     $sentencia = $conexion -> prepare($sql);
     $sentencia -> setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Producto::class);

     $cadBuscar1 = "%" . $busqueda . "%";
        
	 $sentencia -> execute(["desc" => $cadBuscar1,"stk" => $cadBuscar2]);

     while($p = $sentencia -> fetch()) {
         echo"Id:" . $p -> id . "<br />";
         echo"Descripción:" . $p -> descripcion . "<br />";
         echo"Stock:" . $p -> stock . "<br /><br />";
     }        

  }catch(PDOException $e) {
     echo $e -> getMessage();
  }

  $conexion = null;
```

Tenéis una lista de ejemplos muy completa en la [documentación oficial](https://phpdelusions.net/pdo/objects).

# login & password

![](/assets/img08_06-login-password.gif)

Para manejar un sistema completo de login y password con contraseñas cifradas, necesitamos un método que cifre esos strings que el usuario introduce como contraseña; tanto en el formulario de registro como en el del login, ya que al codificar una contraseña, después tenemos que decodificarla para comprobar que ambas contrasñeas (la que instroduce el usuario en el login y la que tenemos en la base de datos) coincidan.

Necesitamos pues:

1º ) `password_hash()` para almacenar la contraseña en la base de datos a la hora de hacer el INSERT.

- `PASSWORD_DEFAULT` almacenamos la contraseña usando el método de encriptación *bcrypt*.
- `PASSWORD_BCRYPT` almacenamos la contraseña usando el algoritmo CRYPT_BLOWFISH compatible con crypt().

2º ) `password_verify()` para verificar el usuario y la contraseña.

Ejemplo:

```html
<form action="loginCrear.php" method="post">
    <label for="usuario">usuario: </label>
    <input type="text" name="usuario">
    <label for="password">password: </label>
    <input type="password" name="password"> 

    <input type="submit" name="enviar" value="enviar">
</form>
```

```php
<?php
  // ▒▒▒▒▒▒ loginCrear.php ▒▒▒▒▒▒
  include "config/database.inc.php";

  $conexion = null;
  try{
    $conexion = new PDO(DSN, USUARIO, PASSWORD);
    $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $usu = $_POST["usuario"];
    $pas = $_POST["password"];    
    $fechaActual = date("Y-m-d H:i:s"); 
    $cre = $fechaActual; 
    $acc = $fechaActual;  

    $sql = "INSERT INTO usuarios (usuario, password, created, access) 
                                      VALUES (:usu, :pas, :cre, :acc)";

    $sentencia = $conexion -> prepare($sql);
    $isOk = $sentencia -> execute([
            "usu" => $usu,
            "pas" => password_hash($pas,PASSWORD_DEFAULT),
            "cre" => $cre,
            "acc" => $acc
            ]);
    //$idGenerado = $conexion -> lastInsertId();

  } catch (PDOException $e) {
    echo $e -> getMessage();
  }

  $conexion = null;  
```

Ahora que tenemos el usuario codificado y guardado en la base de datos, vamos a recuperarlo para poder loguearlo correctamente.

```php
<?php
  // ▒▒▒▒▒▒ Recuperando usuario y password en BD ▒▒▒▒▒▒
  include "config/database.inc.php";
  $conexion = null;
  try{
    $conexion = new PDO(DSN, USUARIO, PASSWORD);
    $conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $usu = $_POST["usuario"] ?? "";
    $sql = "select * from usuarios where usuario = ?";

    $sentencia = $conexion -> prepare($sql);
    $sentencia -> execute([$usu]);

    $usuario = $sentencia -> fetch();

    if($usuario && password_verify($_POST['password'], $usuario['password'])) {
        echo"OK!";
    } else {
        echo"KO";
    }
  } catch (PDOException $e){
    echo $e->getMessage();
 }
 $conexion = null;
```

# acceso a ficheros

Gracias a la funcion `fopen()` desde PHP podemos abrir archivos que se encuentren en nuestros servidor o una URL.

A esta función hay que pasarle 2 parámetros; el **nombre del archivo** que queremos abrir **y** el **modo** en el que se abrirá:

```php
$fp = fopen("miarchivo.txt", "r");
```

Muchas veces no podemos abrir el archivo porque éste no se encuentra o no tenemos acceso a él; por eso es recomendable comprobar que podemos hacerlo:

```php
if (!$fp = fopen("miarchivo.txt", "r")){
    echo "No se ha podido abrir el archivo";
}
```

## modos de apertura de ficheros

- `r` : Modo lectura. Puntero al principio del archivo.
- `r+` : Apertura para lectura y escritura. Puntero al principio del archivo.
- `w` : Apertura para escritura. Puntero al principio del archivo y lo sobreescribe. Si no existe se intenta crear.
- `w+` : Apertura para lectura y escritura. Puntero al principio del archivo y lo sobreescribe. Si no existe se intenta crear.
- `a` : Apertura para escritura. Puntero al final del archivo. Si no existe se intenta crear.
- `a+` : Apertura para lectura y escritura. Puntero al final del archivo. Si no existe se intenta crear.
- `x` : Creación y apertura para sólo escritura. Puntero al principio del archivo. Si el archivo ya existe dará error E_WARNING. Si no existe se intenta crear.
- `x+` : Creación y apertura para lectura y escritura. Mismo comportamiento que x.
- `c` : Apertura para escritura. Si no existe se crea. Si existe no se sobreescribe ni da ningún error. Puntero al principio del archivo.
- `c+` : Apertura para lectura y escritura. Mismo comportamiento que C.
- `b` : Cuando se trabaja con archivos binarios como jpg, pdf, png y demás. Se suele colocar al final del modo, es decir rb, r+b, x+b, wb...

## operaciones con archivos

Para poder **leer** un archivo necesitamos usar la función `fread()` de PHP:

```php
// ▒▒▒▒▒▒ Abriendo un archivo y leyendo su contenido ▒▒▒▒▒▒
$file = "miarchivo.txt";
$fp = fopen($file, "r");

// $contents guardará el contenido
// filesize() nos devuelve el tamaño del archivo en cuestión
$contents = fread($fp, filesize($file));
print $contents;

// Cerramos la conexión con el archivo
fclose($fp)
```

Si lo que queremos es **escribir** en un archivo, deberemos hacer uso de la función`fwrite()` :

```php
// ▒▒▒▒▒▒ Escribiendo en un archivo ▒▒▒▒▒▒
$file = "miarchivo.txt";
$texto = "Hola qué tal";

$fp = fopen($file, "w");

fwrite($fp, $texto);
fclose($fp);
```

## información de un fichero

Con PHP y su método `stat()` podemos obtener información sobre los archivos que le indiquemos. Este método devuelve hasta un total de 12 elementos con información acerca de nuestro archivo.

```processing
0   dev         número de dispositivo
1   ino         número de i-nodo
2   mode        modo de protección del i-nodo
3   nlink       número de enlaces
4   uid         ID de usuario del propietario
5   gid         ID de grupo del propietario
6   rdev        tipo de dispositivo, si es un dispositivo i-nodo
7   size        tamaño en bytes
8   atime       momento del último acceso (tiempo Unix)
9   mtime       momento de la última modificación (tiempo Unix)
10  ctime       momento de la última modificación del i-nodo (tiempo Unix)
11  blksize     tamaño del bloque E/S del sistema de ficheros
12  blocks      número de bloques de 512 bytes asignados
```

Unos ejemplos...

```php
<?php
  // ▒▒▒▒▒▒ Información del archivo ▒▒▒▒▒▒

  $file = "miarchivo.txt";
  $texto = "Todos somos muy ignorantes, lo que ocurre es que no todos ignoramos las mismas cosas.";

  $fp = fopen($file, "w");
  fwrite($fp, $texto);

  $datos = stat($file);
  
  echo $datos[3] . "<br>"; // Número de enlaces, 1
  echo $datos[7] . "<br>"; // Tamaño en bytes, 85
  echo $datos[8] . "<br>"; // Momento de último acceso, 1444138104
  echo $datos[9] . "<br>"; // Momento de última modificación, 1444138251
?>
```

Echa un vistazo a [las funciones de directorios](https://www.php.net/manual/es/book.dir.php) que tiene PHP, es muy interesante.

## archivos PDF

<img src="/assets/img09_06-pdf.png" alt="logo PDF" style="zoom:22%; float:right;" />Con PHP podemos manejar todo tipo de archivos como ya hemos visto pero, ¿qué pasa si queremos generar ficheros PDF con datos sacados de una base de datos?

Gracias a una clase escrita en PHP, podemos generar archivos PDF sin necesidad de instalar librerías adicionales en nuestro servidor.

Para ello, como tenemos composer dentro de nuestra imagen de Docker, usaremos **composer** para instalar esta dependencia.

Acuérdate que debemos haber hecho `composer init` para empezar un proyecto con composer, de lo contrario no podrás añadir ningún paquete.

Veamos un ejemplo de `Hello World` convertido a PDF:

```php
<?php
    ob_end_clean();
    require('fpdf/fpdf.php');

    // Instanciamos la clase
    // P = Portrait | mm = unidades en milímetros | A4 = formato
    $pdf = new FPDF('P','mm','A4');

    // Añadimos una página
    $pdf->AddPage();

    // Establecemos la fuente y el tamaño de letra
    $pdf->SetFont('Arial', 'B', 18);

    // Imprimimos una celda con el texto que nosotros queramos
    $pdf->Cell(60,20,'Hello World!');

    // Terminamos el PDF
    $pdf->Output();
?>
```

Hay muchos ejemplos y tutoriales, así como documentación de la clase FPDF en la página oficial. 

Visita [la sección de tutoriales y el manual](http://www.fpdf.org/) para sacar mayor partido a esta clase.

```php
<?php

require('fpdf/fpdf.php');

class PDF extends FPDF {

    // Cabecera
    function Header() {

        // Añadimos un logotipo
        $this->Image('logo.png',10,8,33);

        // establecemos la fuente y el tamaño
        $this->SetFont('Arial','B',20);

        // Movemos el contenido un poco a la derecha
        $this->Cell(80);

        // Pintamos la celda
        $this->Cell(50,10,'Cabecera',1,0,'C');

        // Pasamos a la siguiente línea
        $this->Ln(20);
    }

    // Pie de página
    function Footer() {

        // Nos posicionamos a 1.5 cm  desde abajo del todo de la página
        $this->SetY(-15);

        // Arial italic 8
        $this->SetFont('Arial','I',8);

        // Número de página
        $this->Cell(0,10,'Página ' . 
            $this->PageNo() . '/{nb}',0,0,'C');
    }
}

// Instanciamos la clase
$pdf = new PDF();

// Definimos un alias para la numeración de páginas
$pdf->AliasNbPages();

$pdf->AddPage();
$pdf->SetFont('Times','',14);

for($i = 1; $i <= 30; $i++)
    $pdf->Cell(0, 10, 'Número de línea ' 
            . $i, 0, 1);
$pdf->Output();

?>
```

![](/assets/img09_06-pdf-output.gif)

# referencias

- [Tutorial de Composer](https://desarrolloweb.com/manuales/tutorial-composer.html)
- [Web Scraping with PHP – How to Crawl Web Pages Using Open Source Tools](https://www.freecodecamp.org/news/web-scraping-with-php-crawl-web-pages/)
- [PHP Monolog](https://zetcode.com/php/monolog/)
- [Unit Testing con PHPUnit — Parte 1,](https://medium.com/@emilianozublena/unit-testing-con-phpunit-parte-1-148c6d73e822) de Emiliano Zublena.