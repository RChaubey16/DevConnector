import React, { Fragment } from "react";
import SpinnerGif from "./spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={SpinnerGif}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
};

export default Spinner;
