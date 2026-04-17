// Load and display the current user's borrowed books
function loadBorrowedBooks() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("You must be logged in to view this page.");
        window.location.href = "login.html";
        return;
    }

    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    // Filter: only show records belonging to this user
    let myBorrows = borrowedBooks.filter(b => b.userId === currentUser.id);

    let tbody = document.getElementById("borrowedTableBody");
    tbody.innerHTML = ""; // Clear old rows

    if (myBorrows.length === 0) {
        tbody.innerHTML = "<tr><td colspan='7' style='text-align:center;'>You have no borrowed books.</td></tr>";
        return;
    }

    // Build one row for each borrow record
    for (let i = 0; i < myBorrows.length; i++) {
        let borrow = myBorrows[i];

        let row = document.createElement("tr");
        row.innerHTML =
            "<td>" + borrow.bookId + "</td>" +
            "<td>" + borrow.bookName + "</td>" +
            "<td>" + borrow.author + "</td>" +
            "<td>" + borrow.category + "</td>" +
            "<td>" + borrow.status + "</td>" +
            "<td>" + (borrow.status === "Borrowed"
                ? "<button onclick='returnBook(" + borrow.borrowId + ")'>Return</button>"
                : "Returned") +
            "</td>";

        tbody.appendChild(row);
    }
}

// Return a book
function returnBook(borrowId) {
    let confirmed = confirm("Are you sure you want to return this book?");
    if (!confirmed) return;

    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    // Find the borrow record
    let record = borrowedBooks.find(b => b.borrowId === borrowId);
    if (!record) {
        alert("Record not found.");
        return;
    }

    // Update status to Returned
    record.status = "Returned";
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

    // Mark the book as available again
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let book = books.find(b => b.id === record.bookId);
    if (book) {
        book.available = true;
        localStorage.setItem("books", JSON.stringify(books));
    }

    alert("Book returned successfully!");
    loadBorrowedBooks(); // Refresh the table
}

// Run when the page loads
loadBorrowedBooks();
