import React from "react";

const Palette = props => {
  return (
    <div
      className="square square__palette"
      data-paletteid={props.paletteId}
      onClick={props.clickhandler ? props.clickhandler : null}
    >
      {props.palette.map(x => (
        <div
          className="swatch"
          key={x["bg-color"]}
          style={{
            backgroundColor: x["bg-color"],
            color: x["font-color"] ? x["font-color"] : null
          }}
        >
          <p className="swatch__text">
            {x["font-color"] ? x["bg-color"] : null}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Palette;
