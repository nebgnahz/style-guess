import React from 'react';

function Result(props) {
  return (
    <div className="row">
      <img src={props.image} role="presentation" width="100%"></img>
    </div>
  );
}

Result.propTypes = {
    result: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
};

export default Result;
