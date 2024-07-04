const express = require('express');
var cors = require('cors')

const userController = require('./Controllers/userController');

let app = express();

app.use(cors())

require('./configs/database');

app.use(express.json());

app.use('/user',userController );

//app.listen(8000);

app.listen(7000, () => {
  console.log('Server is running on port 7000');
});

//$ npm start
