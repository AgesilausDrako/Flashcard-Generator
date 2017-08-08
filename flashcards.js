var inquirer = require("inquirer");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

var clozeEntries = require("./clozeEntries").entries;
var basicEntries = require("./basicEntries").entries;

var basicQuestions = [];
var clozeQuestions = [];

for (var i = 0; i < basicEntries.length; i++) {
	var createdBasicCards = new BasicCard(basicEntries[i].front, basicEntries[i].back);
	basicQuestions.push(createdBasicCards);
}

for (var i = 0; i < clozeEntries.length; i++) {
	var createdClozeCards = new ClozeCard(clozeEntries[i].text, clozeEntries[i].cloze);
	clozeQuestions.push(createdClozeCards);
}

function gameInit () {
    inquirer.prompt([
        {
            type: "list",
            name: "quizzes",
            message: "Do you want to play Basic Cards or Cloze Cards?",
            choices: ["Basic Cards", "Cloze Cards"]
        }
    ]).then(function(answers) {

        console.log(answers);

        if (answers.value = "Basic Cards") {
            basicQuestion();
        } else {
            clozeQuestion();
        }
    });
}

var questionCount = 0;
var correct = 0;
var incorrect = 0;

function basicQuestion() {
    inquirer.prompt([
		{
			type: "input",
			message: basicQuestions[questionCount].front + "\nAnswer: ",
			name: "userGuess"
		}
	]).then(function (answers) {

            if (answers.userGuess === basicQuestions[questionCount].back) {
                console.log("Correct!");
                correct++;
            } else {
                console.log("Incorrect!");
                incorrect++;
            }

            console.log(basicQuestions[questionCount].back);

            if (questionCount < basicQuestions.length - 1) {
                questionCount++;
                basicQuestion();
            } else {
                console.log("Correct: " + correct);
                console.log("Incorrect: " + incorrect);
            }
    });
}

function clozeQuestion() {
    inquirer.prompt([
		{
			type: "input",
			message: clozeQuestions[questionCount].partial + "\nAnswer: ",
			name: "userGuess"
		}
	]).then(function (answers) {

            if (answers.userGuess === clozeQuestions[questionCount].cloze) {
                console.log("Correct!");
                correct++;
            } else {
                console.log("Incorrect!");
                incorrect++;
            }

            console.log(clozeQuestions[questionCount].fullText);

            if (questionCount < clozeQuestions.length - 1) {
                questionCount++;
                clozeQuestion();
            } else {
                console.log("Correct: " + correct);
                console.log("Incorrect: " + incorrect);
            }
    });
}

gameInit();
