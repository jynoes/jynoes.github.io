const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const req = require('express/lib/request');
const res = require('express/lib/response');

const app = express();

//ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
 res.sendFile(__dirname + "/public/index.html");
})

app.listen(3000, function(){
 console.log("server started at port 3000");
})

app.get("/signup", function(req, res){
 res.sendFile(__dirname + "/public/signup.html");
})
app.get("/login", function(req, res){
 res.sendFile(__dirname + "/public/login.html");
})
app.get("/homepage", function(req, res){
 res.sendFile(__dirname + "/public/wall.html");
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
  res.sendFile(__dirname + "/public/signUp.html");
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



      res.redirect("/homepage");
    }
   }
   else{
    console.log(err)
   }
  })
})
});
