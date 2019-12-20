class Timer {
  constructor() {
    const selectors = {
      timeSpan: "#timeSpan",
    }
    const data = {
      timeUpMessage: "Times up!",
    }
    this.duration = 120;
    this.remainingTime = this.duration;
    this.$timeSpan = $(selectors.timeSpan);
    this.data = data;
  }

  setTimeDuration() {
    this.$timeSpan.text(this.duration);
  }

  timerBegins() {
    this.remainingTime--;
    if(this.remainingTime < this.duration) {
      this.$timeSpan.text(this.remainingTime);
    }
    if(this.remainingTime == 0) {
      this.remainingTime = "-";
      alert(this.data.timeUpMessage);
      this.finishQuiz();
    }
  }

  updateTime() {
    setInterval(() => this.timerBegins(),1000);
  }

  finishQuiz() {
    new ArithmeticQuiz().doLastQuestionAction();
  }
}