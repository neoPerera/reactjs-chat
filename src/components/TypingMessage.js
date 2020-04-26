import React, { Component } from 'react'
// import '../styles/ChatScreen-OnlineList.css';
import RMessageBox from './RMessageBox';


const TypingMessage = ({ props }) => {
    if (props.Typing) {
        return (
            <p>{props.User} is typing</p>
        );

    }
    else {
        return null;
    }

}

export default TypingMessage;