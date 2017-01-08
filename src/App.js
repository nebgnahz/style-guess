import React, { Component } from 'react';
import './App.css';
import Landing from './components/Landing';
import Instruction from './components/Instruction';
import Question from './components/Question';
import Result from './components/Result';
import Data from './api/Data';

const imagePath = (name) => "./images/" + name;

class App extends Component {
  constructor(props) {
    super(props);

    var state = {
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

    var stored = localStorage.getItem('state');
    if (stored !== null) {
      state = JSON.parse(stored);
    }
    this.state = state;
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
      // Only when the user clicks `like` (1), we add the score.
      if (i === 1) {
        var answer = this.state.data.questions[id].answer;
        stat[answer] += 1;
      }

      this.setState({
        questionId: id + 1,
        answerStat: stat,
      });

      // After set the state, we store the state
      localStorage.setItem('state', JSON.stringify(this.state));
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
    var question = this.state.data.questions[0];
    return (
      <Landing buttonClicked={this.showInstruction.bind(this)}
               background={imagePath(question.image)} />
    )
  }

  renderInstruction() {
    var question = this.state.data.questions[0];
    return (
      <Instruction clicked={this.showQuestion.bind(this)}
                   background={imagePath(question.image)} />
    )
  }

  renderResult() {
    localStorage.clear();
    return (
      <Result result={this.getResult()} />
    );
  }

  renderQuestion() {
    var index = this.state.questionId;
    var question = this.state.data.questions[index];
    return (
      <Question image={imagePath(question.image)}
                answered={this.userClickedAnswer.bind(this)}
                current={index}
                total={this.state.numQuestions}/>
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
      <div className="container">
        {page}
      </div>
    )
  }
}

export default App;
