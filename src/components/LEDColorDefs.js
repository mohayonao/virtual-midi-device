import React, { Component, PropTypes } from "react";
import Color from "color";

export default class LEDColorDefs extends Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(...args) {
    super(...args);

    this._colors = this.props.colors.map((color, i) => {
      const color1 = Color(color).mix(Color("#fafaf9")).darken(0.25).hexString();
      const color2 = i !== 0 ? Color(color1).lighten(0.5).hexString() : color1;

      return [ color1, color2 ];
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const elems = this._colors.map(([ color1, color2 ], i) => {
      const id = `led${ i }`;

      return (
        <radialGradient key={ i } gradientUnits="objectBoundingBox" id={ id } spreadMethod="pad">
          <stop offset=  "0%" stopColor={ color2 }/>
          <stop offset="100%" stopColor={ color1 }/>
        </radialGradient>
      );
    });

    return (<defs>{ elems }</defs>);
  }
}
