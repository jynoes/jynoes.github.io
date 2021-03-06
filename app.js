const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const req = require('express/lib/request');
const res = require('express/lib/response');
const ejs = require('ejs');

const app = express();

//ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:true}));

let activeUser = [];


app.get("/", function(req, res){
 res.render("index");
})

app.listen(3000, function(){
 console.log("server started at port 3000");
})

app.get("/signup", function(req, res){
 res.render("signup");
})
app.get("/login", function(req, res){
  if (activeUser[0] != null){
    res.redirect("/homepage");
  }
  else{
    res.render("login");
  };
})
app.get("/homepage", function(req, res){
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query("SELECT * FROM wordslist", (err, results, fields) => {
      connection.release();
      if(err) throw err
        res.render("wall", {
          results: results,
          activeUser : activeUser
         });
    })
  })
})

//mysql pool
const pool = mysql.createPool({
 host:"localhost",
 user: "root",
 password:"",
 database:"oofilipinodb",
 connectionLimit: 10
})

app.post("/signup", function(req, res){
 var username = req.body.uname;
 var password = req.body.psw;
 var confirmPassword = req.body.cpsw;

 if(password == confirmPassword){
  pool.getConnection((err, connection) => {
  if (err) throw err

  connection.query("INSERT INTO users (password, username) VALUES ('" + password + "', '" + username + "')" , (err, rows)=>{
 connection.release()

   if(!err){
    res.send('user with username:' + username +' has been successfully signed up' )
    res.render("/login")
   }
   else{
    console.log(err)
   }
  })
 })
 }
 else{

   //add an alert box to inform user that does password is error
  console.log("password does not match");
  res.redirect("/signup")
 }

})

app.post("/login", function(req, res){
var LoginUsername = req.body.uname;
var LoginPassword = req.body.psw;
  console.log("success");
 pool.getConnection((err, connection) => {
  if (err) throw err

  connection.query("SELECT * FROM users WHERE username = '" + LoginUsername +"'",(err, rows)=>{
   connection.release()

   if(!err){
    if(LoginPassword == rows[0].password){
      activeUser.push(LoginUsername);

      res.redirect("/homepage");
    }
   }
   else{
    console.log(err)
    res.send('unsuccessful')
   }
  })
})
});

app.post("/signout", function(req, res){
  activeUser.pop();
  res.redirect("/login");
})

app.get("/write-post", function(req, res){
  res.render("write-post")
})

app.post("/write-post", function(req, res){
  const filipinoWord = req.body.filipinoWord;
  const transWord = req.body.Transword;
  const wordMean = req.body.meaning;
  console.log(filipinoWord, transWord, wordMean)
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query("INSERT INTO wordslist (Fword, Tword, meaning) VALUES ('" + filipinoWord + "', '" + transWord + "', '"+ wordMean +"')",(err, rows) => {
      connection.release()
      if (!err){
        res.redirect("/homepage");
      }
      else{
        console.log(err);
      }
    })
  })
})
app.get("/post-system", function(req, res){
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query("SELECT * FROM wordslist", (err, results, fields) => {
      connection.release();
      if(err) throw err
        res.render("post-system", { results: results });
    })
  })
})
