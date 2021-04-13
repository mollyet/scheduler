import React from "react";

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button"
//   props.confirm ? buttonClass += "button--confirm" : buttonClass;
//   props.danger ? buttonClass += "button--danger" : buttonClass;
   if(props.confirm) {
      buttonClass += " button--confirm";
   }
   if(props.danger) {
      buttonClass += " button--danger";
   }
   return(
      <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
   );
}
