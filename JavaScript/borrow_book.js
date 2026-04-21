let form = document.getElementById("borrowForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let bookId = document.getElementById("bookid").value.trim();
    let bookName = document.getElementById("bookName").value.trim();
    let author = document.getElementById("author").value.trim();
    let category = document.getElementById("category").value.trim();

    if (bookId === "" || bookName === "") {
        alert("Please fill in all required fields...");
        return;
    }

    let borrowedBooks = [];
    try {
        borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    } catch(e) { borrowedBooks = []; }

    let alreadyBorrowed = borrowedBooks.some(
        b => String(b.bookId) === String(bookId) && b.status === "Borrowed"
    );
    if (alreadyBorrowed) {
        alert("You have already borrowed this book. Please return it first.");
        return;
    }

    let newBorrow = {
        borrowId: Date.now(),
        userId: "guest",
        userName: "Guest",
        bookId: String(bookId),
        bookName: bookName,
        author: author || "",
        category: category || "",
        status: "Borrowed"
    };

    borrowedBooks.push(newBorrow);
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

    // Also mark the book as unavailable in the books list
    let books = [];
    try {
        books = JSON.parse(localStorage.getItem("books")) || [];
    } catch(e) { books = []; }

    let book = books.find(b => String(b.id) === String(bookId));
    if (book) {
        book.available = false;
        localStorage.setItem("books", JSON.stringify(books));
    }

    alert("Book borrowed successfully!");
    window.location.href = "borrowed_books.html";
});
