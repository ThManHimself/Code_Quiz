const startButton = document.getElementById('start-btn')
// const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')
const timerEl = document.getElementById('countdown')

let currentQuestionIndex = 0

startButton.addEventListener('click', startQuiz)
// nextButton.addEventListener('click', () => { 
//     currentQuestionIndex++
//     nextQuestion()
// })

// // quiz function
// function fullQuiz() { 
//     startQuiz();
//     endQuiz();
// }

// function to start the quiz and show first question
function startQuiz() { 
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
        // if the clicked answer is correct, ??
        if (answer === questions[index].correct) {            
            button.dataset.correct = questions[index].correct
        }
        // when the user clicks one of the answers, run anserSelect()
        button.addEventListener('click', answerSelect)
        answerButtonsEl.appendChild(button)        
    })
};

// function to reset quiz box when previous question is answered
function resetQuestion() { 
    // when there are answer buttons, remove them to make room for next questions answers --remove the first element repeatedly, until there are no more
    while (answerButtonsEl.firstChild) { 
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
};

// use when figuring out final score
let ansCorrect = 0

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
    // Uncaught TypeError: Cannot read property 'question' of undefined (next line) -- happens after all questions are answered
    currentQuestionIndex++
    nextQuestion(currentQuestionIndex)
};

let timeLeft = ''
let timeRemaining = 10
function timer() { 
    const timeInterval = setInterval(function() { 
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
            clearInterval(timeInterval)
            endQuiz()
        }
    }, 1000)
};

// endQuiz variables
let scoreCorrect = ansCorrect + '/5 '
let scoreTime = 'Time: ' + timeRemaining + ' sec'
let finalScore = scoreCorrect + scoreTime
// const highScoresList = document.getElementById('#highScoresList')
// const highScores = JSON.parse(localStorage.getItem("highScores"))
let highScores = [];

// when all of the questions have been answered OR the timer reaches 0
function endQuiz() { 
    // display final score
    alert('Your final score is ' + scoreCorrect);

    // ask if the user would like to save their score to the high scores
    if (confirm("Would you like to save your score?")) { 
        // if yes,
        // save [initials, score] to local storage
        let score = localStorage.setItem(prompt("Please enter your name or initials:"), finalScore)
        debugger;

        // add score to the high scores list on the left
        highScores.push(score)
        highScores.sort((a,b) => b.score - a.score);
        highScores.splice(5);

        // localStorage.setItem(highScores, JSON.stringify(score));
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
// // function for high scores
// function saveHighScore(e) { 
//     e.preventDefault();


// }

// questions/answers array
const questions = [
    {
        question: '2+2=?',
        answer: [ 4, 22, 15, 84],
        correct: 4
    },
    {
        question: 'a+b=?',
        answer: ['ab', 'c', 'asdf', 'asdfasdf'],
        correct: 'c'
    },
    {
        question: '4*2=?',
        answer: [8, 44, 42, 24],
        corect: 8
    },
    {
        question: 'x-y=?',
        answer: [1, 2, 3, 4],
        correct: 1 
    },
    {
        question: 'Cat or dog?',
        answer: ['Cat', 'Dog'],
        correct: 'Dog'
    }
];


    // // retrives the true 'correct' value in the answers dataset --used for storing info about # of correct answers in localStorage
    // const correct = selectedButton.dataset.correct
    // if (correct) { 
    //     let correctAns = localStorage.getItem('ansCorrect')
    //     let numAns = parseInt(correctAns)
    //     if (isNaN(numAns)) { 
    //         numAns = 1
    //     } else { 
    //         numAns++
    //     }
    //     localStorage.setItem('ansCorrect', numAns.toString())
    // } 
    // else { 
    //     let wrongAns = localStorage.getItem('ansWrong')
    //     let numAns = parseInt(wrongAns)
    //     if (isNaN(numAns)) { 
    //         numAns = 1
    //     } else { 
    //         numAns++
    //     }
    //     localStorage.setItem('ansWrong', numAns.toString())
    // }
