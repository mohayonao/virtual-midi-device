import "run-with-mocha";
import assert from "assert";
import React from "react";
import { shallow } from "enzyme";
import LEDColorDefs from "../../src/components/LEDColorDefs";

function setup(props = {}) {
  props = { colors: [], ...props };

  const component = shallow(
    <LEDColorDefs { ...props }/>
  );

  return { component, props };
}

describe("components/LEDColorDefs", () => {
  it("wrap <defs>", () => {
    const { component } = setup();

    assert(component.root.type() === "defs")
  });

  it("has elems", () => {
    const { component } = setup({ colors: [ "#000", "#f00", "#0f0", "#00f" ] });
    const elems = component.find("radialGradient");

    assert(elems.length === 4);
  });
});
