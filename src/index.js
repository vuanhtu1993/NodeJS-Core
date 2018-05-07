import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './controllers/api';
const port = process.env.port || 8000;
const app = express();
const url = 'mongodb://test:test@ds117070.mlab.com:17070/testmock';

//setting body-parser
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API
app.use('/', router);

// Connect MongoDB
mongoose.connect(url)
	.then(() => console.log('MongoDB is running!'))
	.catch((err) => console.log(err));
app.listen(port, () => {
	console.log('server is running on '+ port)
});