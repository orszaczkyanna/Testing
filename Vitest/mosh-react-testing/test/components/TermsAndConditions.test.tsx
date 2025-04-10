import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

import TermsAndConditions from "../../src/components/TermsAndConditions";

describe("TermsAndConditions", () => {
  // Render helper function to simplify test setup
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      // getByRole throws an error if element is not found — no need for .toBeInTheDocument()
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
    };
  };

  it("should render with correct text and initial state", () => {
    // Destructuring assigns new variables → const required
    const { heading, checkbox, button } = renderComponent();

    // Assert initial state
    expect(heading).toHaveTextContent("Terms & Conditions");
    expect(checkbox).not.toBeChecked;
    expect(button).toBeDisabled();
  });

  it("should enable the button when the checkbox is checked", async () => {
    // Arrange
    const { checkbox, button } = renderComponent();

    // Act: simulate a user checking the checkbox
    const user = userEvent.setup();
    await user.click(checkbox);

    // Assert
    expect(button).toBeEnabled();
  });
});
