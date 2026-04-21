document.addEventListener("DOMContentLoaded", function () {

    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const isAdmin = currentUser?.role === "admin";

    let books = JSON.parse(localStorage.getItem("books")) || [];
    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    let tbody = document.getElementById("bookTableBody");
    tbody.innerHTML = "";

    if (books.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No books available.
                </td>
            </tr>
        `;
        return;
    }

    books.forEach(book => {

        let isBorrowed = borrowedBooks.some(
            b => String(b.bookId) === String(book.id) && b.status === "Borrowed"
        );

        let status = (!book.available || isBorrowed) ? "Borrowed" : "Available";

        let row = document.createElement("tr");


        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${status}</td>
            <td>
                <a href="book_details.html?id=${book.id}">View</a>
            </td>
        `;

        tbody.appendChild(row);
    });

});
