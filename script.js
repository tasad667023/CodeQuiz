//var startButton = document.getElementById ("startButton"); 
//on click --> do this 
window.onload = function() {
    console.log("starting");
  };
  
var index = 0;
//countdown clock
var countDown = 75;
//user score
var score = 75;
//User highschore
var highScore = 0;
//Variable for quiz timer
var quizTime;

document.getElementById("start-button").addEventListener("click", event => {
    console.log("this works so far");
    document.getElementById("start-quiz").classList.add("d-none");
    document.getElementById("quiz-questions").classList.remove("d-none");
    setTime();
    renderAllQuestions();
    quizTime = setInterval(setTime, 1000);
  });


function renderAllQuestions() {
    // var questionsLength = questions.length - 1;
    for (var i=0; i <= questions.length; i++){
      
    }
    if (index <= questions.length) {
      document.getElementById("question").innerHTML = questions[index].title;
      renderQuestionOptions();
    }
    // quizOver();
  }
  
  //This function is for the question options on HTML page as buttons
function renderQuestionOptions() {
    var question = questions[index].options;
    console.log(question);
    for (var i = 0; i < question.length; i++) {
      var questionOption = document.getElementById("question-choices");
      var questionButtons = document.createElement("button");
      questionButtons.className =
        "btn btn-outline-primary btn-lg d-flex justify-content-around";
      questionButtons.innerHTML = question[i];
  
      //This checks the answer when user choose an answer 
      questionButtons.setAttribute(
        "onclick",
        checkAnswer(i)
      );
      questionOption.append(questionButtons);
    }
    // quizOver();
  }

  //This function clears questions
function clearQuestion() {
    console.log("Clear html");
    document.getElementById("question-choices").innerHTML = "";
    quizOver();
  }

  //This function checks if the user has selected the correct answer
function checkAnswer(question, answer) {
    console.log("question: ", question);
    console.log("asnwer: ", answer);
    let correctAnswer = questions.answer;
    let userAnswer = questions[question].options[answer];
    if (userAnswer == correctAnswer) {
      index = index + 1;
      console.log(score);
      console.log("Correct!!");
    }
    else {
      index = index + 1;
      countDown = countDown - 15;
      score = score - 15;
      console.log(score);
      console.log("Next question: ", index);
      console.log("Incorrect!");
    }
    clearQuestion();
    renderAllQuestions();
    // quizOver();
  }
// This function sets the time and lets the user know how much time they have left 
function setTime() {
    document.getElementById("timer").innerHTML = countDown + "secs left";
    // countDown--;
    if (countDown == -1) {
      clearInterval(quizTime);
    }
    // quizOver();
  }

function quizOver() {
    if (index >= 4 || countDown <= 0) {
      document.getElementById("quiz-questions").classList.add("d-none");
      document.getElementById("all-done").classList.remove("d-none");
      document.getElementById("timer").innerHTML = countDown + "sec left";
      document.getElementById("final-score").innerHTML = countDown;
  
      clearInterval(quizTime);
    }
    else {return}
  }

document.getElementById("initials-button").addEventListener("click", savedScore);

function savedScore() {
  var userInitials = document.querySelector("#initial-input").value;
  var finalScore = countDown;

  var scoreObject = { initials: userInitials, score: finalScore };

  var highScores = localStorage.getItem("highScoreList");

  if (highScores == null) {
    localStorage.setItem("highScoreList", JSON.stringify([scoreObject]));
    console.log(highScores);
  } else {
    highScoreList = JSON.parse(highScores);
    console.log(typeof highScoreList);
    highScoreList.push(scoreObject);
    localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
  }
}

