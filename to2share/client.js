//Points to a div element where user combo will be inserted.
let homePage;
let loginPage;
let nav;
let activeHome;
let activeLogin;
let activeSignUp;
let signUpPage;
let to2sharePage;
let Home2sharePage;
let searchResultPage;

let clicked = false;

//Set up page when window has loaded
window.onload = init;

//Get pointers to parts of the DOM after the page has loaded.
function init(){
    homePage = document.getElementById("home");
    loginPage = document.getElementById("login");
    navy = document.getElementById("navy");
    navx = document.getElementById("navx");
    activeHome = document.getElementById("activeHome");
    activeLogin = document.getElementById("activeLogin");
    activeSignUp = document.getElementById("activeSignUp");
    signUpPage = document.getElementById("signUp");
    to2sharePage = document.getElementById("to2share");
    tos = document.getElementById("activeto");
    act_my2share = document.getElementById("active_my2share");
    account = document.getElementById("activeAccount");
    Home2sharePage =  document.getElementById('home2share');
    searchResultPage =  document.getElementById('searchResult');
    profileAccount = document.getElementById('profileAccount');

    checkLogin();

}

function loadHomePage(){
    homePage.style.display = "block";
    loginPage.style.display = "none";
    signUpPage.style.display = "none";
    to2sharePage.style.display = "none";
    Home2sharePage.style.display = "none";
    searchResultPage.style.display = "none";
    profileAccount.style.display = "none";
    navy.style.display = "block";
    navx.style.display = "none";
    navy.classList.add('fixed-top');
    activeHome.classList.add('active');
    activeLogin.classList.remove('active');
    activeSignUp.classList.remove('active');
}

function loadLoginPage(){
    homePage.style.display = "none";
    loginPage.style.display = "block";
    signUpPage.style.display = "none";
    to2sharePage.style.display = "none";
    Home2sharePage.style.display = "none";
    searchResultPage.style.display = "none";
    profileAccount.style.display = "none";
    navy.style.display = "block";
    navx.style.display = "none";
    navy.classList.remove('fixed-top');
    activeHome.classList.remove('active');
    activeLogin.classList.add('active');
    activeSignUp.classList.remove('active');
}

function loadSignUpPage(){
    homePage.style.display = "none";
    loginPage.style.display = "none";
    signUpPage.style.display = "block";
    to2sharePage.style.display = "none";
    Home2sharePage.style.display = "none";
    searchResultPage.style.display = "none";
    profileAccount.style.display = "none";
    navy.style.display = "block";
    navx.style.display = "none";
    navy.classList.remove('fixed-top');
    activeHome.classList.remove('active');
    activeLogin.classList.remove('active');
    activeSignUp.classList.add('active');
    
}

function loadmy2share(){
    homePage.style.display = "none";
    loginPage.style.display = "none";
    signUpPage.style.display = "none";
    to2sharePage.style.display = "block";
    Home2sharePage.style.display = "none";
    searchResultPage.style.display = "none";
    profileAccount.style.display = "none";
    navy.style.display = "none";
    navx.style.display = "block";
    activeHome.classList.add('active');
    activeLogin.classList.remove('active');
    activeSignUp.classList.remove('active');
    tos.classList.remove('active');
    act_my2share.classList.add('active');
    account.classList.remove('active');

}

function loadprofilePage(){
    homePage.style.display = "none";
    loginPage.style.display = "none";
    signUpPage.style.display = "none";
    to2sharePage.style.display = "none";
    Home2sharePage.style.display = "none";
    searchResultPage.style.display = "none";
    profileAccount.style.display = "block";

    navy.style.display = "none";
    navx.style.display = "block";

    activeHome.classList.add('active');
    activeLogin.classList.remove('active');
    activeSignUp.classList.remove('active');

    tos.classList.remove('active');
    act_my2share.classList.remove('active');
    account.classList.add('active');

}

function checkLogin() {
    let LoggedIn = false;

    if (localStorage.user != undefined) {
        LoggedIn = true;
        setTimeout(home2share(), 1000);

    } else {
        setTimeout(loadHomePage(), 1000);

    }
}

function logout() {
    localStorage.clear();
    Swal.fire({
        title: "You have been successfully logged out!",
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
    setTimeout(loadHomePage(), 1000);
    checkLogin();

}

function register() {

    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let signUpForm = document.getElementById("signUpForm");
    let usr_firstn = document.getElementById("inputFirstName").value;
    let usr_lastn = document.getElementById("inputLastName").value;
    let usr_email = document.getElementById("inputEmail").value;
    let usr_pass = document.getElementById("inputPassword").value;
    let usr_gender = document.getElementById("inputGender").value;

    signUpForm.classList.add("was-validated");

    //Create object with user data
    let user = {
        firstn: usr_firstn,
        lastn: usr_lastn,
        email: usr_email,
        password: usr_pass,
        gender: usr_gender
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "nullValue") {
                return false;
            } 

            else if (xhttp.responseText == "emailUse") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email already in use',
                  })
                return false;
            } 

            else if (xhttp.responseText == "success") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Account successfully created',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(loadLoginPage, 1550);
            } 
            
            else {
                return false;
            }
        } else {
            return false;
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/signup", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(user) );

    return false;
}

