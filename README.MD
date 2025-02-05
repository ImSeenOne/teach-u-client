# Plan de Estudios de Producción Musical

Este proyecto consiste en una **página web interactiva** que presenta un plan de estudios de producción musical.  
Incluye:
- **Título dinámico** (tomado desde un objeto `studyPlan` en JavaScript).  
- **Estructura colapsable** con animaciones suaves para cada sección.  
- **Checkboxes** que permiten marcar subtemas, temas y secciones completas, reflejando el avance.  
- **Barra de progreso** por sección.  
- **Guardado de progreso** en el `localStorage`, para que no se pierdan los checkmarks al cerrar la pestaña.

![Vista previa del proyecto](https://via.placeholder.com/800x400?text=Vista+Previa+Proyecto)

## Características

1. **Título Dinámico**  
   El título `<h1>` de la página se genera según el valor de `studyPlan.planTitle`, dentro del archivo JavaScript. Esto permite cambiar el nombre del plan sin editar el HTML directamente.

2. **Expandir/Colapsar Secciones**  
   - Cada sección tiene un encabezado con un **checkbox** y una **flecha**.  
   - Al hacer clic en el encabezado (exceptuando el checkbox), se realiza una animación que expande/colapsa el contenido.

3. **Animaciones Suaves**  
   - El colapso/expansión se basa en la propiedad `max-height` con transición (`transition: max-height 0.4s ease;`).

4. **Checkboxes Enlazados**  
   - Marcar un subtema influye en el estado de su tema.  
   - Marcar un tema marca o desmarca todos sus subtemas.  
   - Marcar una sección completa marca o desmarca todos los temas y subtemas.

5. **Barra de Progreso por Sección**  
   - Cada sección muestra cuántos subtemas se han completado, con una barra que va aumentando en longitud a medida que se marcan casillas.

6. **Persistencia en `localStorage`**  
   - Todos los checkboxes se guardan automáticamente.  
   - Si cierras la pestaña o recargas, el progreso se conserva.

## Cómo usar

### 1. Descarga o Clona el Proyecto
Puedes **descargar** este repositorio como `.zip` o usar `git clone`:
```bash
git clone https://github.com/usuario/plan-estudios-produccion-musical.git
