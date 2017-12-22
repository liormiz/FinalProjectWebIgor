var msg1 = {
    msgId : 1 ,
    msgName : "msg1",
    arrText : [1,2,3,4,5,6,7,8,9,10],
    arrImages : [1,2,3],
    templateSrc : "/templates/templateA",
    changeMsgTime : 5,
    frames : [
        {
            fromDate : '01/04/2017',
            toDate : '18/06/2017',
            arrOfDays : [0,2,5,6],
            fromTime : '15:23',
            toTime : '19:00'
        },
        {
            fromDate : '02/04/2017',
            toDate : '25/12/2017',
            arrOfDays : [0,2,3,6],
            fromTime : '14:23',
            toTime : '23:00'
        }
    ]
};

var msg2 = {
    msgId : 2 ,
    msgName : "msg2",
    arrText : [1,2,3,4,5,6,7,8,9,10],
    arrImages : [4,5,6],
    templateSrc : "/templates/templateB",
    changeMsgTime : 5,
    frames : [
        {
            fromDate : '01/04/2017',
            toDate : '18/06/2017',
            arrOfDays : [0,2,5,6],
            fromTime : '15:23',
            toTime : '19:00'
        },
        {
            fromDate : '02/04/2017',
            toDate : '25/12/2017',
            arrOfDays : [0,2,3,6],
            fromTime : '14:23',
            toTime : '23:00'
        }
    ]
};

var msg3 = {
    msgId : 3 ,
    msgName : "msg3",
    arrText : [1],
    arrImages : [4],
    templateSrc : "/templates/templateA",
    changeMsgTime : 5,
    frames : [
        {
            fromDate : '02/04/2017',
            toDate : '25/12/2017',
            arrOfDays : [1,2,3,6],
            fromTime : '14:23',
            toTime : '15:46'
        }
    ]
};


var http = require('http');
var express = require('express');

var mongodb = require('./node_modules/mongodb');

var MongoClient = mongodb.MongoClient;

var collections = ['salem'];

var database;
exports.setupToDb = function(url,callback){

    MongoClient.connect(url, function(err, client) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        // get the db object
        database = client.db('test');

        // לשנות את זה עבור קולבק
        // create collection
        var collection = database.collection('salem');

        // insert new msgs
        insertMsgs(collection,msg1,msg2,msg3);

        callback(database);
    })
};

insertMsgs = function(collection,msg1,mgs2,mg3)
{
    if (collection.find({"msgId": msg1.msgId}))
        collection.insert(msg1);

    if (collection.find({"msgId": mgs2.msgId}))
        collection.insert(mgs2);

    if (collection.find({"msgId": mg3.msgId}))
        collection.insert(mg3);
}

exports.GetMsgs = function(database, res, callback)
{
    var docs = [];
    database.collection('salem').find({}).each(function(err, doc) {

        if (doc)
            docs.push(doc);
        else
        {
            console.log(docs);
            callback(res,docs);
        }
    });
}

/*
exports.GetMsgsWithCallback = function(database, callback)
{
    database.collection('salem').find({}).toArray(callback);
}*/