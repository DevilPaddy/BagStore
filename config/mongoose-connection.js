const mongoose = require('mongoose');
const dbgr = require('debug')('development: mongoose');
const config = require('config');

mongoose
.connect(`${config.get('MONGODB_URI')}/ecart-project`)
.then(()=>{
    dbgr('connected');
    console.log('connected');
})
.catch((err)=>{
    dbgr(err);
})

module.exports = mongoose.connection;