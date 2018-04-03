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