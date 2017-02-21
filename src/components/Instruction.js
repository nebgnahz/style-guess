import React from 'react';

function Instruction(props) {
  const handleStart = (e) => {
    props.clicked()
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
            <p>How It Works</p>
            <p>Click on the
              &nbsp; <i className="fa fa-heart" aria-hidden="true" />
              &nbsp; if you 'LIKE' the image!
            </p>
            <p>Click on the
              &nbsp; <i className="fa fa-ban" aria-hidden="true" />
              &nbsp; if the image isn't for you.
            </p>
            <a>START</a>
          </div>
        </div>
      </div>
    </div>
  );
}

Instruction.propTypes = {
  clicked: React.PropTypes.func.isRequired,
  background: React.PropTypes.string.isRequired,
};

export default Instruction;
