let questionNum = 0;
let score = 0;

function createListeners() {
    $(".startButton").on("click", function(event) {
        event.preventDefault();
        $(".beginQuiz").css("display","none");
        $(".questionAnswer").css("display", "block");
        $(".questionNum").text(1);
        renderQuestion()
    });
  
    $(".questionAnswer").on("submit", "form", function(event) {
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

    $("main").on("click", ".nextButton", function(event) {
        changeQuestionNumber();
        renderQuestion();
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
    }  else {
        makeResults();
        restartQuiz();
        $(".questionNum").text(10)
    }
} 

function renderQuestion() {
    $(".questionAnswer").html(generateQuestion());
}

function ifAnswerIsCorrect() {
    updateScore();
    userAnswerFeedbackCorrect();
}

function ifAnswerIsWrong () {
    userAnswerFeedbackWrong();
}

function changeQuestionNumber() {
    questionNum++;
    $(".questionNum").text(questionNum+1);
}

function updateScore() {
    changeScore();
    $(".score").text(score);
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
    renderNextQuestion();
}

function userAnswerFeedbackWrong() {
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    $(".questionAnswer").html(`<div class="correctFeedback">
    <div class="imageUrl"><img src="${STORE[questionNum].imageUrl}"
    alt="${STORE[questionNum].alt}"/></div><p><b>Wrong!</b></p>
    <button type=button class="nextButton">Next Question</button>
    </div>`);
    renderNextQuestion();
}

function makeResults() {
	let imageUrl = "";
	let text = "";
	let alt = ""
    if (score >= 8) {
		imageUrl = "https://aarp-content.brightspotcdn.com/ba/47/ebbf283b7cff2f45f6d6c712f14e/frank-sinatra-2-herman-leonard-photography-llc.jpg"
        alt = "Frank Sinatra Image"
		text = "It Had To Be You!"
    }   else if (score < 8 && score >= 5) {
        imageUrl = "https://timedotcom.files.wordpress.com/2018/06/kendrick-lamar-on-winning-pulitzer-prize.jpg"
		alt = "Kendrick Lamar Image"
		text = "U Gon' Be Alright!"
    }   else {
		text = "Bawitdaba!"
		alt = "Kid Rock Image"
		imageUrl = "https://nyppagesix.files.wordpress.com/2018/10/kid-rock.jpg?quality=90&strip=all&w=618&h=410&crop=1"
	}
	$(".questionAnswer").html(`<div class="results 
        correctFeedback"><h3>${text}</h3><img src=
        "${imageUrl}"
        alt=${alt}/><p>${score} / 10</p>
        <button class="restartButton">Restart</button></div>`);
  }

function restartQuiz() {
    $("main").on("click", ".restartButton", function(event) {
        location.reload();
    });
}

function runQuiz () {
    createListeners();
  }
    $(runQuiz);

