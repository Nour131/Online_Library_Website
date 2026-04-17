<!DOCTYPE html>
<html>
<head>
<title>Signup</title>

<style>
body {
    font-family: Arial, sans-serif;
    background-color: #e8dfcf;
    margin: 0;
}

/* Navbar */
.navbar {
    background-color: #6b4a3a;
    color: white;
    padding: 15px 30px;
    font-size: 20px;
    font-weight: bold;
}

/* Signup box */
.signup-container {
    width: 400px;
    margin: 60px auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    text-align: center;
}

.signup-container h2 {
    margin-bottom: 20px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 8px 0 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.radio-group {
    text-align: left;
    margin-bottom: 15px;
}

input[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: #6b4a3a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

input[type="submit"]:hover {
    background-color: #5a3d30;
}

a {
    display: block;
    margin-top: 15px;
    text-decoration: none;
    color: #6b4a3a;
}
</style>

</head>

<body>

<div class="navbar">
    Online Library
</div>

<div class="signup-container">
    <h2>Signup</h2>

    <form id="signupForm">
        <input type="text" id="username" placeholder="Username">
        <input type="email" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <input type="password" id="confirmPassword" placeholder="Confirm Password">

        <div class="radio-group">
            <strong>Account Type:</strong><br>
            <input type="radio" name="role" value="user"> User<br>
            <input type="radio" name="role" value="admin"> Admin
        </div>

        <input type="submit" value="Signup">
    </form>

    <a href="login.html">Go to Login</a>
</div>

<script>

// ================= SIGNUP LOGIC =================
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let role = document.querySelector('input[name="role"]:checked');

    // ===== VALIDATION =====
    if (!username || !email || !password || !confirmPassword) {
        alert("All fields are required!");
        return;
    }

    if (!role) {
        alert("Please select account type!");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Email format check
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Enter valid email!");
        return;
    }

    // ===== LOCAL STORAGE =====
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check duplicate email
    let exists = users.find(u => u.email === email);
    if (exists) {
        alert("Email already exists!");
        return;
    }

    let newUser = {
        id: Date.now(), // unique id
        username: username,
        email: email,
        password: password,
        role: role.value
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");

    // redirect
    window.location.href = "login.html";
});
</script>

</body>
</html>
