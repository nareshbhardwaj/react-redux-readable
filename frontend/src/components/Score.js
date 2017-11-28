import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';


const Score = ({ id, score, increaseScoreFunc, decreaseScoreFunc }) => {
  return (
    <div>
      
      <IconButton
        iconClassName="material-icons"
        onClick={ () => decreaseScoreFunc(id) }
      >
      thumb_down
      </IconButton>

      <span style={{margin:5}}>Score: { score }</span>

      <IconButton
        iconClassName="material-icons"
        onClick={ () => increaseScoreFunc(id) }
      >
      thumb_up
      </IconButton>
      
    </div>
  );
}

Score.propTypes = {
  increaseScoreFunc: PropTypes.func.isRequired,
  decreaseScoreFunc: PropTypes.func.isRequired
}

export default Score;