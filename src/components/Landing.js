import React from 'react';

function Landing(props) {
  const handleStart = (e) => {
    props.buttonClicked()
  }

  return (
    <div>
      <div className="row">
        <p className="fancy-text">What's your style?</p>
      </div>
      <div className="row">
        <button className="button-primary"
                onClick={handleStart}>Click to Play</button>
      </div>
    </div>
  );
}

Landing.propTypes = {
  buttonClicked: React.PropTypes.func.isRequired,
};

export default Landing;
