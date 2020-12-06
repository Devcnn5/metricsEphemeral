const storage = require('../services/ephemeral-storage-service').getStaticStorage();
const storageCleanupService = require('../services/storage-cleanup-service');

module.exports = {

  cleanupStorage(req,res,next) {
    const key = req.params.key;
    new storageCleanupService(storage).cleanupStaleValues(key);
    next();
  }

};
