import fs from 'fs';
import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import https from 'https';
import { OAuth2 } from 'oauth';

import { config as webpackConfig } from './webpack.config';
import { config as authConfig } from './oAuth.config';
import { config as serverConfig } from './server.config';
import request from 'request';

const oauth2 = new OAuth2(authConfig.consumerKey,
						authConfig.consumerSecret,
						'https://api.twitter.com/',
						null,
						'oauth2/token',
						null);

const app = express();


const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/workplace'));
app.use(webpackMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	contentBase: 'src',
	stats: {
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false
	}
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json())

app.all('/proxy/*', function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	oauth2.getOAuthAccessToken(
		'',
		{'grant_type':'client_credentials'},
		async (e, accessToken, refresh_token, results) => {	
			try {

				oauth2.useAuthorizationHeaderforGET(true);
				const getTweet = makeGetTweet(oauth2, accessToken);

				let tempRetArray = await getTweet();
				let retArray = [].concat(tempRetArray);
				while (0 < tempRetArray.length) {
					tempRetArray = await getTweet(tempRetArray[tempRetArray.length - 1].id);
					retArray = retArray.concat(tempRetArray);
				}

				res.send(JSON.stringify(retArray));
			} catch (err) {
				throw new Error(err)
			}
	});
})

export const makeGetTweet = (oauth, accessToken) => {
	return (tweetId) => {
		const query = (tweetId === undefined) ? '' : `&max_id=${tweetId}`;
		return new Promise((resolve, reject) => {
			oauth.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=rChaser53&count=200${query}`, accessToken, (err, data) => {
				if (err) reject(err)
				resolve(JSON.parse(data));
			});
		});
	};
}

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'workplace/index.html'));
});

const {
	certPath,keyPath
} = serverConfig;
const port = 3000;

https.createServer({
		key: fs.readFileSync(keyPath),
		cert: fs.readFileSync(certPath)
	},
	app).listen(port, 'localhost', (err) => {
		if (err) {
			console.log(err);
		}
	console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});