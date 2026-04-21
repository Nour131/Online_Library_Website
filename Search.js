
/*localStorage.removeItem("books");*/

const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if (currentUser?.role === "admin") {
  console.log("Admin view");
  // You can add admin-only features here
} else {
  console.log("User view");
}


if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify(books));
}

function searchBooks() {
  const query = document.querySelector("input").value.trim().toLowerCase();

  // Validation
  if (query === "") {
    alert("Please enter something to search");
    return;
  }

  const books = JSON.parse(localStorage.getItem("books")) || [];

  const results = books.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query) ||
    book.category.toLowerCase().includes(query)
  );

  displayResults(results);
}

function displayResults(results) {
  const container = document.getElementById("resultsContainer");
  container.innerHTML = "";

    if (results.length === 0) {
        container.innerHTML = `<p class="no-results">No books found </p>`;
        return;
    }

  results.forEach(book => {
    const bookCard = `
    <div class="book-card">
      <img src="${book.image}" alt="${book.title}">
      <div class="book-info">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category}</p>
    </div>
  </div>
`;

    container.innerHTML += bookCard;
  });
}
