import React, { Component } from 'react';
import './App.css';
import Landing from './components/Landing';
import Instruction from './components/Instruction';
import Question from './components/Question';
import Result from './components/Result';
import Data from './api/Data';
import ReactGA from 'react-ga';

const imagePath = (name) => "./images/" + name;
const answerImagePath = (name) => imagePath("result-" + name.toLowerCase() + ".jpg");

class App extends Component {
  constructor(props) {
    super(props);

    // Prod GA User ID
    ReactGA.initialize('UA-55683977-12');
    // Test GA User ID
    //   ReactGA.initialize('UA-90114002-1');

    this.state = {
      // state machine
      landingPage: true,
      instructionPage: false,
      questionPage: false,
      resultPage: false,

      // default values
      questionId: 0,

      answer: "",

      // below will be filled once we load the data
      data: '',
      numQuestions: '',
      answerStat: '',
      preloadImages: [],
    }
  }

  getResult() {
    var arr = this.state.answerStat;
    var idx = arr.indexOf(Math.max(...arr));
    return this.state.data.answers[idx]
  }

  componentWillMount() {
    // The time when we get the data
    var questionImages = Data.questions.map((e) => imagePath(e.image));
    var answerImages = Data.answers.map((e) => answerImagePath(e));
    this.setState({
      data: Data,
      numQuestions: Data.questions.length,
      answerStat: Array.from({ length: Data.answers.length }, () => 0),
      preloadImages: questionImages.concat(answerImages),
    });


    var stored = localStorage.getItem('state');
    if (stored !== null) {
      this.setState(JSON.parse(stored));
    }
  }

  userClickedAnswer(i) {
    // We accumulate the state and move forward
    var id = this.state.questionId;
    var stat = this.state.answerStat;

    ReactGA.event({
      category: 'style-quiz',
      action: 'answer question',
      label: 'question-' + id,
      value: i,
    });

    // Only when the user clicks `like` (1), we add the score.
    if (i === 1) {
      var answer = this.state.data.questions[id].answer;
      for (let a of answer) {
         stat[a] += 1;
      }
    }

    this.setState({
      questionId: id + 1,
      answerStat: stat,
    });

    if (id >= (this.state.numQuestions - 1)) {
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
    ReactGA.event({
      category: 'style-quiz',
      action: 'start',
      label: 'instruction'
    });

    this.setState({
      landingPage: false,
      instructionPage: true,
    })
  }

  showQuestion() {
    ReactGA.event({
      category: 'style-quiz',
      action: 'start',
      label: 'question'
    });

    this.setState({
      instructionPage: false,
      questionPage: true,
    })
  }

  renderLanding() {
    ReactGA.event({
      category: 'style-quiz',
      action: 'start',
      label: 'landing'
    });

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

  resetTest() {
    localStorage.clear();

    ReactGA.event({
      category: 'style-quiz',
      action: 'start over',
      label: this.state.answer,
    });

    var answerCleared = this.state.answerStat.map((ans) => ans = 0);

    this.setState({
      landingPage: true,
      instructionPage: false,
      questionPage: false,
      resultPage: false,
      questionId: 0,
      answerStat: answerCleared,
    })
  }

  toScheduleAppointment() {
    ReactGA.event({
      category: 'style-quiz',
      action: 'schedule appointment',
      label: this.state.answer,
    });
  }

  renderResult() {
    var answerText = this.getResult();
    var answerImage = answerImagePath(answerText);

    this.setState({
      answer: answerText
    });

    ReactGA.event({
      category: 'style-quiz',
      action: 'show result',
      label: answerText
    });

    return (
      <Result result={answerText}
              image={answerImage}
              next={this.toScheduleAppointment.bind(this)}
              reset={this.resetTest.bind(this)}
      />
    );
  }

  renderQuestion() {
    var index = this.state.questionId;
    var question = this.state.data.questions[index];
    return (
      <Question image={imagePath(question.image)}
                answered={this.userClickedAnswer.bind(this)}
                current={index}
                total={this.state.numQuestions}
                reset={this.resetTest.bind(this)}
      />
    );
  }

  render() {
    var page = {};
    if (this.state.landingPage) {
      page = this.renderLanding();
    } else if (this.state.instructionPage) {
      localStorage.setItem('state', JSON.stringify(this.state));
      page = this.renderInstruction();
    } else if (this.state.questionPage) {
      localStorage.setItem('state', JSON.stringify(this.state));
      page = this.renderQuestion();
    } else if (this.state.resultPage) {
      localStorage.setItem('state', JSON.stringify(this.state));
      page = this.renderResult();
    }

    var Preload = require('react-preload').Preload;
    var loadingIndicator = (<div></div>)
    var images = this.state.preloadImages;
    return (
      <div className="container">
        { page }

        <Preload
            loadingIndicator={loadingIndicator}
            images={images}
            autoResolveDelay={3000}
            resolveOnError={true}
            mountChildren={true}
        ><div></div></Preload>
      </div>
    )
  }
}

export default App;
