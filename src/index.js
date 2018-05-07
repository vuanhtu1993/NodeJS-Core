import express from 'express';
const port = process.env.port || 8000;
const app = express();

app.get('/', (req, res) => {
	res.send('xxxx');
});

app.listen(port, () => {
	console.log('server is running on '+ port)
});