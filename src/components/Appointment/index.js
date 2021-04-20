import React from "react";
//components

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

//hooks

import useVisualMode from "hooks/useVisualMode";

//helpers

//styling

import "./styles.scss";
import Confirm from "./Confirm";

// mode constants

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    // console.log("name, interview", name, interviewer)
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  };

  const yeetDelete = () => {
    transition(DELETING);
    props.deleteInterview(props.id).then(() => transition(EMPTY));
  };
  const confirming = () => {
    transition(CONFIRM);
  };
  const cancel = () => {
    transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirming}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          // name={props.interview.student}
          // interviewer={props.interview.interviewer}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Booking Appointment!" />}
      {mode === DELETING && <Status message="Deleting!" />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={yeetDelete}
          onCancel={cancel}
          message="Are you sure? It will be gone forever!"
        />
      )}
    </article>
  );
};

export default Appointment;
