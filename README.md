# ChatBot

## Descripción
Este proyecto consiste en un ChatBot desarrollado en JavaScript que utiliza la librería DBVDialogLib para manejar interacciones y respuestas a través de peticiones HTTP. El bot proporciona información sobre personajes famosos de Málaga, recomendaciones de ordenadores, datos de aparcamientos y más.

## Estructura de Archivos
- **DBVDialogLib.js**: Contiene las funciones principales del ChatBot para generar respuestas con formatos específicos.
- **index.js**: Archivo principal que maneja las solicitudes HTTP y define las interacciones del bot.
- **personajes.json**: Archivo de datos que contiene descripciones de personajes famosos.
- **Imagenes/**: Carpeta que almacena imágenes utilizadas en el proyecto.

## Funcionalidades Principales
- **Respuesta Básica**: Función `respuestaBasica` que genera respuestas sencillas en formato JSON para el bot.
- **Agregar Sugerencias**: Función `addSugerencias` para incluir sugerencias en las respuestas del bot.
- **Agregar Tarjeta**: Función `addCard` para agregar tarjetas con información detallada en las respuestas.
- **Leer URL**: Función `leerURLpromise` para realizar solicitudes HTTP y obtener datos externos.
- **Reducir a Ocho**: Función `reducirAOcho` para seleccionar aleatoriamente hasta ocho elementos de una lista.
- **Gestión de Contexto**: El archivo `index.js` maneja diferentes contextos de interacción, como la búsqueda de personajes, recomendación de ordenadores, datos de aparcamientos, entre otros.

## Uso
Para utilizar este proyecto, se deben ejecutar las funciones definidas en `index.js`, las cuales gestionan las solicitudes y respuestas del ChatBot.

## Ejemplo de Uso
El archivo `index.js` contiene ejemplos de interacciones del bot en función del contexto de la solicitud HTTP recibida.

## Instalación
Para instalar y ejecutar este proyecto localmente, se requieren las dependencias especificadas en `package.json`.

## Contribución
Siéntete libre de contribuir al proyecto, ya sea añadiendo nuevas funciones al bot, mejorando la estructura del código o corrigiendo errores.

