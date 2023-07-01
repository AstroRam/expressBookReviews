const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
// registering username and password
let users = require("./auth_users.js").users;
const public_users = express.Router();
// let users = []

public_users.post("/register", (req,res) => {
    const username = req.params.username;
    const password = req.params.password;
    if (username && password) {
      if (!doesExist(username)) { 
        // res.send(` Username: ${username} Password: ${password}`)
        users.push({"username":username, "password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }  
    return res.status(404).json({message: "Unable to register user."})
    ;
});  

public_users.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.params.username;
    let password = req.params.password;
    res.send(`Username: ${username} Password: ${password}`);
});

// Get the book list available in the shop
public_users.get('/',(req, res)=>{
  //Write your code here
   res.send(JSON.stringify({books},null, 4 ))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res)=> {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_books = books.filter((books)=> books.isbn === isbn);
  res.send(filtered_books)
});  

// public_users.get('/author/:author',function (req, res) {
public_users.get('/author/:author', (req, res)=> {
  //Write your code here
  const author = req.params.author
  let filtered_author = books.filter((books)=> books.author===author);
  res.send(filtered_author)
});

// Get all books based on title
public_users.get('/title/:title', (req, res)=> {
  //Write your code here
  const title = req.params.title
  let filtered_title = books.filter((books)=>books.title===title);
  res.send(filtered_title)
});

// Get book details based on ISBN
public_users.get('/reviews/:isbn', (req, res)=> {
    //Write your code here
    const isbn = req.params.isbn;
    const reviews = req.params.reviews;
    let filtered_books = books.filter((books)=> books.isbn === isbn);
    let filtered_reviews = filtered_books.filter((filtered_books)=> filtered_books.reviews===reviews);
    res.send(filtered_reviews)
});  


//addimg modifying a book review
router.put("admod/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.params.reviews;
    let filtered_books = books.filter((books) => books.isbn === isbn);
    if (filtered_books.length) {
        let filtered_book = filtered_books[0];
        let review = req.query.reviews;
        //if the DOB has changed
        if(review) {
            filtered_book.reviews = review
        }
        /*
        Include code here similar to the one above for other attibutes
        */
        books = books.filter((books) => books.isbn != isbn);
        books.push(filtered_book);
        res.send(`User with the email  ${email} updated.`);
    }
    else{
        res.send("Unable to find user!");
    }
  });

module.exports.general = public_users;
