import React from "react";

const Modal = ({continueModal}) => {
  return (
    <>
      <div className="modalBackground">
        Modal
      </div>
      <div className="modalContainer"></div>
      <div className="modalTitle">
        <h1>Thank You For Your Order</h1>
      </div>
      <div className="modalBody">
        <p>random filler</p>
      </div>
      <div className="modalFooter">
        <button onClick={() => continueModal(false)}>Continue</button>
      </div>
    </>
  );
};

export default Modal;