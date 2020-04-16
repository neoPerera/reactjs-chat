import React, { Component } from 'react'
import '../styles/ChatScreen.css'

class MessageBox extends Component
{

    render()
    {
        return(
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

        );
    }

}
export default MessageBox;