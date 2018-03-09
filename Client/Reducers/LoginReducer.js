import { LOGIN_DONE } from '../Actions/LoginsAction';

const initialState = {
  id: ''
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_DONE:
      return Object.assign({}, state, { id: action.data });
    default:
      return state;
  }
};
