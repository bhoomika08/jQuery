
class ArithmeticQuiz {
  constructor() {
    const selectors = {
      mainContainer: "#mainContainer",
      startButton: "#startButton",
      quizDiv: "#quizDiv",
      questionNumberId: "#questionNumber",
      questionDiv: "#question",
      currentQuestionDiv: "#questionNumber",
      quizForm: "#quizForm",
      inputAnswerField: "#answer",
      scoreId: "#score",
      nextButton: "#submit_next",
      timerDiv: "#timerDiv",
    }
    this.$mainContainer = $(selectors.mainContainer);
    this.$startButton = $(selectors.startButton);
    this.$quizDiv = $(selectors.quizDiv);
    this.$questionNumberDiv = $(selectors.questionNumberId);
    this.$questionDiv = $(selectors.questionDiv);
    this.$currentQuestionDiv = $(selectors.currentQuestionDiv);
    this.$quizForm = $(selectors.quizForm);
    this.$inputAnswerField = $(selectors.inputAnswerField);
    this.$scoreDiv = $(selectors.scoreId);
    this.$nextButton = $(selectors.nextButton);
    this.$timerDiv = $(selectors.timerDiv);

    this.questionnaire = [];
    this.questionsLimit = 20;
    this.currentQuestion = -1;
    this.score = 0;
  }

  init() {
    this.createQuestions();
    timer.setTimeDuration();
    this.bindEvents();
  }

  bindEvents() {
    this.$startButton.on("click", () => {
      $(event.target).hide();
      this.displayQuiz();
      this.displayQuestion();
      this.beginTimer();
    });
    this.$nextButton.on("click", () => {
      this.displayNextQuestion();
    });
  }

  beginTimer() {
    timer.updateTime();
  }

  displayQuiz() {
    this.$quizDiv.show();
  }

  createQuestions() {
    for(let i = 0; i < this.questionsLimit; i++) {
      let newQuestion = new Questions();
      newQuestion.generateQuestion();
      newQuestion.setCorrectAnswer();
      this.questionnaire.push(newQuestion);
    }
  }

  displayNextQuestion() {
    let userAnswer = this.$inputAnswerField.val().trim()
    this.questionnaire[this.currentQuestion].inputAnswer = userAnswer;
    this.$inputAnswerField.val('');
    this.setScore(userAnswer);
    this.checkIfLastQuestion();
  }

  checkIfLastQuestion() {
    if(this.currentQuestion + 1 === this.questionsLimit) {
      this.doLastQuestionAction();
    } else {
      this.displayQuestion();
    }
  }

  displayQuestion() {
    this.$currentQuestionDiv.text(`Current Question: ${++this.currentQuestion + 1} / ${this.questionsLimit}`);
    this.$questionDiv.empty();
    this.$questionDiv.append(this.questionnaire[this.currentQuestion].$mathQuestionParagraph);
    this.showScore();
  }

  doLastQuestionAction() {
    this.$quizDiv.hide();
    timer.remainingTime = "-";
    quiz.showScore();
    quiz.displayIncorrectAnswers();
  }

  setScore(userAnswer) {
    if(userAnswer === this.questionnaire[this.currentQuestion].correctAnswer) {
      this.questionnaire[this.currentQuestion].scorePoint = 1;
      this.score++;
    } else {
      this.questionnaire[this.currentQuestion].scorePoint = 0;
    }
  }

  showScore() {
    let $score = $("<p>", {
      text: `Score: ${this.score}/${this.questionsLimit}`,
    });
    this.$scoreDiv.empty();
    this.$scoreDiv.append($score);
    this.$scoreDiv.show();
  }

  displayIncorrectAnswers() {
    let $incorrectAnswersDiv = $("<div/>", {
      id: "incorrectAnswers",
    });
    let incorrectAnswers = [];
    for(let i = 0; i < this.questionsLimit; i++) {
      if(!this.questionnaire[i].scorePoint) {
        incorrectAnswers.push($("<p>", {
          text: `Question: ${i + 1}`,
          class: "highlight-red",
        }));
        incorrectAnswers.push(this.questionnaire[i].$mathQuestionParagraph.addClass("highlight-red"));
        incorrectAnswers.push($("<p>", {
          text: `Correct Answer: ${this.questionnaire[i].correctAnswer}`,
        }));
      }
    }
    if(incorrectAnswers.length >= 1) {
      $incorrectAnswersDiv.addClass("border-default");
    }
    $incorrectAnswersDiv.append(incorrectAnswers);
    this.$mainContainer.append($incorrectAnswersDiv);
  }
}

const timer = new Timer();
const quiz = new ArithmeticQuiz();
quiz.init();
