import React from "react";

//helpers from react-testing-library

import { render } from "@testing-library/react"

// the test subject 

import Appointment from "components/Appointment"

//tests
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />)
  });
})
