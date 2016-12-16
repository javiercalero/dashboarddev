import routes = require('./routes/index');
import api = require('./routes/apiController');
import http = require('http');
import path = require('path');
var logger = require('morgan');
const pug = require('pug');
var bodyparser = require('body-parser');
var methodoverride = require('method-override');
var errorHandler = require('errorhandler');
//const electron = require('electron');
//var electronApp = electron.app;
//const {BrowserWindow} = electron;
import express = require('express');
var app = express();
//var favicon = require('serve-favicon');


// all environments
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(favicon(__dirname + '/app/images/Tasklist-48.png'));
//app.use(logger('dev'));

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(methodoverride());

//app.use(app.router);

import stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'app')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));


// development only
//if ('development' == app.get('env')) {
//    app.use(errorHandler());
//}

app.get('/', routes.tasklist);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/tasks', api.getTasks);
app.get('/task/:id', api.getTaskById);
app.post('/updateTask/:id', api.updateTaskById);
app.post('/addTask', api.addTask);
app.post('/deleteTask/:id', api.deleteTask);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

//var mainWindow = null;

//electronApp.on('ready', function () {
//    mainWindow = new BrowserWindow({
//        height: 600,
//        width: 800
//    });
//    var html = jade.renderFile(__dirname + '/views/index.jade');
//    mainWindow.loadURL('http://localhost:' + app.get('port'));
//});