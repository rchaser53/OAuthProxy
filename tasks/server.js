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

  app.all('/proxy/?*',proxy(oauth));

  app.get('/proxy',(req,res)=>{
      console.log("get");
  })

  app.post('/proxy',(req,res)=>{
      console.log("post");
      res.header("Access-Control-Allow-Origin","http://localhost:8000");
      res.header("Access-Control-Allow-Headers","twitterQuery");
      res.send();
  })

  http.createServer(app).listen(3000, function (e) {
      console.log("express server listening on port 3000")
  });

}