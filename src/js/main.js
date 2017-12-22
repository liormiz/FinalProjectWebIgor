var myApp = angular.module("myApp", []);

myApp.controller("CtrlOne", function ($scope) {
    $scope.name = "lior mizrahi";

    var msgArray = [];

    $.getJSON("http://localhost:8080/getData", function (data) {
        console.log(data);
        msgArray = data;
    });

    var currMsgIndex = 0;

    // this function check the current msg to show
    function checkAvailableMsg() {

        var currDate = moment(new Date(), "DD/MM/YYYY  HH:mm");
        var msgFromDate, msgToDate;
        var currTimeFrame;
        var isMsgFound = false;

        for (var nMsgIndex = currMsgIndex; nMsgIndex < msgArray.length && !isMsgFound; nMsgIndex++) {
            for (var nFameIndex = 0; nFameIndex < msgArray[nMsgIndex].frames.length && !isMsgFound; nFameIndex++) {
                currTimeFrame = msgArray[nMsgIndex].frames[nFameIndex];
                msgFromDate = moment(currTimeFrame.fromDate + " " + currTimeFrame.fromTime, "DD/MM/YYYY  HH:mm");
                msgToDate = moment(currTimeFrame.toDate + " " + currTimeFrame.toTime, "DD/MM/YYYY  HH:mm");

                if (currDate.isSameOrAfter(msgFromDate) &&
                    currDate.isSameOrBefore(msgToDate)) {
                    if (currTimeFrame.arrOfDays.includes(currDate.day())) {
                        currMsgIndex = (nMsgIndex + 1) % msgArray.length;
                        showMsg(msgArray[nMsgIndex]);
                        isMsgFound = true;
                        setTimeout(function () {
                            hideMsg(checkAvailableMsg);
                        }, msgArray[nMsgIndex].changeMsgTime * 1000);
                    }
                }
            }
        }

        if (!isMsgFound) {
            currMsgIndex = 0;

            setTimeout(function () {
                checkAvailableMsg();
            }, 1000);
        }
    }

    function showMsg(p_msg) {


        // set the msg name
        $("#msgName").text(p_msg.msgName);

        // set the first msg text
        //$("#msgText").text(p_msg.arrText[0]);

        // set the msg texts
        for (var i = 0; i < p_msg.arrText.length; i++) {
            $("#msgText").append("<p>" + p_msg.arrText[i] + "</p>");
        }

        //$("#msgPictures").text("<img src="asdsad.jpg" />");

        for (var i = 0; i < p_msg.arrImages.length; i++) {
            $("#msgPictures").append("<img src='./images\\" + p_msg.arrImages[i] + ".jpg' width=\"100\" />");
        }

        $("#msgTemplate").load("http://localhost:8080" + p_msg.templateSrc, $("#msgContainer").slideDown());
        //$("#msgContainer").slideDown();
    }

    function hideMsg(callback) {
        // set the msg name
        $("#msgContainer").slideUp(function () {
            $("#msgName").text("");
            $("#msgText").text("");
            $("#msgPictures").text("");
            $("#msgTemplate").text("");
            callback();
        });
    }

    checkAvailableMsg();

});


