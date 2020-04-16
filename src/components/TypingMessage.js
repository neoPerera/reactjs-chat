import React, { Component } from 'react'
import '../styles/ChatScreen.css'
import RMessageBox from './RMessageBox';

  
const TypingMessage = ({props}) =>
{
    if(props.Typing)
    {
        return(
            <RMessageBox MSG={`${props.User} is typing`} />
            );
        
    }
    else
    {
        return null;
    }
   
}

export default TypingMessage;