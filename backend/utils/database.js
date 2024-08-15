const mongoose = require('mongoose')

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);
const user_db = callback => mongoose.connect('mongodb://localhost:27017/practice').then((client) => {
    console.log('Connected');
    callback(client)
}).catch((err)=>{console.log('error occurred '+err);
})

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/practice',
    collection: 'sessions'
});

module.exports={user_db,store}