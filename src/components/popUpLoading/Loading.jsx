import React from "react";
import "./popUpLoading.scss";
import loadinGif from "./load.gif";
export default function PopUpLoading() {
  return (
    <div className="popUpLoading fadeIn">
      <div className="container">
        <img src={loadinGif} alt="" />
      </div>
    </div>
  );
}
