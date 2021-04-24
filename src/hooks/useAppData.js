import { useState, useEffect } from "react";

// route handling

import axios from "axios";

//helpers

import { getDay, getAllDays } from "../helpers/selectors";

const useAppData = () => {
  //days n' state

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  //updates the spots

  const updateSpots = (day, appointments, state) => {
    const daysArr = getAllDays(state);
    const dayArr = getDay(state, day);
    const apptIds = dayArr.appointments;
    let spots = 0;
    //stretch: refactor loop to be an array f(x) such as .filter interview = null, && spots = array.length
    for (const id of apptIds) {
      if (!appointments[id].interview) {
        spots++;
      }
    }
    dayArr.spots = spots;
    const daySpots = [];
    daysArr.forEach((x) =>
      x.name === day ? daySpots.push(dayArr) : daySpots.push(x)
    );
    return daySpots;
  };

  //books the interview

  const bookInt = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newSpots = updateSpots(state.day, appointments, state);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        console.log("response!,", response);

        if (response.status === 204) {
          setState({
            ...state,
            appointments,
            days: newSpots,
          });
        }
      })
      .catch((error) => {
        console.log("error!", error);
      });
  };

  //deletes the interview

  const deleteInt = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newSpots = updateSpots(state.day, appointments, state);

    return axios
      .delete(`api/appointments/${id}`, {})
      .then((response) => {
        if (response.status === 204) {
          setState({
            ...state,
            appointments,
            days: newSpots,
          });
        }
      })
      .catch((error) => {
        console.log("error!", error);
      });
  };

  return { state, setDay, bookInt, deleteInt };
};

export default useAppData;
