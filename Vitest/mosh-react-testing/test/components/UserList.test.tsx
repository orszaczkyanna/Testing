import React from "react";
import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should render no users when the users array is empty", () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("should render a list of users", () => {
    const users: User[] = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    render(<UserList users={users} />);

    // -- Verify each user has a link with correct text and href --
    // loop through each user to test individual rendered links
    users.forEach((user) => {
      // getByRole("link") targets <a> elements — using accessible name to match link text (user.name) (case-sensitive by default)
      const link = screen.getByRole("link", { name: user.name });

      expect(link).toBeInTheDocument();

      // check if link has correct href attribute pointing to user profile
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
