import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  // article ('the') omitted for brevity
  it("should render user name", () => {
    const user: User = { id: 1, name: "July" }; // explicitly type user
    // define test data near render for readability, keep test data inside each test
    render(<UserAccount user={user} />);
    const name = screen.getByText(user.name); // use variable instead of hardcoded string
    expect(name).toBeInTheDocument();
  });

  it("should render edit button if user is admin", () => {
    const user: User = { id: 1, name: "July", isAdmin: true };
    render(<UserAccount user={user} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render edit button if user is not admin", () => {
    const user: User = { id: 1, name: "July" };
    render(<UserAccount user={user} />);
    // use `queryByRole` instead of `getByRole` to avoid errors when the element is not in the DOM
    // .not. negates the matcher to assert non-existence
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
