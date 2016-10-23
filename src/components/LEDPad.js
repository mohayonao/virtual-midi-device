import React, { Component, PropTypes } from "react";

export default class LEDPad extends Component {
  static propTypes = {
    color : PropTypes.string.isRequired,
    x     : PropTypes.number,
    y     : PropTypes.number,
    cx    : PropTypes.number,
    cy    : PropTypes.number,
    width : PropTypes.number,
    height: PropTypes.number,
    onTap : PropTypes.func,
  };

  constructor(...args) {
    super(...args);

    const { cx, cy } = this.props;
    const width = Math.max(0, this.props.width) || LEDPad.width;
    const height = Math.max(0, this.props.height) || LEDPad.height;
    const x = typeof cx === "number" ? cx - width / 2 : this.props.x;
    const y = typeof cy === "number" ? cy - height / 2 : this.props.y;

    this._styles = { ...styles, x, y, width, height };
    this._events = {
      "onMouseDown" : ::this.onMouseDown,
      "onMouseUp"   : ::this.onMouseUp,
      "onMouseOut"  : ::this.onMouseOut,
      "onTouchStart": ::this.onTouchStart,
      "onTouchEnd"  : ::this.onTouchEnd,
    };
    this._focus = false;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.color !== this.props.color;
  }

  onMouseDown() {
    this._focus = true;
    if (this.props.onTap) {
      this.props.onTap(1);
    }
  }

  onMouseUp() {
    this._focus = false;
    if (this.props.onTap) {
      this.props.onTap(0);
    }
  }

  onMouseOut() {
    if (this._focus) {
      this.onMouseUp();
    }
  }

  onTouchStart() {
    this.onMouseDown();
  }

  onTouchEnd() {
    this.onMouseUp();
  }

  render() {
    return (
      <rect className="led-pad" fill={ this.props.color } { ...this._styles } { ...this._events }/>
    );
  }
}

export const styles = {
  rx: 10,
  ry: 10,
  width: 62,
  height: 62,
  stroke: "#050504",
  strokeWidth: 1,
};
