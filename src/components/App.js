import React from 'react';
import {useState} from 'react';

import '../styles/App.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class   App extends React.Component 
{
  constructor(props)
  {
    super(props);
    console.log(props);
  }

  UserNameChange =(event) =>
  {
    this.props.setName(event.target.value);
    console.log("UserName:"+this.props.User.UserName);
    
  }
  RoomChange =(event)=>
  {
    this.props.setRoom(event.target.value);
    console.log("Room:"+this.props.User.Room);

  }


  render()
  {
    return (
      <div>
        <div className="container h-100">
            <div className="d-flex justify-content-center h-100">
              <div className="user_card">
                <div className="d-flex justify-content-center">
                  
                </div>
                <div className="d-flex justify-content-center form_container">
                  <form>
                    <div className="input-group mb-3">
                      <div className="input-group-append">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                      </div>
                      <input type="text"  onChange={this.UserNameChange} className="form-control input_user" placeholder="username" />
                    </div>
                    <div className="input-group mb-2">
                      <div className="input-group-append">
                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                      </div>
                      <input type="text" onChange={this.RoomChange} className="form-control input_pass"  placeholder="room number" />
                    
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customControlInline" />
  
                      </div>
                    </div>
                      <div className="d-flex justify-content-center mt-3 login_container">
                        <Link to={'/chatlist'}>
                            <button type="button" name="button" className="btn login_btn">Login</button>
                        </Link>
                  </div>
                  </form>
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

export default connect(mapStateToProps,mapDispatchToProps)(App);