import React from 'react';
import './Question.css';

function Question(props) {
  const clickLike = (e) => {
    props.answered(0)
  };

  const clickNay = (e) => {
    props.answered(1)
  };

  var divStyle = {
    'backgroundImage': "url(" + props.image + ")",
    'background-repeat': "no-repeat",
    'background-size': '100%'
  };

  var progress = 100.0 * (props.current + 1) / props.total + "%";
  var progressStyle = {
    width: progress
  }

  return (
    <div>
      <div className="row">
        <p className="fancy-text">What's your style?</p>
      </div>
      <div className="row question" style={divStyle}>
        <img src={props.image} className="hide" role="presentation" />
        <div className="left-side" onClick={clickNay}>
          <span>
            <i className="fa fa-lg fa-ban" aria-hidden="true"></i>
            <br/><br/>
            not for me
          </span>
        </div>
        <div className="right-side" onClick={clickLike}>
          <span>
            <i className="fa fa-lg fa-heart" aria-hidden="true"></i>
            <br/><br/>
            like
          </span>
        </div>
      </div>
      <div className="row">
        <div id="progressbar">
          <div id="progress" style={progressStyle}>
            <div id="pbaranim">
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <span>{props.current + 1} / {props.total}</span>
      </div>
    </div>
  );
}

Question.propTypes = {
  image: React.PropTypes.string.isRequired,
  answered: React.PropTypes.func.isRequired,
  current: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired,
};

export default Question;
