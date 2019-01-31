var path = require("path");
var friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    // POSTMAN DEBUGGING
    // var newData = req.body;
    // console.log(newData);

    var newData = JSON.parse(req.body.newData);
    var dataVerified = false;
    if (Object.keys(newData).length === 3) {
      if (newData.name.length <= 20) {
        if (newData.scores.length === 10) {
          if (
            newData.scores.every(function(num) {
              return !isNaN(num);
            })
          )
            dataVerified = true;
        }
      }
    }

    if (dataVerified) {
      var totalDifference = [];
      for (var i = 0; i < friendsData.length; i++) {
        var total = 0;
        for (var j = 0; j < newData.scores.length; j++) {
          total += Math.abs(friendsData[i].scores[j] - newData.scores[j]);
        }
        totalDifference.push(total);
      }

      var min = Math.min(...totalDifference);
      var index = totalDifference.indexOf(min);

      friendsData.push(newData);
      res.send(JSON.stringify(friendsData[index]));
    } else {
      res.send("INVALID DATA");
    }
  });
};
