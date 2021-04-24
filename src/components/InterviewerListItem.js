import React from "react";
import classNames from "classnames";

//styling

import "./styling/InterviewerListItem.scss";

const InterviewerListItem = (props) => {
  const interviewer = classNames({
    interviewers__item: true,
    "interviewers__item--selected": props.selected,
  });
  return (
    <li id={props.id} className={interviewer} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;
