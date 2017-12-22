var express = require('express');
var http = require('http');
var dbUtil = require('./database');

var app = express();
var url = 'mongodb://localhost:27017';
var database = {};

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

var msgArray = [msg1,msg2,msg3];


app.use(express.static(__dirname + "/src"));

app.post('/templates/:filename', function(req, res) {
    res.sendFile(__dirname + '/src/templates/' + req.params.filename + ".html");
});

var server = http.createServer(app);

server.listen(8080, null, null, function(){
	console.log("server running at http://8080");
});

dbUtil.setupToDb(url,function(p_db)
{
    database = p_db;
    //dbUtil.GetMsgs(p_db);
});

app.get('/GetMsgs', dbUtil.GetMsgs);


app.get('/getData', function(req,res){
    dbUtil.GetMsgs(database,res, function(res,data)
    {
        res.json(data);
    });
});

