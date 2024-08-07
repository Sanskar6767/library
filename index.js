let container = document.querySelector('#bookCardsContainer');

document.getElementById('showFormButton').addEventListener('click', function() {
    var form = document.getElementById('myForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});


class Book {
  constructor(bookname, author, pages, read) {
    this.name = bookname;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  
  
  toggleReadStatus() {
    this.read = !this.read;
  }

}


class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(index) {
    if (index >= 0 && index < this.books.length) {
      this.books.splice(index, 1);
    }
  }
}

const myLibrary = new Library();
myLibrary.addBook(new Book("1984", "George Orwell", 328, true));
myLibrary.addBook(new Book("To Kill a Mockingbird", "Harper Lee", 281, false));
myLibrary.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true))
myLibrary.addBook(new Book("One Hundred Years of Solitude", "Gabriel García Márquez", 417, false));

function addBookToLibrary() {
  let bookname = document.querySelector('[name="bookname"]').value;
  let author = document.querySelector('[name="author"]').value;
  let pages = document.querySelector('[name="pages"]').value;
  let readStatus = document.querySelector('input[name="readStatus"]:checked').value;
  let isRead = readStatus === 'read';

  let newBook = new Book(bookname, author, pages, isRead );
  myLibrary.addBook(newBook);
  
};



document.querySelector('#myForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let form = e.target;
    if (form.checkValidity()){
      addBookToLibrary();
      document.getElementById('myForm').reset(); // Form reset
      // Success msg
      let successMsg = document.getElementById('successMessage');
      successMsg.style.display = 'block';
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 3000);

      showBooks(myLibrary.books);
    } else {
      form.reportValidity();
    }
    
});

function showBooks(booksArray){
  container.innerHTML= '';
  for (let i = 0; i < booksArray.length; i++){
      let book = booksArray[i];
      let newDiv = document.createElement('div');
      newDiv.classList.add('magic-card');
      let innerdiv = document.createElement('div');
      innerdiv.classList.add('card-body');
      let name = document.createElement('h3');
      let author = document.createElement('h4');
      let pages = document.createElement('p');
      let read = document.createElement('button');
      read.setAttribute('data-index', i);
      name.textContent = book.name;
      author.textContent = ` By- ${book.author}`;
      pages.textContent = `Pages: ${book.pages}`;
      if (book.read){
          read.textContent = 'Read';
          read.classList.add('btn1');
          read.classList.add('btn-success');

      }else {
          read.textContent = 'Unread';
          read.classList.add('btn1');
          read.classList.add('btn-warning');
      }
      read.addEventListener('click', function(){
        let bookIndex = this.getAttribute('data-index');
        booksArray[bookIndex].toggleReadStatus();
        showBooks(booksArray);
      });
      let remove = document.createElement('button')
      remove.textContent = 'Remove'
      remove.addEventListener('click', function(){
        let bookIndex = parseInt(read.getAttribute('data-index'));
        // myLibrary.splice(bookIndex,1);
        myLibrary.removeBook(bookIndex);
        showBooks(myLibrary.books);
      });
      name.classList.add('card-title');
      author.classList.add('card-subtitle');
      author.classList.add('mb-2');
      author.classList.add('text-muted');
      pages.classList.add('card-text');
      remove.classList.add('btn');
      remove.classList.add('btn-outline-danger');
      innerdiv.appendChild(name);
      innerdiv.appendChild(author);
      innerdiv.appendChild(pages);
      innerdiv.appendChild(read);
      innerdiv.appendChild(remove);
      newDiv.appendChild(innerdiv);
      container.appendChild(newDiv);
  }
};


showBooks(myLibrary.books);

