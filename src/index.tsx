import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as firebase from 'firebase';
import { config } from '../firebase.config';

import TestButton from './TestButton';

firebase.initializeApp(config);

ReactDOM.render(
	<div>23</div>,
	document.querySelector('#content')
);