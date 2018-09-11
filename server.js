const express = require('express');
const mongoose = require('mongoose');
const app = express();

const db = require('./config/keys').mongoURI;
mongoose.connect(db).then(()=>console.log("MongoDB connected"))
	.catch(err=> console.log(err));

app.get('/', (request, response)=>{
	response.end('hello\n');	
});

const port =  process.env.PORT || 5000;

app.listen(port, ()=>{
	console.log(`Server running on port ${port}...`);
} );