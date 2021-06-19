const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => { 
    currentQuestionIndex++
    nextQuestion()
})

function startQuiz () { 
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    nextQuestion()
}

function nextQuestion() { 
    resetQuestion()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(questions) { 
    questionEl.innerText = questions.question
    questions.answer.forEach(answer => { 
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) { 
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', answerSelect)
        answerButtonsEl.appendChild(button)
    })
}

function resetQuestion() { 
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) { 
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

function answerSelect(event) { 
    const selectedButton = event.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => { 
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) { 
        nextButton.classList.remove('hide')
    } else { 
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) { 
    clearStatusClass(document.body)
    if (correct) { 
        element.classList.add('correct')
    } else { 
        element.classList.add('wrong')
    }
}
function clearStatusClass(element, correct) { 
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: '1',
        answer: [
            {text: 'CORRECT', correct: true},
            {text: 'WRONG', correct: false},
            // {text: '', correct: true/false},
            // {text: '', correct: true/false}
        ],
    },
    {
        question: '12',
        answer: [
            {text: 'CORRECT 2', correct: true},
            {text: 'WRONG 2', correct: false},
            // {text: '', correct: true/false},
            // {text: '', correct: true/false}
        ]
    },
    {
        question: '123',
        answer: [
            {text: 'CORRECT 3', correct: true},
            {text: 'WRONG 3', correct: false},
            // {text: '', correct: true/false},
            // {text: '', correct: true/false}
        ]
    },
    {
        question: '1234',
        answer: [
            {text: 'CORRECT 4', correct: true},
            {text: 'WRONG 4', correct: false},
            // {text: '', correct: true/false},
            // {text: '', correct: true/false}
        ]
    },
    {
        question: '12345',
        answer: [
            {text: 'CORRECT 5', correct: true},
            {text: 'WRONG 5', correct: false},
            // {text: '', correct: true/false},
            // {text: '', correct: true/false}
        ]
    },
]