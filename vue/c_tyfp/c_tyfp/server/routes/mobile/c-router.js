let express = require('express');
let router = express.Router();
let BaseRequest = require('../../api/base-request');
router.post('/axinsf/ws/webCus/findBdList', function(req, res, next) {
  BaseRequest.REQUEST(req, res, function(data) {
    res.json(data);
  }, function(BaseResponse) {
    res.json(BaseResponse);
  });
});
module.exports = router;

