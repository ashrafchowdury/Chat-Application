import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.log(error);
  }
  render() {
    return this.state.hasError ? (
      <div className="errorBoundary">
        <h3>Sorry there was a problem loading this page</h3>
      </div>
    ) : (
      this.props.children
    );
  }
}