function login() {

    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let loginForm = document.getElementById("loginForm");
    let login_Email = document.getElementById("loginEmail").value;
    let login_Pass = document.getElementById("loginPassword").value;

    loginForm.classList.add("was-validated");

    //Create object with user data
    let user = {
        email: login_Email,
        pass: login_Pass
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "empty") {
                return false;
            } 

            else if (xhttp.responseText == "incorrect") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid Username/Password',
                })
                return false;
            } 

            else if (xhttp.responseText == "success") {
                //console.log("success");
                localStorage.user = login_Email;    // store email in local storage
                setTimeout(loadmy2share(), 1000);
                checkLogin();
            } 
            
            else {
                return false;
            }

        } else {
            return false;
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));

    return false;
}

function ownPosts(){

    checkLogin();
    loadmy2share();

    let ownPosts = document.getElementById("ownPosts");
    let usr_email = localStorage.user;
    let usrArr = [];
    let htmlStr = " ";

    //Set up XMLHttpRequest
   let xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = () => {//Called when data returns from server
       
        if (xhttp.readyState == 4 && xhttp.status == 200) {
           //Convert JSON to a JavaScript object
           usrArr = JSON.parse(xhttp.responseText);
            //console.log(usrArr);
            
            for (let key in usrArr){

                if (usrArr[key].Email == usr_email){
                    htmlStr += "<div class='card' id='post' style='width: 18rem;'>"
                        htmlStr += '<div class="card-body">'
                        htmlStr += '<h4 class="card-title" id="post-email">' + usrArr[key].FirstName + ' ' + usrArr[key].LastName + '</h4>'
                        htmlStr += '<h4 class="card-title" id="post-date">' + usrArr[key].Date + '</h4>'
                            htmlStr += "<p class='card-text' id='post-text'>" + usrArr[key].PostContent + "</p>"
                        htmlStr += "</div>"
                    htmlStr += '</div>'
                }

                else{
                    //console.log("error");
                }

            }

            ownPosts.innerHTML = htmlStr;     //add posts to page

        }
   };

   //Request data from all users
   xhttp.open("GET", "/showownPosts", true);
   xhttp.send();
}

function my2share() {       
    
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usr_email = localStorage.user;
    let shareInput = document.getElementById("shareInput").value;
    let shareForm = document.getElementById("shareForm");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    //Create object with user data
    let uploadDetails = {
        email: usr_email,
        date: today,
        post: shareInput
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "empty") {
                //console.log("emptyyy");
                return false;
            } 

            else if (xhttp.responseText == "success") {
                shareForm.reset();
                ownPosts();
                //setTimeout(my2share(), 700);
            } 
            
            else {
                return false;
            }

        } else {
            return false;
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/share", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(uploadDetails));

    return false;
}

function home2share(){

    homePage.style.display = "none";
    loginPage.style.display = "none";
    signUpPage.style.display = "none";
    to2sharePage.style.display = "none";
    Home2sharePage.style.display = "block";
    searchResultPage.style.display = "none";
    profileAccount.style.display = "none";
    navy.style.display = "none";
    navx.style.display = "block";

    activeHome.classList.add('active');
    activeLogin.classList.remove('active');
    activeSignUp.classList.remove('active');

    tos.classList.add('active');
    act_my2share.classList.remove('active');
    account.classList.remove('active');

    let usrArr = [];
    let htmlStr = " ";

   //Set up XMLHttpRequest
   let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {//Called when data returns from server
       
        if (xhttp.readyState == 4 && xhttp.status == 200) {
           //Convert JSON to a JavaScript object
           usrArr = JSON.parse(xhttp.responseText);
            //console.log(usrArr);

            for (let key in usrArr){

                htmlStr += "<div class='card' id='post' style='width: 18rem;'>"
                    htmlStr += '<div class="card-body">'
                    htmlStr += '<h4 class="card-title" id="post-email">' + usrArr[key].FirstName + ' ' + usrArr[key].LastName + '</h4>'
                    htmlStr += '<h4 class="card-title" id="post-date">' + usrArr[key].Date + '</h4>'
                        htmlStr += "<p class='card-text' id='post-text'>" + usrArr[key].PostContent + "</p>"
                        htmlStr += '<button onclick="toLike()" class="like__btn" id="likeBtn' + [key] + '"'
                        htmlStr += '<span id="icon"><i id="iconLike' + [key] + '"'
                        htmlStr += 'class="far fa-heart"></i></span>'
                        htmlStr += '<span id="space">  </span>'
                        htmlStr += '<span id="count' + [key] + '"'
                        htmlStr += '>0</span></button>'
                    htmlStr += "</div>"
                htmlStr += '</div>'
            } 

            Home2sharePage.innerHTML = htmlStr;     //add posts to page
        }
    };

   //Request data from all users
   xhttp.open("GET", "/allposts", true);
   xhttp.send();

}

