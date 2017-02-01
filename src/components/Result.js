import React from 'react';

function Result(props) {
  return (
    <div className="row">
      <p>Your style is "{props.result}"</p>
    </div>
  );
}

Result.propTypes = {
  result: React.PropTypes.string.isRequired,
};

export default Result;
