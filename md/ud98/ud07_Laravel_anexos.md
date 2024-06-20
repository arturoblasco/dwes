---
   unit: unidad didáctica 7
   title: Framework Laravel
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

# anexo I - instalación de Tailwind CSS

Si hemos decidido instalar `Tailwind CSS` para que nos eche una mano con nuestro css, deberemos de seguir estos pasos:

1. Hay que comprobar la versión de npm y node:

   ```sh
   npm -v
   node -v
   ```

2. Si la versión de nodejs es inferior a la versión 14 (a la hora de crear este documento) **antes de seguir habremos de reinstalarlo**. Para ello habrá que ir al [anexo II - reinstalación de node](# anexo II - reinstalación de node) en este mismo documento.

   > **no continuar si la versión de node es inferior a 14**.

3. Si nuestra versión de nodejs es correcta (o hemos procedido a reinstalar node en el punto 2), lo primero será desinstalar bootstrap:

   ```sh
   npm uninstall bootstrap
   ```

4. Instalaremos en desarrollo estas tres dependencias:

   ```sh
   npm install -D tailwindcss postcss autoprefixer
   ```

5. Generamos ahora el fichero `tailwindcss.config.js`que aparecerá en la raíz del proyecto:

   ```sh
   npx tailwindcss init -p
   ```

6. Editar el fichero del proyecto Laravel `tailwindcss.config.js` que se ha generado en el directorio raíz del proyecto y donde indicaremos dónde vamos a utilizarlo:

   ```php
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./resources/**/*.blade.php",
       "./resources/**/*.js",
       "./resources/**/*.vue",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

7. Ahora, en el fichero /resources/css/`app.css` agregar las siguientes líneas:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

8. Desde el terminal (y siempre dentro de nuestro proyecto), vamos a ejecutar:

   ```sh
   npm run dev
   # ó, si no funciona:
   # npm run dev -- --host
   ```

   <img src="./assets/ud07_laravel_002.png" style="zoom:50%;" />

9. En el fichero /resources/views/layouts/`app.blade.php` hay que indicarle que va a utilizar el fichero /resources/css/`app.css`, para ello hay que añadirlo en:

   ```php+HTML
   @vite('resources/css/app.css')
   ```

   <img src="./assets/ud07_laravel_003.png" style="zoom:50%;" />

   A partir de ahora, y con este ejemplo, podemos observar que se nos muestra el css:

   <img src="./assets/ud07_laravel_004.png" style="zoom:50%;" />

# anexo II - reinstalación de node

Para reinstalar nodejs:

1. Desinstalar node por completo:

   ```sh
   sudo apt-get purge --auto-remove nodejs
   ```

2. Eliminar todo resto de node y npm: 

   	a. Antes que nadas, debe ejecutar el siguiente comando desde el terminal:

   ```sh
   sudo rm -rf /usr/local/bin/npm /usr/local/share/man/man1/node* /usr/local/lib/dtrace/node.d ~/.npm ~/.node-gyp /opt/local/bin/node opt/local/include/node /opt/local/lib/node_modules
   ```

   	b. Eliminar los directorios node o node_modules de /usr/local/lib con la ayuda del siguiente comando:

   ```sh
   sudo rm -rf /usr/local/lib/node*
   ```

   	c. Eliminar los directorios node o node_modules de /usr/local/include con la ayuda del siguiente comando:

   ```sh
   sudo rm -rf /usr/local/include/node*
   ```

   	d. Eliminar cualquier archivo de nodo o directorio de /usr/local/bin con la ayuda del siguiente comando:

   ```sh
   sudo rm -rf /usr/local/bin/node
   ```

3. Instalar otra vez nvm:

   	a. Instalar NvM (Node Version Manager), desde el directorio de usuario `~` :

   ```sh
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

   	b. Actualiza el archivo .bashrc:

   ```sh
   source .bashrc
   ```

   	c. Confirma que el directorio local está configurado:

   ```sh
   echo $NVM_DIR
   /home/username/.nvm
   ```

4. Instalar node:

   	a. Revisar qué versiones de Node.js están disponibles:

   ```sh
   nvm ls-remote
   ```

   	b. Instalar la versión que desees (elige la v20.10.0):

   ```sh
   nvm install v20.10.0
   ```

5. Comprobar que la nueva versión de node es superior a 14:

   ```sh
   node -v
   ```

# referencias

- .