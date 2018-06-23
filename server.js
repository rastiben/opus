const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { executableSchema } = require('./src/graphql/schema.js');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { userSchema } = require('./src/graphql/user/userSchema.js');

const bcrypt = require('bcrypt');
var session = require('express-session');
const uuidv1 = require('uuid/v1');
var cors = require('cors');

mongoose.connect('mongodb://Opus:tJ26JuV82uvW@ds016108.mlab.com:16108/opus');

// Create an express server and a GraphQL endpoint
var app = express();

/*var corsOptions = {
    origin: 'http://http://localhost:3000/',
    credentials: true // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));*/

var sess = {
    secret: 'keyboard cat',
    cookie: {}
}
  
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
  
app.use(session(sess))

/*app.set('trust proxy', 1)
app.use(
    session({
        genid: function(req) {
            return uuidv1()
        },
        name: "qid",
        secret: "dfsdfsdfsdf",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
)*/

//Graphql API
app.use('/graphql', 
    bodyParser.json(), 
    graphqlExpress( req => {
        console.log(req.session);

        return {
            schema: executableSchema,
            context: req
        };
    })
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(4000, () => 
    console.log('Express GraphQL Server Now Running On localhost:4000/graphql')
);