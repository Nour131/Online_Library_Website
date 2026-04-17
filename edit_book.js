let form = document.getElementById("editBookForm");
form.addEventListener("submit", function(event) { //when user clicks submit button, this function will be called
    event.preventDefault(); // Prevent the default form submission



    let id = document.getElementById("BOOKID").value;
    let name = document.getElementById("BOOKNAME").value;
    let author = document.getElementById("AUTHOR").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("desc").value;

    let books = JSON.parse(localStorage.getItem("books")) || []; // Retrieve existing books from localStorage or initialize an empty array

    let book = books.find(b => b.id === id); // Find the book with the matching ID
    if (!book) {
        alert("Book not found!");
        return;
    }


    // Update the book's information with the new values if they are not empty
    if (name != "") book.name = name;
    if (author != "") book.author = author;
    if (category != "") book.category = category;
    if (description != "") book.description = description;

    localStorage.setItem("books", JSON.stringify(books)); // Save the updated array back to localStorage

    alert("Book updated successfully!");


});

function deleteBook() {
    let id = document.getElementById("BOOKID").value;
    if (id == "") {
        alert("Please enter the book ID to delete...");
        return;
    }
    if (confirm("Are you sure you want to delete this book?")) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        let newbooks = books.filter(b => b.id !== id);
        localStorage.setItem("books", JSON.stringify(newbooks));
        alert("Book deleted successfully!");
    }
}