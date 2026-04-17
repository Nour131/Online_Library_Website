document.addEventListener("DOMContentLoaded", function () {

    // Get book ID from URL
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");

    if (!bookId) {
        alert("No book selected.");
        window.location.href = "User_books_list.html";
        return;
    }

    let books = JSON.parse(localStorage.getItem("books")) || [];
    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    // Find the selected book
    let book = books.find(b => String(b.id) === String(bookId));

    if (!book) {
        alert("Book not found.");
        window.location.href = "User_books_list.html";
        return;
    }

    // Check borrowed status
    let isBorrowed = borrowedBooks.some(b =>
        String(b.bookId) === String(book.id) &&
        b.status === "Borrowed"
    );

    let status = (!book.available || isBorrowed) ? "Borrowed" : "Available";

    // Fill data
    document.getElementById("bookTitle").textContent = book.title;
    document.getElementById("bookAuthor").textContent = book.author;
    document.getElementById("bookCategory").textContent = book.category;
    document.getElementById("bookDescription").textContent = book.description;
    document.getElementById("bookStatus").textContent = status;
    document.getElementById("bookImage").src = book.image;

    // Borrow button logic
    let borrowSection = document.getElementById("borrowSection");

    if (status === "Available") {
        borrowSection.innerHTML = `
            <a href="borrow_book.html" class="back-button">
                Borrow Book
            </a>
        `;
    } else {
        borrowSection.innerHTML = `
            <button class="back-button" style="background-color:gray;" disabled>
                Not Available
            </button>
        `;
    }

});