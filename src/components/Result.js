import React from 'react';
import './Result.css';

function Result(props) {
  const onPress = () => {
    props.reset()
  };

  const onNextClicked = () => {
    props.next()
  };

  return (
    <div id="result">
      <div className="row">
        <img src={props.image} role="presentation" width="100%"></img>
      </div>
      <div className="row" id="view-detail-row">
          <a className="view-detail"
             target="_parent"
             onClick={onNextClicked}
             href="https://weddingservice.ladymarry.com/schedule-appointment/">
            Plan Your { props.result } Style Wedding
          </a>
      </div>

      <div className="row" id="start-over-div">
          <a className="view-detail" id="start-over" onClick={onPress}>
             Or Start Over
          </a>
      </div>
    </div>
  );
}

Result.propTypes = {
  result: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  next: React.PropTypes.func,
  reset: React.PropTypes.func,
};

export default Result;
