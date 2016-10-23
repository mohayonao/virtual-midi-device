import "run-with-mocha";
import assert from "assert";
import sinon from "sinon";
import React from "react";
import { shallow } from "enzyme";
import LEDPad from "../../src/components/LEDPad";

function setup(props = {}) {
  props = { color: "#000", ...props };

  const component = shallow(
    <LEDPad { ...props }/>
  );

  return { component, props };
}

describe("components/LEDPad", () => {
  it("wrap <rect>", () => {
    const { component } = setup();

    assert(component.root.type() === "rect");
  });

  describe("style", () => {
    it("(x, y)", () => {
      const props = { x: 100, y: 200, width: 80, height: 60 };
      const { component } = setup(props);
      const root = component.root;

      assert(root.prop("x") === props.x);
      assert(root.prop("y") === props.y);
      assert(root.prop("width") === props.width);
      assert(root.prop("height") === props.height);
    });

    it("(cx, cy)", () => {
      const props = { cx: 100, cy: 200, width: 80, height: 60 };
      const { component } = setup(props);
      const root = component.root;

      assert(root.prop("x") === props.cx - props.width / 2);
      assert(root.prop("y") === props.cy - props.height / 2);
      assert(root.prop("width") === props.width);
      assert(root.prop("height") === props.height);
    });
  });

  describe("events", () => {
    it("mouse event", () => {
      const props = { onTap: sinon.spy() };
      const { component } = setup(props);

      component.simulate("mousedown");
      component.simulate("mouseup");

      assert(props.onTap.callCount === 2);
      assert(props.onTap.args[0][0] === 1);
      assert(props.onTap.args[1][0] === 0);
      props.onTap.reset();

      component.simulate("mouseout");
      assert(props.onTap.callCount === 0);
      props.onTap.reset();

      component.simulate("mousedown");
      component.simulate("mouseout");
      assert(props.onTap.callCount === 2);
      assert(props.onTap.args[0][0] === 1);
      assert(props.onTap.args[1][0] === 0);
    });

    it("touch event", () => {
      const props = { onTap: sinon.spy() };
      const { component } = setup(props);

      component.simulate("touchstart");
      component.simulate("touchend");

      assert(props.onTap.callCount === 2);
      assert(props.onTap.args[0][0] === 1);
      assert(props.onTap.args[1][0] === 0);
    });

    it("do nothing", () => {
      const { component } = setup();

      assert.doesNotThrow(() => {
        component.simulate("mousedown");
        component.simulate("mouseup");
      });
    });
  });
});
