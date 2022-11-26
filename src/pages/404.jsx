import React from "react";

const NotFound  = () => {
  return (
    <div className="errorPage">
      <h1>404 Page not found 🤷‍♂️</h1>
      <button className="button" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
