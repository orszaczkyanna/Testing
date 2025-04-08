import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

import TermsAndConditions from "../../src/components/TermsAndConditions";

describe("TermsAndConditions", () => {
  it("should render with correct text and initial state", () => {
    render(<TermsAndConditions />);

    // check that the heading is rendered with correct text
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Terms & Conditions");

    // checkbox should be rendered and initially unchecked
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked;

    // submit button should be rendered and initially disabled
    const button = screen.getByRole("button");
    // const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("should enable the button when the checkbox is checked", async () => {
    // Arrange
    render(<TermsAndConditions />);

    // Act
    // simulate a user checking the checkbox
    const checkbox = screen.getByRole("checkbox");
    const user = userEvent.setup();
    await user.click(checkbox);

    // Assert
    expect(screen.getByRole("button")).toBeEnabled();
  });
});
