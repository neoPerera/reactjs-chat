const IniTialState = {id: '',UserName: '', Room: '', auth: false, chatOpen: false};

const UserReducer = (state = IniTialState, action) =>
{
  switch(action.type)
  {
    case 'SET_ID':
        state.id = action.payload;
        return state;
    case 'SET_NAME':
        state.UserName = action.payload;
        return state;
    case 'SET_ROOM':
        state.Room = action.payload;
        return state;
    case 'SET_AUTH':
        state.auth = !state.auth;
        return state;
    case 'SET_CHAT_OPEN':
        state.chatOpen = !state.chatOpen;
        return state;
    default:
        return state;

  }
  
};

export default UserReducer;