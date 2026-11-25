# Task-Manager-and-API-Rest-Monitor-on-Express.js
# Demo Visual de Express.js – Gestor de Tareas y Monitor de Middlewares

Aplicación web *full-stack* desarrollada con **Node.js** y **Express.js** para el curso de **JavaScript Avanzado**. El proyecto demuestra de forma visual e interactiva cómo funciona una API RESTful, el ciclo *Request-Response* y la ejecución de middlewares en tiempo real.

## Características principales

* **API REST completa (CRUD en memoria):** Permite listar, crear, actualizar y eliminar tareas mediante los métodos HTTP `GET`, `POST`, `PUT` y `DELETE`.
* **Monitor de Middlewares en vivo:** Un middleware personalizado intercepta cada petición dirigida a `/api/tareas`, mide su tiempo de respuesta en milisegundos y registra el código de estado HTTP (`200`, `201`, `304`, `404`) en un panel visual.
* **Servidor de archivos estáticos:** Utiliza `express.static('public')` para servir el frontend (HTML, CSS y JavaScript con Fetch API) desde el mismo servidor Express.
* **Simulación de errores:** Incluye un botón dedicado para forzar una petición inválida y demostrar el manejo controlado de códigos `404`.

## Tecnologías utilizadas

* **Backend:** Node.js, Express.js
* **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
* **Despliegue:** Render

## Estructura del proyecto

```text
demo-express/
├── index.js          # Servidor Express, middlewares y rutas de la API
├── package.json      # Dependencias y scripts de ejecución
└── public/
    └── index.html    # Interfaz visual (Gestor de Tareas + Monitor en vivo)
