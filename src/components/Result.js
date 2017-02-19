import React from 'react';

function Result(props) {
  return (
    <div id="result">
      <div className="row">
        <img src={props.image} role="presentation" width="100%"></img>
      </div>
      <div className="row">
        <button>Plan your { props.result } style wedding</button>
      </div>
      <div className="row">
        <button onClick={props.reset}>Redo the test</button>
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
