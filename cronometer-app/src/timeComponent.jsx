import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TimeComponent extends Component {
  render() {
    const { unit, curTime, increase, decrease, clearEv } = this.props;
    return (
      <div>
        <button name={ unit } onMouseDown={ increase } onMouseUp={ clearEv }> ▲ </button>
        <div className="time-unit">{ curTime }</div>
        <button name={ unit } onMouseDown={ decrease } onMouseUp={ clearEv }> ▼ </button>
      </div>
    );
  }
}

TimeComponent.propTypes = {
  unit: PropTypes.string.isRequired,
  curTime: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  clearEv: PropTypes.func.isRequired,
}

export default TimeComponent;
