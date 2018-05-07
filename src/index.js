import express from 'express';
import mongoose from 'mongoose';
const port = process.env.port || 8000;
const app = express();
const url = 'mongodb://test:test@ds117070.mlab.com:17070/testmock';

app.get('/', (req, res) => {
	res.send('xxxx');
});
mongoose.connect(url)
	.then(() => console.log('MongoDB is running!'))
	.catch((err) => console.log(err));
app.listen(port, () => {
	console.log('server is running on '+ port)
});