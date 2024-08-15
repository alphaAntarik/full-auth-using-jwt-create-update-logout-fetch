const express = require('express')
const bodyparser = require('body-parser')
const router=require('./routes/userRoute')
const {user_db,store} = require('./utils/database')
const cors = require('cors');

const session = require('express-session');


const port=process.env.PORT || 3001
const app = express()
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());



// app.use(session({
//     secret: "this should be a long text in production", resave: false, saveUninitialized: false, 
//     store:store,  cookie: {
//         maxAge: 1000 * 60 * 60 * 24 // 1 day
//     }
// }))


app.use('/user', router);
user_db(client => {
    // console.log(client);
    app.listen(port, () => {
        console.log('server is listening to ' + port);
    
    })
})
