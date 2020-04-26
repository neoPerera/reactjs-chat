
import React, { Component } from 'react';

// // //react bootstrap
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Card, Button, Container, Toast } from 'react-bootstrap';

// //sidebar 
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// // Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

//import css
import '../styles/NewsFeed.css';

//shadow scroll
import ReactShadowScroll from 'react-shadow-scroll';

//scroll to bottom
import ScrollToBottom from 'react-scroll-to-bottom';

//react-redux
import { connect } from 'react-redux';

//importing components
import FeedMessage from './feed/feed-messagebox';

//socket.io
import io from 'socket.io-client';
//endpoint
import { ENDPOINT } from '../endpoint/endpoint';
//axios
import axios from 'axios';
import { GETKEY } from '../endpoint/endpoint';


//socket variable 
let socket = [];

class NewsFeed extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('neoCookie') == null) {
            this.props.history.push('/');
        }
        this.state =
        {
            //variables /states
            UserName: this.props.User.UserName,
            Room: this.props.User.Room,
            MemberList: [],
            myCookie: JSON.parse(localStorage.getItem('neoCookie')),
            IsLoading: false,
            chatOpened: false,
            componentKey: 1,
            roomkey: '',
            componentArray: [],
            iscomponentArray: false,
            temoComponenArray: [],
            sendPostText: '',
            gotPosts: [],


        }
        //pushing to array socket
        socket.push(io(ENDPOINT));
    }
    componentDidMount() {
        //did this because , when someone tries to pass login operations,these functions may also run automatically
        //to prevent this, i check if the user is logged in or not
        if (localStorage.getItem('neoCookie') != null) {
            //join to online room using socket
            socket[0].emit('setOnline', { id: this.state.myCookie.id, UserName: this.state.myCookie.UserName });

            //catching online list
            socket[0].on('sendMemberList', (props) => {
                console.log(props);
                this.setState({ MemberList: props });
            });
            console.log(this.state.MemberList);

            //sendingPostToUsers
            //catching Posts
            socket[0].on('sendingPostToUsers', (props) => {
                console.log(props);
                this.setState({ gotPosts: [ props,...this.state.gotPosts] });
            });
            //initialsendingPostToUsers
            socket[0].on('initialsendingPostToUsers', (props) => {
                console.log(props);
                this.setState({ gotPosts: props});
            });

        }
    }
    messageCallback = (prop) => {
        console.log('call backed');
        this.state.componentArray.forEach(element => {
            if (element != prop) {
                this.setState({
                    temoComponenArray: [...this.state.temoComponenArray, element]
                });
            }
        });
        this.setState({
            chatOpened: false
        });
        this.setState({ componentArray: this.state.temoComponenArray, temoComponenArray: [] });
    }
    //user wants to chat with someone
    ClickedOnUser(e) {

        this.setState({ IsLoading: true });
        axios.post(GETKEY, { User: this.state.myCookie.id, Chat: e })
            .then(
                res => {
                    this.state.componentArray.forEach(element => {
                        if (element == res.data.Roomkey) {
                            this.setState({ iscomponentArray: true });
                        }
                    });
                    if (!this.state.iscomponentArray) {
                        this.props.setRoom(res.data.Roomkey);
                        console.log('response =>' + JSON.stringify(res.data))
                        this.setState({ roomkey: res.data.Roomkey });
                        localStorage.setItem('ROOMKEY', res.data.Roomkey);
                        // this.props.history.push('/chatlist');


                        this.setState({ componentArray: [...this.state.componentArray, this.state.roomkey] });

                        console.log("chat with:=> " + this.props.User.Room);

                    }
                }
            )
            .catch(err => { alert('error '); this.setState({ IsLoading: true }); });
        console.log('my:' + this.state.myCookie.id + ' chat:' + e);
        console.log("chat opend: " + this.state.chatOpened);
        this.setState({
            chatOpened: true
        });

        //settng is component exist false
        this.setState({ iscomponentArray: false });
    }
    logOutSelected = () => {
        socket[0].emit('logout');
        localStorage.removeItem('neoCookie')
        // localStorage.setItem('neoCookie','');
        this.props.history.push('/');
    }
    postSend = () => {
        socket[0].emit('newPost', { User: this.state.myCookie.UserName, Text: this.state.sendPostText });
        this.setState({ sendPostText: '' });
    }
    postTextAraeaChanged = (e) => {
        this.setState({ sendPostText: e.target.value });

    }


    render() {
        return (
            <div>
                <SideNav onSelect={(selected) => { }} >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts" className=''>
                            <NavIcon>
                                <i className="fas fa-address-book" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Online
                            </NavText>


                            {
                                this.state.MemberList.map((user) =>
                                    user.id != this.state.myCookie.id &&
                                    <NavItem onClick={() => this.ClickedOnUser(user.id)} id={user.id} className="d-flex bd-highlight" key={user.id} >
                                        <NavText>

                                            {user.UserName}
                                            <span className="online_icon"></span>

                                        </NavText>

                                    </NavItem>

                                )}

                        </NavItem>
                        <NavItem eventKey="logOut" className="logoutclass" onClick={this.logOutSelected}>
                            <NavIcon>
                                <i className="fa fa-sign-out" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Log out
                            </NavText>

                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <div className="cont1">

                    {/* message popup */}
                    {this.state.componentArray.map(
                        item =>
                            <FeedMessage Roomkey={item} chatOpened={this.state.chatOpened} messageCallback={this.messageCallback} />

                    )
                    }
                </div>

                <Container fluid className='cont'>

                    <Card className="text-center">
                        <Card.Header>Type to post</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <input value={this.state.sendPostText} onChange={this.postTextAraeaChanged} type='text' className='sendposttext' />
                                <button onClick={this.postSend}>Post</button>
                            </Card.Title>
                            <Card.Text>

                            </Card.Text>

                        </Card.Body>
                        <Card.Footer className="text-muted"></Card.Footer>
                    </Card>
                    <ReactShadowScroll className='scroll'>
                        {
                            this.state.gotPosts.map(
                                (item) =>
                                    <div className="postitemsClass">
                                    <Card className="text-center">
                                        <Card.Header>{item.USER}</Card.Header>
                                        <Card.Body>
                                            <Card.Title></Card.Title>
                                            <Card.Text>
                                                {item.POST}
                                            </Card.Text>

                                        </Card.Body>
                                        <Card.Footer className="text-muted">{item.DATE}</Card.Footer>
                                    </Card>
                                    
                                    </ div>
                            )
                        }

                    </ReactShadowScroll>



                </Container>


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
            setChat: () => {
                dispatch(
                    {
                        type: "SET_CHAT_OPEN"
                    }
                );
            }

        }
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);