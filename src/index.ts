import * as firebase from 'firebase';
import { config } from '../firebase.config';

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

firebase.initializeApp(config);
firebase.auth().getRedirectResult().then((result) => {
	const database = firebase.database();
	const test = database.ref('users');
	test.set({abc: 24365}, (err) => {
		console.log(err);
	});
});