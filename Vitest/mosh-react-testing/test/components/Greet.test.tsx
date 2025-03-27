import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest"; // Add custom matchers like .toBeInTheDocument() and .toHaveTextContent()
// ⚠️ Make sure to import the Vitest-specific version with '/vitest'

import Greet from "../../src/components/Greet";

// Test suite for the Greet component
describe("Greet", () => {
  it("should render Hello with the name when name is provided", () => {
    render(<Greet name="Doe" />); // Render the component with the name
    screen.debug(); // Print the rendered HTML to the console
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/doe/i); // Assert that the heading text contains the name (regex: case-insensitive)
  });

  it("should render login button when name is not provided", () => {
    render(<Greet />);
    screen.debug();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
