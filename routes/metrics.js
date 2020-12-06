var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const metricController = require('../controllers/metric-controller');
const storageController = require('../controllers/storage-controller');
/* GET users listing. */

router.use('/metric/:key', storageController.cleanupStorage);

router.post('/metric/:key', function validateInput(req,res,next){
  let value = req.body.value;
  if(!value){
    next(createError(400, 'Please provide a value in body'));
  } else if(typeof value !== 'number'){
    next(createError(400, 'Value can only be a number'));
  } else if(value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER){
    next(createError(400, `Please provide a value less than ${Number.MIN_SAFE_INTEGER} and greater than ${Number.MIN_SAFE_INTEGER}`));
  }else {
    next();
  }
});

router.post('/metric/:key', metricController.logMetric);

router.get('/metric/:key/sum', metricController.getSum);

router.get('/metric/:key/avg', metricController.getAverage);

router.get('/metric/:key/getValuesOfMetric', metricController.getValuesOfMetric);

module.exports = router;
