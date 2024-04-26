// function for repeated actions
function resetQuiz() {
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}
// opens guide
function openGuide() {
    popupInfo.classList.add('active');
    main.classList.add('active');
}
// closes guide
function exitGuide() {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
//  starts quiz or ends quiz and goes to home page
function toggleQuizSection(active) {
    if (active) {
        quizSection.classList.add('active');
        quizBox.classList.add('active');
        nextBtn.classList.remove('active');
        resultBox.classList.remove('active');
        exitGuide();
        resetQuiz();
    } else {
        quizSection.classList.remove('active');
        nextBtn.classList.remove('active');
        resultBox.classList.remove('active');
        resetQuiz();
    }
}
// option selection interactions
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore++;
        headerScore();
    } else {
        answer.classList.add('incorrect');

        // if answer incorrect, auto selected correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }
    // if user has selected, disabled all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}
// question counter
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}
// actively showing score
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}
// result box functions
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (Math.floor((userScore / questions.length) * 100));
    let speed = 20;
    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#517b9d ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}
// checks whether register is successful or not
function checkRegister() {
    var usernameInput = document.querySelector('.newUsername').value;
    var passwordInput = document.querySelector('.newPassword').value;
    if (usernameInput === "" || passwordInput === "") {
        alert("Username and Password needed!");
        return false;
    } else {
        saveUserInfo(usernameInput, passwordInput);
        alert("Registration successful!");
        toggleRegisterForm(false);
        console.log("register successful");
        return true;
    }
}
// stores the options that the user marked during exam
function saveUserAnswer(username, numb, userAnswer) {
    const userData = JSON.parse(localStorage.getItem(username)) || { answers: {}, themes: {} };
    userData.answers[numb] = userAnswer;
    const questionTheme = getQuestionTheme(numb);
    if (!userData.themes[questionTheme]) {
        userData.themes[questionTheme] = { total: 0, correct: 0 };
    }
    userData.themes[questionTheme].total++;
    localStorage.setItem(username, JSON.stringify(userData));
}
// saves the questions that the user made mistakes after the exam
function saveIncorrectQuestions(username, incorrectQuestions) {
    const userData = JSON.parse(localStorage.getItem(username)) || { incorrectQuestions: [] };
    userData.incorrectQuestions = incorrectQuestions;
    localStorage.setItem(username, JSON.stringify(userData));
}
// stores the theme of the questions the user answered correctly
function saveCorrectThemes(username, theme) {
    const userData = JSON.parse(localStorage.getItem(username)) || { correctThemes: {} };
    if (!userData.correctThemes[theme]) {
        userData.correctThemes[theme] = 0;
    }
    userData.correctThemes[theme]++;
    localStorage.setItem(username, JSON.stringify(userData));
}
//  register form show/hide function
function toggleRegisterForm(show) {
    if (show) {
        registerPage.classList.add('active');
        regPage.classList.add('active');
    } else {
        registerPage.classList.remove('active');
        regPage.classList.remove('active');
    }
}