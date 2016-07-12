const request = require('request');
const config = require('../oAuthConfig.json');
const OAuth = require('oauth');

module.exports = function(options) {
  options = options || {}

  return function(req, res,next) {
    const query = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=rchaser53&count=1';

    const {
      requestUrl,
      accessToken,
      consumerKey,
      consumerSecret,
      version,
      authorize_callback,
      signatureMethod,
      userToken,
      useSecretToken
    } = config;

    const oauth = new OAuth.OAuth(
      requestUrl,
      accessToken,
      consumerKey,
      consumerSecret,
      version,
      authorize_callback,
      signatureMethod
    );

    oauth.get(
        query,
        userToken,
        useSecretToken,
        (err, data, response)=>{
          if (err){
            console.error(err);
          }
          response.headers["Access-Control-Allow-Origin"] = "*";
          response.headers["location"] = "localhost:8000";
          res.header("Access-Control-Allow-Origin","*");

          res.end(new Buffer(data));
    });
  }
};