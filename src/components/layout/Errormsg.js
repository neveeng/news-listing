import React from 'react';

const Errormsg = error => {
  return (
    error.error !== null && (
      <div className="container">
        <div className="alert">{error.error.message}</div>
      </div>
    )
  );
};

export default Errormsg;
