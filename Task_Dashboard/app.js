"use strict";
const routes = require("./routes/index");
const api = require("./routes/apiController");
const http = require("http");
const path = require("path");
var logger = require('morgan');
const pug = require('pug');
var bodyparser = require('body-parser');
var methodoverride = require('method-override');
var errorHandler = require('errorhandler');
const express = require("express");
var app = express();
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(methodoverride());
const stylus = require("stylus");
app.use(stylus.middleware(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'app')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.get('/', routes.tasklist);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/tasks', api.getTasks);
app.get('/task/:id', api.getTaskById);
app.post('/updateTask', api.updateTaskById);
app.post('/addTask', api.addTask);
app.post('/deleteTask', api.deleteTask);
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
//# sourceMappingURL=app.js.map