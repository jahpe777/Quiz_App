let questionNum = 0;
let score = 0;

function startQuiz() {
    $(".beginQuiz").on("click", ".startbutton", function(e) {
        alert("yes");
    $(".beginQuiz").remove();
    $(".questionAnswer").css("display", "block");
    $(".questionNum").text(1);
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





function createQuiz () {
    startQuiz();
    /*renderQuestion();
    userSelectAnswer();
    renderNextQuestion();*/
  }
  
  $(createQuiz);
