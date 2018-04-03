# Creación de una extensión para Visual Studio Code

Este ejemplo describe el desarrollo de una extensión con una funcionalidad muy sencilla, insertar una línea en blanco cada N líneas en un archivo de texto.

## Software a instalar

Este documento detalla paso a paso la instalación y configuración de todas las aplicaciones y componentes necesarios para la creación y ejecución de una extensión de VSCode.


* **Visual Studio Code:** Es un editor de código moderno desarrollado por Microsoft disponible para Linux, Windows y macOS, es de código abierto y gratuito. Está tomando bastante popularidad en la comunidad de desarrolladores por la gran cantidad de herramientas que ayudan a optimizar las tareas comunes y cotidianas.
* **NodeJs:** “Es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome. Usa un modelo de operaciones E/S sin bloqueo y orientado a eventos, que lo hace liviano y eficiente” (Node.js Foundation, 2018, n.d). Cuenta con un manejador de paquetes NPM y contiene el mayor número de librerías de código abierto del mundo.
* **TypeScript:** “Es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superset de JavaScript, que basicamente añade tipado estático y objetos basados en clases” (Wikipedia, 2018, n.d).
* **Yeoman:** Es una herramienta de desarrollo del lado del cliente, gratuito y de código abierto. Ayuda a generar la estructura básica de un proyecto. Yeoman utiliza a su vez *generadores* para cada tipo de proyecto (web estáticas, páginas que usen jQuery, programas basados en Node, etc.). Yeoman está escrito, a su vez, en JavaScript.
* **Generator-code:** Es uno de los generadores para Yeoman y sirve para comenzar el desarrollo de una extensión para Visual Studio Code.


### Instalación de Visual Studio Code (VS Code)