function toLike(){
    
    for (let i = 0; i <= 5; i++) {
        
        let likeIcon = document.getElementById("iconLike" + i);
        let count = document.getElementById("count" + i);

        //console.log(likeIcon);

        if (clicked == false) {
            //console.log("clicked");
            likeIcon.classList.add('fas');
            likeIcon.classList.remove('far');

            count.textContent++;
            clicked = true;
            value = count.textContent;
        } 

        else {
            //console.log("not clicked");
            likeIcon.classList.remove('fas');
            likeIcon.classList.add('far');

            count.textContent--;
            clicked = false;
            value = count.textContent;
        }

        return false;
    }
}

function searchResult() {

    homePage.style.display = "none";
    loginPage.style.display = "none";
    signUpPage.style.display = "none";
    to2sharePage.style.display = "none";
    Home2sharePage.style.display = "none";
    searchResultPage.style.display = "block";
    profileAccount.style.display = "none";
    navy.style.display = "none";
    navx.style.display = "block";

    activeHome.classList.add('active');
    activeLogin.classList.remove('active');
    activeSignUp.classList.remove('active');

    tos.classList.add('active');
    act_my2share.classList.remove('active');
    account.classList.remove('active');

    let usrArr = [];
    let htmlStr = " ";

   //Set up XMLHttpRequest
   let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {//Called when data returns from server
       
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            //Convert JSON to a JavaScript object
            usrArr = JSON.parse(xhttp.responseText);
                //console.log(usrArr);

                if (usrArr.length === 0){
                    //console.log("empppty");
                    Swal.fire(
                        'Sorry:/',
                        "The word you're looking for cannot be not found",
                        'question'
                    )
                    setTimeout(home2share(), 1000);
                }

                else{
                    for (let key in usrArr){

                        htmlStr += "<div class='card' id='post' style='width: 18rem;'>"
                            htmlStr += '<div class="card-body">'
                            htmlStr += '<h4 class="card-title" id="post-email">' + usrArr[key].FirstName + ' ' + usrArr[key].LastName + '</h4>'
                            htmlStr += '<h4 class="card-title" id="post-date">' + usrArr[key].Date + '</h4>'
                                htmlStr += "<p class='card-text' id='post-text'>" + usrArr[key].PostContent + "</p>"
                            htmlStr += "</div>"
                        htmlStr += '</div>'
                    } 

                    searchResultPage.innerHTML = htmlStr;     //add posts to page
                }
        }
    };

    //Request data from all users
    xhttp.open("GET", "/searching", true);
    xhttp.send();
}

function searching() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let searchText = document.getElementById("searchInput").value;
    let searchForm = document.getElementById("searchForm");

    //Create object with user data
    let data = {
        searchText: searchText,
    };
    
     //Set up function that is called when reply received from server
     xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "empty") {
                return false;
            } 

            else if (xhttp.responseText == "success") {
                //console.log("success");
                searchForm.reset();
                searchResult();
            } 
            
            else {
                return false;
            }

        } else {
            return false;
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/searching", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(data) );

    return false;
}

function newfirstn(){

    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usr_newfirstn = document.getElementById("firstn").value;
    let usr_email = localStorage.user;

    //Create object with user data
    let user = {
        firstn: usr_newfirstn,
        email: usr_email
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "nullValue") {
                return false;
            } 

            else if (xhttp.responseText == "success") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'First Name successfully changed',
                    showConfirmButton: false,
                    timer: 2000
                  })
                return false;
            } 
            
            else {
                return false;
            }
        } else {
            return false;
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/newfirstn", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(user) );

    return false;
}

function newlastn(){

    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usr_newlastn = document.getElementById("lastn").value;
    let usr_email = localStorage.user;

    //Create object with user data
    let user = {
        lastn: usr_newlastn,
        email: usr_email
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "nullValue") {
                return false;
            } 

            else if (xhttp.responseText == "success") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Last Name successfully changed',
                    showConfirmButton: false,
                    timer: 2000
                  })
                return false;
            } 
            
            else {
                return false;
            }
        } else {
            return false;
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/newlastn", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(user) );

    return false;
}
 
function newpw(){

    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usr_accPassword = document.getElementById("accPassword").value;
    let usr_email = localStorage.user;

    //Create object with user data
    let user = {
        accPassword: usr_accPassword,
        email: usr_email
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "nullValue") {
                return false;
            } 

            else if (xhttp.responseText == "success") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Password successfully changed',
                    showConfirmButton: false,
                    timer: 2000
                  })
                return false;
            } 
            
            else {
                return false;
            }
        } else {
            return false;
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/newpw", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(user) );

    return false;

}


