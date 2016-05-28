import React, { Component } from 'react';

/**
 * Root container for react.
 * All the child components rendered here.
 */
export default class AppContainer extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
