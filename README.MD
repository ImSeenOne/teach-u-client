## 📝 Teach U Client

📌 **Teach U Client** es una aplicación web minimalista para organizar planes de estudio de manera estructurada. Creado con **Angular standalone**, permite agregar y gestionar **checklists**, guardar progreso en `localStorage`, activar un **modo oscuro persistente**, y copiar estructuras base JSON.

🌟 **Características principales**:  
✔️ Secciones y temas colapsables con checklists.  
✔️ Barra de navegación minimalista y responsiva.  
✔️ Modo oscuro **persistente** guardado en `localStorage`.  
✔️ Guarda el progreso en `localStorage`.  
✔️ **Botón flotante** para activar/desactivar modo oscuro.  
✔️ Copia la estructura JSON base de los planes al portapapeles.

---  

## 🖼️ Vista Previa

| ☀ **Modo Claro** | 🌙 **Modo Oscuro** |
|------------------|------------------|
| ![Light Mode](./screenshots/light-mode.png) | ![Dark Mode](./screenshots/dark-mode.png) |

---  

## 🚀 Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/ImSeenOne/teach-u-client.git
cd teach-u-client
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Ejecutar en modo desarrollo
```bash
ng serve
```
📌 Luego accede a `http://localhost:4200/`

---  

## 🏢 Estructura del Proyecto

```plaintext
teach-u-client/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── nav-bar/          # Barra de navegación
│   │   │   ├── plan/             # Plan de estudios con checklists
│   │   │   ├── dark-mode-toggle/ # Botón de modo oscuro
│   │   ├── services/
│   │   ├── app.component.ts      # Raíz del proyecto
│   │   ├── app.routes.ts         # Configuración de rutas (si se usa)
│   ├── assets/                   # Archivos estáticos
│   ├── styles.scss                # Estilos globales
│   ├── index.html                 # HTML principal
└── angular.json                   # Configuración de Angular
```

---  

## ✨ Funcionalidades

### 🎨 1. **Modo Oscuro** 🌙
- Se activa/desactiva con el **botón flotante** en la esquina inferior derecha.
- **Guarda la preferencia en `localStorage`**, por lo que no se pierde al recargar la página.
- Cambia el fondo, los colores de los textos y los temas de la UI.

🔧 **Ejemplo de cómo se almacena en `localStorage`**:
```json
{
  "darkModeOn": true
}
```

---  

### 📚 2. **Planes de Estudio con Checklists** ✅
- Cada sección tiene **temas y subtemas** que puedes **marcar como completados**.
- **Guarda automáticamente** el progreso en `localStorage`.
- Soporte para **expandir/colapsar secciones** y **barra de progreso**.

Ejemplo de estructura JSON interna:
```json
{
  "planTitle": "Mi Plan de Ejemplo",
  "sections": [
    {
      "id": "fundamentals",
      "title": "Fundamentos (2-3 semanas)",
      "topics": [
        {
          "title": "Dominio de FL Studio",
          "subtopics": [
            {
              "title": "Configuración Inicial Profesional",
              "content": {
                "explanation": "Config avanzada de audio/MIDI.",
                "activities": ["Crear plantilla", "Organizar samples"]
              }
            }
          ]
        }
      ]
    }
  ]
}
```

---  

### 📋 3. **Copiar JSON Base** 📎
- Al hacer **click** en `"GET JSON STRUCTURE"` dentro del navbar, la app copia automáticamente al **portapapeles** una estructura de ejemplo para planes de estudio.

---  

## 🛠️ Tecnologías Usadas

| Tecnología | Uso |
|------------|-----|
| **Angular (Standalone)** | Framework principal |
| **SCSS** | Estilos avanzados |
| **TypeScript** | Programación fuertemente tipada |
| **LocalStorage** | Guardado de progreso y modo oscuro |
| **Clipboard API** | Copia automática de JSON |

---  

## 🏆 Autor

Desarrollado por [**@ImSeenOne**](https://github.com/ImSeenOne) 💻🔥
