import React from "react";

//components

import InterviewerListItem from "components/InterviewerListItem";

// prop-types

import PropTypes from "prop-types";

//styling

import "./styling/InterviewerList.scss";

const InterviewerList = (props) => {
  const int = props.interviewers.map((int) => {
    return (
      <InterviewerListItem
        key={int.id}
        name={int.name}
        avatar={int.avatar}
        selected={int.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(int.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{int}</ul>
    </section>
  );
};

//prop type checking with PropTypes

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
