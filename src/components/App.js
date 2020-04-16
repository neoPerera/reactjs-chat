import React from 'react';
import {useState} from 'react';

import '../styles/App.css';
import {Link} from 'react-router-dom';

const  App=()=> 
{
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');





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
                    <input type="text" name="" onChange={(event) => setUserName(event.target.value)} className="form-control input_user" placeholder="username" />
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fas fa-key"></i></span>
                    </div>
                    <input type="text" name="" onChange={(event) => setRoomName(event.target.value)} className="form-control input_pass"  placeholder="room number" />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customControlInline" />

                    </div>
                  </div>
                    <div className="d-flex justify-content-center mt-3 login_container">
                      <Link to={`/chatlist?room=${roomName}&name=${userName}`}>
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

export default App;
