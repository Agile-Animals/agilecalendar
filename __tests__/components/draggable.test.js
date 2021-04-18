import React from "react";
import renderer from "react-test-renderer";

import Draggable from "../../src/components/Draggable";

describe("<Draggable />", () => {
  test("renders", async () => {
    let DraggableData = renderer.create(<Draggable />).getInstance();

    console.log(DraggableData.checkPersonnel("00:00", "01:00", "2021-04-24"));
    let checkReturn = await DraggableData.checkPersonnel(
      "00:00",
      "01:00",
      "2021-04-24"
    );

    expect(checkReturn).toBe(1);
  });
});