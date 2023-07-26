import React from "react";

const DeleteUserModal = ({cancelModal, deleteUser}) => {
  return (
    <>
      <div className="modalBackground">
      
      <div className="modalContainer">
      <div className="modalTitle">
        <h1 className="fancy-font">Are you sure?</h1>
      </div>
      <div className="modalBody">
        <p> This operation can not be undone.</p>
      </div>
      <div className="modalFooter">
        <button onClick={cancelModal}>Cancel</button>
        <button onClick={deleteUser}>Delete User</button>
      </div>
      </div>
      </div>
    </>
  );
};

export default DeleteUserModal;