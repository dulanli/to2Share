// MochaChai Testing

//Database code that we are testing
let db = require('../database');

//Server code that we are testing
let server = require ('../web-application-sql')

//Set up Chai library 
let chai = require('chai');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

//Set up Chai for testing web service
let chaiHttp = require ('chai-http');
chai.use(chaiHttp);

//Import the mysql module and create a connection pool with the user details
const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "dylan",
    password: "12345",
    database: "to2share",
    debug: false
});

//Wrapper for all database tests
describe('Database', () => {

    //Mocha test for getAllCustomers method in database module.
    describe('#getAllUsers', () => {
        it('should return all of the users in the database', (done) => {
            //Mock response object for test
            let response= {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of customers is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if(resObj.length > 1){
                    resObj[0].should.have.property('FirstName');
                    resObj[0].should.have.property('LastName');
                    resObj[0].should.have.property('Email');
                    resObj[0].should.have.property('Password');
                    resObj[0].should.have.property('Gender');
                }

                //End of test
                done();
            }

            //Call function that we are testing
            db.getAllUsers(response);
        });
    });

    //Mocha test for getAllCustomers method in database module.
    describe('#addUser', () => {
        it('should add a user to the database', (done) => {
            //Mock response object for test
            let response= {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that user has been added to database
                let sql = "SELECT Email FROM users WHERE Email='" + userEmail + "'";
                connectionPool.query(sql, (err, result) => {

                    if (err){//Check for errors
                        assert.fail(err);//Fail test if this does not work.
                        done();//End test
                    }
                    else{
                        //Check that customer has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM users WHERE Email='" + userEmail + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err){//Check for errors
                                assert.fail(err);//Fail test if this does not work.
                                done();//End test
                            }
                            else{
                                done();//End test
                            }
                        });
                    }
                });
            };

            //Create random customer details
            let userFirstn = Math.random().toString(36).substring(2, 10);
            let userLastn = Math.random().toString(36).substring(2, 10);
            let userPw = Math.random().toString(36).substring(2, 5);
            let userGender = "Male";
            let userEmail = userLastn + "@email.com";

            //Call function to add customer to database
            db.addUser(userFirstn, userLastn, userEmail, userPw, userGender, response);
        });
    });
});


//Wrapper for all web service tests
describe('Web Service', () => {

    //Test of GET request sent to /users
    describe('/GET users', () => {
        it('should GET all the users', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, response) => {
                    //Check the status code
                    response.should.have.status(200);

                    //Convert returned JSON to JavaScript object
                    let resObj = JSON.parse(response.text);

                    //Check that an array of users is returned
                    resObj.should.be.a('array');

                    //Check that appropriate properties are returned
                    if(resObj.length > 1){
                        resObj[0].should.have.property('FirstName');
                        resObj[0].should.have.property('LastName');
                        resObj[0].should.have.property('Email');
                        resObj[0].should.have.property('Password');
                        resObj[0].should.have.property('Gender');
                    }

                    //End test
                    done();
                });
        });
    });
});

