import React from "react";
import "./Gallery.css";
import Palette from "../Palette";

const Gallery = props => {
  if (!props.palettes) {
    return null;
  } else {
    return (
      <div className="gallery">
        <div className="history">
          <p>
            <strong>History</strong>
          </p>
          <p>Click to see slide!</p>
        </div>
        {props.palettes.map(x => {
          return (
            <React.Fragment key={x._id}>
              <div className="square square__palette" />
              <Palette
                paletteId={x._id}
                palette={x.palette}
                clickhandler={props.clickhandler}
              />
            </React.Fragment>
          );
        })}
      </div>
    );
  }
};

export default Gallery;
