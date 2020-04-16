import React, { Component } from 'react'
import '../styles/ChatScreen.css'

const SMessageBox =({MSG}) =>(
          <div className="d-flex justify-content-end mb-4">
                                             
                <div className="msg_cotainer_send">
                    {MSG}
                                         
                </div>
                                       
           </div>
      
          
        )
    


export default SMessageBox ;