import React, { useState, useEffect } from "react";
import axios from "axios"
//components
import DayList from "components/DayList.js"
import Appointment from "components/Appointment/index"

//styling
import "components/styling/Application.scss";
// import "components/styling/DayListItem.scss"


//mock appointmnet data-- to be replaced soon
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Chuck Tingle",
      interviewer: {
        id: 4,
        name: "Sentient Interview Scheudler App",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  
];

const Application = (props) => {
  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([])
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // appointments: {}
  })

  const setDay = day => setState({ ...state, day });
  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
  }


  useEffect(() => {
    const url = "http://localhost:8001/api/days"
    axios.get(url)
      .then((response) => {
        // console.log(response)
        setDays([...response.data])
      })
  }, [state.day])


  const spicySchedule = appointments.map(appt => {
    return(
      <Appointment  
      key={appt.id}
      {...appt}
      />
    )
  })
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
          <DayList 
          days={state.days}
          day={state.day}
          setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {spicySchedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

export default Application;
