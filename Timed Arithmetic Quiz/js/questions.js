/* jshint esversion:6, browser:true, jquery: true*/
class Questions {
  constructor() {
    this.firstOperand = null;
    this.secondOperand = null;
    this.operator = null;
    this.maxOperandValue = 20;
    this.$mathQuestionParagraph = '';
    this.correctAnswer = null;
    this.inputAnswer = null;
    this.scorePoint = null;

    const OPERATORS = ['+', '-', '*', "/"];
    const helper = {
      generateOperand: () => parseInt(Math.random() * this.maxOperandValue),
      generateOperator: () => parseInt(Math.random() * OPERATORS.length),
    }
    this.helper = helper;
    this.OPERATORS = OPERATORS;
  }

  generateQuestion() {
    this.firstOperand = this.helper.generateOperand();
    this.secondOperand = (this.helper.generateOperand() || 1);
    let operatorNumber = this.helper.generateOperator();
    this.operator = this.OPERATORS[operatorNumber];
    this.$mathQuestionParagraph = $("<p>", {
      text: `${this.firstOperand} ${this.operator} ${this.secondOperand}`
    });
  }

  setCorrectAnswer() {
    switch(this.operator) {
      case '+': {
        this.correctAnswer = this.firstOperand + this.secondOperand;
        break;
      }
      case '-': {
        this.correctAnswer = this.firstOperand - this.secondOperand;
        break;
      }
      case '*': {
        this.correctAnswer = this.firstOperand * this.secondOperand;
        break;
      }
      case '/': {
        this.correctAnswer = parseInt(this.firstOperand / this.secondOperand);
        break;
      }
      default: {
        alert("wrong Operator");
      }
    }
  }
}