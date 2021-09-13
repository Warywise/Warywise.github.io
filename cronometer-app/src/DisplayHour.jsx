import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DisplayHourCheck extends Component {
  render() {
    const { curCondition, getCondition } = this.props;
    return (
      <label className="text-content" htmlFor="view-hour">
      Utilizar "Horas"
      <input
        type="checkbox"
        id="view-hour"
        name="viewHour"
        value={ curCondition }
        onChange={ getCondition }
      />
    </ label>
    );
  }
}

DisplayHourCheck.propTypes = {
  curCondition: PropTypes.bool.isRequired,
  getCondition: PropTypes.func.isRequired,
}

export default DisplayHourCheck;