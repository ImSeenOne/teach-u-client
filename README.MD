# Proyecto Web Genérico (Secciones, Tópicos y Checklists)

Este proyecto consiste en una **página web interactiva** que muestra secciones, tópicos y subtemas a partir de un objeto JSON.  
El contenido se puede **expandir y colapsar**, y permite **marcar** cada subtema (checkbox) para llevar el registro de progreso.

## Características principales

1. **Contenido Dinámico desde JSON**  
   - El proyecto obtiene su contenido de un objeto JSON, que contiene secciones, tópicos y subtemas.  
   - Es muy sencillo **cambiar o personalizar** la información (temáticas, títulos, actividades, recursos...) editando directamente la estructura JSON en el archivo JavaScript.

2. **Título Principal Personalizable**  
   - El `<h1>` de la página se genera dinámicamente a partir de una propiedad (por ejemplo, `planTitle`) dentro del JSON.  
   - Facilita renombrar o cambiar el tema sin tocar el HTML.

3. **Expandir/Colapsar Secciones**  
   - Cada sección tiene un encabezado con un **checkbox** y una **flecha** que rota cuando se colapsa/expande.  
   - Al hacer clic en el encabezado (exceptuando el checkbox), el contenido se oculta o se muestra con una **animación suave**.

4. **Checklists Interconectados**  
   - Al marcar un subtema, se verifica si todos los subtemas están marcados para auto-marcar el tópico.  
   - Al marcar un tópico, todos sus subtemas se marcan.  
   - Al marcar una sección entera, se marcan todos sus tópicos y subtemas.

5. **Barra de Progreso**  
   - Cada sección muestra cuántos subtemas están completados y lo refleja en una **barra de progreso** que se actualiza dinámicamente.

6. **Persistencia en Local Storage**  
   - El estado de los checkboxes se **guarda automáticamente** en el navegador, para que al recargar la página no se pierda la información de qué está completo y qué no.

7. **Diseño Responsivo**  
   - El contenedor principal tiene un `max-width` para no desbordar pantallas grandes.  
   - En pantallas pequeñas, el diseño se ajusta a todo el ancho disponible sin desbordarse.

## Cómo usar este proyecto

1. **Clonar o Descargar**  
   - Clona este repositorio o descárgalo como .zip.  
   - Descomprime en tu carpeta preferida.

2. **Abrir `index.html`**  
   - Puedes abrir el archivo `index.html` directamente en el navegador (por ejemplo, arrastrándolo a Chrome/Firefox).  
   - Verás la página con los títulos de sección, subtemas y checkboxes.

3. **Personalizar el Contenido (JSON)**  
   - Dentro del archivo HTML, busca la porción de código JavaScript donde se encuentra el objeto principal (por defecto se llama `studyPlan` en el ejemplo).  
   - Edita sus propiedades para cambiar:
     - `planTitle`: Título general que se muestra en `<h1>`.  
     - `sections`: Lista de secciones (cada una con `title`, `topics`, `subtopics`, `content`, etc.).  
   - Añade o elimina secciones, tópicos o subtemas según tus necesidades.

4. **Personalizar Estilos (CSS)**  
   - Si deseas modificar colores, tipografías o animaciones, revisa el bloque `<style>` (o el archivo CSS externo, si se ha separado).  
   - El contenedor principal `#container` usa `max-width: 900px;` para un ancho fijo pero responsivo. Ajusta ese valor si lo prefieres.

5. **Función de Guardado (Local Storage)**  
   - No necesitas configurar nada extra para la persistencia: automáticamente se guardan los checkboxes.  
   - Si deseas reiniciar el progreso, limpia los datos del navegador (Local Storage).

## Ejemplo de Estructura JSON

```js
const studyPlan = {
  planTitle: "Título Genérico o Nombre del Proyecto",
  sections: [
    {
      id: "una-seccion",
      title: "Título de la Sección",
      topics: [
        {
          title: "Título de un Tópico",
          subtopics: [
            {
              title: "Subtema 1",
              content: {
                explanation: "Explicación o descripción.",
                resources: { /* Enlaces a sitios web, videos, etc. */ },
                activities: [ /* Lista de actividades recomendadas */ ]
              }
            }
          ]
        }
      ]
    }
  ]
};
