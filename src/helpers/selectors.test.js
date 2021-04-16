import React from "react";

import { getApptsByDay, getInt, getIntsByDay } from "helpers/selectors";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [2, 1,],
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [3, 1],
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Beyoncé", interviewer: 2 },
    },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Britney Spears",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
    3: {
      id: 3,
      name: "Sentient Toaster",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
  },
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
        avatar: expect.any(String),
      }),
    })
  );
});

test("getInt returns null if no interview is booked", () => {
  const result = getInt(state, state.appointments["2"].interview);
  expect(result).toBeNull();
});

test("getIntsByDay returns an array", () => {
  const result = getIntsByDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getIntsByDay returns an array with a length matching the number of interviewers for that day", () => {
  const result = getIntsByDay(state, "Monday");
  expect(result.length).toEqual(2);
});

test("getIntsByDay returns an array containing the correct interviewers objects", () => {
  const [first, second] = getIntsByDay(state, "Tuesday");
  expect(first).toEqual(state.interviewers["3"]);
  expect(second).toEqual(state.interviewers["1"]);
});

test("getIntsByDay returns an empty array when the days data is empty", () => {
  const result = getIntsByDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getIntsByDay returns an empty array when the day is not found", () => {
  const result = getIntsByDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});
