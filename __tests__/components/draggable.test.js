import React from "react";
import renderer from "react-test-renderer";

import Draggable from "../../src/components/Draggable";

describe("<Draggable />", () => {
  it("renders", () => {
    const tree = renderer.create(<Draggable />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
