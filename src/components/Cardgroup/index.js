import React from "react";
import "./style.css";

function Cardgroup(props) {
  return <div className="wrapper">{props.children}</div>;
}

export default Cardgroup;
