/// <reference types="vitest/globals" />
// Informs TypeScript that global test functions (describe, it, expect) are defined by Vitest
/// <reference types="@testing-library/jest-dom" />
// Informs TypeScript about custom matchers like toBeInTheDocument() from jest-dom
import React from "react";
import { render, screen } from "@testing-library/react";

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
