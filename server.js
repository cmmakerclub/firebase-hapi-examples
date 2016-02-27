'use strict';

const Hapi = require('hapi');

const handler = function (request, reply) {
    console.log(request.params);
    var parts = {
        temperature: request.params.temperature,
        humidity: request.params.humidity
    };

    // SAVE DB
    // SQLITE3
    // FIREBASE
    // MYSQL
    // MONGO

    reply(parts);
};

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/api/{temperature}/{humidity}/{a}/{b}/{c}',
    config: {
        handler: handler,
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

server.start(function () {
    console.log("SERVER STARTED: ", arguments);
});

