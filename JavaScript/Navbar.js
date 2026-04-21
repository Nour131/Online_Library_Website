// Get current user
document.addEventListener("DOMContentLoaded", function () {

    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let navLinks = document.getElementById("nav-links");

    if (!navLinks) return; // safety

    if (currentUser) {
        document.body.className = currentUser.role; // "user" or "admin"
    }

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
            <li><a href="search.html">Search</a></li>
            <li><a href="borrow_book.html">Borrow Book</a></li>
            <li><a href="books_list.html">Available Books</a></li>
            <li><a href="borrowed_books.html">My Borrowed Books</a></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        `;
    } 
    else if (currentUser.role === "admin") {
        navLinks.innerHTML = `
            <li><a href="search.html">Search</a></li>
            <li><a href="books_list.html">View Books</a></li>
            <li><a href="add_book.html">Add Book</a></li>
            <li><a href="edit_book.html">Edit Book</a></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        `;
    }

});

// logout outside
function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "Guest_navbar.html";
}

function login(email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "admin") {
        window.location.href = "search.html";
    } else {
        window.location.href = "search.html";
    }
    } else {
        alert("Invalid login");
    }
}
// SIGNUP FUNCTION
document.getElementById("signupForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let role = document.querySelector('input[name="role"]:checked')?.value;

    if (!role) {
        alert("Please select account type");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let existingUser = users.find(u => u.email === email);
    if (existingUser) {
        alert("Email already registered");
        return;
    }

    let newUser = {
        username,
        email,
        password,
        role
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    sessionStorage.setItem("currentUser", JSON.stringify(newUser));

    // redirect
    if (role === "admin") {
        window.location.href = "Admin_navbar.html";
    } else {
        window.location.href = "User_navbar.html";
    }
});
// HANDLE LOGIN FORM
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));

        if (user.role === "admin") {
            window.location.href = "Admin_navbar.html";
        } else {
            window.location.href = "User_navbar.html";
        }
    } else {
        alert("Invalid email or password");
    }
});
