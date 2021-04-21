import React from "react";
import renderer from "react-test-renderer";

import Insats from "../../src/components/Insats";
import Draggable from "../../src/components/Draggable";

describe("<Draggable 1 />", () => {
  test("Book 1", async () => {
    let DraggableData = renderer.create(<Draggable />).getInstance();
    let checkReturn = await DraggableData.checkPersonnel(
      "02:00",
      "03:00",
      "2021-12-24"
    );
    expect(checkReturn).toEqual(1);
  });
});

describe("<Draggable 2 />", () => {
  test("Book 2", async () => {
    let DraggableData = renderer.create(<Draggable />).getInstance();
    let checkReturn = await DraggableData.checkPersonnel(
      "04:00",
      "05:00",
      "2021-12-25"
    );
    expect(checkReturn).toEqual(1);
  });
});

describe("<Draggable 3 />", () => {
  test("Book 3", async () => {
    let DraggableData = renderer.create(<Draggable />).getInstance();
    let checkReturn = await DraggableData.checkPersonnel(
      "00:00",
      "01:00",
      "2021-12-26"
    );
    expect(checkReturn).toEqual(1);
  });
});

describe("<Draggable 4 />", () => {
  test("DoubleBook 1", async () => {
    let DraggableData = renderer.create(<Draggable />).getInstance();
    let checkReturn = await DraggableData.checkPersonnel(
      "04:00",
      "05:00",
      "2021-12-25"
    );
    expect(checkReturn).toEqual(0);
  });
});

describe("<Insats 1 />", () => {
  test("Free 1", async () => {
    let InsatsData = renderer.create(<Insats />).getInstance();
    let checkReturn = await InsatsData.freePersonnel(
      "02:00",
      "03:00",
      "2021-12-24"
    );
    expect(checkReturn).toEqual(0);
  });
});

describe("<Insats 2 />", () => {
  test("Free 2", async () => {
    let InsatsData = renderer.create(<Insats />).getInstance();
    let checkReturn = await InsatsData.freePersonnel(
      "04:00",
      "05:00",
      "2021-12-25"
    );
    expect(checkReturn).toEqual(0);
  });
});

describe("<Insats 3 />", () => {
  test("Free 3", async () => {
    let InsatsData = renderer.create(<Insats />).getInstance();
    let checkReturn = await InsatsData.freePersonnel(
      "00:00",
      "01:00",
      "2021-12-26"
    );
    expect(checkReturn).toEqual(0);
  });
});
