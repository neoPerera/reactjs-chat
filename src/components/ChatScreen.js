import React from 'react'

import '../styles/ChatScreen.css'
import queryString from 'query-string';
import io from 'socket.io-client';
import { Link } from "react-router-dom";
import ScrollToBottom from 'react-scroll-to-bottom';
import  SMessageBox from './MessageBox';
import  RMessageBox from './RMessageBox';


let socket;
let history;
class ChatScreen extends React.Component
{
  
  constructor(props)
  {
    super(props);
    
    this.state =
    {
      
      UserName: queryString.parse(props.location.search).name,
      Room: queryString.parse(props.location.search).room,
      ENDPOINT: 'https://neo-chatv1.herokuapp.com/',
      gotMessages: [],
      sendMessage: ''
      

    }
    if(!queryString.parse(props.location.search).name || !queryString.parse(props.location.search).room)
    {
      alert("Please log in");
      props.history.push('/');
    }


    socket = io(this.state.ENDPOINT);
   
    

  }
  componentDidMount()
  {
    // this.setState(
    //   {
    //     UserName: this.state.data.name,
    //     Room: this.state.data.room,
    //   },
      
    // );
    console.log( this.state.UserName);
    socket.emit('join', {UserName: this.state.UserName, Room: this.state.Room}, ()=>
    {
      alert("ERROR");
      this.props.history.push('/')
    })
    
    socket.on('message',
      (getMessage) =>
      {
        this.setState({
          gotMessages: [...this.state.gotMessages,getMessage]
        },
        );
        
      }
      
      
    );
    
      

}
// componentDidUpdate(prevProps, prevState) 
// {
//   if(prevState.socket != socket)
//   {
//     socket.emit('join', {UserName: this.state.UserName, Room: this.state.Room})

//   }

// }





componentWillUnmount()
{
  socket.emit('disconnect');
  socket.off();
}

sendButtonPressed =() =>
{
  console.log(this.state.gotMessages);
  socket.emit('sendMessage', {User:this.state.UserName ,Text: this.state.sendMessage });
  this.setState({
    sendMessage: ''
  });
}
textAreacChanged = (e) =>
{
  this.setState({
    sendMessage: e.target.value
  }

  );

}


    


  render()
  {
    
    return(
        <div className="container-fluid h-100">
            <div className="row justify-content-center h-100">
              
              <div className="col-md-8 col-xl-6 chat">
                <div className="card">
                  <div className="card-header msg_head">
                    <div className="d-flex bd-highlight">
                      
                      <div className="user_info">
                        <span>Room: {this.state.Room}</span>
                        
                      </div>
                      
                    </div>
                   <a href="/" >
                     <span id="action_menu_btn"><h3>X</h3> </span> </a>
                    
                  </div>

                  <ScrollToBottom className="card-body msg_card_body">
                  <div className="card-body msg_card_body">
                                             
                                            
                                    
                                     {
                                       this.state.gotMessages.map(
                                         (item)=>
                                           item.User == this.state.UserName?
                                           <SMessageBox MSG={item.Text} />
                                            :
                                            <RMessageBox MSG={item.Text} UNAME={item.User} />
                                         
                                       )
                                     }
                                    
                                   </div>
                  </ScrollToBottom>


                  <div className="card-footer">
                    <div className="input-group">
                      <div className="input-group-append">
                        <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                      </div>
                      <textarea value={this.state.sendMessage} onChange={this.textAreacChanged} name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
                      <div className="input-group-append" onClick={this.sendButtonPressed}>
                        <span  className="input-group-text send_btn"><i  className="fas fa-location-arrow"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
    );
  }

}

export default ChatScreen;
