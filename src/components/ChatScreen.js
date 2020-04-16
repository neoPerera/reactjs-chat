import React from 'react'

import '../styles/ChatScreen.css'
import queryString from 'query-string';
import io from 'socket.io-client';
// import { Link } from "react-router-dom";
import ScrollToBottom from 'react-scroll-to-bottom';


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
    socket.emit('join', {UserName: this.state.UserName, Room: this.state.Room})
    
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
//   socket.on('message',
//   (getMessage) =>
//   {
//     this.setState({
//       gotMessages: [...this.state.gotMessages,getMessage]
//     },
//     ()=>
//     {
//       console.log(this.state.gotMessages);
//     }
//     );
    
//   }
  
  
// );
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
    if(this.state.UserName =='')
    {
      return(<link to="/" />);
    }

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
                    <span id="action_menu_btn"><h3>X </h3></span>
                    <div className="action_menu">
                      <ul>
                        <li><i className="fas fa-user-circle"></i> View profile</li>
                        <li><i className="fas fa-users"></i> Add to close friends</li>
                        <li><i className="fas fa-plus"></i> Add to group</li>
                        <li><i className="fas fa-ban"></i> Block</li>
                      </ul>
                    </div>
                  </div>
                  
                    
                  <ScrollToBottom className="card-body msg_card_body">
                    <div className="card-body msg_card_body">
                    {
                      this.state.gotMessages.map(
                        (item)=>
                          item.User == this.state.UserName?
                          <div className="d-flex justify-content-end mb-4">
                          <div className="msg_cotainer_send">
                          {item.Text}
                        
                          </div>
                      
                          </div> :
                          <div className="d-flex justify-content-start mb-4">
                      
                            <div className="msg_cotainer">
                              {item.Text}
                              
                            </div>
                          </div>
                        
                      )
                    }
                    
                    
                    </div>
                    
                    </ ScrollToBottom >
                    
                  
                  <div className="card-footer">
                    <div className="input-group">
                      <div className="input-group-append">
                        <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                      </div>
                      <textarea onChange={this.textAreacChanged} name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
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
