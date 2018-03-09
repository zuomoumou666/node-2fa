import reqwest from 'reqwest';
import { api } from '../Consts';


export function login(form) {
  return reqwest({
    url: api.logins.login,
    method: 'post',
    data: {
      username: form.username,
      psw: form.password
    }
  });
}

export function verify({ id, value }) {
  return reqwest({
    url: api.logins.verify,
    method: 'post',
    data: {
      _id: id,
      code: value,
    },
  });
}

export function resend() {
  return reqwest({
    url: api.logins.resend,
    method: 'post',
  });
}


