'use strict';

const Hapi = require('hapi');
const inert = require('inert');
const Path = require('path');
const Hoek = require('hoek');
const Handlebars = require('handlebars');
const Vision = require('vision');
const Firebase = require('firebase');

const server = new Hapi.Server();

var myFirebaseRef = new Firebase("https://cmmc.firebaseio.com/");

server.connection({ port: 3000 });

const handler_ = function (request, reply) {
    console.log(request.params);
    var parts = {
        temperature: request.params.temperature,
        humidity: request.params.humidity
    };

    var tempRef = myFirebaseRef.child("temp");
    var humidRef = myFirebaseRef.child("humid");

    tempRef.push({"time": request.params.temperature});
    humidRef.push({"time": request.params.humidity});

    // SAVE DB
    // SQLITE3
    // FIREBASE
    // MYSQL
    // MONGO

      reply(parts);
};

server.route({
    method: 'GET',
    path: '/{temperature}/{humidity}/',
    config: {
          handler: handler_,
          jsonp: 'callback'
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply('Hello, world!');
    }
});

/*
// Get a database reference to our posts
var ref = new Firebase("https://cmmc.firebaseio.com");
// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
*/

server.register(Vision, (err) => {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: 'public'
    });

    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply.view('index');
        }
    });

});

server.start(function () {
    console.log("SERVER STARTED: ", server.info.uri);
});
