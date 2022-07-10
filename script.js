const newBookButton = document.querySelector('.add-book-button');
const form = document.querySelector('form');
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const pages = document.querySelector(".pages");
const read = document.querySelector('.checkbox');
const closeFormButton = document.querySelector('.close-form-button');
const container = document.querySelector('.book-container');

const myLibrary = [];

newBookButton.addEventListener('click', function() {
    form.style.display = "block";
    closeFormButton.style.display = "block";
    newBookButton.disabled = true;
});

closeFormButton.addEventListener('click', function() {
    closeFormButton.style.display = "none";
    form.style.display = "none";
    newBookButton.style.display = "block";
    newBookButton.disabled = false;
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(array, book) {
    return array.push(book);
}

function createDiv() {
    lastValue = myLibrary[myLibrary.length - 1];
    lastIndex = myLibrary.indexOf(lastValue);

    cardContainer = document.createElement("div");
    cardContainer.dataset.index = lastIndex;
    cardContainer.classList.add('card-container');

    bookImage = document.createElement("div");
    bookImage.classList.add('book-image');
    cardContainer.appendChild(bookImage);

    textContainer = document.createElement("div");
    textContainer.classList.add('text-container');
    cardContainer.appendChild(textContainer);

    titleParagraph = document.createElement("p");
    titleParagraph.classList.add('text-paragraph');
    titleParagraph.innerText = `${myLibrary[lastIndex].title}`;
    textContainer.appendChild(titleParagraph);

    authorParagraph = document.createElement("p");
    authorParagraph.classList.add('text-paragraph');
    authorParagraph.innerText = `by ${myLibrary[lastIndex].author}`;
    textContainer.appendChild(authorParagraph);

    pagesParagraph = document.createElement("p");
    pagesParagraph.classList.add('text-paragraph');
    pagesParagraph.innerText = `${myLibrary[lastIndex].pages} pages`;
    textContainer.appendChild(pagesParagraph);

    buttonContainer = document.createElement("div");
    buttonContainer.classList.add('button-container');
    textContainer.appendChild(buttonContainer);

    container.appendChild(cardContainer);
}

function createReadButton() {
    readButton = document.createElement("button");
    readButton.classList.add("read-button");
    if (read.checked === true) {
        readButton.innerText = 'Read';
        readButton.classList.add("read");
    } else if (read.checked === false) {
        readButton.innerText = 'Not read';
        readButton.classList.add("not-read");
    }
    buttonContainer.appendChild(readButton);
}

function createRemoveButton() {
    removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.innerText = 'Remove';
    buttonContainer.appendChild(removeButton);
}


function submitForm() {
    addBookToLibrary(myLibrary, new Book(title.value, author.value, pages.value, read.checked));
    createDiv();
    createReadButton();
    createRemoveButton();
    form.reset();
}

function divLoop() {
    let i = 0;
    Array.from(container.children).forEach(el => el.dataset.index = i++);
}

container.addEventListener('click', event => {
    if (event.target.classList.contains('remove-button')) {
        myLibrary.splice(event.target.parentNode.parentNode.parentNode.dataset.index, 1);
        event.target.parentNode.parentNode.parentNode.remove();

        divLoop();

    } else if (event.target.classList.contains('read-button')) {
        if (event.target.innerText === 'Read') {
            event.target.innerText = 'Not read';
            myLibrary[event.target.parentNode.parentNode.parentNode.dataset.index].read = false;
            event.target.classList.add("not-read");
            event.target.classList.remove("read");
        } else {
            event.target.innerText = 'Read';
            myLibrary[event.target.parentNode.parentNode.parentNode.dataset.index].read = true;
            event.target.classList.add("read");
            event.target.classList.remove("not-read");
        }
    }
});