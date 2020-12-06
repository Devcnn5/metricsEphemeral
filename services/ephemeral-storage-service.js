class StorageService{
  static _instance = new Object({});
  static getStaticStorage() {
    return this._instance;
  }
}

module.exports = StorageService;
