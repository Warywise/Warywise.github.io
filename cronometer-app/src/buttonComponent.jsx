import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BtnComponent extends Component {
  render() {
    const { buttonClass, countFunc, content } = this.props;
    return <button className={ `defaul-btn ${buttonClass}` } onClick={ countFunc }>{ content }</button>;
  }
}

BtnComponent.propTypes = PropTypes.shape({
  buttonClass: PropTypes.string,
  countFunc: PropTypes.func,
  content: PropTypes.string,
}).isRequired;

export default BtnComponent;