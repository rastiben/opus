const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var { executableSchema } = require('./src/graphql/schema.js');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { userSchema } = require('./src/graphql/user/userSchema.js');

mongoose.connect('mongodb://Opus:tJ26JuV82uvW@ds016108.mlab.com:16108/opus');

// Create an express server and a GraphQL endpoint
var app = express();


//Récupération de l'utilisateur actif.
const getUser = (authorization, secret) => {
    const bearerLength = "Bearer ".length;
    if (authorization && authorization.length > bearerLength) {
        const token = authorization.slice(bearerLength);
        return jwt.verify(token, secret, (err, result) => {
            if (err) {
                return null;
            } else {
                var userModel = mongoose.model('Users', userSchema, "users");
                return userModel.findOne({ _id: new ObjectId(result._id) })
                .then(user => {
                    return user;
                });
            }
        })
    }
    
    return null;
};

app.use('/graphql', bodyParser.json(), graphqlExpress( req => {
        const secret = "5u1wNqoNkcMDgP3MgGN00aejtm3045lO";
        const user = getUser(req.headers['authorization'], secret);

        console.log(user);

        return {
            schema: executableSchema,
            context: {
                secret: secret,
                user: user
            }
        };
    })
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(4000, () => 
    console.log('Express GraphQL Server Now Running On localhost:4000/graphql')
);