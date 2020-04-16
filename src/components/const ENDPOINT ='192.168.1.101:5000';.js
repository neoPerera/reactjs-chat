const ENDPOINT ='192.168.1.101:5000';
    const [Msg, setMsg] = useState([]);
    const [Msgs, setMsgs] = useState([]);
    const [UserName, setUserName] = useState('defName');
    const [Room, setRoom] = useState('defRoom');
    const [aaa, fuck] = useState('fuck');
    
    

    useEffect( () =>
    {
        const {room, name} = queryString.parse(location.search);
        changeVar(location.search);
        fuck('hukapan');
        console.log('fuck: ' + aaa);
        console.log(room,name);
        setUserName(name);
        setRoom(room);
        console.log('info: username ' + UserName + ' room ' + Room );

        socket = io(ENDPOINT);
        socket.emit('join', {UserName, Room});
        console.log('info sent: ' + UserName + '' + Room );

        return() =>
        {
            socket.emit('disconnect');
            socket.off();
        }

    },
    [ENDPOINT,location.search]
    );
    const changeVar =(a)=>
    {
        setRoom('a.room');
        setUserName('a.name');
        console.log("changed in function "+ UserName + Room);
    }

    useEffect(
        () =>
        {
          socket.on('message',
          (msgs) =>
          {
            setMsgs([...Msgs, msgs]);
          }
          );
        },
        [Msgs]
      );
      const sendMessage = (e) =>
      {
        console.log(Msg);
        // socket.emit('sendMessage', {User:UserName , Text: Msg});
        setMsg('');
        
      }