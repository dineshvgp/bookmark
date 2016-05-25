import React from "react";

/**
 * Root container for react.
 * All the child components rendered here.
 */
class AppContainer extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer;
