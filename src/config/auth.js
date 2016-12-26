// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

  'githubAuth': {
    'clientID': '4565656576876878876', // your App ID
    'clientSecret': 'dfdf', // your App Secret
    'callbackURL': '/auth/github/callback'
  },

  'googleAuth': {
    'clientID': '6865dfdfdf4545645644igffgf9hv7.apps.googleusercontent.com',
    'clientSecret': 'otw5ydfdsfdfsxc3pYDa_y',
    'callbackURL': '/auth/google/callback'
  }

};
