const express = require('express');
const app = express();
const path = require('path');
const { faker } = require('@faker-js/faker');
const mysql2 = require("mysql2");
const { v4: uuidv4 } = require('uuid');

const id = uuidv4();
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
let createRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),

        faker.internet.password()];
};
let connection = mysql2.createConnection(
    {
        host: "localhost",
        password: "05012007",
        database: "STARUX_DATA",
        user: "root"
    }
);

console.log(createRandomUser());
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



let port = 8080;
app.listen(port, () => {
    console.log("THE POST IS LISTING  ", port)
})
app.get("/home", (req, res) => {
    console.log("We are in the home page ");
    let query = "SELECT COUNT(*) FROM USER";
    try {
        connection.query(query, function (err, result) {
            if (!err) {
                console.log("THE QUERY IS WORKING ", result[0]["COUNT(*)"]);
                let count = result[0]["COUNT(*)"];
                res.render("home", { count });
            }
            else {
                console.log("THERE IS SOME SOME ERROR IN THE DATABASE");
                res.send("<h1>their is an database error which is occuring in the database </h1>");
            }
        });
    }
    catch (e) {
        console.log(e);
    }


});

app.get("/", (req, res) => {
    res.redirect("/home");
})
app.get("/user", (req, res) => {
    let q = "SELECT * FROM USER";
    connection.query(q, function (err, result) {
        if (!err) {
            console.log("this is the result", result);
            res.render("user", { result });

        }
        else {
            console.log("THIS IS THE PAGE");
            req.send("THE DATA IS SEND");

        }
    });

})


app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    console.log("the id is ", id);
    let q = `SELECT * FROM USER WHERE ID='${id}'`;
    try {
        connection.query(q, function (err, result) {
            if (!err) {
                console.log(result);
                let user = result[0];
                res.render("Edit", { user });
            }
            else {
                console.log("this is the error")
                res.send("<h1> THERE IS A ERROR </h1>");
            }
        });
    }
    catch (e) {
        console.log(e);

    }
});

app.patch("/user/edit/:id", (req, res) => {
    let id = req.params.id;
    let { username, password:formPass } = req.body;
 let q = `SELECT * FROM USER WHERE ID='${id}'`;
    try {
        connection.query(q, function (err, result) {
            if (!err) {
                console.log(result);
                let user = result[0];
                console.log(formPass , user.PASSWORD)
                formPass= formPass.trim();
                if (formPass != user.PASSWORD) {

                    console.log("THE PASSWORD IS WRONG ");
                    res.send("<h1>THE PASSWORD IS WRONG </h1>")
                }
                else {
                    let query = `UPDATE USER SET username="${username}" WHERE  ID='${id}'`;
                    connection.query(query, function (err, result) {
                        if (!err) {
                            console.log("the data is chnages");
                            res.redirect('/user');
                    
                        } else {
                            console.log("THE ERROR IS OCCURING");

                        }
                    });
                }
            }

        });

    }
    catch (e) {
        console.log(e);
    }
});

app.get("/user/add" , (req ,res)=>{
    res.render("INSERT");
})
app.post("/user/post" ,(req,res)=>{
  let {username , Email , password}=req.body;
console.log(req.body);
  let id = uuidv4();
  // Properly quote string values to prevent SQL errors and injection
 let query = `INSERT INTO USER(ID, USERNAME, EMAIL, PASSWORD) VALUES(?, ?, ?, ?)`;
  
  try {
     connection.query(query, [id, username, Email, password], function(err, result) {
      if (!err) {
        console.log("the data is New data is add on the table");
        res.redirect("/user");
      } else {
        console.log("Database issue occurred:", err);
        res.send("<h1>Database error</h1>");
      }
    });
  }
  catch(e) {
    console.log('there is some error in the database');
  }
});
app.get("/user/:id/delete" , (req , res)=>{
    let id = req.params.id;
    console.log(id);
    console.log("this is normal page");
    let query=`SELECT * FROM USER WHERE ID='${id}'`;
    try{
        connection.query(query , function(err , result){
           if(!err)
           {
            console.log("we have got our data");
           console.log(result);
           let user= result[0];
            res.render("delete" ,{ user});
           }
           else{
            console.log("the error is on the database");
 
           }
        }); 
    }
    catch(e)
    {
  console.log("enter the right database" , e);
    }
});
app.delete("/user/:id" ,(req ,res)=>{
    
      let id = req.params.id;
    let {  password:formPass , Email:formEmail } = req.body;
    let query = "SELECT * FROM USER WHERE ID=?";
try{

        connection.query(query , [id] , function(err , result){
            if(!err)
            {
              let user = result[0];
              if (!user) {
                console.log("User not found");
                res.send("<h1>User not found</h1>");
                return;
              }
              formPass = formPass.trim();
              formEmail = formEmail.trim();
              if (user.PASSWORD != formPass || user.Email != formEmail) {
                console.log("THE PASSWORD OR EMAIL IS WRONG ");
                res.send("<h1>THE PASSWORD OR EMAIL IS WRONG </h1>");
              }
              else {
                let query = "DELETE FROM USER WHERE ID=?";
                try {
                  connection.query(query, [id], function (err, result) {
                    if (!err) {
                      console.log("THE TUPLE FROM THE ROW IS DELETED");
                      res.redirect('/user');
                    }
                    else {
                      console.log("YOU ENTERED THE WRONG DATABASE");
                      res.send("<h1>THE DATABASE IS WRONG </h1>");
                    }
                  });
                }
                catch (e) {
                  console.log("the error is ", e);
                }
              }

        }

    });
}
catch(e)
{
    console.log("the error is ");
}

})