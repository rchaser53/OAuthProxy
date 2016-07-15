module.exports = (oauth)=>{
  // options = options || {}

  return (req, res, next)=>{
    const query = req.header("twitterQuery");

    if(req.header("twitterQuery") != null){
      // oauth.post(
      //     query + "test",
      //     userToken,
      //     useSecretToken,
      //     JSON.stringify({
      //       status:"test"
      //     }),
      //     null,
      //     (err, data, response)=>{
      //       if (err){
      //         console.error(err);
      //         console.log(response.headers);
      //       }
      //       res.header("Access-Control-Allow-Origin","http://localhost:8000");
      //       res.header("Access-Control-Allow-Headers","twitterQuery");
      //       res.send(data);
      // });

    } else{
      // res.header("Access-Control-Allow-Origin","http://localhost:8000");
      // res.header("Access-Control-Allow-Headers","twitterQuery");
      // res.send();
    }

    console.log(1)
    next()
  }
};