const apiURL = "http://localhost:3003/books";
let booksContainer = document.getElementById("book-section");

// CREATE (POST)
async function createBook(newBook) {
    await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook)
    });
}

// READ (GET)
async function getBooks() {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
}

// UPDATE (PUT)
async function updateBook(id, editedBook) {
    const response = await fetch(`${apiURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedBook)
    });

    if (response.ok) {
        console.log(`Libro con ID ${id} actualizado`);
        printBooks();
    } else {
        console.error("Error al actualizar el libro");
    }
}

// DELETE
async function deleteBook(id) {
    const response = await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    if (response.ok) {
        console.log(`Libro con ID ${id} eliminado`);
        printBooks();
    } else {
        console.error(`No se pudo eliminar el libro con ID ${id}`);
    }
}

// Mostrar libros en pantalla
async function printBooks() {
    const books = await getBooks();
    booksContainer.innerHTML = "";

    books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Autor:</strong> ${book.writer}</p>
            <p>${book.book_description}</p>
            <button class="delete-btn">Eliminar</button>
            <button class="edit-btn">Editar</button>
        `;

        bookElement.querySelector(".delete-btn").addEventListener("click", () => deleteBook(book.id));
        bookElement.querySelector(".edit-btn").addEventListener("click", () => showEditModal(book));

        booksContainer.appendChild(bookElement);
    });
}

// Escuchar envío del formulario
const form = document.getElementById("add-book-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newBook = {
        title: document.getElementById("title").value,
        writer: document.getElementById("writer").value,
        book_description: document.getElementById("book_description").value
    };
    await createBook(newBook);
    form.reset();
    printBooks();
});


// MODAL PARA EDITAR //
const modal = document.getElementById("edit-modal");
const titleInput = document.getElementById("edit-title");
const writerInput = document.getElementById("edit-writer");
const descInput = document.getElementById("edit-description");
const saveEditBtn = document.getElementById("save-edit");

let currentEditId = null;

function showEditModal(book) {
    currentEditId = book.id;
    titleInput.value = book.title;
    writerInput.value = book.writer;
    descInput.value = book.book_description;
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    currentEditId = null;
}

saveEditBtn.addEventListener("click", () => {
    if (!currentEditId) return;

    const editedBook = {
        title: titleInput.value,
        writer: writerInput.value,
        book_description: descInput.value
    };

    updateBook(currentEditId, editedBook);
    closeModal();
});

// Cierra modal al hacer clic fuera del contenido
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});