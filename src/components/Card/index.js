import React from "react";
import "./style.css";

function Card(props) {

  const {
    image,
    clickCardz
  } = props;

  var sectionStyle = {
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${image})`
  };

  return (
    <div className="card" onClick={e => clickCardz( e, props.id )} style={ sectionStyle }>
    </div>
  );
}

export default Card;
