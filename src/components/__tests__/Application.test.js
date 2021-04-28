import React from "react";

import axios from "axios";

import {
  render,
  cleanup,
  getByText,
  waitForElement,
  fireEvent,
  prettyDOM,
  getAllByTestId,
  getByPlaceholderText,
  getByAltText,
  queryByText,
  queryByAltText,
  getByTestId,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  //this test uses older syntax for reference, others will use async/await
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books and interview, and reduces spots remaing for the first day by one", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving Appointment!")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "Sorry, no spots remaining!")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure? It will be gone forever!")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting!")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining!")).toBeInTheDocument();
  });
  it("loads data, edits an interview, and keeps the spots remaining for Monday the same", async () => {
    //render app
    const { container } = render(<Application />);
    //wait unti "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // click on edit icon
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));
    // type "Jimmy McDude" into edit
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jimmy McDude" },
    });
    // select other interviewer
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
    // click save
    fireEvent.click(queryByText(appointment, "Save"));
    //check if saving message appears
    expect(getByText(appointment, "Saving Appointment!"));
    //wait until appointment reappears
    await waitForElement(() => getByText(container, "Jimmy McDude"));
    //check if one spot still remains
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "One spot remaining!")).toBeInTheDocument();
  });


  it("shows the save error when failing to save an appointment", async () => {
    //simulate the error :D
    axios.put.mockRejectedValueOnce();
    //render app
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
   
    fireEvent.click(queryByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jimmy McDude" }
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving Appointment!"))
   
    await waitForElement(() => getByText(appointment, "Error! Could not save appointment."));
    
    expect(getByText(appointment, "Error! Could not save appointment.")).toBeInTheDocument();
    // debug();
  });
  it("show the delete error when failing to delete an appointmnet", async () => {
   //simulate the error :D
   axios.delete.mockRejectedValueOnce();
   //render app
   const { container, debug } = render(<Application />);
   await waitForElement(() => getByText(container, "Archie Cohen"));
   const appointment = getAllByTestId(container, "appointment").find(
     appointment => queryByText(appointment, "Archie Cohen")
   );
  
   fireEvent.click(queryByAltText(appointment, "Delete"));
   fireEvent.click(getByText(appointment, "Confirm"));
   expect(getByText(appointment, "Deleting!"))
  
   await waitForElement(() => getByText(appointment, "Error! Could not delete appointment."));
   
   expect(getByText(appointment, "Error! Could not delete appointment.")).toBeInTheDocument();
  });
});
