import React from "react";
import renderer from "react-test-renderer";

import Insats from "../../src/components/Insats";

describe("<Insats />", () => {
  it("renders", () => {
    const tree = renderer.create(<Insats />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
