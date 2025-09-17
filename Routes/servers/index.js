const router = require("express").Router();

router.use('/', require('./get.servers'));

module.exports = router;