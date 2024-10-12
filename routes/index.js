var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ status: 'success', message: 'Welcome!' });
});

module.exports = router;
