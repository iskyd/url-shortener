'use strict'

var path = require('path');
var api = require('../api/shortener.js');

module.exports = function(app, db) {
    app.route('/').get(function(req, res){
        res.sendFile(path.resolve('public/index.html'));
    });

    app.route('/new').get(function(req, res){
        var dateObj = { error: 'invalid url' };
        res.send(dateObj);
    });

    app.get('/new/:url*', function(req, res){
        var url = req.url.slice(5);
        if(api.isValid(url)) {
            var obj = api.createShortUrl(url, db);
            res.send(obj);
            api.persist(obj, db);
        } else {
            res.send({error: 'invalid url'});
        }
    });

    app.route('/:url').get(function(req, res){
       api.findUrl(db, process.env.APP_URL + req.url.substr(1), res);    
    });
}