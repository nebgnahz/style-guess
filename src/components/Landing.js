import React from 'react';

function Landing(props) {
  const handleStart = (e) => {
    props.buttonClicked()
  }

  var divStyle = {
    'backgroundImage': "url(" + props.background + ")",
    'backgroundRepeat': "no-repeat",
    'backgroundSize': '100%'
  };

  return (
    <div>
      <div className="row">
        <p className="fancy-text">What's your style?</p>
      </div>
      <div className="row landing" style={divStyle}>
        <div className="block-over" onClick={handleStart}>
          <div className="text-frame">
            <a>START</a>
          </div>
        </div>
      </div>
    </div>
  );
}

Landing.propTypes = {
  buttonClicked: React.PropTypes.func.isRequired,
  background: React.PropTypes.string.isRequired,
};

export default Landing;
