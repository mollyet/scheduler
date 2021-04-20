import React, { useState, useEffect } from "react";
import axios from "axios";

//components

import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index";

//helpers

import { getApptsByDay, getInt, getIntsByDay } from "../helpers/selectors";

//hooks

import useAppData from "../hooks/useAppData";

//styling

import "components/styling/Application.scss";

const Application = (props) => {
  const { state, setDay, bookInt, deleteInt } = useAppData();

  const dailyAppts = getApptsByDay(state, state.day);

  const interviewers = getIntsByDay(state, state.day);

  const scheduleHammer40k = dailyAppts.map((appt) => {
    const interview = getInt(state, appt.interview);
    return (
      <Appointment
        {...appt}
        key={appt.id}
        id={appt.id}
        time={appt.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInt}
        deleteInterview={deleteInt}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduleHammer40k}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};

export default Application;
