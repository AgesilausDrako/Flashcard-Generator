// Variable for inquirer dependency
var inquirer = require("inquirer");

// Variables for external constructor functions
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

// Variables for external files with questions
var clozeEntries = require("./clozeEntries").questions;
var basicEntries = require("./basicEntries").questions;

// Variables for arrays to hold the constructed objects
var basicQuestionsArray = [];
var clozeQuestionsArray = [];

// Variable to track the question count, correct, and incorrect guesses
var questionCount = 0;
var correct = 0;
var incorrect = 0;

// Function which gives the user the game options
function gameInit () {
    inquirer.prompt([
        {
            type: "list",
            name: "quizzes",
            message: "Do you want to play Basic Cards or Cloze Cards?",
            choices: ["Basic Cards", "Cloze Cards"]
        }
    ]).then(function(answers) {

        // If the user chooses Basic Cards the loop iterates through the basicEntries file 
        //creating constructed objects
        if (answers.quizzes === "Basic Cards") {
            for (var i = 0; i < basicEntries.length; i++) {
                var createdBasicCards = new BasicCard(basicEntries[i].front, basicEntries[i].back);
                basicQuestionsArray.push(createdBasicCards);
            }
            // Call the function to run the basic questions
            basicQuestion();
        } else {
            // The loop iterates through the clozeEntries file creating constructed objects
            for (var j = 0; j < clozeEntries.length; j++) {
                var createdClozeCards = new ClozeCard(clozeEntries[j].text, clozeEntries[j].cloze);
                clozeQuestionsArray.push(createdClozeCards);
            }
            // Call the function to run the cloze questions
            clozeQuestion();
        }
    });
}


// Shows the question part of the card and prompts an answer
function basicQuestion() {
    inquirer.prompt([
		{
			type: "input",
			message: basicQuestionsArray[questionCount].front + "\nAnswer: ",
			name: "userGuess"
		}
	]).then(function (answers) {
            // Checks the guess against the answer part of the card and logs the result 
            //while updating correct or incorrect count
            if (answers.userGuess === basicQuestionsArray[questionCount].back) {
                console.log("Correct!");
                correct++;
            } else {
                console.log("Incorrect!");
                incorrect++;
            }

            // Reveals correct answer
            console.log("The correct answer is:\n" + basicQuestionsArray[questionCount].back);

            // Checks the question count against the question list
            // If questions remain the function is called to continue
            // Else the game ends and the results are logged out
            if (questionCount < basicQuestionsArray.length - 1) {
                questionCount++;
                basicQuestion();
            } else {
                console.log("Correct: " + correct);
                console.log("Incorrect: " + incorrect);
            }
    });
}

// Shows the sentence with the cloze part absent and prompts an answer
function clozeQuestion() {
    inquirer.prompt([
		{
			type: "input",
			message: clozeQuestionsArray[questionCount].partial + "\nAnswer: ",
			name: "userGuess"
		}
	]).then(function (answers) {
            // Checks the guess against the answer part of the card and logs the result 
            //while updating correct or incorrect count
            if (answers.userGuess === clozeQuestionsArray[questionCount].cloze) {
                console.log("Correct!");
                correct++;
            } else {
                console.log("Incorrect!");
                incorrect++;
            }

            // Reveals correct answer
            console.log("The correct answer is:\n" + clozeQuestionsArray[questionCount].fullText);

            // Checks the question count against the question list
            // If questions remain the function is called to continue
            // Else the game ends and the results are logged out
            if (questionCount < clozeQuestionsArray.length - 1) {
                questionCount++;
                clozeQuestion();
            } else {
                console.log("Correct: " + correct);
                console.log("Incorrect: " + incorrect);
            }
    });
}

// Function is called which begins the game
gameInit();
