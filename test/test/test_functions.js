// MochaChai Testing

//File containing the functions that we are testing
import {checkLogin, logout, login} from './functions.js';

//Import expect from Chai
let expect = chai.expect;

describe('#Check session', () => {
    it('Checks if key value is found in local storage', (done) => {
        //Run some tests that sensibly explore the behaviour of the function
        let result = checkLogin("");
        expect(result).to.equal(false);

        result = checkLogin("aa@aa.com");
        expect(result).to.equal(true);

        //Call function to signal that test is complete
        done();
    });
});


describe('#Check logout', () => {
    it('Check if user successfully logged out', (done) => {
        //Run some tests that sensibly explore the behaviour of the function
        let result = logout("");
        expect(result).to.equal(true);

        result = logout("aa@aa.com");
        expect(result).to.equal(false);

        //Call function to signal that test is complete
        done();
    });
});

describe('#Check login', () => {
    it('Returns correct or incorrect value', (done) => {
        //Run some tests that sensibly explore the behaviour of the function
        let result;

        result = login("incorrect", "incorrect");
        expect(result).to.equal(false);

        result = login("incorrect", "correct");
        expect(result).to.equal(false);

        result = login("correct", "incorrect");
        expect(result).to.equal(false);
      
        result = login("correct", "correct");
        expect(result).to.equal(true);


        //Call function to signal that test is complete
        done();
    });
});