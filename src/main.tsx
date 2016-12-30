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