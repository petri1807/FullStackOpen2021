const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  const updateStateValue = () => {
    const targetProp = action.type.toLowerCase();
    const newState = { ...state };
    newState[targetProp] = newState[targetProp] + 1;
    return newState;
  };

  switch (action.type) {
    case 'GOOD':
      return updateStateValue();
    case 'OK':
      return updateStateValue();
    case 'BAD':
      return updateStateValue();
    case 'ZERO':
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
