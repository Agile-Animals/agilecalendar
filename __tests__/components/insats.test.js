import React from "react";
import renderer from "react-test-renderer";

import Insats from "../../src/components/Insats";

describe("<Insats />", () => {
  test("renders", async () => {
    let InsatsData = renderer.create(<Insats />).getInstance();

    let checkReturn = await InsatsData.freePersonnel(
      "00:00",
      "01:00",
      "2021-04-24"
    );

    expect(checkReturn).toEqual(0);
  });
});
