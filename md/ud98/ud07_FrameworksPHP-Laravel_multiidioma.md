---
   unit: unidad didáctica 7
   title: multiidioma en Laravel
   language: ES
   author: Arturo Blasco
   subject: Desarrollo Web en Entorno Servidor
   keywords: [DWES, 2023, PHP, Laravel, API, RESTful]
   IES: IES Mestre Ramón Esteve (Catadau) [iesmre.es]
   header: ${unit}: ${title} - ${subject} (versión: ${today})
   footer: ${currentFileName}.pdf - ${author} - ${IES} - ${pageNo}|${pageCount}
   typora-root-url:${filename}/../
   typora-copy-images-to:${filename}/../assets

---







[TOC]

# multiidioma

1. Crear middleware 'Localization':

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\App;  // <-- introducir

class Localization
{
    public function handle(Request $request, Closure $next): Response
    {
        if (session()->has('locale')){
            App::setLocale(session()->get('locale'));
        }
        return $next($request);
    }
}
```



2. Añadir en `App/Http/kernel.php`, al final del array `$middlewareGroups`:

````php

protected $middlewareGroups = [
    'web' => [
		//...
		\App\Http\Middleware\Localization::class,
	],
//...
````



3. En carpeta `resources/lang` poner carpetas idiomas (`resources/lang/en`, `resources/lang/es`, `resources/lang/va`) con un fichero de nombre `messages.php`:

```php
<?php
// fichero messages.php para inglés:
return [
    'title' => 'my web!',
    'wellcome' => 'wellcome to my aplication',
    'bye' => 'bye',
    'lang' => 'lang',
];
```



4. En carpeta `public/img/flag` poner banderas (`public/img/flag/en.png`, `public/img/flag/es.png`, `public/img/flag/va.png`) .



5. Introducir en `web.php`:

```php
Route::get('locale/{locale}', function($locale){
    session()->put('locale', $locale);
    return Redirect::back();
});
```



6. `vista.blade.php`:

```php
//...
    <title>@lang('messages.title')</title>
//...
    <div>
        <a href={{ url('locale/va')}}><img src="img/flag/va.png"></a>
        <a href={{ url('locale/es')}}><img src="img/flag/es.png"></a>
        <a href={{ url('locale/en')}}><img src="img/flag/en.png"></a>
    </div>

    <p>{{ __('messages.wellcome') }}</p>
```

