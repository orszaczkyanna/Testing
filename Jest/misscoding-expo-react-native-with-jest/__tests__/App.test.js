import { render } from "@testing-library/react-native";
import App from "../App.js";

describe("App", () => {
  // Smoke test using @testing-library/react-native
  it("should render without crashing", () => {
    // Minimal test to verify that the component renders
    render(<App />);
  });

  // Snapshot test using destructured toJSON (preferred community style)
  it("should match the snapshot", () => {
    // Render the App component and extract the toJSON method
    const { toJSON } = render(<App />);

    // Convert the rendered output to JSON format and compare it to the stored snapshot
    // * The actual conversion happens here, when toJSON() is called inside expect()
    // If no snapshot exists, one will be created
    // If a snapshot exists, the test will fail if there are any differences
    expect(toJSON()).toMatchSnapshot();
  });

  // Snapshot test using direct .toJSON() (Expo docs style)
  /*
  it("should match the snapshot", () => {
    // Render the App component and convert the output to JSON
    const tree = render(<App />).toJSON();
    // Compare the rendered output to the saved snapshot
    expect(tree).toMatchSnapshot();
  });
  */
});

// ------------------------------------------------------------- //

// Snapshot test using deprecated `react-test-renderer`
// Kept here for reference only – not recommended for new projects

/*
import renderer from "react-test-renderer"; // Snapshot testing utility (deprecated)
import App from "./App.js";

describe("App", () => {
  it("should have 1 child", () => {
    // Render App component and convert it to JSON format
    const tree = renderer.create(<App />).toJSON();
    // Check that the top-level element has exactly one child
    expect(tree.children.length).toBe(1);
  });

  it("should render correctly", () => {
    // Render the App component and convert it to a JSON tree
    const tree = renderer.create(<App />).toJSON();

    // Compare the rendered output to the saved snapshot
    // If no snapshot exists, one will be created
    // If a snapshot exists, the test will fail if there are any differences
    expect(tree).toMatchSnapshot();
  });
});
*/
