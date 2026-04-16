// Get current user
document.addEventListener("DOMContentLoaded", function () {

    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let navLinks = document.getElementById("nav-links");

    if (!navLinks) return; // safety

    if (!currentUser) {
        navLinks.innerHTML = `
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="signup.html">Sign Up</a></li>
        `;
    } 
    else if (currentUser.role === "user") {
        navLinks.innerHTML = `
            <li><a href="User_search.html">Search</a></li>
            <li><a href="borrow_book.html">Borrow Book</a></li>
            <li><a href="User_books_list.html">Available Books</a></li>
            <li><a href="borrowed_books.html">My Borrowed Books</a></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        `;
    } 
    else if (currentUser.role === "admin") {
        navLinks.innerHTML = `
            <li><a href="Admin_search.html">Search</a></li>
            <li><a href="Admin_books_list.html">View Books</a></li>
            <li><a href="add_book.html">Add Book</a></li>
            <li><a href="edit_book.html">Edit Book</a></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        `;
    }

});

// logout outside


// SIGNUP FUNCTION

// LOGIN FORM
