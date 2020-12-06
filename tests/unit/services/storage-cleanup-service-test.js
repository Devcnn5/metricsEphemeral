var ephemeralStorageService = require('../../../services/ephemeral-storage-service');
var metricLoggingService = require('../../../services/metric-logging-service');
var metricRportingService = require('../../../services/metric-reporting-service');
var storageCleanupService = require('../../../services/storage-cleanup-service');
var expect = require('chai').expect;

describe('Test Storage Cleanup Service', function() {
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
    process.env.DURATION = 1;
    setTimeout(() => {
      new storageCleanupService(storage).cleanupStaleValues('test');
      done();
    }, 10);
    process.env.DURATION = 3600;
  });

  it('cleanupStaleValues should remove stale values from the metric ', async function() {
    new metricLoggingService(storage).logMetric('test', 30);
    let sum = new metricRportingService(storage).reportMetricSum('test');
    let average = new metricRportingService(storage).reportMetricAverage('test');
    expect(sum).to.equal(30);
    expect(average).to.equal(30);
    let timeout = new Promise((resolve, reject) => {
      setTimeout(() => {
        new storageCleanupService(storage).cleanupStaleValues('test');
        resolve(true);
      }, 10);
    });
    await timeout;
    sum = new metricRportingService(storage).reportMetricSum('test');
    average = new metricRportingService(storage).reportMetricAverage('test');
    expect(sum).to.equal(0);
    expect(average).to.equal(0);
    expect(storage['test']).to.be.an('object');
    expect(storage['test']['values']).to.be.empty;
    expect(storage['test']['sum']).to.equal(0);
  });


});
