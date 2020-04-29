import React from 'react';
import { useState } from 'react';

import '../styles/App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//bootstrap
import { Spinner } from 'react-bootstrap';

//react google
import { GoogleLogin } from 'react-google-login';


//import endpoints
import { ENDPOINT, LOGINENDPOINT, AUTHENDPOINT } from '../endpoint/endpoint';

//import axios
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('neoCookie') != null) {
      if (JSON.parse(localStorage.getItem('neoCookie')).auth == true) {
        this.props.history.push('/feed');
      }


    }
    this.state = {
      UserName: '',
      Password: '',
      IsLoading: false,
    }

  }

  UserNameChange = (event) => {
    this.setState({ UserName: event.target.value });

  }
  PasswordChange = (event) => {
    this.setState({ Password: event.target.value });

  }
  loginButtonClicked = () => {
    if (this.state.UserName != '' && this.state.Password != '') {
      //isloading
      this.setState({ IsLoading: true });

      //post request
      axios.post(LOGINENDPOINT, { UserName: this.state.UserName, Password: this.state.Password })
        .then(res => {
          console.log(res.data.auth);
          if (res.data.auth) {
            //cookie
            const varcookie = { auth: true, id: res.data.id, UserName: res.data.UserName };
            localStorage.setItem('neoCookie', JSON.stringify(varcookie));
            //redux
            this.props.setId();
            this.props.setName(res.data.UserName);
            this.props.setRoom('common');
            this.props.setAth();
            this.props.history.push('/feed');
          }
          else {
            this.setState({ IsLoading: false });
            this.setState({ UserName: '', Password: '', });
            alert('Invalid Username or Password');
          }
        });

    }
    else {
      alert('please fill your details');
    }
  }
  responseGoogle = (props) => {
    console.log(props);
    // profileObj: {…}
    // ​​
    // email: "chanuthnilushan@gmail.com"
    // ​​
    // familyName: "Perera"
    // ​​
    // givenName: "Neo"
    // ​​
    // googleId: "115855698821206833510"
    // ​​
    // imageUrl: "https://lh3.googleusercontent.com/a-/AOh14GhfZBHM2ddu0M1TkHGR5cYEe4ga4K_k31Ji7nC30A=s96-c"
    // ​​
    // name: "Neo Perera"



    axios.post(AUTHENDPOINT, { Authprops: props.profileObj})
        .then(res => {
          console.log(res.data.auth);
          if (res.data.auth) {
            //cookie
            const varcookie = { auth: true, id: res.data.id, UserName: res.data.UserName };
            localStorage.setItem('neoCookie', JSON.stringify(varcookie));
            //redux
            this.props.setId();
            this.props.setName(res.data.UserName);
            this.props.setRoom('common');
            this.props.setAth();
            this.props.history.push('/feed');
          }
          else {
            alert('auth error');
          }
        });
  }

  render() {

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
                    <input type="text" value={this.state.UserName} onChange={this.UserNameChange} className="form-control input_user" placeholder="username" />
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fas fa-key"></i></span>
                    </div>
                    <input type="password" value={this.state.Password} onChange={this.PasswordChange} className="form-control input_pass" placeholder="password" />

                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customControlInline" />

                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container">

                    <button onClick={this.loginButtonClicked} type="button" name="button" className="btn login_btn">
                      {this.state.IsLoading && <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />}
                          Login
                        </button>
                    <Link to='/signin' >
                      signup
                        </Link>


                  </div>
                  <GoogleLogin
                    clientId="1048926104629-lmb4i2d5ve9ofg6ok573fsoih477ac3f.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    // onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }



}
const mapStateToProps = (state) => {
  return (
    {
      Math: state.MathReducer,
      User: state.UserReducer

    }
  );
};
const mapDispatchToProps = (dispatch) => {
  // ... normally is an object full of action creators
  return (
    {
      setId: (props) => {
        dispatch({
          type: 'SET_ID',
          payload: props
        });
      },
      setName: (props) => {
        dispatch({
          type: 'SET_NAME',
          payload: props
        });
      },
      setRoom: (props) => {
        dispatch(
          {
            type: "SET_ROOM",
            payload: props
          }
        );
      },
      setAth: (props) => {
        dispatch({
          type: 'SET_AUTH'
        });
      }

    }
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);