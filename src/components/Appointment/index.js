import React, { Fragment } from "react";
//components
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
//stylings
import "./styles.scss"

const Appointment = (props) => {
  return(
    <article className="appointment">
      <Header 
      time={props.time}
      />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>
  )
}

export default Appointment; 