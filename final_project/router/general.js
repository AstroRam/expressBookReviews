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



public_users.get('/', (req, res)=> {
// Get the book list available in the shop
  let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },6000)});
        
  //Write your code here
  //Console log before calling the promise
    console.log("Before calling promise");


    res.send(JSON.stringify({books},null, 4 ))

    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
      })
    
      console.log("After calling promise");  
})
    







  
// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res)=> {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },6000)});
    
    
    console.log("Before calling promise");
  //Write your code here
    const isbn = req.params.isbn;
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
      })    
    let filtered_books = books.filter((books)=> books.isbn === isbn);
    res.send(filtered_books)
    console.log("After calling promise");
});  
    
// public_users.get('/author/:author',function (req, res) {
public_users.get('/author/:author', (req, res)=> {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },6000)});

    console.log("Before calling promise");
    //Write your code here
    const author = req.params.author
    
    let filtered_author = books.filter((books)=> books.author===author);

    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
    res.send(filtered_author)
    console.log("After calling promise")    
});
// Get all books based on title
public_users.get('/title/:title', (req, res)=> {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolved")
          },6000)});
    //Write your code here
    console.log("Before calling promise")      
    const title = req.params.title
  
    let filtered_title = books.filter((books)=>books.title===title);
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })     
    res.send(filtered_title)
    console.log("After calling promise")
});
// Get book details based on ISBN
public_users.get('/reviews/:isbn', (req, res)=> {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolved")
          },6000)});
    //Write your code here
    console.log("before calling promise")
    const isbn = req.params.isbn;
    const review = req.params.reviews;
    
    let filtered_books = books.filter((books)=> books.isbn === isbn);
    let filtered_reviews = filtered_books.filter((filtered_books)=> filtered_books.reviews===review);
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })  
    res.send(filtered_reviews)
    console.log("After calling promise")
});
//update review based on isbn
public_users.put("/auth/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.reviews;
    let filtered_books = books.filter((books)=> books.isbn === isbn);
    filtered_book = filtered_books[2]
    filtered_book.reviews = review
    books = books.filter((books) => books.isbn != isbn);
    books.push(filtered_book);
    res.send(`User with the isbn  ${isbn} updated.`);
});
module.exports.general = public_users;
