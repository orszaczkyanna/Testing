import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

import ExpandableText from "../../src/components/ExpandableText";

describe("ExpandableText", () => {
  // Use shared constants for long text generation
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.slice(0, 255) + "..."; // could use substring(), but slice() is more modern and consistent with Array.slice()

  it("should render the full text and no button if text is less than 255 characters", () => {
    const text = "short text";
    render(<ExpandableText text={text} />);

    // Use getByText for exact match (cleaner than .textContent checks)
    expect(screen.getByText(text)).toBeInTheDocument();
    // Use queryByRole when element should NOT be present
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    // my initial approach – left here for comparison:
    // expect(screen.getByRole("article").textContent).toBe(text);
  });

  it("should truncate text and render button if text is longer than 255 characters", () => {
    // const longText = "a".repeat(256);

    render(<ExpandableText text={longText} />);

    // const truncatedText = longText.slice(0, 255) + "...";
    expect(screen.getByText(truncatedText)).toBeInTheDocument(); // Using predefined truncatedText
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i); // Verify button appears with correct label

    // my initial approach – left here for comparison:
    // expect(screen.getByRole("article").textContent?.slice(-3)).toBe("...");
  });

  it("should expand text when Show More button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("should collapse text when Show Less button is clicked", async () => {
    // Simulate toggle: expand then collapse
    // Arrange
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    // Act
    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    // Assert: confirm collapsed state is restored
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
