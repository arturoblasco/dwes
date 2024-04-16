---
   unit: unidad didáctica 7
   title: Laravel - Controladores (actividades)
   language: ES
   author: Arturo Blasco
   subject: Desarrollo Web en Entorno Servidor
   keywords: [DWES, 2023, PHP, Laravel]
   IES: IES Mestre Ramón Esteve (Catadau) [iesmre.es]
   header: ${unit}: ${title} - ${subject} (versión: ${today})
   footer: ${currentFileName}.pdf - ${author} - ${IES} - ${pageNo}|${pageCount}
   typora-root-url:${filename}/../
   typora-copy-images-to:${filename}/../assets

---







[TOC]

> El uso de estos materiales está sujeto a una licencia Creative Commons [CC BY-NC](https://creativecommons.org/licenses/by-nc/4.0/).
>
> Material extraído de https://nachoiborraies.github.io/laravel/

# ejercicios propuestos

## Ejercicio 1

Sobre el proyecto **blog** de la sesión anterior, vamos a añadir estos cambios:

- Crea un controlador de recursos (opción `-r`) llamado `PostController`, que nos servirá para gestionar toda la lógica de los posts del blog.
- Asigna automáticamente con el método `resource` cada ruta a su función correspondiente del controlador, en el archivo `routes/web.php`. Limita con `only` las acciones sólo a las funciones de listado (`index`), ficha (`show`), creación (`create`) y edición (`edit`).
- Utiliza el proveedor de servicios `AppServiceProvider` para “castellanizar” las rutas de creación y edición, como en el ejemplo que hemos visto de libros.
- Renombra las vistas de listado y ficha de un post a `index.blade.php` y `show.blade.php`, dentro de su carpeta `posts`, y haz que los métodos correspondientes del controlador de posts rendericen estas vistas. Para los métodos `create` y `edit`, simplemente devuelve un texto plano indicando “Nuevo post” y “Edición de post”, por ejemplo.
- Haz los cambios adicionales que sean convenientes (por ejemplo, en el menú de navegación) para que los enlaces sigan funcionando, y prueba que las cuatro rutas (listado, ficha, creación y edición) funcionan adecuadamente.

## Ejercicio 2

Sobre el proyecto **blog** anterior, vamos a añadir estos cambios:

- Haz que las funciones de `create` y `edit` del controlador de posts, en lugar de mostrar un mensaje de texto plano indicando que ahí va un formulario, redirijan a la página de inicio, usando la instrucción `redirect`.
- Añade un *helper* al proyecto que defina una función llamada `fechaActual`. Recibirá como parámetro un formato de fecha (por ejemplo, “d/m/y”) y sacará la fecha actual en dicho formato. Utilízalo para mostrar la fecha actual en formato “d/m/Y” en la plantilla base, bajo la barra de navegación, alineada a la derecha.





> **¿Qué entregar?**
>
> Como entrega de esta sesión deberás comprimir el proyecto **blog** con todos los cambios incorporados, y eliminando las carpetas `vendor` y `node_modules` como se explicó en las sesiones anteriores. Renombra el archivo comprimido a `blog_03.zip`.



# bibliografia

- Material extraído de [Nacho Iborra Baeza](https://nachoiborraies.github.io/laravel/).
