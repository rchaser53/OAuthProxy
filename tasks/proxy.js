const request = require('request');
const config = require('../oAuthConfig.json');
const OAuth = require('oauth');

module.exports = (options)=>{
  options = options || {}

  return (req, res)=>{
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
      signatureMethod,
      32,
      {
        // "Accept" : "*/*",
        // "Connection" : "close",
        // "User-Agent" : "Node authentication",
        // "status":JSON.stringify({
        //     status:"test"
        // })
      }
    );

    const query = req.header("twitterQuery");

    if(req.header("twitterQuery") != null){
      oauth.post(
          query + "test",
          userToken,
          useSecretToken,
          JSON.stringify({
            status:"test"
          }),
          null,
          (err, data, response)=>{
            if (err){
              console.error(err);
              console.log(response.headers);
            }
            res.header("Access-Control-Allow-Origin","http://localhost:8000");
            res.header("Access-Control-Allow-Headers","twitterQuery");
            res.send(data);
      });

    } else{
      res.header("Access-Control-Allow-Origin","http://localhost:8000");
      res.header("Access-Control-Allow-Headers","twitterQuery");
      res.send();
    }
  }
};