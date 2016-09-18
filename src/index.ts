window.onload = function(){
	document.querySelector('#submitBtn').addEventListener('click', (e) => {
		fetch('https://localhost:3000/proxy/getTweet', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).then((response) => {
				return response.text();
			}).then((ret) => {
				console.log(JSON.parse(ret));
			}).catch((err) => {
				console.log(err);
			});
	});
};

const postTweet = (query) => {
	return fetch('http://localhost:3000/proxy/postTweet', {
		headers: {
			twitterQuery: query
		}
	});
};