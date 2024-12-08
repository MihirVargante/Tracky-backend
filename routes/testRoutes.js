const express = require('express');
const router = express.Router();
const testController=require('../tests/middlewareTest')
router.route('/ro').get(testController.testMiddleware);

module.exports = router;
