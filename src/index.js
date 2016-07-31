window.onload = function(){
	document.querySelector("#submitBtn").addEventListener("click",(e)=>{
		getTweet("screen_name=rchaser53&count=5")
			.then((response)=>{
				 return response.json();
			}).then((ret)=>{
				console.log(ret);
			}).catch((err)=>{
				console.log(err);
			});
	})
}

const getTweet = (query) => {
	return fetch("https://localhost:3000/proxy/getTweet"
//	{
//		headers:{
//			twitterQuery:query
//		}
//	}
);
}

const postTweet = (query) => {
	return fetch("http://localhost:3000/proxy/postTweet",{
		headers:{
			twitterQuery:query
		}
	});
}
