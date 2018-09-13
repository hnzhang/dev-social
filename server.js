const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");//has a lot authentication methods

const app = express();
//Body  Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const dbURL = require('./config/keys').mongoURI;
mongoose.connect(dbURL, {useNewUrlParser: true}).then(()=>console.log("MongoDB connected"))
	.catch(err=> console.log(err));

//passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

const port =  process.env.PORT || 5000;

app.listen(port, ()=>{
	console.log(`Server running on port ${port}...`);
} );