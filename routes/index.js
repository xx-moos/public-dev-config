var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/site.html', function(req, res, next) {
  res.render('site', { title: 'Express' });
});


module.exports = router;
