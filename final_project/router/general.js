const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// public_users.post("/register", (req,res) => {
//   //Write your code here
//   books.push({"firstname":req.query.firstName, "lastName":req.query.lastName,"email"})
//   return res.status(300).json({message: "Yet to be implemented"});
// });

public_users.post("/register", (req,res) => {
  const username = req.param.username;
  const password = req.param.password;
  if (username && password) {
    if (!doesExist(username)) { 
      books.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
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
public_users.get('/review/:isbn',(req, res)=> {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_isbn = books.filter((books) => books.isbn === isbn);
  if (filtered_isbn.length > 0) {
      let filtered_isbn = filtered_isbn[0];
      let review = req.query.review;
      //if review has changed
      if(review) {
          filtered_isbn.review = review
      }
  
  books = books.filter((books)=> books.email != email);
  books.push(filtered_isbn);
  res.send('User with the isbn ${isbn} updated.');
}
else{
    res.send("Unable to find the book");
}
});

module.exports.general = public_users;
