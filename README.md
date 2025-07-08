# book-app-vanilla

Este proyecto es una API REST que permite crear, leer, actualizar y eliminar libros. Además, incluye un frontend simple que consume esta API para gestionar tus libros favoritos.

1.Tecnologías usadas
Backend: Node.js 

Frontend: HTML, CSS y JavaScript (Fetch API para consumir la API)

Base de datos: JSON

2.Requisitos previos
Antes de empezar, asegúrate de tener instalado:

Node.js (para ejecutar el servidor backend)

Git (para clonar el repositorio)

3.Instalación y ejecución
3.1. Clonar el repositorio
bash
3.2.Copiar código
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo

3.3. Instalar dependencias
bash
Copiar código
npm install


3.4. Levantar la API Fake
Para arrancar el servidor API fake (por ejemplo con json-server), ejecuta:

bash
Copiar código
npm run api-fake
Este comando iniciará la API en:

bash
Copiar código
http://localhost:3003/books

4. Abrir el frontend
Abre el archivo index.html en tu navegador. Puedes abrirlo directamente haciendo doble clic o con Live Server en VSCode.

Desde el frontend podrás usar el formulario para agregar, editar y eliminar libros. El frontend se conecta a la API fake que levantaste en el paso anterior.

Scripts disponibles
npm run api-fake → Levanta el servidor API fake

npm start → (Si tienes un backend real, iniciar el servidor Express o similar)


5. Usar la API
Puedes interactuar con la API desde herramientas como Postman o desde el frontend incluido:

GET /books → Trae todos los libros.

POST /books → Crea un libro nuevo (envía JSON con title, writer y book_description).

PUT /books/:id → Actualiza un libro (por su ID).

DELETE /books/:id → Elimina un libro.

6. Ejecutar el frontend
Abre el archivo index.html en tu navegador (puedes hacer doble clic o abrir con tu editor).

Desde ahí podrás:

Agregar libros mediante el formulario.

Ver la lista de libros.

Editar o eliminar libros usando los botones correspondientes.

Importante: El frontend hace peticiones a la API en http://localhost:3003/books, asegúrate que tu servidor esté activo y la URL coincida.

7.Estructura del proyecto

/tu-repo
|-- src/
|   |-- services.js    (JavaScript que maneja las llamadas a la API)
|-- index.html         (Frontend para interactuar con la API)
|-- server.js          (Código del servidor backend)
|-- package.json       (Configuración de Node.js y dependencias)
|-- README.md          (Este archivo)
Comandos útiles
npm install → Instala dependencias para el backend

npm start → Inicia el servidor backend

git clone → Clona el proyecto a tu equipo

