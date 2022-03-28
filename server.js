const express = require('express');
const app = express();

const path = require('path');
const apiRoute = require('./routes/api');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoute);



app.listen('8000', () => console.log('server is running...'));