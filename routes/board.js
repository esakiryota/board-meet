var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:roomId', function(req, res, next) {
  var user = req.query;
  var user_name =  generateRandomString(15);
  params = {"token": req.params.roomId, "user_name": user_name, "user": user, "display_name": user.name, "image": "", roomName: user.roomName}
  console.log(params)
  res.render('board', params);
});

function generateRandomString(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  

module.exports = router;
