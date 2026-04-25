# 🎬 Oscar Movies - Frontend

Aplicación Angular para visualizar y gestionar las películas ganadoras del Oscar a Mejor Película (1927-2025).

![Angular](https://img.shields.io/badge/Angular-21-red.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Descripción

Aplicación web completa para explorar el catálogo de películas ganadoras del Oscar. Incluye operaciones CRUD, búsquedas avanzadas y visualización de posters en alta calidad.

### Características

- ✅ Listado completo de 98 películas (1927-2025)
- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
- 🔍 Búsquedas avanzadas (título, director, año, rango de años)
- 🖼️ Posters de alta calidad desde Cloudinary CDN
- 📱 Interfaz responsive (funciona en móvil, tablet y desktop)
- 🎨 Diseño moderno con Bootstrap 5
- ⚡ Actualización en tiempo real

## 🚀 Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Angular | 21 | Framework principal |
| TypeScript | 5.x | Lenguaje de programación |
| Bootstrap | 5.3 | Diseño y componentes UI |
| RxJS | 7.x | Manejo de peticiones asíncronas |
| HttpClient | - | Comunicación con API REST |
| Cloudinary | - | CDN para posters |

## 📁 Estructura del proyecto
src/app/
├── core/ # Servicios e interceptores globales

│ └── services/

│ └── movie.service.ts

├── features/ # Módulos funcionales

│ └── movies/

│ ├── components/ # Componentes de UI

│ │ ├── movie-list/

│ │ ├── movie-form/

│ │ └── movie-detail/

│ ├── services/ # Servicios específicos

│ ├── models/ # Interfaces TypeScript

│ └── movies.module.ts

├── shared/ # Componentes reutilizables

├── layout/ # Layout components

├── app-routing.module.ts # Configuración de rutas

└── app.module.ts # Módulo principal


## 🔧 Instalación y configuración

### Prerrequisitos

- Node.js 18.19 o superior
- npm 9.x o superior
- Backend Spring Boot corriendo (ver [oscar-movies-backend](https://github.com/manuel101284/oscar-movies-backend))

### Pasos

**1. Clonar el repositorio**

```bash
git clone https://github.com/manuel101284/oscar-movies-frontend.git
cd oscar-movies-frontend
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Configurar la URL del backend**

Edita src/environments/environment.ts:
typescript

```bash
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'  // URL de tu backend
};
```

**4. Ejecutar la aplicación**
La aplicación estará disponible en: http://localhost:4200

```bash
ng serve --open
```

**5. 🎯 Funcionalidades**

Página principal

    Grilla de películas con posters

    Barra de búsqueda y filtros

    Botones para crear, editar, eliminar y ver detalles

Modal de detalles

    Información completa de la película

    Poster en tamaño mediano

    Datos de director, actores, duración

Formulario

    Crear nuevas películas

    Editar películas existentes

    Validación de campos requeridos

Búsquedas disponibles

    Por título de película

    Por nombre del director

    Por año de estreno

    Por rango de años

    Películas recientes

**6. 📡 Conexión con el backend**

Este frontend consume la API REST del backend:

typescript

```bash
// Ejemplo de servicio
getAllMovies(): Observable<Movie[]> {
  return this.http.get<Movie[]>(`${this.apiUrl}/movies-oscar`);
}
```

**7. 🛠️ Comandos útiles**

```bash
# Servidor de desarrollo
ng serve
```

```bash
# Build para producción
ng build --prod
```

```bash
# Ejecutar pruebas unitarias
ng test
```

```bash
# Ejecutar pruebas end-to-end
ng e2e
```

```bash
# Generar nuevo componente
ng generate component nombre-componente
```

```bash
# Generar nuevo servicio
ng generate service nombre-servicio
```

**8. 🖼️ Gestión de imágenes**

Los posters se almacenan en Cloudinary y se sirven a través de CDN para una carga rápida:
html

<img [src]="movie.posterUrlMovie" 
     [alt]="movie.titleMovie"
     class="img-fluid">

**9. 🔐 Seguridad**

    CORS configurado en el backend para permitir http://localhost:4200

    Las credenciales se manejan mediante variables de entorno

    Sin información sensible en el frontend

**10. 🐛 Solución de problemas comunes**
Error de conexión con el backend

    Verificar que el backend esté corriendo en http://localhost:8080

    Revisar la configuración CORS en el backend

Los posters no se cargan

    Verificar que las URLs de Cloudinary sean correctas

    Revisar la conexión a internet

Errores de compilación

    Eliminar node_modules y ejecutar npm install nuevamente

**11. 🌐 Backend**

Este frontend está diseñado para funcionar con el backend:

[oscar-movies-backend](https://github.com/manuel101284/oscar-movies-backend)

**12. 📄 Licencia**

MIT License


**13. ✒️ Autor**

Manuel Ricardo Castellanos - [GitHub](https://github.com/manuel101284)