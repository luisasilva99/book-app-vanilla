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
function updateBook(id, editedBook) {

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
let booksContainer = document.getElementById("book-section")
async function printBooks(){
    
    let listBooks = await getBooks();
    const printBookList = listBooks.map(book =>{
        return booksContainer.innerHTML += `<h2>${book.title}</h2>
        <p>${book.writer}</p>
        <p>${book.book_description}</p>
        <button onclick="deleteBook('${book.id}')">Eliminar</button>`
    });
    return printBookList                                  
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
