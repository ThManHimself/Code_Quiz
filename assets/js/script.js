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

// function to start the quiz and show first question
function startQuiz () { 
    // removes start button during the quiz
    startButton.classList.add('hide')
    // start the timer
    timer();
    // select a question from questions Object based on its index starting at index 0
    currentQuestionIndex = 0
    // removes 'hide' class from question element so the question shows
    questionContainerEl.classList.remove('hide')
    nextQuestion()
    // endQuiz() (has not yet created)
}

// function to show first/next question when previous question is answered
function nextQuestion() { 
    // displays question and answer choices
    showQuestion(currentQuestionIndex)
}

// function to disply question and answer choices in quiz box
function showQuestion(index) { 
    resetQuestion()
    // takes the question from the questions object and inputs into question field in the quiz box
    questionEl.innerText = questions[index].question
    // // cycles through answers of the question, in question, and adds the answers as buttons
    
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
}

// function to reset quiz box when previous question is answered
function resetQuestion() { 
    // when there are answer buttons, remove them to make room for next questions answers --remove the first element repeatedly, until there are no more
    while (answerButtonsEl.firstChild) { 
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

let ansCorrect = 0
let ansWrong = 0
// function for when an answer is selected
function answerSelect(event) { 
    // targets the button that was clicked
    const selectedButton = event.target
    if (this.dataset.correct) {
        alert('Correct')
    } else {
        alert('Incorrect!')
    }
    currentQuestionIndex++
    showQuestion(currentQuestionIndex)
}

let timeLeft = ''
let timeRemaining = 10
function timer() { 
    
    const timeInterval = setInterval(function() { 
        if (timeRemaining >= 0) { 
            console.log(timeRemaining, timeLeft)
            timeLeft = 'Timer: ' + timeRemaining
            timerEl.textContent = timeLeft
            timeRemaining--
        } else { 
            alert('Times Up!')
            clearInterval(timeInterval)
        }
    }, 1000)
}
function decrementTimer() { 

}
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
]