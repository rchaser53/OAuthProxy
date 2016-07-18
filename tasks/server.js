const https = require('https');
const OAuth = require('oauth');
const express = require('express');
const serveStatic = require('serve-static');
const app = express();

const fs = require("fs")
const config = require('../oAuthConfig.json');

module.exports = ()=>{
  const oauth = new OAuth.OAuth(
    config.requestUrl,
    config.accessToken,
    config.consumerKey,
    config.consumerSecret,
    config.version,
    config.authorize_callback,
    config.signatureMethod
  );

  app.get('/proxy/getTweet',(req,res,next)=>{
      const query = req.header("twitterQuery");
      oauth.get(
          'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=rchaser53&count=5',
          config.userToken,
          config.useSecretToken,
        	(err,data,response) =>{
          	if (err){
          	 	console.error(err);
          	}
          	res.header("Access-Control-Allow-Origin","https://localhost:3000");
          	res.header("Access-Control-Allow-Headers","twitterQuery");
	console.log(res);
            res.send(data);
    	   });
  })

  app.post('/proxy/postTweet',(req,res,next)=>{
      const query = req.header("twitterQuery");

      oauth.post(
          'https://api.twitter.com/1.1/statuses/update.json?status=' + query,
          userToken,
          useSecretToken,
          JSON.stringify({
            status:"test"
          }),
          null,
          (err,data,response) =>{
            if (err){
              console.error(err);
            }
            res.header("Access-Control-Allow-Origin","https://localhost:3000");
            res.header("Access-Control-Allow-Headers","twitterQuery");
            res.send(data);
         });
  })

  app.options("/*",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin","https://localhost:3000");
    res.header("Access-Control-Allow-Headers","twitterQuery");
    res.end();
    return
  })

  app.use(serveStatic('./',{
    setHeaders:(res,path) =>{
      res.setHeader('Cache-Control', 'no-cache')
    }
  }));

  https.createServer({
	key: fs.readFileSync('../../../../etc/letsencrypt/live/test.rc53api.xyz/privkey.pem'),
	cert: fs.readFileSync('../../../../etc/letsencrypt/live/test.rc53api.xyz/cert.pem')
},
	app).listen(3000, (e)=>{
      console.log("express server listening on port 3000")
  });
}
