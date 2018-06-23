const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userSchema } = require('./userSchema.js');

var usersModel = mongoose.model('Users', userSchema, "users");

const TEMP_USER = {
    id: '1',
    email: 'spencer@handlebarlabs.com',
};

module.exports.User = `
    type Query {
        currentUser: User
    }

    type Mutation {
        login(email: String!, password: String!): User
        signup(email: String!, password: String!): User
    }

    type User {
        id: String
        email: String
        jwt: String
    }
`;

module.exports.userResolvers = {
    Query: {
        currentUser: (root, args, context) => {
            const _id = context.session.userId;
            return  usersModel.findOne({ _id: mongoose.Types.ObjectId(_id)})
            .then(user => {
                return user;
            })
        },
    },
    Mutation: {
        login: (root, { email, password }, context ) => {
            return usersModel.findOne({ email: email })
            .then(user => {
                if (!user) {
                    throw new Error('Email not found');
                }
                
                const validPassword = bcrypt.compareSync(password, user.password);
                if (!validPassword) {
                    throw new Error('Password is incorrect');
                }

                context.session.userId = user._id;

                return user;
            })
        },
        signup: (root, { email, password }, context) => {
            usersModel.findOne({ email: email })
            .then(existingUser => {

                if (existingUser) {
                    throw new Error('Email already used');
                }

                const hash = bcrypt.hashSync(password, 10);

                usersModel.create({email: email, password: hash})
                .then(user => {
                    context.session.userId = user._id;
                })
            })
        },
    },
};