Ve a la página de Visual Studio Code y [descarga](https://code.visualstudio.com/#alt-downloads) la versión más adecuada para tu sistema operativo.

![VS Code](https://cdn-images-1.medium.com/max/1400/1*DJmAazS1OKEDLNjAKIOo3Q.png)

Una vez descargado el paquete ya lo tendremos listo en la carpeta de descargas o en el directorio de descarga seleccionado.

![Páquete descargado](https://cdn-images-1.medium.com/max/800/1*kdn2XbNEm_J3emeJdpsfjQ.png)

Para instalar el paquete ejecutamos el siguiente comando en la terminal.

```
$ sudo dpkg –i <nombre_paquete>.deb
```

![Ejecución del comando](https://cdn-images-1.medium.com/max/800/1*qnVMuw_nLWwZvebbG0XPXA.png)

Es posible que nos encontremos con algunos errores de dependencia.

![Errores de dependencia](https://cdn-images-1.medium.com/max/800/1*0aIqhQ_uDcQ9lj3z2O80Ug.png)

Para solucionar el inconveniente usaremos el siguiente comando y VS Code se instalará automáticamente después de resolver las dependencias.

```
$ sudo apt -f install
```

![Solución errores](https://cdn-images-1.medium.com/max/800/1*LaRfkPllIIsAtuZyLvga4g.png)

Con esto VS Code estará instalado correctamente.

![VS Code](https://cdn-images-1.medium.com/max/800/1*HvayF3j9aMljpDhiiC6LFg.png)

### Instalación de Nodejs

Lo vamos a instalar a través de NVM que es un administrador de versiones de Node.js, el cual nos permite tener instalaciones de diferentes versiones de este software.

Procedemos a instalar NVM de la siguiente manera.

Preparamos nuestro entorno con las dependencias necesarias.

```
$ sudo apt update
$ sudo apt install build-essential libssl-dev
```

Ejecutamos los siguientes comandos para instalar NVM.

```
$ curl –sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm-sh
$ bash install_nvm.sh
```

Ahora que tenemos NVM instalado podemos ver las versiones disponibles.

```
$ nvm ls-remote
```

Tendremos algo similar a esto:

![Salida versiones](https://cdn-images-1.medium.com/max/800/1*xY5NuuaGYjYuA9FU37x59Q.png)

Para instalar una versión específica usamos la siguiente sentencia.

```
$ nvm install 8.11.1
```

Para usar una versión de las que ya están instaladas.

```
$ nvm use 8.9.4
```

## Paquetes NPM

### Instalación de TypeScript

La instalación es tan sencilla como correr el siguiente comando.

```
$ npm install -g typescript
```

![Ejecución comando](https://cdn-images-1.medium.com/max/800/1*3H6qO3zCpEqP_c5H42Tzmw.png)

### Instalación de Yeoman y Generator-code

Para instalar ambos paquetes corremos la siguiente sentencia.

```
$ npm install –g yo generator-code
```

![Ejecución de comando](https://cdn-images-1.medium.com/max/800/1*5pn2fwfiHwhqXWtxeZoiIw.png)

# Creación de la extensión

Primero generamos la estructura inicial del proyecto con la ayuda de Yeoman y Generator-code, ejecutamos la siguiente sentencia.

```
$ yo code
```

Yo, es el comando que tenemos disponible una vez instalado Yeoman y aquí estamos diciendo a *yo* que use *generator-code* que es el generador de extensiones de VS Code.

Una vez realizada esta acción Yeoman nos hará algunas preguntas, vamos a usar TypeScript como lenguaje, propondremos “Line Gapper” como nombre y “gapline” como identificador, por último no inciaremos un repositorio git.

![yo code1](https://cdn-images-1.medium.com/max/800/1*cUHxtLB683LXs8AFhFcGow.png)

![yo code2](https://cdn-images-1.medium.com/max/800/1*2fXaYYiuzGTXrkcELHZdPg.png)

Con esto habremos generado una carpeta con la estructura base de archivos para la extensión de VS Code. Para abrir el proyecto lo hacemos desde la opción Abrir dentro del menú Archivo.

![Estructura de ficheros](https://cdn-images-1.medium.com/max/800/1*6-7pN60P-1T3WSqZjJuvgA.png)

Nos queda implementar la funcionalidad de nuestra extensión, y eso lo haremos dentro del archivo *extension.ts* que se encuentra en el directorio *src*.

Vamos a reemplazar el código descrito en el siguiente cuadro, por el código generado dentro de extension.ts, el cual sirve para agregar una línea en blanco en cada N líneas.

```typescript
//Invoca el mode estricto de javascript
'use strict';

// Importa el módulo y lo referencia con el alias vscode
import * as vscode from 'vscode';

// Este método es llamado cuando la extensión es activada
// La extensión es activada la primera vez que el comando es ejecutado
export function activate(context: vscode.ExtensionContext) {
    // Implementa la funcionalidad del comando definido en package.json
    // El parámetro commandId debe ser igual al nombre de comando en package.json
    let disposable = vscode.commands.registerCommand('extension.gapline', () => {
        // Obtiene la instancia de VS Code que se esta ejecutando actualmente
        var editor = vscode.window.activeTextEditor;

        // Si no encuentra el editor retorna sin hacer nada
        if (!editor) { return; }

        // Obtiene el bloque de texto seleccionado del editor actual
        var selection = editor.selection;        
        var text = editor.document.getText(selection);

        // Muestra un cuadro de díalogo 
        // Pedimos el número de líneas a tomar en cuenta para insertar una línea en blanco
        // Luego implementa la funcionalidad con el valor obtenido
        vscode.window.showInputBox({ prompt: 'Lineas?' }).then(value => {
            // Asigna el valor del cuadro de texto a la variable numberOfLines convirtiendola a entero
            var numberOfLines = +value;

            // Define un array vacio de cadenas de texto
            var textInChunks: Array<string> = [];
              
            // Divide el texto a partir de cada salto de línea en un array para iterarlas            
            // Implementa la funcionalidad que agrega las líneas en blanco
            text.split('\n').forEach((currentLine: string, lineIndex) => {
                // Agrega la línea actual al array textInChuncks
                textInChunks.push(currentLine);
                // Verifica si la posición en la que está corresponde al número de líneas
                // Si cumple ingresa un texto vacio al array                
                if ((lineIndex+1) % numberOfLines === 0) { textInChunks.push(''); }
            });
              
            // Une cada item de array en un solo texto con un salto de línea
            text = textInChunks.join('\n');  
              
            // Implementa la funcionalidad para editar el texto seleccionado
            editor.edit((editBuilder) => {
                // Genera un rango tomando en cuenta los parámetros de la selección                
                var range = new vscode.Range(
                    // Número inicial de línea y columna
                    selection.start.line, 0,
                    // Número final de línea
                    selection.end.line,
                    // Número final de columna
                    editor.document.lineAt(selection.end.line).text.length
                );
              
                // Reemplaza todo lo que está en el rango antes definido con el nuevo texto
                editBuilder.replace(range, text);
            });
        });
    });

    //Agrega a una lista de desechables que se eliminan cuando la extensión está desactivada.
    context.subscriptions.push(disposable);
}

// El método es llamado cuando la extensión se desactiva
export function deactivate() {
}
```

*TypeScript añade a JavaScript el tipado estático y clases, por ello en el código antes descrito se puede notar estas caracteristicas en la definición a la variable currentLine como string, y la instanciación de clases.*

Ahora vamos a editar el archivo package.json y asegurarnos de sustituir cada “sayHello” dentro del archivo por “gapline”, además de definir en la campo *title* un nombre de nuestra extensión que luego nos será de utilidad para buscar nuestra aplicación dentro de la paleta de comandos.

![Package.json](https://cdn-images-1.medium.com/max/800/1*cQJhxQS7mE4xmZ98vE43Ng.png)

Si se ha seguido correctamente las indicaciones nuestra extensión estará creada y configurada correctamente. En el siguiente apartado vamos a ver como ejecutar y probar nuestro código.

## Ejecución de la extensión

Ejecutamos la extensión con la tecla F5 o *Iniciar depuración* dentro del menú *Depurar*, esto nos abre una instancia de VS Code con la extensión precargada donde vamos a abrir un fichero de texto cualquiera.

![Depuración](https://cdn-images-1.medium.com/max/800/1*uJFSZI7clzvdG_429YfGmA.png)

Dentro del fichero ya abierto seleccionamos una porción del texto para probar la herramienta.

![Selección de texto](https://cdn-images-1.medium.com/max/800/1*vgkAIJWOI3rMGO2IrqGPWA.png)

Lanzamos la paleta de comando con *Control+Shift+P* o *Paleta de comando*s dentro del menú *Ver*.

![Paleta](https://cdn-images-1.medium.com/max/800/1*KLJctHkfPE-w6yTHkSWdNQ.png)

Buscamos y ejecutamos la extensión, deberá tener el mismo nombre que este en la campo *title* del fichero package.json.

![Búsqueda](https://cdn-images-1.medium.com/max/800/1*KT_yBXpzzKhr3ZSvhrEpHQ.png)

Inmediatamente se muestra un diálogo donde nos pide el número de líneas, en este caso he introducido el número dos y presionamos Enter.

![Diálogo](https://cdn-images-1.medium.com/max/800/1*SLWm4Li4KqxRbdBWuRP5zQ.png)

La extensión realiza su cometido y obtenemos algo similar a esto:

![Finalización](https://cdn-images-1.medium.com/max/800/1*XEYfKRr3cwjrvzVJdMq4PA.png)

Observamos que cada dos líneas la extensión ha insertado una en blanco, demostrando así que el código funciona correctamente.

#### REFERENCIAS BIBLIOGRÁFICAS

Node.js Foundation (s.f). Node.js. Recuperado el 31 de marzo de 2018 de https://nodejs.org/es/

Wikipedia (s.f.). TypeScript. Recuperado el 31 de marzo de 2018 de https://es.wikipedia.org/wiki/TypeScript


#### BIBLIOGRAFÍA

Wikipedia (s.f.). Visual Studio Code. Recuperado el 31 de marzo de 2018 de https://es.wikipedia.org/wiki/Visual_Studio_Code

Wikipedia (s.f). Yeoman (Software). Recuperado el 31 de marzo de 2018 de https://en.wikipedia.org/wiki/Yeoman_(software)

Barnils, J. (2016). Como instalar Node.js en Ubuntu 16.04. Recuperado el 31 de marzo de 2018 de https://juliobarnils.com/2016/05/como-instalar-node-js-en-ubuntu-16-04/
