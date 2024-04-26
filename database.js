const mysql = require('mysql');
// MySQL info
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "sqluser",
    password: "",
    database: "quiz"
});
// connecting
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as ID: ' + connection.threadId);

    // get questions ad options
    const query = 'SELECT question, options FROM questions';
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error fetching questions: ' + error.stack);
            return;
        }
        // showQuestions fonksiyonunu çağırarak soruları ve seçenekleri gösterme
        results.forEach((question, index) => {
            showQuestions(question, index);
        });
    });
});
// define the showQuestions function here
function showQuestions(question, index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${index + 1}. ${question.question}`;

    let optionTag = '';
    question.options.forEach((option, i) => {
        optionTag += `<div class="option"><span>${option}</span></div>`;
    });
    optionList.innerHTML = optionTag;

    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
        option.addEventListener('click', () => {
            optionSelected(option);
        });
    });
}
// checks whether login is successful or not
function checkLogin() {
    var usernameInput = document.querySelector('.username').value;
    var passwordInput = document.querySelector('.password').value;
    
    // Query the database to check if the username and password match
    const query = `SELECT * FROM user WHERE firstName = '${usernameInput}' AND passwordHash = MD5('${passwordInput}')`;
    
    // Execute the query
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error querying database: ' + error.stack);
            return;
        }
        
        // If there is no result, username or password is incorrect
        if (results.length === 0) {
            alert("Incorrect Username or Password!");
        } else {
            // If there is a result, login is successful
            regPage.classList.add('active');
            regLog.classList.add('active');
            navBar.classList.add('active');
            console.log("Login successful");
        }
    });
}