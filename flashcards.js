// Variable for inquirer dependency
var inquirer = require("inquirer");
var fs = require("fs");

// Variables for external constructor functions
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

// Basic arrays with preexisting questions
var initialBasicArray = [
    {
        front: "Who was the last tsar of Russia?",
        back: "Nicholas II"
    },
    {
        front: "Who was the first Soviet leader?",
        back: "Vladimir Lenin"
    },
    {
        front: "Who was the tsar who freed the serfs?",
        back: "Alexander I"
    },
    {
        front: "Who was the tsar of Russia during the Crimean War?",
        back: "Nicholas I"
    },
    {
        front: "Who was known as tsar known as 'the Terrible'?",
        back: "Ivan IV"
    }
]; 

// Cloze arrays with preexisting questions
var initialClozeArray = [
    {
        text: "Nicholas II was the last tsar of Russia.",
        cloze: "Nicholas II"
    },
    {
        text: "Vladimir Lenin was the first Soviet leader.",
        cloze: "Vladimir Lenin"
    },
    {
        text: "Alexander I was the tsar who freed the serfs.",
        cloze: "Alexander I"
    },
    {
        text: "Nicholas I was the tsar of Russia during the Crimean War.",
        cloze: "Nicholas I"
    },
    {
        text: "Ivan IV was known as tsar known as 'the Terrible'",
        cloze: "Ivan IV"
    }
]; 
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
            choices: ["Create Basic Card", "Create Cloze Card", "Play Basic Cards", "Play Cloze Cards"]
        }
    ]).then(function(answers) {
        // If card creation chosen the appropriate create function is called
        if (answers.quizzes === "Create Basic Card") {
            createBasicEntry();
        } else if (answers.quizzes === "Create Cloze Card") {
            createClozeEntry();
        // If the user chooses Basic Cards the loop iterates through the basicEntries file 
        //creating constructed objects
        } else if (answers.quizzes === "Play Basic Cards") {
        
            for (var i = 0; i < initialBasicArray.length; i++) {
                var createdBasicCards = new BasicCard(initialBasicArray[i].front, initialBasicArray[i].back);
                basicQuestionsArray.push(createdBasicCards);
            }
            // Call the function to run the basic questions
            basicQuestion();
        } else if (answers.quizzes === "Play Cloze Cards"){

            // The loop iterates through the clozeEntries file creating constructed objects
            for (var j = 0; j < initialClozeArray.length; j++) {
                var createdClozeCards = new ClozeCard(initialClozeArray[j].text, initialClozeArray[j].cloze);
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

// Creates the new array entry
function createBasicEntry() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your basic question?",
            name: "front",
            validate: function(value) {
                if (!value) {
                  return false;
              }
              return true;
            }
        },
        {
            type: "input",
            message: "What is your basic answer?",
            name: "back",
            validate: function(value) {
                if (!value) {
                  return false;
              }
              return true;
            }
        }
    ]).then(function(answers) {
        // Forms the object to be pushed to the array
        var basicObject = {
            front: answers.front,
            back: answers.back
        };
        initialBasicArray.push(basicObject);

        // Recalls the game menu
        gameInit();
    });
}

// Creates the new array entry
function createClozeEntry() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your cloze statement?",
            name: "text",
            validate: function(value) {
                if (!value) {
                  return false;
              }
              return true;
            }
        },
        {
            type: "input",
            message: "What is the cloze part?",
            name: "cloze",
            validate: function(value) {
                if (!value) {
                  return false;
              }
              return true;
            }
        }
    ]).then(function(answers) {
        // Forms the object to be pushed to the array
        var clozeObject = {
            text: answers.text,
            cloze: answers.cloze
        };
        initialClozeArray.push(clozeObject);
        
        // Recalls the game menu
        gameInit();
    });
}

// Function is called which begins the game
gameInit();
