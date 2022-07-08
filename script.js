let form = document.querySelector('form');
let container = document.querySelector('.book-container');
let newBookButton = document.querySelector('.add-book-button');
let closeFormButton = document.querySelector('.close-form-button');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(array, book) {
    return array.push(book);
}

function submitForm() {

    let title = document.querySelector(".title").value;
    let author = document.querySelector(".author").value;
    let pages = document.querySelector(".pages").value;
    let read = document.querySelector('.checkbox').checked;
    addBookToLibrary(myLibrary, new Book(title, author, pages, read));

    let lastValue = myLibrary[myLibrary.length - 1];
    let lastIndex = myLibrary.indexOf(lastValue);

    let bookDiv = document.createElement("div");
    bookDiv.dataset.index = lastIndex;
    bookDiv.innerHTML = `Title: ${myLibrary[lastIndex].title} <br> Author: ${myLibrary[lastIndex].author} <br> Pages: ${myLibrary[lastIndex].pages} <br> `;
    container.appendChild(bookDiv);

    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.innerText = 'Remove';
    bookDiv.appendChild(removeButton);

    let readButton = document.createElement("button");
    readButton.classList.add("read-button");
    if (read === true) {
        readButton.innerText = 'Read';
    } else {
        readButton.innerText = 'Not read';
    }
    bookDiv.appendChild(readButton);

    form.reset();
}

function divLoop() {
    let i = 0;
    Array.from(container.children).forEach(el => el.dataset.index = i++);
}

container.addEventListener('click', event => {
    if (event.target.classList.contains('remove-button')) {
        myLibrary.splice(event.target.parentNode.dataset.index, 1);
        event.target.parentNode.remove();

        divLoop();

    } else if (event.target.classList.contains('read-button')) {
        if (event.target.innerText === 'Read') {
            event.target.innerText = 'Not read';
            myLibrary[event.target.parentNode.dataset.index].read = false;
        } else {
            event.target.innerText = 'Read';
            myLibrary[event.target.parentNode.dataset.index].read = true;
        }
    }
});

newBookButton.addEventListener('click', function() {
    newBookButton.style.display = "none";
    form.style.display = "block";
    closeFormButton.style.display = "block";
});

closeFormButton.addEventListener('click', function() {
    closeFormButton.style.display = "none";
    form.style.display = "none";
    newBookButton.style.display = "block";
});