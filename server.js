const express = require('express');

const app = express();

app.get('/', (request, response)=>{
	response.end('hello\n');	
});

const port =  process.env.PORT || 5000;

app.listen(port, ()=>{
	console.log(`Server running on port ${port}...`);
} );