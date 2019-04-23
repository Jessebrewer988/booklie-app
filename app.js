// Book Class: Represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handles User Interface
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'Bob Smith',
                isbn: '123412341234'
            },
            {
                title: 'Book Two',
                author: 'Sally Smith',
                isbn: '987654321'
            }
        ];

        const books = StoredBooks;
        // Cache the length, pre-loop
        let booksLength = books.length;

        for (let book = 0; book < booksLength; book++) {
            UI.addBookToList(books[book]);
            console.log(books)
        }
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt"></i></a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(book) {
        if (book.classList.contains('delete')) {
            book.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}

// Store Class: Handles Local Storage

// Events: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book to the List
document.querySelector('#book-form').addEventListener('submit', (e) =>
{
    // Stop actual submit
    e.preventDefault();
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Clear form fields
    UI.clearFields();
})

// Event: Remove a Book from the Table and Storage
document.querySelector('#book-list').addEventListener('click', e => {
    let book = e.target;
    UI.deleteBook(book);
});
