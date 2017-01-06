import React from 'react';

function Landing(props) {
  const handleStart = (e) => {
    props.buttonClicked()
  }

  return (
    <div>
      <p>what's your style?</p>
      <button type="button" onClick={handleStart}> Click to Start </button>
    </div>
  );
}

Landing.propTypes = {
  buttonClicked: React.PropTypes.func.isRequired,
};

export default Landing;
