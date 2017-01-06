import React, { Component } from 'react';
import './App.css';
import Landing from './components/Landing';
import Instruction from './components/Instruction';
import Question from './components/Question';
import Result from './components/Result';
import Data from './api/Data';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // state machine
      landingPage: true,
      instructionPage: false,
      questionPage: false,
      resultPage: false,

      // default values
      questionId: 0,

      // below will be filled once we load the data
      data: '',
      numQuestions: '',
      answerStat: '',
    }
  }

  getResult() {
    var arr = this.state.answerStat;
    var idx = arr.indexOf(Math.max(...arr));
    return this.state.data.answers[idx]
  }

  componentWillMount() {
    this.setState({
      data: Data,
      numQuestions: Data.questions.length,
      answerStat: Array.from({ length: Data.answers.length }, () => 0),
    });
  }

  userClickedAnswer(i) {
    // We accumulate the state and move forward
    var id = this.state.questionId;
    var stat = this.state.answerStat;
    if (id < (this.state.numQuestions - 1) && id >= 0) {
      // Collect stat and advance
      stat[i] += 1;

      this.setState({
        questionId: id + 1,
        answerStat: stat,
      });
    } else {
      // Finished so show result page?
      console.log(this.state.answerStat);

      this.setState({
        questionPage: false,
        resultPage: true,
      });
    }

    console.log(JSON.stringify(this.state.answerStat));
  }

  showInstruction() {
    this.setState({
      landingPage: false,
      instructionPage: true,
    })
  }

  showQuestion() {
    this.setState({
      instructionPage: false,
      questionPage: true,
    })
  }

  renderLanding() {
    return (
      <Landing buttonClicked={this.showInstruction.bind(this)}/>
    )
  }

  renderInstruction() {
    return (
      <Instruction clicked={this.showQuestion.bind(this)}/>
    )
  }

  renderResult() {
    return (
      <Result result={this.getResult()} />
    );
  }

  renderQuestion() {
    var index = this.state.questionId;
    var question = this.state.data.questions[index];
    return (
        <Question image={question.image}
                  answered={this.userClickedAnswer.bind(this)}/>
    );
  }

  render() {
    var page = {};
    if (this.state.landingPage) {
      page = this.renderLanding();
    } else if (this.state.instructionPage) {
      page = this.renderInstruction();
    } else if (this.state.questionPage) {
      page = this.renderQuestion();
    } else if (this.state.resultPage) {
      page = this.renderResult();
    }

    return (
      <div className="App">
        {page}
      </div>
    )
  }
}

export default App;
