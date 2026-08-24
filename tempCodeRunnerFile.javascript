const prompt = require('prompt-sync')();
let name = prompt("Enter your name: ");
let age = Number(prompt("Enter your age: "));

console.log(`My name is ${name} and I am ${age} years old`);