const MathReducer = (state = 90, action) =>
{
  switch(action.type)
  {
    case "INCREMENT":
      state = state + 1;
      break;
    case "DECREMENT":
      state = state - 1;
      break;
  }
  return state;
};

export default MathReducer;