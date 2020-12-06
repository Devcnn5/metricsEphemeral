const metricLoggingService = require('../services/metric-logging-service');
const metricReportingService = require('../services/metric-reporting-service');
const storage = require('../services/ephemeral-storage-service').getStaticStorage();
const storageCleanupService = require('../services/storage-cleanup-service');

module.exports = {
  logMetric(req, res, next) {
    const key = req.params.key;
    const value = req.body.value;
    const result = new metricLoggingService(storage).logMetric(key, value);
    res.status(200).send({value: result});
  },

  getSum(req, res, next) {
    const key = req.params.key;
    const result = new metricReportingService(storage).reportMetricSum(key);
    res.status(200).send({value : result});
  },

  getAverage(req, res, next) {
    const key = req.params.key;
    const result = new metricReportingService(storage).reportMetricAverage(key);
    res.status(200).send({value: result});
  },

  getValuesOfMetric(req,res,next) {
    const key = req.params.key;
    const value = new metricReportingService(storage).getValuesOfMetric(key);
    res.status(200).send({value});
  },
};
