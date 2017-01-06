import React from 'react';

const imagePath = (name) => "./images/" + name;

function Question(props) {
  const clickLike = (e) => {
    props.answered(0)
  };

  const clickNay = (e) => {
    props.answered(1)
  };

  return (
    <div>
      <img src={imagePath(props.image)} alt={props.image}/>
      <button type="button" onClick={clickLike}>Like</button>
      <button type="button" onClick={clickNay}>Nay</button>
    </div>
  );
}

Question.propTypes = {
  image: React.PropTypes.string.isRequired,
  answered: React.PropTypes.func.isRequired,
};

export default Question;
