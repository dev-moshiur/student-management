import React from "react";
import "./delete.scss";
export default function Delete({
  deleteFunction,
  setShowDeletePopup,
  message,
}) {
  return (
    <div className="deleteComponent fadeIn">
      <div className="container">
        <div className="messageContainer">{message}</div>
        <div className="actions">
          <div className="cancel" onClick={() => setShowDeletePopup(false)}>
            Cancel
          </div>
          <div className="delete" onClick={deleteFunction}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}
