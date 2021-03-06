'use strict';

var express    = require('express');
var mongo      = require('mongodb');
var app        = express();
var routes     = require('./app/routes/index.js');
require('dotenv').config({
  silent: true
});
    
mongo.MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/url-shortener', function(err, db) {
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('Successfully connected to MongoDB on port 27017.');
    }

    db.createCollection("sites", {
        capped: true,
        size: 5242880,
        max: 5000
    });

    routes(app, db);

    var port = process.env.PORT || 8080;
    app.listen(port, function() {
        console.log('Node.js listening on port ' + port);
    });
});