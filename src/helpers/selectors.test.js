import React from "react";

import { getApptsByDay, getInt } from "helpers/selectors"



const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Beyoncé", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Britney Spears",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};



test("getApptsByDay returns an array", () => {
  const result = getApptsByDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getApptsByDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getApptsByDay(state, "Monday");
  expect(result.length).toEqual(3);
});

test("getApptsByDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getApptsByDay(state, "Tuesday");
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

test("getApptsByDay returns an empty array when the days data is empty", () => {
  const result = getApptsByDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getApptsByDay returns an empty array when the day is not found", () => {
  const result = getApptsByDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

test("getInt returns an object with the interviewer data", () => {
  const result = getInt(state, state.appointments["3"].interview);
  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String)
      })
    })
  );
});

test("getInt returns null if no interview is booked", () => {
  const result = getInt(state, state.appointments["2"].interview);
  expect(result).toBeNull();
});
