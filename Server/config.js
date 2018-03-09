const PORT = process.env.PORT;
const HOST = process.env.HOST;

const config = {
  serverConfig: {
    host: HOST || '0.0.0.0',
    port: PORT || '8081',
    name: 'testServer'
  },
  mongodbPath: 'mongodb://localhost:27017/testMongo',
  tfaOpts: {
    pswLen: 6,
    maxAttempts: 3,
    minAttemptInterval: 10 * 1000,
    minRequestInterval: 5 * 1000,
    expiration: 1000 * 2 * 60,
  },
  emailConfig: {
    username: 'test2fa',
    psw: 'test2fapsw',
    auth: 'test2fa',
    stmpServer: 'smtp.163.com',
    port: '25',
  }
}
export default config;