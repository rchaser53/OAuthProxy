window.onload = function(){


	document.querySelector("#submitBtn").addEventListener("click",(e)=>{
		getTweet("GET","screen_name=rchaser53&count=5")
			.then((response)=>{
				 return response.json();
			}).then((ret)=>{
				console.log(ret);
			}).catch((err)=>{
				console.log(err);
			});


		// fetch("http://localhost:3000/proxy",{
		// 	method:"POST"
			// headers:{
			// 	"twitterQuery":'https://api.twitter.com/1.1/statuses/update.json?status='
			// }
			// body:JSON.stringify({
			// 	status:"test"
			// })
		// }).then((response)=>{
		// 	 return response.json();
		// }).then((ret)=>{
		// 	console.log(ret);
		// }).catch((err)=>{
		// 	console.log(err);
		// })
	})
}

const getTweet = (method,query) => {
	return fetch("http://localhost:3000/proxy",{
		method:"GET",
		headers:{
			twitterQuery:query
		}
	});
}