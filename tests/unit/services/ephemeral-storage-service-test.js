const {describe}  =  require("mocha");
var storageCleanupService = require('../../../services/storage-cleanup-service');
var ephemeralStorageService = require('../../../services/ephemeral-storage-service');
var expect = require('chai').expect;

describe('Test Ephemeral Storage Service', function() {
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

    it('getStaticStorage function should return a new empty object', function() {
      let storage = ephemeralStorageService.getStaticStorage();
      expect(storage).to.be.an('object');
    });
});
