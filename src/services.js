//Create método POST
async function createBook(newBook) {
    await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
    });
}
//Read método GET
async function getBooks() {
    const response = await fetch("http://localhost:3000/books", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const bookData = await response.json()
    console.log(bookData)
    return bookData 
}
console.log(getBooks())

//Update método PUT

async function updateBook(id, editedBook) {
    const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedBook)
    });

    if (response.ok) {
        console.log(`Libro con ID ${id} actualizado`);
        printBooks(); // Vuelve a mostrar los libros actualizados
    } else {
        console.error("Error al actualizar el libro");
    }
}
function editBookPrompt(book) {
    console.log("Editando libro:", book); // Debug

    const newTitle = prompt("Nuevo título:", book.title);
    const newWriter = prompt("Nuevo autor:", book.writer);
    const newDescription = prompt("Nueva descripción:", book.book_description);

    if (!newTitle || !newWriter || !newDescription) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const editedBook = {
        title: newTitle,
        writer: newWriter,
        book_description: newDescription
    };

    updateBook(book.id, editedBook);
}
//Detele método DELETE
async function deleteBook(id){
    const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        console.log(`Libro con ID ${id} eliminado`);
        printBooks()
    } else {
        console.log(`Libro con ID ${id} eliminado`);
    }
}
//imprimir
let booksContainer = document.getElementById("book-section");

async function printBooks() {
    let listBooks = await getBooks();
    booksContainer.innerHTML = ""; // Limpiar antes de volver a renderizar

    listBooks.forEach(book => {
        const bookElement = document.createElement("div");

        bookElement.innerHTML = `
            <h2>${book.title}</h2>
            <p>${book.writer}</p>
            <p>${book.book_description}</p>
            <button class="delete-btn">Eliminar</button>
            <button class="edit-btn">Editar</button>
        `;

        const deleteBtn = bookElement.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => deleteBook(book.id));

        const editBtn = bookElement.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => editBookPrompt(book));

         booksContainer.appendChild(bookElement);
    });
}

// Escuchar envío del formulario
const form = document.getElementById("add-book-form");
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener los valores del formulario
    const newBook = {
        title: document.getElementById("title").value,
        writer: document.getElementById("writer").value,
        book_description: document.getElementById("book_description").value
    };

    // Crear el nuevo libro
    await createBook(newBook);

    // Limpiar el formulario
    form.reset();

    // Volver a imprimir los libros
    printBooks();
});
