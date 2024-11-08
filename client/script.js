let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

async function fetchQuestions() {
    const response = await fetch('http://localhost:8000/api/questions');
    return await response.json();
}

async function startQuiz() {
    const questions = await fetchQuestions();
    displayQuestion(questions[currentQuestionIndex], questions);
}

function displayQuestion(question, questions) {
    answerSelected = false; // Reset the answerSelected flag for each question
    document.getElementById('question').innerText = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => selectAnswer(button, option, question, questions));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(button, selectedOption, question, questions) {
    if (answerSelected) return; // Prevent multiple selections
    answerSelected = true; // Mark that an answer has been selected

    if (selectedOption === question.answer) {
        button.classList.add('correct'); // Mark correct answer in green
        score++;
    } else {
        button.classList.add('incorrect'); // Mark wrong answer in red
        // Highlight the correct answer
        const optionButtons = document.querySelectorAll('#options button');
        optionButtons.forEach(btn => {
            if (btn.innerText === question.answer) {
                btn.classList.add('correct'); // Mark the correct answer in green
            }
        });
    }

    // Disable all buttons after an answer is selected
    const optionButtons = document.querySelectorAll('#options button');
    optionButtons.forEach(btn => btn.disabled = true);

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => displayQuestion(questions[currentQuestionIndex], questions), 1000); // Show the next question after a delay
    } else {
        document.getElementById('score').innerText = `Score: ${score} / ${questions.length}`;
        document.getElementById('next-btn').style.display = 'none';
    }
}

document.getElementById('next-btn').addEventListener('click', startQuiz);
startQuiz();
