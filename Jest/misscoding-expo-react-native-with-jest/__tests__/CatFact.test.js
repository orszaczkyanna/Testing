import { render, screen, waitFor } from "@testing-library/react-native";
import CatFact from "../components/CatFact";

describe("CatFact", () => {
  // Store the original fetch to restore after mocking
  const originalFetch = global.fetch;
  // Restore original fetch after each `it()` test to avoid test interference
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should display the first cat fact", async () => {
    // Mock the global fetch function to simulate an API call
    global.fetch = jest.fn(() =>
      // 1. Promise.resolve: Simulate a resolved fetch
      // .then((response) => response.json())
      Promise.resolve({
        // Mock the .json() method
        json: () =>
          // 2. Promise.resolve: Simulate resolved data array
          // .then((data) => { setCatFactData(data) })
          Promise.resolve([
            { text: "first cat fact" },
            { text: "second cat fact" },
          ]),
      })
    );

    // Render the component
    render(<CatFact />);

    // Wait for fetch to complete before checking output
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Assert that the first cat fact is rendered
    const catElement = screen.getByText("first cat fact");
    expect(catElement).toBeTruthy();
  });

  it("should display 'no cat facts' fallback message", async () => {
    // Mock fetch to return an empty list
    global.fetch = jest.fn(() =>
      // Note: No `return` needed in arrow functions WITHOUT curly braces {}, but required when using them
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    render(<CatFact />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Assert that the fallback message / empty state message is rendered
    const catFactElement = screen.getByText("No Cat Facts!");
    expect(catFactElement).toBeTruthy();
  });

  it("should display loading message before fetch resolves", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve([]) })
    );

    render(<CatFact />);

    // Wait for initial loading state before fetch completes
    // Note: waitFor prevents act(...) error by handling async rendering
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeTruthy();
    });
  });
});
