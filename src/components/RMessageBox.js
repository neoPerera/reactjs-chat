import React, { Component } from 'react'
// import '../styles/ChatScreen-OnlineList.css';

const RMessageBox = ({ MSG, UNAME }) => {
  if (UNAME == 'Admin') {
    return (
      <div className="d-flex justify-content-start mb-4">

        <div className="msg_cotainer AdminsMsg  ">
          {MSG}

        </div>
      </div>
    )

  }
  else {
    return (
      <div className="d-flex justify-content-start mb-4">
        <label className="d-flex justify-content-start mb-4" >{UNAME}:</label>
        <div className="msg_cotainer  ">
          {MSG}

        </div>
      </div>
    )

  }


}

export default RMessageBox;