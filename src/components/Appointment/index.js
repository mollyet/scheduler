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
import Error from "./Error";

// mode constants

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const yeetDelete = () => {
    transition(DELETING);
    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };
  const confirming = () => {
    transition(CONFIRM);
  };
  const cancel = () => {
    transition(SHOW);
  };
  const edit = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirming}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving Appointment!" />}
      {mode === DELETING && <Status message="Deleting!" />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={yeetDelete}
          onCancel={cancel}
          message="Are you sure? It will be gone forever!"
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message="Error! Could not save appointment." data-testid="err-save"/>
      )}
      {mode === ERROR_DELETE && (
        <Error
          onClose={back}
          message="Error! Could not delete appointment."
          data-testid="err-delete"
        />
      )}
    </article>
  );
};

export default Appointment;
