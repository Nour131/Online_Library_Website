let form = document.getElementById("borrowForm");
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    let bookId = document.getElementById("bookid").value;
    let bookName = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let category = document.getElementById("category").value;

    // Check mandatory fields
    if (bookId == "" || bookName == "") {
        alert("Please fill in all required fields...");
        return;
    }

    // Get the logged-in user from localStorage
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("You must be logged in to borrow a book.");
        window.location.href = "login.html";
        return;
    }

    // Check if the book exists in localStorage
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let book = books.find(b => b.id === bookId);
    if (!book) {
        alert("Book ID not found in the library. Please check and try again...");
        return;
    }

    // Check if the book is available
    if (book.available === false) {
        alert("Sorry, this book is currently not available for borrowing.");
        return;
    }

    // Check if the user already borrowed this book and hasn't returned it
    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    let alreadyBorrowed = borrowedBooks.some(b => b.bookId === bookId && b.userId === currentUser.id && b.status === "Borrowed");
    if (alreadyBorrowed) {
        alert("You have already borrowed this book. Please return it first.");
        return;
    }

    // Create a new borrow record
    let newBorrow = {
        borrowId: Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
        bookId: bookId,
        bookName: bookName,
        author: author || book.author,
        category: category || book.category,
        status: "Borrowed"
    };

    // Save borrow record to localStorage
    borrowedBooks.push(newBorrow);
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

    // Mark the book as unavailable
    book.available = false;
    localStorage.setItem("books", JSON.stringify(books));

    alert("Book borrowed successfully!");
    window.location.href = "borrowed_books.html";
});
