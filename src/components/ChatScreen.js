import React from 'react'

import '../styles/ChatScreen.css'
import queryString from 'query-string';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

//components
import  SMessageBox from './MessageBox';
import  RMessageBox from './RMessageBox';
import TypingMessage from './TypingMessage';
import {ENDPOINT} from '../endpoint/endpoint';

//bootsrap
import 'bootstrap/dist/css/bootstrap.min.css';

//react bootstrap
import { Dropdown, Badge, Spinner } from 'react-bootstrap';


//react-redux
import {connect} from 'react-redux';


let socket;


class ChatScreen extends React.Component
{
  
  constructor(props)
  {
    super(props);

    
    if(localStorage.getItem('neoCookie') == null)
    {
      this.props.history.push('/');

    }
    else
    {
      this.props.setName(JSON.parse(localStorage.getItem('neoCookie')).UserName);
      this.props.setRoom(localStorage.getItem('ROOMKEY'));
    }

    this.state =
    {
      
      //UserName: queryString.parse(props.location.search).name,
      // Room: queryString.parse(props.location.search).room,
      myCookie: JSON.parse(localStorage.getItem('neoCookie')),
      UserName: this.props.User.UserName,
      Room: this.props.User.Room,
      gotMessages: [],
      sendMessage: '',
      typing: [],
      MemberList: []
      
      

    }
    socket = io(ENDPOINT);
  }

 // component did mount function
  //in here im going to connect to a socket
  componentDidMount()
  {
    if(localStorage.getItem('neoCookie')!= null)
    {
      console.log( this.state.UserName);
      socket.emit('join', {id: this.state.myCookie.id ,UserName: this.state.UserName, Room: this.state.Room}, ()=>
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
      socket.on('sendtyping',
        (getProps) =>
        {
          if(getProps.User != this.state.UserName)
          {
            console.log('typing recived');
            this.setState({typing: getProps});
          }
        }
        
        
      );
      socket.on('sendMemberList',
      (getProps) =>
      {
        this.setState({MemberList: getProps});
        console.log('got memberlist ' + JSON.stringify(this.state.MemberList));
      }
      
      
    );
      

    }
    else{
      this.props.history.push('/');
    }
      

}

componentWillUnmount()
{
  if(localStorage.getItem('neoCookie'!= null))
  {
    localStorage.removeItem('ROOMKEY');
    socket.emit('disconnect'); 
    socket.off();

  }
}

sendButtonPressed =() =>
{
  console.log(this.state.gotMessages);
  socket.emit('sendMessage', {User:this.state.UserName ,Text: this.state.sendMessage }
  , ()=>
    {
      alert("ERROR");
      this.props.history.push('/online')
    });
  this.setState({
    sendMessage: ''
  });
  socket.emit('typing', {User:this.state.UserName, Typing: false} , ()=>
  {
    alert("ERROR");
    this.props.history.push('/online')
  });
}
textAreacChanged = (e) =>
{
    if(e.target.value != '')
    {
      console.log('typing');
      socket.emit('typing', {User:this.state.UserName, Typing: true} , ()=>
      {
        alert("ERROR");
        this.props.history.push('/online')
      });


    }
    else if(e.target.value == '')
    {
      socket.emit('typing', {User:this.state.UserName, Typing: false} , ()=>
      {
        alert("ERROR");
        this.props.history.push('/online')
      });
    }
    this.setState({
      sendMessage: e.target.value
    }

    );

}
GetMembers =() =>
{
  socket.emit('getmemberslist', {User:this.state.UserName}  , ()=>
  {
    alert("ERROR");
    this.props.history.push('/online')
  });
  console.log('drop down pressed');

} 

  render()
  {
    
    return(
        <div className="container-fluid h-100">
            <div className="row justify-content-center h-100">
              
              <div className="col-md-8 col-xl-6 chat">
                
                <div className="card">
                  <div className="card-header msg_head">             
                    {/* <Dropdown onClick={this.GetMembers} >
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Members in Room: {this.state.Room}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                          {this.state.MemberList.map((user) => <Dropdown.Item >{user.UserName}</Dropdown.Item>)}
                        
                      </Dropdown.Menu>
                    </Dropdown> */}
                    <a href="/online" >
                    <span ><Badge variant="danger">go back</Badge></span>
                    </a>
                    
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
                  {this.state.UserName != this.state.typing.User&&<TypingMessage props={this.state.typing}/>}
                                   
                  
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

const mapStateToProps = (state) =>
{
  return(
    {
      Math: state.MathReducer,
      User: state.UserReducer
      
    }
  );
};
const mapDispatchToProps = (dispatch)=>
{
  // ... normally is an object full of action creators
  return(
    {
        setName: (props) =>{
          dispatch({
            type: 'SET_NAME',
            payload: props
          });
        },
        setRoom: (props) =>{
          dispatch(
            {
              type: "SET_ROOM",
              payload: props
            }
          );
        }
        
    }
  );
};

export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen);