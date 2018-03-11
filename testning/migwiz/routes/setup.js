var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('setup', { });
});

router.post('/', function(req, res, next) {
    var dbnamemysql = req.body.dbnamemysql;
    var usernamemysql = req.body.usernamemysql;
    var passwordmysql = req.body.passwordmysql;
    var hostmysql = req.body.hostmysql;
    var urlmongodb = req.body.urlmongodb;
    var dbnamemongodb = req.body.dbnamemongodb;
    res.render('setup', { dbnamemysql: dbnamemysql, usernamemysql: usernamemysql, passwordmysql: passwordmysql, hostmysql: hostmysql, urlmongodb: urlmongodb, dbnamemongodb: dbnamemongodb, setup: true });
});

module.exports = router;
