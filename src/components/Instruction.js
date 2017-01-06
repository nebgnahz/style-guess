import React from 'react';

function Instruction(props) {
  const handleOk = (e) => {
    props.clicked()
  }

  return (
    <div>
      <div className="row">
        <p>How it works</p>
        <p>Click on the 'heart' if you 'like' the image!</p>
        <p>Click on the 'no' if it's not for you</p>
      </div>
      <div className="row">
        <button className="button-primary"
                onClick={handleOk}>Click to Play</button>
      </div>
    </div>
  );
}

Instruction.propTypes = {
  clicked: React.PropTypes.func.isRequired,
};

export default Instruction;
