const IniTialState = {UserName: '', Room: ''};

const UserReducer = (state = IniTialState, action) =>
{
  switch(action.type)
  {
    case 'SET_NAME':
        state.UserName = action.payload;
        return state;
    case 'SET_ROOM':
        state.Room = action.payload;
        return state;
    default:
        return state;

  }
  
};

export default UserReducer;