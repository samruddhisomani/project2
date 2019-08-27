import React from "react";
import "./Slide.css";
import Palette from "../Palette";

const Slide = props => {
  return (
    <div className="slide">
      <img
        className="square square__img"
        src={props.details.photoUrl}
        alt="Random"
      />
      <div
        className="square square__spacer"
        style={{ backgroundColor: "white" }}
      />
      <Palette palette={props.details.palette} />
    </div>
  );
};

export default Slide;
