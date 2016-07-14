window.onload = function(){
	document.querySelector("#submitBtn").addEventListener("click",(e)=>{
		// fetch("http://localhost:3000/proxy",{
		// 	method:"GET",
		// 	headers:{
		// 		"twitterQuery":'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=rchaser53&count=1'
		// 	}

		fetch("http://localhost:3000/proxy",{
			method:"POST",
			headers:{
				"twitterQuery":'https://api.twitter.com/1.1/statuses/update.json?status='
			},
			body:JSON.stringify({
    			status:"test"
    		})
		}).then((response)=>{
			 return response.json();
		}).then((ret)=>{
			console.log(ret);
		}).catch((err)=>{
			console.log(err);
		})
	})
}
