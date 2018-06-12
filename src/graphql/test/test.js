const mongoose = require('mongoose');

const testModel = mongoose.model('Test', { value: String }, "test");

module.exports.Test = `
    type Query {
        test(id: String!): Test
        tests: [Test]
    }

    type Test {
        id: String
        value: String
    }
`;

module.exports.testResolvers = {
    Query: {
        test: (obj, args) => { console.log("test"); },
        tests: () => { 
            return testModel.find({},function(err,tests){
                return tests;
            });
         },
    }
};