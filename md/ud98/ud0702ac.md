---
   unit: unidad didáctica 7
   title: Laravel - Introducción (actividades)
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









> **licencia**:  el uso de estos materiales está sujeto a licencia Creative Commons [CC BY-NC](https://creativecommons.org/licenses/by-nc/4.0/).
>
> **material**: extraído de https://nachoiborraies.github.io/laravel/





[TOC]



# ejercicios propuestos



## Ejercicio 1

Crea un proyecto Laravel llamado **blog**. Ponlo en marcha con el comando `php artisan serve` e intenta acceder a él desde el navegador. Captura la pantalla del navegador, de modo que incluya tanto la página de inicio que se muestra como la URL de la barra de direcciones. Guarda la captura como `captura01`, en formato JPG o PNG.



## Ejercicio 2

Sobre el proyecto del ejercicio anterior, configura un *virtual host* en Apache con el mismo nombre de host (*blog*), y asócialo a una IP local (la que tú quieras, por ejemplo, 127.0.0.6). Prueba a acceder a la página de inicio de este nuevo proyecto (con *http://blog* o con *http://127.0.0.6*). Captura la pantalla del navegador, mostrando la página de inicio y la URL de la barra de direcciones. Guarda la captura como `captura02`, en formato JPG o PNG. 





> **¿Qué entregar?**
>
> Como entrega de esta sesión deberás comprimir el proyecto **blog** con todos los cambios incorporados, y eliminando las carpetas `vendor` y `node_modules` como se explicó en las sesiones anteriores. Renombra el archivo comprimido a `blog_07d.zip`.



# bibliografia

- [Nacho Iborra Baeza](https://nachoiborraies.github.io/laravel/).
