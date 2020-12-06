class StorageCleanupService {
  store;
  constructor(store) {
    this.store = store;
  }

  cleanupStaleValues(metric) {
    if (this.store[metric]) {
      let index = 0;
      let newDate = new Date().getTime();
      while (this.store[metric].values[index] && ((newDate - this.store[metric].values[index]['time']) >= (process.env.DURATION || 3600 * 1000))) {
        let removedValue = this.store[metric]['values'].shift();
        this.store[metric]['sum'] -= removedValue.value;
      }
    }
    return this.store[metric];
  }
}

module.exports = StorageCleanupService;
