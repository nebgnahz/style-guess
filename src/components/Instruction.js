import React from 'react';

function Instruction(props) {
  const handleOk = (e) => {
    props.clicked()
  }

  return (
    <div>
      <button type="button" onClick={handleOk}>Click to start</button>
      <p>How it works</p>
      <p>Click on the 'heart' if you 'like' the image!</p>
      <p>Click on the 'no' if it's not for you</p>
    </div>
  );
}

Instruction.propTypes = {
  clicked: React.PropTypes.func.isRequired,
};

export default Instruction;
