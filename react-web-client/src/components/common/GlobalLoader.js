import React from "react";

export default ({ loadStatus }) => {
  if (loadStatus) {
    return (
      <div className={`page__loader`}>
        <img src="/assets/images/loader.gif" alt="" />
      </div>
    );
  } else {
    return "";
  }
};
