var ephemeralStorageService = require('../../../services/ephemeral-storage-service');
var metricLoggingService = require('../../../services/metric-logging-service');
var expect = require('chai').expect;
var storageCleanupService = require('../../../services/storage-cleanup-service');

describe('Test Metric Logging Service', function() {
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
  it('logMetric should add a metric to the storage', function() {
    new metricLoggingService(storage).logMetric('test', 10);
    expect(storage).to.be.an('object');
    expect(storage).to.not.be.empty;
    expect(storage['test']).to.be.an('object');
    expect(storage['test']['values']).to.be.an('array');
    expect(storage['test']['values']['length']).to.equal(1);
    expect(storage['test']['values'][0]['value']).to.equal(10);
    expect(storage['test']['values'][0]['time']).to.be.at.most(new Date().getTime());
  });

  it('logMetric should add multiple metrics to the storage', function(){
    new metricLoggingService(storage).logMetric('anotherTest', 20);
    expect(storage).to.be.an('object');
    expect(storage).to.not.be.empty;
    expect(storage['test']).to.be.an('object');
    expect(storage['anotherTest']).to.be.an('object');
    expect(storage['test']['values']).to.be.an('array');
    expect(storage['anotherTest']['values']).to.be.an('array');
    expect(storage['test']['values']['length']).to.equal(1);
    expect(storage['anotherTest']['values']['length']).to.equal(1);
    expect(storage['test']['values'][0]['value']).to.equal(10);
    expect(storage['anotherTest']['values'][0]['value']).to.equal(20);
    expect(storage['test']['values'][0]['time']).to.be.at.most(new Date().getTime());
    expect(storage['anotherTest']['values'][0]['time']).to.be.at.most(new Date().getTime());
  });
});
