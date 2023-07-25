import React from "react";

const Modal = () => {
  return (
    <>
      <div className="modalBackground">
      
      <div className="modalContainer">
      <div className="modalTitle">
        <h1>Thank You For Your Order!</h1>
      </div>
      <div className="modalBody">
        <p>We are absolutely thrilled to extend our heartfelt gratitude to you for choosing Grace Shopper Alpine! Your order has been received and is currently being processed with the utmost care and attention to detail.</p>
      </div>
      <div className="modalFooter">
        <button onClick={() => (window.location.href = "/products")}>Continue</button>
      </div>
      </div>
      </div>
    </>
  );
};

export default Modal;