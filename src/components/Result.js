import React from 'react';
import './Result.css';
import Hammer from 'react-hammerjs';

function Result(props) {
  const onPress = () => {
    props.reset()
  };

  return (
    <div id="result">
      <Hammer onPress={onPress}>
        <div className="row">
          <img src={props.image} role="presentation" width="100%"></img>
        </div>
      </Hammer>
      <div className="row">
          <a className="view-detail"
             href="https://weddingservice.ladymarry.com/schedule-appointment/">
            Plan Your { props.result } Style Wedding
          </a>
      </div>
    </div>
  );
}

Result.propTypes = {
  result: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  reset: React.PropTypes.func,
};

export default Result;
