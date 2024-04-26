import './functions.js';
import * as database from './database';
const forgotPassword = document.querySelector('.forgot-password');
const registerPage = document.getElementById('registerPage');
const quizSection = document.querySelector('.quiz-section');
const optionList = document.querySelector('.option-list');
const popupInfo = document.querySelector('.popup-info');
const resultBox = document.querySelector('.result-box');
const quizBox = document.querySelector('.quiz-box');
const nextBtn = document.querySelector('.next-btn');
const regPage = document.querySelector('.r-p');
const regLog = document.querySelector('.regLog');
const navBar = document.querySelector('.navbar');
const main = document.querySelector('.main');
// defines initial values and runs initial functions
window.onload = resetQuiz;
//  runs a function for each defined 'click' action
document.addEventListener("click", function (event) {
    const target = event.target;
    // exiting quiz guide
    if (target.classList.contains('exit-btn')) {
        exitGuide();
    }
    // opening quiz guide
    if (target.classList.contains('start-btn')) {
        openGuide();
    }
    // shows questions
    if (target.classList.contains('continue-btn')) {
        toggleQuizSection(true);
    }
    // restarts the quiz
    if (target.classList.contains('tryAgain-btn')) {
        toggleQuizSection(true);
    }
    // goes to home page
    if (target.classList.contains('goHome-btn')) {
        toggleQuizSection(false);
    }
    // moving on to the next question
    if (target.classList.contains('next-btn')) {
        if (questionCount < questions.length - 1) {
            questionCount++;
            showQuestions(questionCount);
            questionNumb++;
            questionCounter(questionNumb);

            nextBtn.classList.remove('active');
        } else {
            showResultBox();
        }
    }
    //  checks login form
    event.preventDefault();
    database.checkLogin((error, user) => {
        if (error) {
            console.error("An error occurred:", error);
            return;
        }
        // If user exists, login successful
        if (user) {
            console.log("Login successful");
            // Proceed with further actions like showing user profile, etc.
        } else {
            console.log("Incorrect Username or Password!");
        }
    });
    // checks register form
    if (target.classList.contains('register')) {
        event.preventDefault();
        checkRegister();
    }
    // shows admin username and password when clicked on forgot password
    if (target.classList.contains('forgot-password')) {
        event.preventDefault();
        alert("username: 'admin', password: '1234'");
    }
    if (target.classList.contains('registerLink')) {
        event.preventDefault();
        toggleRegisterForm(true);
    }
    if (target.classList.contains('loginLink')) {
        event.preventDefault();
        toggleRegisterForm(false);
    }
});
// seletcs all text elements
document.addEventListener("selectionchange", () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        document.body.classList.add("text-selected");
    } else {
        document.body.classList.remove("text-selected");
    }
});
//  little animation for 'forgot password?' changes text
forgotPassword.addEventListener('mouseover', () => {
    setTimeout(() => {
        forgotPassword.innerHTML = "Try to remember&nbsp;<i class='bx bxs-cool' style='font-size: 1vw; vertical-align: middle;'></i>";
    }, 100);
});
forgotPassword.addEventListener('mouseout', () => {
    setTimeout(() => {
        forgotPassword.innerHTML = "Forgot password?";
    }, 300);
});