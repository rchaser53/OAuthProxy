import * as firebase from 'firebase';
import { config } from '../firebase.config';

firebase.initializeApp(config);

window.onload = function(){
	firebase.auth().getRedirectResult().then((result) => {
		document.querySelector('#submitBtn').addEventListener('click', (e) => {
			fetch('https://localhost:3000/proxy/getTweet', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			}).then((response) => {
					return response.text();
				}).then((ret) => {
						const database = firebase.database();
						const test = database.ref('tweet');
						test.set(JSON.parse(ret), (err) => {
							if (err) console.log(err);
							console.log('success');
						});
				});
		});

	}).catch((err) => {
		console.log(err);
	});
};