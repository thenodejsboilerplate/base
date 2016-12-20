module.exports = {
  port:  process.env.PORT || 8000,
  host: 'http://localhost:8000',
  mongodb: {
    dbname: 'db1',
    host: 'localhost',//'192.168.3.148',//10.184.1.209
    port:27017,
    user:'',
    pass: '',
    uri: 'mongodb://localhost:27017/db1',//'mongodb://10.184.1.209:27017/crawler',
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
