import React from 'react'

//socket.io
import io from 'socket.io-client';


//react-redux
import {connect} from 'react-redux';

//react bootstrap
import { Dropdown, Badge, Spinner } from 'react-bootstrap';
import { json } from 'body-parser';
import axios from 'axios';
import {GETKEY} from '../endpoint/endpoint';

import {ENDPOINT} from '../endpoint/endpoint';

let socket = [];
let tempSock;
class OnlineList extends React.Component 
{
	
	constructor(props)
  	{
		super(props);
		if(localStorage.getItem('neoCookie')==null)
		{
			this.props.history.push('/');
		}
		
    	
    	this.state =
    	{
      		//variables /states
    		UserName: this.props.User.UserName,
      		Room: this.props.User.Room,
	  		MemberList: [],
			myCookie: JSON.parse(localStorage.getItem('neoCookie')),
			IsLoading: false
	  		
		  
	  	
      
		}
	//pushing to array socket
	socket.push(io(ENDPOINT));
	// tempSock = io(this.state.ENDPOINT);
	}
	//component did mount function
	componentDidMount()
	{
		//did this because , when someone tries to pass login operations,these functions may also run automatically
		//to prevent this, i check if the user is logged in or not
		if(localStorage.getItem('neoCookie')!= null)
		{
			//join to online room using socket
			socket[0].emit('setOnline', {id: this.state.myCookie.id, UserName: this.state.myCookie.UserName});
			
			//catching online list
			socket[0].on('sendMemberList',(props)=>
			{
				console.log(props);
				this.setState({MemberList: props});
			});
		}
	}





	componentWillUnmount()
	{

	}

	//user wants to chat with someone
	ClickedOnUser(e)
	{
		this.setState({IsLoading: true});
		axios.post(GETKEY,{User: this.state.myCookie.id , Chat: e })
		.then(
			res => {
				this.props.setRoom(res.data.Roomkey);
				console.log('response =>' + JSON.stringify(res.data))
				localStorage.setItem('ROOMKEY', res.data.Roomkey);
				this.props.history.push('/chatlist');
			}
		)
		.catch(err => {alert('error ');this.setState({IsLoading: true});});
		console.log('my:'+this.state.myCookie.id+' chat:' +  e);

	}
	//logout button clicked
	logOutClickd =() =>
	{
		socket[0].emit('logout');
		localStorage.removeItem('neoCookie')
		// localStorage.setItem('neoCookie','');
	}


    render()
    {
        return(
            <div className="container-fluid h-100">
			<div className="row justify-content-center h-100">
				<div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
					<div className="card-header">
					<a href="/" >
                    <span id="action_menu_btn"><Badge variant="danger" onClick={this.logOutClickd}>Log out</Badge></span>
                    </a>
					</div>
					<div className="card-body contacts_body">
						<ul className="contacts">
							<li className="active">
							{this.state.IsLoading&&<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />}
								{
								this.state.MemberList.map((user) =>
								user.id != this.state.myCookie.id&&
								<div onClick={() => this.ClickedOnUser(user.id)} id={user.id} className="d-flex bd-highlight" key={user.id} >
										<div className="img_cont">
											
											<span className="online_icon"></span>
										</div>
										<div className="user_info">
											<span>{user.UserName}</span>
											<p>{user.id}  is online</p>
										</div>
								</div>
								
								)}

							</li>
						</ul>




							
						
						
						
						
					</div>
					<div className="card-footer"></div>
				</div></div>
				
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

export default connect(mapStateToProps,mapDispatchToProps)(OnlineList);