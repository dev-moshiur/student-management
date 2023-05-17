import React from "react";
import "./verifyPopup.scss";

export default function Delete({ verifyFunction, setShowVerifyPopup,email }) {
  return (
    <div className="verifyPopup fadeIn">
      <form className="container" onSubmit={verifyFunction}>
        <div className="messageContainer">
          <label htmlFor="verify">
            a verification code sent to {email ? email : 'your email'}  please verify within 1
            minute
            
          </label>
          <input
            type="number"
            name="token"
            
          />
        </div>
        <div className="actions">
          <div className="cancel" onClick={() => setShowVerifyPopup(false)}>
            Cancel
          </div>
          <input type="submit" className="delete" value="Verify" />
        </div>
      </form>
    </div>
  );
}
