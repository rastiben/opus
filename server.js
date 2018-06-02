const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://Opus:tJ26JuV82uvW@ds016108.mlab.com:16108/opus';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

MongoClient.connect(url, function(err, client) {

    const db = client.db("opus");

    app.route('/test')
    .get(function(req, res) {
        const collection = db.collection('test');
                    
        collection.find({}).toArray(function(err, tests) {
            res.send(JSON.stringify(tests));
        });
    })
    .post(function(req, res) {
        const collection = db.collection('test');  
        //response.ops[0]                              
        collection.insertOne(req.body, function(err, result) {
            res.send("ok");
        });
    });

    app.listen(3001, function () {
    //console.log('Example app listening on port 3000!')
    })

});