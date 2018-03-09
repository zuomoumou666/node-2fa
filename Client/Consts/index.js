let config = {ApiHost:''};
if(process&&process.env.NODE_ENV==='development'){
  config.ApiHost='/api';
}
const api = {
  logins: {
    login: `${config.ApiHost}/login`,
    verify: `${config.ApiHost}/verify`,
  }
};
const reg = {
  email:/^[A-Z0-9a-z._%+-]+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
}

export { config, api, reg };
