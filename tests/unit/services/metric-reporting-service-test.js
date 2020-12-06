var ephemeralStorageService = require('../../../services/ephemeral-storage-service');
var metricLoggingService = require('../../../services/metric-logging-service');
var metricRportingService = require('../../../services/metric-reporting-service');
var storageCleanupService = require('../../../services/storage-cleanup-service');
var expect = require('chai').expect;

describe('Test Metric Reporting Service', function() {
  let storage;
  before('initialize storage', function (done){
    storage = ephemeralStorageService.getStaticStorage();
    process.env.DURATION = 1;
    setTimeout(() => {
      new storageCleanupService(storage).cleanupStaleValues('test');
      done();
    }, 10);
  });

  after('reset DURATION', function(done){
    setTimeout(() => {
      new storageCleanupService(storage).cleanupStaleValues('test');
      done();
    }, 10);
    process.env.DURATION = 3600;
  });

  it('reportMetricSum should return the metric sum and reportMetricAverage should return metric average', function() {
    new metricLoggingService(storage).logMetric('test', 10);
    let sum = new metricRportingService(storage).reportMetricSum('test');
    let average = new metricRportingService(storage).reportMetricAverage('test');
    expect(sum).to.equal(10);
    expect(average).to.equal(10);
    new metricLoggingService(storage).logMetric('test', 20);
    sum = new metricRportingService(storage).reportMetricSum('test');
    average = new metricRportingService(storage).reportMetricAverage('test');
    expect(sum).to.equal(30);
    expect(average).to.equal(15);
    });

  it('getValuesOfMetric should return all valid values from the metric ', async function() {
    new metricLoggingService(storage).logMetric('test', 30);
    let values = new metricRportingService(storage).getValuesOfMetric('test');
    expect(values).to.be.an('array');
    expect(values.length).to.equal(3);
    expect(values[0]['value']).to.equal(10);
  });
});
