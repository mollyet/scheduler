import React from "react";
//components

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

//hooks

import useVisualMode from "hooks/useVisualMode";

//styling

import "./styles.scss";

// mode constants

const EMPTY = "EMPTY";
const SHOW = "SHOW";

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
      {mode === SHOW && (
         <Show
         student={props.interview.student}
         interviewer={props.interview.interviewer}
       />
      )}
    </article>
  );
};

export default Appointment;
