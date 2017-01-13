import * as React from 'react';
import * as firebase from 'firebase';

export default class Nyan extends React.Component<{}, {}> {
	constructor() {
		super();

		this.getAuth()
	}

	async getAuth() {
		try {
			const authResult = await firebase.auth().getRedirectResult();
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return <button onClick={async () => {
							try {
								const response = await fetch('https://localhost:3000/proxy/getTweet');
								const result = await response.text();

								const actualResult = JSON.parse(result).filter(elem => {
									return elem.entities.urls.length > 0;
								});

								console.log(actualResult)
							} catch (err) {
								console.log(err);
							}

						}}>222</button>;
	}
}