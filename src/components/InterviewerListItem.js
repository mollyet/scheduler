import React from "react";

//styling

import "./styling/InterviewerListItem.scss"

/**
 * 
 Our InterviewerListItem component takes in the following props:

id:number - the id of the interviewer
name:string - the name of the interviewer
avatar:url - a url to an image of the interviewer
selected:boolean - to determine if an interview is selected or not
setInterviewer:function - sets the interviewer upon selection

 */

const InterviewerListItem = (props) => {
  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
  Sylvia Palmer
    </li>
  );
};

export default InterviewerListItem;