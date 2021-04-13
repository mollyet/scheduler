import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "./styling/InterviewerList.scss";

/**
 * Our InterviewerList takes in three props:

interviewers:array - an array of objects containing the information of each interviewer
interviewer:number - the id of an interviewer
setInterviewer:function - a function that accepts an interviewer id
 */

const InterviewerList = (props) => {
  const int = props.interviewers.map(int => {
    return <InterviewerListItem 
    key={int.id}
    name={int.name}
    avatar={int.avatar}
    selected={int.id === props.interviewer}
    setInterviewer={event => props.setInterviewer(int.id)}
    />
  }
    )
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{int}</ul>
    </section>
  );
};

export default InterviewerList;