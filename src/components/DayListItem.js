import React from "react";
import classNames from "classnames"
import "components/styling/DayListItem.scss"


const DayListItem = (props) => {
  const dayClass = classNames({
    "day--list__item": true,
    "day--list__item--selected": props.selected,
    "day--list__item--full": props.spots === 0
  })
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 classname="text--light">{props.spots}</h3>
    </li>
  )
}

export default DayListItem; 