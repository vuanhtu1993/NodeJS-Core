import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import api from './api';
import config from './config.js';
import './lib/mailer'

let app = express();
app.server = http.createServer(app);
app.set('superSecret', config.secret);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( (err, db) => {
	if(err){
		console.log('Error happened. Server couldn\'t serve you')
		return;
	}
	// api router
	app.use('/api', api({ db }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
