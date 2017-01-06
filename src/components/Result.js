import React from 'react';

function Result(props) {
  return (
    <div>
      <p>{props.result}</p>
    </div>
  );
}

Result.propTypes = {
  result: React.PropTypes.string.isRequired,
};

export default Result;
