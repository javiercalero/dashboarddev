"use strict";
var url = 'mongodb://user8PK:XtkwSoRKgKkftXjb@mongodb/dashboarddev';
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
        db.collection('Tasks').find({}, function (err, cursor) {
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
    var updObj = { name: "", despcription: "", status: "", user: "" };
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
            db.collection('Tasks').update({
                '_id': new ObjectId(req.params.id)
            }, updObj, {}, function (err, result) {
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
    var updObj = { name: "", description: "", status: "", user: "" };
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
                'description': updObj.description,
                'status': updObj.status,
                'user': updObj.user
            }, updObj, {}, function (err, result) {
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
            '_id': new ObjectId(req.params.id)
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