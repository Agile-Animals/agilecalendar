import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";

import HomeScreen from "../HomeScreen/HomeScreen";

describe("des", () => {
  test("renders default elements", () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("renders default elements", () => {
    expect(() => render(<HomeScreen />)).not.toThrow();
  });
  test("renders default elements", () => {
    expect(() => render(<HomeScreen />));
  });
});
