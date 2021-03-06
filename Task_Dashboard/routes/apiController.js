"use strict";
var url = process.env.MONGO_DB_CONNECT;
var ObjectId = require('mongodb').ObjectID;
function getTaskById(req, res) {
    var tareas;
    var MongoClient = require('mongodb').MongoClient, co = require('co'), assert = require('assert');
    co(function* () {
        var db = yield MongoClient.connect(url);
        console.log("Connected correctly to server");
        db.collection('Tasks').findOne({ '_id': new ObjectId(req.params.id) }, function (err, cursor) {
            res.json(cursor);
        });
        db.close();
    }).catch(function (err) {
        console.log(err.stack);
    });
}
exports.getTaskById = getTaskById;
;
function getTasks(req, res) {
    var MongoClient = require('mongodb').MongoClient, co = require('co'), assert = require('assert');
    co(function* () {
        var db = yield MongoClient.connect(url);
        console.log("Connected correctly to server");
        db.collection('Tasks').find({}, { "sort": [['created_date', 'desc']] }, function (err, cursor) {
            cursor.toArray(function (err, results) {
                res.json(results);
            });
        });
        db.close();
    }).catch(function (err) {
        console.log(err.stack);
    });
}
exports.getTasks = getTasks;
;
function updateTaskById(req, res) {
    var task = req.body;
    var updObj = { _id: ObjectId, name: "", description: "", status: "", user: "", created_date: "", priority: "" };
    if (task._id != undefined) {
        updObj._id = new ObjectId(task._id);
    }
    if (task.status != undefined) {
        updObj.status = task.status;
    }
    if (task.name != undefined) {
        updObj.name = task.name;
    }
    if (task.description != undefined) {
        updObj.description = task.description;
    }
    if (task.user != undefined) {
        updObj.user = task.user;
    }
    if (task.priority != undefined) {
        updObj.priority = task.priority;
    }
    if (task.created_date != undefined) {
        updObj.created_date = task.created_date;
    }
    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }
    else {
        var MongoClient = require('mongodb').MongoClient, co = require('co'), assert = require('assert');
        co(function* () {
            var db = yield MongoClient.connect(url);
            console.log("Connected correctly to server");
            db.collection('Tasks').update({
                '_id': new ObjectId(task._id)
            }, updObj, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(result);
                }
            });
        }).catch(function (err) {
            console.log(err.stack);
        });
    }
}
exports.updateTaskById = updateTaskById;
;
function addTask(req, res) {
    var task = req.body;
    var updObj = { name: "", description: "", status: "", user: "", priority: "" };
    if (task.status != undefined) {
        updObj.status = task.isCompleted;
    }
    if (task.name) {
        updObj.name = task.name;
    }
    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }
    else {
        var MongoClient = require('mongodb').MongoClient, co = require('co'), assert = require('assert');
        co(function* () {
            var db = yield MongoClient.connect(url);
            console.log("Connected correctly to server");
            db.collection('Tasks').insertOne({
                'name': updObj.name,
                'description': '',
                'status': '',
                'user': '',
                'created_date': new Date().toISOString().slice(0, 19),
                'priority': ''
            }, function (err, result) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(result);
                }
            });
        }).catch(function (err) {
            console.log(err.stack);
        });
    }
}
exports.addTask = addTask;
;
function deleteTask(req, res) {
    var MongoClient = require('mongodb').MongoClient, co = require('co'), assert = require('assert');
    co(function* () {
        var db = yield MongoClient.connect(url);
        console.log("Connected correctly to server");
        db.collection('Tasks').deleteOne({
            '_id': new ObjectId(req.body._id)
        }, '', function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(result);
            }
        });
    }).catch(function (err) {
        console.log(err.stack);
    });
}
exports.deleteTask = deleteTask;
;
//# sourceMappingURL=apiController.js.map