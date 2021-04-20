import React, { useState, useEffect } from "react";

// route handling

import axios from "axios";

const useAppData = () => {
  //days n' state

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
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

  //routes for booking/deleting appointments

  const bookInt = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        // console.log("response!,", response)
        if (response.status === 204) {
          setState({
            ...state,
            appointments,
          });
          console.log("success! interview booked :) ");
        }
      });
    // console.log("from bookint", id, interview)
  };
  const deleteInt = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`api/appointments/${id}`, {}).then((response) => {
      if (response.status === 204) {
        setState({
          ...state,
          appointments,
        });
      }
      console.log("YEET", response);
    });
  };

  return { state, setDay, bookInt, deleteInt };
};

export default useAppData;
