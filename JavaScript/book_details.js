document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");

    if (!bookId) {
        alert("No book selected.");
        window.location.href = "User_books_list.html";
        return;
    }

    let books = JSON.parse(localStorage.getItem("books")) || [];
    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    let book = books.find(b => String(b.id) === String(bookId));
    if (!book) {
        alert("Book not found.");
        window.location.href = "User_books_list.html";
        return;
    }

    function isBorrowedByUser() {
        let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
        return borrowedBooks.some(
            b => String(b.bookId) === String(book.id) && b.status === "Borrowed"
        );
    }

    function getStatus() {
        return (!book.available || isBorrowedByUser()) ? "Borrowed" : "Available";
    }

    // Fill static data
    document.getElementById("bookTitle").textContent = book.title;
    document.getElementById("bookAuthor").textContent = book.author;
    document.getElementById("bookCategory").textContent = book.category;
    document.getElementById("bookDescription").textContent = book.description;
    document.getElementById("bookImage").src = book.image;

    function renderStatusAndButtons() {
        const status = getStatus();
        const statusElement = document.getElementById("bookStatus");
        statusElement.textContent = status;
        statusElement.className = "";
        statusElement.classList.add(status === "Available" ? "available" : "borrowed");

        const borrowSection = document.getElementById("borrowSection");

        if (status === "Available") {
            borrowSection.innerHTML = `
                <button id="borrowBtn" class="borrow-btn">Borrow Book</button>
            `;
            document.getElementById("borrowBtn").addEventListener("click", handleBorrow);
        } else if (isBorrowedByUser()) {
            borrowSection.innerHTML = `
                <button id="returnBtn" class="return-btn">Return Book</button>
            `;
            document.getElementById("returnBtn").addEventListener("click", handleReturn);
        } else {
            // Borrowed by someone else
            borrowSection.innerHTML = `<p class="unavailable-msg">This book is currently unavailable.</p>`;
        }
    }

    function handleBorrow() {
        let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

        let alreadyBorrowed = borrowedBooks.some(
            b => String(b.bookId) === String(book.id) && b.status === "Borrowed"
        );
        if (alreadyBorrowed) {
            alert("You have already borrowed this book. Please return it first.");
            return;
        }

        let newBorrow = {
            borrowId: Date.now(),
            userId: "guest",
            userName: "Guest",
            bookId: String(book.id),
            bookName: book.title,
            author: book.author || "",
            category: book.category || "",
            status: "Borrowed"
        };

        borrowedBooks.push(newBorrow);
        localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

        // Mark book as unavailable
        let books = JSON.parse(localStorage.getItem("books")) || [];
        let b = books.find(b => String(b.id) === String(book.id));
        if (b) {
            b.available = false;
            localStorage.setItem("books", JSON.stringify(books));
            book.available = false;
        }

        alert("Book borrowed successfully!");
        renderStatusAndButtons();
    }

    function handleReturn() {
        let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
        borrowedBooks = borrowedBooks.map(b => {
            if (String(b.bookId) === String(book.id) && b.status === "Borrowed") {
                return { ...b, status: "Returned" };
            }
            return b;
        });
        localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

        // Mark book as available again
        let books = JSON.parse(localStorage.getItem("books")) || [];
        let b = books.find(b => String(b.id) === String(book.id));
        if (b) {
            b.available = true;
            localStorage.setItem("books", JSON.stringify(books));
            book.available = true;
        }

        alert("Book returned successfully!");
        renderStatusAndButtons();
    }

    renderStatusAndButtons();
});
