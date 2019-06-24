let questionNum = 0;
let score = 0;

function startQuiz() {
    $(".startButton").on("click", e => {
        event.preventDefault();
        $(".beginQuiz").css("display","none");
        $(".questionAnswer").css("display", "block");
        $(".questionNum").text(1);
        renderQuestion()
    });
}

function generateQuestion() {
    if (questionNum < STORE.length) {
        return `<div class="question-${questionNum}">
        <h2>${STORE[questionNum].question}</h2>
        <form>
        <fieldset>
        <br>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNum].answers[0]}" name="answer" required>
        <span>${STORE[questionNum].answers[0]}</span>
        </label>
        </br>
        <br>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNum].answers[1]}" name="answer" required>
        <span>${STORE[questionNum].answers[1]}</span>
        </label>
        </br>
        <br>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNum].answers[2]}" name="answer" required>
        <span>${STORE[questionNum].answers[2]}</span>
        </label>
        </br>
        <br>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNum].answers[3]}" name="answer" required>
        <span>${STORE[questionNum].answers[3]}</span>
        </label>
        </br>
        <button type="submit" class="submitButton">Submit</button>
        </fieldset>
        </form>
        </div>`;
    } else {
        makeResults();
        restartQuiz();
        $(".questionNum").text(10)
    }
}

function renderQuestion() {
    $(".questionAnswer").html(generateQuestion());
}

function pickAnswer() {
    $("form'").on("submit", function (event) {
        event.preventDefault();
        let selected = $("input:checked");
        let answer = selected.val();
        let correctAnswer = `${STORE[questionNum].correctAnswer}`;
        if (answer === correctAnswer) {
            selected.parent().addClass("correct"); 
            ifAnswerIsCorrect();
        } else {
            selected.parent().addClass("wrong");
            ifAnswerIsWrong();
        }
    });
}

function ifAnswerIsCorrect() {
    userAnswerFeedbackCorrect();
    updateScore();
}

function ifAnswerIsWrong () {
    userAnswerFeedbackWrong();
}

function changeQuestionNumber() {
    questionNum++;
    $(".questionNum").text(questionNum+1);
}

function changeScore() {
    score++;
}

function userAnswerFeedbackCorrect() {
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    $(".questionAnswer").html(`<div class="correctFeedback">
    <div class="imageUrl"><img src="${STORE[questionNum].imageUrl}" 
    alt="${STORE[questionNum].alt}"/></div><p>
    <b>Correct!</b></p>
    <button type=button class="nextButton">Next Question</button>
    </div>`);
}

function userAnswerFeedbackWrong () {
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    $(".questionAnswer").html(`<div class="correctFeedback">
    <div class="imageUrl"><img src="${STORE[questionNum].imageUrl} 
    alt="${STORE[questionNum].alt}"/></div><p><b>Wrong!</b></p>
    <button type=button class="nextButton">Next Question</button>
    </div>`);
}

function updateScore() {
    changeScore();
    $(".score").text(score);
}

function renderNextQuestion() {
    $("main").on("click", ".nextButton", function (event) {
        changeQuestionNumber();
        renderQuestion();
        pickAnswer();
    });
}

function renderResults() {
    if (score >=9) {
        $(".questionanswer").html(`<div class="results 
        correctFeedback"><h3>It Had To Be You!</h3><img src=
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi5mFqOo9i0oN6AQxChq0udehgikMOuY1qWWz7q6QkWnX1TnLUPw"
        alt="Frank Sinatra Image"/><p>${score} / 10</p>
        <button class="restartButton">Restart</button></div>`);
    }   else if (score < 9 && score >=6) {
        $(".questionAnswer").html(`<div class="results 
        correctFeedback"><h3>We Gon' Be Alright!</h3><img src=
        "https://timedotcom.files.wordpress.com/2018/06/kendrick-lamar-on-winning-pulitzer-prize.jpg"
        alt="Kendrick Lamar Image"/><p>${score} / 10</p>
        <button class="restartButton">Restart</button></div>`);
    }   else 
        $(".questionAnswer").html(`<div class="results 
        correctFeedback"><h3>Bawitdaba!</h3><img src=
        "https://nyppagesix.files.wordpress.com/2018/10/kid-rock.jpg?quality=90&strip=all&w=618&h=410&crop=1"
        alt="Kid Rock Image"/><p>${score} / 10</p>
        <button class="restartButton">Restart</button></div>`);
    }

function restartQuiz() {
    $("main").on("click", ".restartButton", function(event) {
        location.reload();
    });
}

function createQuiz () {
    startQuiz();
    renderQuestion();
    pickAnswer();
    renderNextQuestion();
  }
  
  $(createQuiz);

