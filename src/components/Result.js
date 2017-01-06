import React from 'react';

function Result(props) {
  return (
    <div className="row">
      <p>You like {props.result}!</p>
    </div>
  );
}

Result.propTypes = {
  result: React.PropTypes.string.isRequired,
};

export default Result;
