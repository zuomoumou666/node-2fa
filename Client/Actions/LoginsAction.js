import {
  login as loginRequest, verify as verifyRequest, resend as resendRequest
} from '../Apis/logins';
export const LOGIN_DONE = 'LOGIN_DONE';

const actionCreator = (type, ...argNames) => {
  return function (...args) {
    let action = { type };
    argNames.forEach((item, i) => {
      action[argNames[i]] = args[i];
    });
    return action;
  }
};

export const loginDone = actionCreator(LOGIN_DONE, 'data');

export const login = (form) => (dispatch) => {
  return loginRequest(form).then(res => {
    if (res.code == 200) {
      dispatch(loginDone(res.data._id));
    }
    return res;
  });
}

export const verify = ({ id, value }) => (dispatch) => {
  return verifyRequest({ id, value }).then(res => {
    return res;
  });
};
