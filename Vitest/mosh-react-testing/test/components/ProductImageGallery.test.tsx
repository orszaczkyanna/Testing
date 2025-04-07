import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render nothing if given an empty array", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />); // destructure the root DOM element from render result
    screen.debug(container); // <div />
    expect(container).toBeEmptyDOMElement(); // assert that the component renders no content
  });

  it("should render a list of images", () => {
    const imageUrls: string[] = ["url1", "url2"];
    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole("img"); // get all <img> elements by their implicit role

    expect(images).toHaveLength(2); // verify the number of rendered images

    // check that each image has the correct src attribute
    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
    });
  });
});
