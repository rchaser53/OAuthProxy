const http = require('http');
const OAuth = require('oauth');
const express = require('express');
const app = express();

const proxy = require('./proxy');
const config = require('../oAuthConfig.json');

module.exports = ()=>{
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

  app.get('/proxy',(req,res,next)=>{
      const query = req.header("twitterQuery");

      oauth.get(
          'https://api.twitter.com/1.1/statuses/user_timeline.json?' + query,
          userToken,
          useSecretToken,
          resProcess
      );
  })

  app.post('/proxy',(req,res,next)=>{
      const query = req.header("twitterQuery");

      oauth.post(
          'https://api.twitter.com/1.1/statuses/update.json?status=' + query,
          userToken,
          useSecretToken,
          JSON.stringify({
              status:"test"
          }),
          null,
          resProcess
      );
  })

  app.options("/*",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin","http://localhost:8000");
    res.header("Access-Control-Allow-Headers","twitterQuery");
    res.end();
    return
  })

  http.createServer(app).listen(3000, (e)=>{
      console.log("express server listening on port 3000")
  });

}

const resProcess = (err,data,response) =>{
  if (err){
    console.error(err);
  }
  res.header("Access-Control-Allow-Origin","http://localhost:8000");
  res.header("Access-Control-Allow-Headers","twitterQuery");
  res.send(data);
}