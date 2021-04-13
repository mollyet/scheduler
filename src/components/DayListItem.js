import React from "react";
import classnames from "classnames"
import "components/styling/DayListItem.scss"


const DayListItem = (props) => {
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 classname="text--light">{props.spots}</h3>
    </li>
  )
}

export default DayListItem; 