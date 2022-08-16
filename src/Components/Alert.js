import React, { useEffect } from "react";

const Alert = ({ msg, type, showPopUp, list }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      showPopUp();
    }, 3000);
    return () => clearTimeout(timer);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
