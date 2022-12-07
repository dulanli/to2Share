//Import the express and other modules
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');

const db = require('./database.js');

// Make connection to database
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "dylan",
    password: "12345",
    database: "to2share",
    debug: false
});

//Create express app and configure it with body-parser
const app = express();
app.use(bodyParser.json());

app.use(express.static('to2Share'));
app.use(fileUpload());

//Start the app listening on port 8080
app.listen(8080);

let searchArray = [];

//**  Functions  **//

//Function to add user to database (from register())
function signUp (request, response){

    //Output the data sent to the server
    let newUser = request.body;
    console.log("Sign Up: " + JSON.stringify(newUser));

    //Build query
    let sql = "INSERT INTO users (FirstName, LastName, Email, Password, Gender) VALUES" +
    "('" + newUser.firstn + "','" + newUser.lastn + "','" + newUser.email + "','" + newUser.password + "','" + newUser.gender + "');";

    //console.log("db: " + sql);

    //Execute query
    connectionPool.query("SELECT COUNT(*) AS cnt FROM users WHERE email = ? " , 
    newUser.email , function(err , data){
        if(err){
            console.log(err);
        }   
        else{
            if(newUser.firstn === "" || newUser.lastn === ""|| newUser.email === ""|| newUser.password === ""|| newUser.gender === ""){  
                let errMsgNull = "[ERROR] Invalid field";
                //console.error(errMsgNull);
                response.send("nullValue")     
            }

            else if(data[0].cnt > 0){  
                let errMsgEmail = "[ERROR] Email already in use";
                console.error(errMsgEmail);
                response.send("emailUse")     // Already exist
            }
            
            else{
                //Execute query
                connectionPool.query(sql, (err, result) => {
                    if (err){//Check for errors
                        let errMsg = "[ERROR] " + err;
                        console.error(errMsg);
                        response.status(400).json(errMsg);
                    }
                    else{//Send back result
                        response.send("success");
                    }
                });
            }
        }
    })
}

function login (request, response){

    //Output the data sent to the server
    let existUser = request.body;
    console.log("Login: " + JSON.stringify(existUser));

    if (existUser.email && existUser.pass) {

		connectionPool.query('SELECT * FROM users WHERE Email = ? AND Password = ?', 
        [existUser.email, existUser.pass], function(err, data) {

			if (data.length > 0) {
                response.send("success");

            } else {
                response.send("incorrect");   

			}			
			response.end();
		});
	} else {
        response.send('empty');
	}

}

function share (request, response){
    
    //Output the data sent to the server
    let body = request.body;
    console.log("Share: " + JSON.stringify(body));

    //Build query
    let sql = "INSERT INTO posts (Email, Date, PostContent) VALUES" +
    "('" + body.email + "','" + body.date + "','" + body.post + "');";

    //console.log("db: " + sql);

    //Execute query
  
    if(body.post === ""){  
        let errMsgNull = "[ERROR] Invalid field";
        //console.error(errMsgNull);
        response.send("empty")     
    }
            
    else{
        //Execute query
        connectionPool.query(sql, (err, result) => {
            if (err){//Check for errors
                let errMsg = "[ERROR] " + err;
                console.error(errMsg);
                response.status(400).json(errMsg);
            }
            else{//Send back result
                response.send("success");
            }
        });
    } 
}

function searching(request, response){
    //Output the data sent to the server
    let body = request.body;
    //console.log("Data received: " + JSON.stringify(body));


    if(body.searchText === ""){  
        let errMsgNull = "[ERROR] Invalid field";
        //console.error(errMsgNull);
        response.send("empty")     
    }

    else{
        //Add user to our data structure
        searchArray.push(body.searchText);

        //Finish off the interaction.
        response.send("success");
    }
}

function changefirstn (request, response){

    //Output the data sent to the server
    let body = request.body;
    //console.log("Body: " + JSON.stringify(body));

    //Build query
    let sql = "UPDATE users SET FirstName = '" + body.firstn + "' WHERE Email = '" + body.email + "';";

    //console.log("db: " + sql);

    if(body.firstn === ""){  
        let errMsgNull = "[ERROR] Invalid field";
        //console.error(errMsgNull);
        response.send("nullValue")     
    }  
    else{
        //Execute query
        connectionPool.query(sql, (err, result) => {
            if (err){//Check for errors
                let errMsg = "[ERROR] " + err;
                console.error(errMsg);
                response.status(400).json(errMsg);
            }
            else{//Send back result
                response.send("success");
            }
        });
    }
}

