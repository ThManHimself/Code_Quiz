const startButton = document.getElementById('start-btn')
const questionContainerEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')
const timerEl = document.getElementById('countdown')

let currentQuestionIndex = 0
// use when figuring out final score
let ansCorrect = 0;

startButton.addEventListener('click', startQuiz)

// function to start the quiz and show first question
function startQuiz() { 
    ansCorrect = 0;
    // removes start button during the quiz
    startButton.classList.add('hide')
    // start the timer
    timer();
    // select a question from questions Object based on its index starting at index 0
    currentQuestionIndex = 0
    // removes 'hide' class from question element so the question shows
    questionContainerEl.classList.remove('hide')
    // display next question and answers
    nextQuestion()
};

// function to show first/next question when previous question is answered
function nextQuestion() { 
    if (questions.length == currentQuestionIndex) {
        endQuiz();
    } else { 
        // displays question and answer choices
        showQuestion(currentQuestionIndex)        
    }
};

// function to disply question and answer choices in quiz box
function showQuestion(index) { 
    resetQuestion()
    // takes the question from the questions object and inputs into question field in the quiz box
    questionEl.innerText = questions[index].question
    
    // cycles through answers of the current question and adds the answers as buttons
    questions[index].answer.forEach(answer => { 
        // creates the button element for each answer
        const button = document.createElement('button')
        // adds btn class to the button
        button.classList.add('btn')
        // inputs each answer choice as text into button fields
        button.innerText = answer
        // if the clicked answer is correct,
        if (answer === questions[index].correct) { 
            button.dataset.correct = questions[index].correct
        }
        // when the user clicks one of the answers, run answerSelect()
        button.addEventListener('click', answerSelect)
        answerButtonsEl.appendChild(button)
    })
};

function renderHighScores() { 
    // make a bridge to the html/dom so we can modify an area
    var $highScoreDisplay = document.getElementById('highScores');
    var $listToInsert = '';
    // get all high scores
    var highScores = getLocalStorage();
    // display only the top 5
    highScores.length = 5
    // loop over all the scores and append them to page
    for (let i=0; i < highScores.length; i++) {
        $listToInsert += `<li>${highScores[i].name}: ${highScores[i].score}</>`
    }
    $highScoreDisplay.innerHTML = $listToInsert;
}
renderHighScores();

// function to reset quiz box when previous question is answered
function resetQuestion() { 
    // when there are answer buttons, remove them to make room for next questions answers --remove the first element repeatedly, until there are no more
    while (answerButtonsEl.firstChild) { 
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
};

// function for when an answer is selected
function answerSelect(event) { 
    // targets the button that was clicked
    const selectedButton = event.target
    if (this.dataset.correct) {
        alert('Correct')
        ansCorrect++;
    } else {
        timeRemaining = timeRemaining - 5;
        alert('Incorrect!')
    }
    currentQuestionIndex++
    nextQuestion(currentQuestionIndex)
};

let timeLeft = ''
let timeRemaining = 75
let timeInterval;
function timer() { 
    timeInterval = setInterval(function() { 
        if (timeRemaining >= 0) { 
            let min = Math.floor(timeRemaining/60)
            let sec = timeRemaining - (min*60)
            sec = sec < 10 ? '0' + sec : sec;
            timeLeft = 'Timer: ' + min + ':' + sec
            timerEl.textContent = timeLeft
            console.log(timeRemaining, timeLeft);
            timeRemaining--
        } else { 
            // timeRemaining = 0;
            alert('Times Up!')
            endQuiz()
        }
    }, 1000)
};

let highScores = [];

// when all of the questions have been answered OR the timer reaches 0
function endQuiz() { 
    clearInterval(timeInterval)
    let scoreCorrect = ansCorrect + '/5 '
    // let scoreTime = 'Time: ' + timeRemaining + ' sec'
    let finalScore = parseInt(ansCorrect) + parseInt(timeRemaining);
    // endQuiz variables
    // display final score
    alert('Your final score is ' + finalScore);
    
    // ask if the user would like to save their score to the high scores
    if (confirm("Would you like to save your score?")) { 
        // if yes,
        // save [initials, score] to local storage
        let initials = prompt("Please enter your name or initials:")
        setLocalStorage({name: initials, score: finalScore, scoreCorrect, timeRemaining})
    };
    
    // ask if the user wants to play again
    if (confirm("Would you like to try again?")) { 
        // if yes, run quiz again
        alert('GO!')
        startQuiz();
    } else { 
        alert('Thank you for taking the quiz! Come back soon and try to beat the high score!')
    }
};

function getLocalStorage () {
    return JSON.parse(localStorage.getItem('highScores')) || [] // [{}, {},...]
}
function setLocalStorage(elementToAdd) { //element to add is like -> {name: "pc", score: 54}
    let currentStorage = getLocalStorage() // []
    currentStorage.push(elementToAdd); // [... everythingbfore, elementToAdd]
    //probably should sort the high scores so they are in order of highest score to lowst.
    currentStorage.sort((a,b) => b.score - a.score);
    console.log('currentStorage is sorted?')
    console.log(currentStorage);
    localStorage.setItem('highScores', JSON.stringify(currentStorage));
    return;
}

const questions = [
    {
        question: "Who invented JavaScript?",
        answer: [ "Douglas Crockford", "Sheryl Sandberg", "Brendan Eich", "Larry David"],
        correct: "Brendan Eich"
    },
    {
        question: "Which JavaScript label catches all the values, except for the ones specified?",
        answer: ["catch", "label", "try", "default"],
        correct: "default"
    },
    {
        question: "How do you find the minimum of x and y using JavaScript?",
        answer: ["min(x,y);", "Math.min(x,y)", "Math.min(xy)", "min(xy);"],
        correct: "Math.min(x,y)"
    },
    {
        question: "JavaScript is a ___ -side programming language.",
        answer: ["Client", "server", "Both", "None"],
        correct: "Both" 
    },
    {
        question: "Which of the following will write the message “Hello DataFlair!” in an alert box?",
        answer: ["alertBox('Helo DataFlair!');", "alert(Hello DataFlair!);", "msgAlert(“Hello DataFlair!”);", "alert(“Hello DataFlair!”);"],
        correct: "alert(“Hello DataFlair!”);"
    }
];
