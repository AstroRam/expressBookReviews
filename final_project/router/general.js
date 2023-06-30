const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
// Get the book list available in the shop
public_users.get('/',(req, res)=>{
  //Write your code here
   res.send(JSON.stringify({books},null, 4 ))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res)=> {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_books = books.filter((books)=> books.isbn == isbn);
  res.send(filtered_books.isbn)
});
  
// Get book details based on author
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

//  Get book review
public_users.get('/reviews/:isbn',(req, res) => {
  const isbn = req.params.isbn;
  let filtered_books = books.filter((books)=> books.isbn == isbn);
  const splitString = filtered_books.split(" ");
  res.send(splitString[-1])
});

module.exports.general = public_users;
