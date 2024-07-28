"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
function fizzbuzz(n) {
    var output = [];
    for (var i = 0; i < n; i++) {
        switch (true) {
            case (i % 3 === 0 && i % 5 === 0):
                output.push("FizzBuzz");
                break;
            case (i % 3 === 0):
                output.push("Fizz");
                break;
            case (i % 5 === 0):
                output.push("Buzz");
                break;
            default:
                output.push(i.toString());
        }
    }
    return output;
}
// Create an interface to read lines from the terminal
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Ask the user for a number and run FizzBuzz
rl.question('Enter a number: ', function (input) {
    var number = parseInt(input);
    if (!isNaN(number)) {
        if (number >= 1) {
            console.log(fizzbuzz(number));
        }
        else {
            console.log('Please enter a number greater than "1".');
        }
    }
    else {
        console.log('Please enter a valid number.');
    }
    rl.close();
});
