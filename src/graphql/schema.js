const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');
const { mergeTypes } = require('merge-graphql-schemas');

const { 
    Test,
    testResolvers
} = require('./test/test.js');

const { 
  User,
  userResolvers
} = require('./user/users.js');

module.exports.executableSchema = makeExecutableSchema({
  typeDefs: mergeTypes([ Test, User ], { all: true }),
  resolvers: merge(testResolvers, userResolvers),
});