function changelastn (request, response){

    //Output the data sent to the server
    let body = request.body;
    //console.log("Body: " + JSON.stringify(body));

    //Build query
    let sql = "UPDATE users SET LastName = '" + body.lastn + "' WHERE Email = '" + body.email + "';";

    //console.log("db: " + sql);

    if(body.lastn === ""){  
        let errMsgNull = "[ERROR] Invalid field";
        //console.error(errMsgNull);
        response.send("nullValue")     
    }  
    else{
        //Execute query
        connectionPool.query(sql, (err, result) => {
            if (err){//Check for errors
                let errMsg = "[ERROR] " + err;
                //console.error(errMsg);
                response.status(400).json(errMsg);
            }
            else{//Send back result
                response.send("success");
            }
        });
    }
}

function changepw (request, response){
    
    //Output the data sent to the server
    let body = request.body;
    //console.log("Body: " + JSON.stringify(body));

    //Build query
    let sql = "UPDATE users SET Password = '" + body.accPassword + "' WHERE Email = '" + body.email + "';";

    //console.log("db: " + sql);

    if(body.accPassword === ""){  
        let errMsgNull = "[ERROR] Invalid field";
        //console.error(errMsgNull);
        response.send("nullValue")     
    }  
    else{
        //Execute query
        connectionPool.query(sql, (err, result) => {
            if (err){//Check for errors
                let errMsg = "[ERROR] " + err;
                console.error(errMsg);
                response.status(400).json(errMsg);
            }
            else{//Send back result
                response.send("success");
            }
        });
    }
}

//Handles GET requests to our web service
async function allPosts(request, response){

    //Build query
    //let sql = "SELECT * FROM posts";
    let sql = "SELECT Date, PostContent, FirstName, LastName FROM posts LEFT JOIN users ON posts.Email=users.Email ORDER BY Date DESC;"

    //Wrap the execution of the query in a promise
    let selectPromise = new Promise ( (resolve, reject) => { 
        connectionPool.query(sql, (err, result) => {
                if (err) {//Check for errors
                    reject("Error executing query: " + JSON.stringify(err));
                } else {//Resolve promise with results
                    resolve(result);
                }
            });
    });


    try{

        let resulting = await selectPromise;
        //console.log("resulting: " +JSON.stringify(resulting));
        response.send(JSON.stringify(resulting)); 

    }
    catch(err){
        console.error(JSON.stringify(err));
    }
    
}

async function showownPosts(request, response){

    //Build query
    let sql = "SELECT Date, PostContent, FirstName, LastName, posts.Email FROM posts LEFT JOIN users ON posts.Email=users.Email ORDER BY Date DESC;"

    //Wrap the execution of the query in a promise
    let selectPromise = new Promise ( (resolve, reject) => { 
        connectionPool.query(sql, (err, result) => {
                if (err) {//Check for errors
                    reject("Error executing query: " + JSON.stringify(err));
                } else {//Resolve promise with results
                    resolve(result);
                }
            });
    });


    try{

        let resulting = await selectPromise;
        //console.log("resulting: " +JSON.stringify(resulting));
        response.send(JSON.stringify(resulting)); 

    }
    catch(err){
        console.error(JSON.stringify(err));
    }
    
}

async function searchresult(request, response){

    let sql = "SELECT Date, PostContent, FirstName, LastName, Likes, posts.Email FROM posts " +
    "LEFT JOIN users ON posts.Email=users.Email WHERE posts.PostContent LIKE '%" + 
    searchArray + "%'";

    //console.log("sql: " +sql);

    //Wrap the execution of the query in a promise
    let selectPromise = new Promise ( (resolve, reject) => { 
        connectionPool.query(sql, (err, result) => {
                if (err) {//Check for errors
                    reject("Error executing query: " + JSON.stringify(err));
                } else {//Resolve promise with results
                    resolve(result);
                }
            });
    });


    try{

        let resulting = await selectPromise;
        //console.log("resulting: " +JSON.stringify(resulting));
        response.send(JSON.stringify(resulting)); 
        searchArray = [];
        
    }
    catch(err){
        console.error(JSON.stringify(err));
    }
}

//Set up application to handle GET requests sent to the user path
app.post('/signup', signUp);   // sign up and add new to db
app.post('/login', login);   // login and check credentials
app.post('/share', share);   // my2share - share your thoughts
app.post('/searching', searching);   // push value of searched
app.post('/newfirstn', changefirstn);   
app.post('/newlastn', changelastn);   
app.post('/newpw', changepw);   

app.get('/allposts', allPosts);//Returns all posts
app.get('/showownPosts', showownPosts);//Returns own posts
app.get('/searching', searchresult);//Returns search 


