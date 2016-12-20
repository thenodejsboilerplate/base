module.exports = {
  port: process.env.PORT || 8000,//PORT=9000 node app
  host: 'http://localhost:8000',
  mongodb: {
    dbname: 'db1',
    host: 'localhost',
    port:27017,
    user:'',
    pass: '',
    uri: 'mongodb://localhost:27017/db1',
    options: {
      server: {
        poolSize: 5,
      },
    },
  },

  mail_opts: {
    host: 'smtp.ym.163.com',
    port: 994,
    secure: true,
    auth: {
      user: 'tt@trver.com',
      pass: '123456'
    },
  },

};
