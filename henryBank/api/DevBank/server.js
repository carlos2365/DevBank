const path = require('path');
const gateway = require('express-gateway');
const users = require('./index')


gateway()
  .load(path.join(__dirname, './src/config'))
  .run();
