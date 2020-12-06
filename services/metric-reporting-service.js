class MetricReportingService{
  store;
  constructor(store){
    this.store = store;
  }

  getValuesOfMetric(metric){
    return this.store[metric]['values'];
  }

  reportMetricSum(metric){
   return this.store[metric] ? this.store[metric]['sum'] : 0;
  }

  reportMetricAverage(metric){
   return this.store[metric]['values'].length ?  this.store[metric]['sum']/this.store[metric]['values'].length : 0;
  }

}

module.exports = MetricReportingService;
