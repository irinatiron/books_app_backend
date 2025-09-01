# Book App  

## 🚀 Instalación y uso  

### Prerrequisitos  
- Node.js (versión 16 o superior)  
- npm o yarn  
- MySQL instalado y en funcionamiento  
- Crear base de datos (`books_app` en este proyecto)  

### Configuración de variables de entorno  

1. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DB_NAME=books_app
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_DIALECT=mysql
````

2. Cifrar `.env` usando .dotenvx:

```env
npx dotenvx encrypt
```
Esto generará un archivo seguro para producción. No subir nunca a GitHub .env y .env.keys.

### Pasos de instalación

1. Instalar dependencias:

```env
npm install
````

2. Ejecutar la aplicación en desarrollo:

```env
node app.js
```

El servidor arrancará en `http://localhost:8000/`.
Puedes probar los endpoints con Postman o cualquier cliente HTTP:
- GET `/books` – Obtener todos los libros
- GET `/books/:id` – Obtener un libro por id
- POST `/books` – Crear un nuevo libro
- PUT `/books/:id` – Actualizar un libro
- DELETE `/books/:id` – Eliminar un libro

### Testing

Ejecutar tests (si los tienes configurados con Jest y Supertest):

```env
npm test
````

## 📁 Estructura del proyecto
     
    API-BOOK/
    ├──.gitignore                    # Archivos que no se deben subir a GitHub
    ├──app.js                        # Archivo principal
    ├──package.json                  # Define las dependencias, scripts y metadatos del proyecto.
    ├──package-lock.json             # Registra las versiones exactas de las dependencias instaladas.
    ├──.env                          # Credenciales cifradas con .dotenvx
    ├──.env.keys                     # Key de cifrado con .dotenvx
    ├──.env.example                  # Ejemplo para variables del entorno
    ├──README.md                     # Documentación del proyecto
    ├──test/                         # Tests
    ├──routes/                       # Rutas
    ├──models/                       # Modelos
    ├──database/                     # Base de datos   
    └──controllers/                  # Controladores
    

## 🛠️ Tecnologías utilizadas

- **Node.js** – Entorno de ejecución de JavaScript
- **Express** – Framework web para Node.js
- **MySQL2** – Cliente MySQL para Node.js
- **Sequelize** – ORM para Node.js y bases de datos SQL
- **dotenvx** – Gestión de variables de entorno cifradas
- **Jest** – Framework de testing para JavaScript
- **Supertest** – Librería para pruebas de endpoints HTTP

