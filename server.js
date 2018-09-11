const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
//Body  Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const db = require('./config/keys').mongoURI;
mongoose.connect(db).then(()=>console.log("MongoDB connected"))
	.catch(err=> console.log(err));

app.get('/', (request, response)=>{
	response.end('hello\n');	
});

//use routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

const port =  process.env.PORT || 5000;

app.listen(port, ()=>{
	console.log(`Server running on port ${port}...`);
} );