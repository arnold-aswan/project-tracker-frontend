import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutUs from "../src/components/AboutUs"; // Assuming AboutUs component is in the same directory
import ContactUs from "../src/components/ContactUs";
import AddCohort from "../src/components/AddCohort";
import AuthComponent from "../src/components/AuthComponent";
// import AddProject from "../src/components/AddProject";
// import Cohorts from "../src/components/Cohorts";



test("renders AboutUs component correctly", () => {
  // Render the AboutUs component
  const { container } = render(<AboutUs />);

  // Check if the component renders without errors
  expect(container).not.toBeNull();
});

test("renders AddCohort component correctly", () => {
  // Render the AboutUs component
  const { container } = render(<AddCohort />);

  // Check if the component renders without errors
  expect(container).not.toBeNull();
});


// test("renders AuthComponent component correctly", () => {
//   // Render the AuthComponent component
//   const { container } = render(<AuthComponent />);

//   // Check if the component renders without errors
//   expect(container).not.toBeNull();
// });

// test("renders Cohorts component correctly", () => {
//     // Render the Cohorts component
//     const { container } = render(<Cohorts />);

//     // Check if the component renders without errors
//     expect(container).not.toBeNull();
//   });

describe("AboutUs", () => {
  it("About Us to be in the document", () => {
    render(<AboutUs />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });
});

describe("ContactUs", () => {
  it("Contact Us to be in the document", () => {
    render(<ContactUs />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });
});
