// MochaChai Testing

//Check if user is logged in
export function checkLogin(key) {

    let loggedIn = false;

    if (key != "") {
        loggedIn = true;
        return  loggedIn;

    } else {
        return loggedIn;
    }
}

// check if logout works
export function logout(key) {

    let loggedOut = false;

    if (key == ""){
        loggedOut = true;
        return loggedOut;

    } else {
        return loggedOut;
    }
}

// check login system
export function login(email, password) {

    let allowIn = false;

    if (email === "incorrect" && password === "incorrect") {
        allowIn = false;
        return allowIn;

    } if (email === "incorrect" && password === "correct") {
        allowIn = false;
        return allowIn;
    
    } if (email === "correct" && password === "incorrect") {
        allowIn = false;
        return allowIn;
    
    } if (email === "correct" && password === "correct"){
        allowIn = true;
        return allowIn;
    
    } else {
        allowIn = false;
        return allowIn;
    }

}
