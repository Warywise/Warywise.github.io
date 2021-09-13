import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TimeIsEnd extends Component {
  render() {
    const { timeEnd } = this.props;
    return (
      <div className="time-end">
        O Tempo Acabou!<br/>
        Nyan Cat já<br/>atravessou a galáxia!
        <div>
          <button className="time-end-btn" onClick={ timeEnd }>Recomeçar Jornada!</button>
        </div>
      </div>
    );
  }
}

TimeIsEnd.propTypes = { timeEnd: PropTypes.func.isRequired }

export default TimeIsEnd;
