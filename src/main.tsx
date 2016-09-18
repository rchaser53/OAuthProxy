import * as React from 'react';
import * as firebase from 'firebase';
import { render } from 'react-dom';

import {
	config,
	userSetting
} from '../firebase.config';
const {
	email,
	password
} = userSetting;

export class Nyan extends React.Component<{}, {}> {
	render() {
		return <div>222</div>;
	}
}

render(
	<Nyan />,
	document.querySelector('#content')
);

// firebase.initializeApp(config);
// firebase.auth()
// 		.signInWithEmailAndPassword(email, password)
// 		.then((user) => {
// 			console.log(user);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});


// const tempPromise = (x) => {
// 						return new Promise((resolve, reject) => {
// 							setTimeout(() => {
// 								resolve(x)
// 							}, x * 1000)
// 						});
// 					}

// const poe = async () => {
// 	const temp = {
// 		def: {
// 			ghi: 2
// 		}
// 	};
// 	try {
// 		const tempArray = await Promise.all([1, 2, 3].map(async (num) => {
// 			return await tempPromise(num);
// 		}));

// 		console.log(tempArray)

// 		console.log('gya-n')
// 	} catch(e){
// 		console.log(e)
// 	}
// };

// poe()