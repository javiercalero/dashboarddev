import express = require('express');
var url = process.env.MONGO_DB_CONNECT;//'mongodb://admin:39781550@mongodb/mongodb';
//var url = 'mongodb://localhost:27017/myMongoDB';
import router = express.Router;
var ObjectId = require('mongodb').ObjectID;


export function getTaskById(req: express.Request, res: express.Response) {
    var tareas;
    var MongoClient = require('mongodb').MongoClient,
        co = require('co'),
        assert = require('assert');

    co(function* () {
        // Connection URL
        var db = yield MongoClient.connect(url);
        console.log("Connected correctly to server");

        db.collection('Tasks').findOne({ '_id': new ObjectId(req.params.id) }, function (err, cursor) {

            res.json(cursor);
            //console.log(results); // output all records
        });

        db.close();

    }).catch(function (err) {
        console.log(err.stack);
    });
};

export function getTasks(req: express.Request, res: express.Response) {
    var MongoClient = require('mongodb').MongoClient,
        co = require('co'),
        assert = require('assert');

    co(function* () {
        // Connection URL
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
};


export function updateTaskById(req: express.Request, res: express.Response) {
    var task = req.body;
    var updObj = { name: "", despcription: "", status: "", user: ""};

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
    } else {
        var MongoClient = require('mongodb').MongoClient,
            co = require('co'),
            assert = require('assert');

        co(function* () {
            var db = yield MongoClient.connect(url);
            console.log("Connected correctly to server");

            db.collection('Tasks').update({
                '_id': new ObjectId(req.params.id)
            }, updObj, {}, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
        }).catch(function (err) {
            console.log(err.stack);
        });
    }
};

//Add new task
export function addTask(req: express.Request, res: express.Response) {
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
    } else {
        var MongoClient = require('mongodb').MongoClient,
            co = require('co'),
            assert = require('assert');

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
                } else {
                    res.json(result);
                }
            });
        }).catch(function (err) {
            console.log(err.stack);
        });
    }
};

//Delete a Task
export function deleteTask(req: express.Request, res: express.Response) {

    var MongoClient = require('mongodb').MongoClient,
        co = require('co'),
        assert = require('assert');
    co(function* () {
        var db = yield MongoClient.connect(url);
        console.log("Connected correctly to server");

        db.collection('Tasks').deleteOne({
            '_id': new ObjectId(req.params.id)
        }, '', function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }).catch(function (err) {
        console.log(err.stack);
    });

};