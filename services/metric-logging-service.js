class MetricLoggingService{
  store;
  constructor(store){
    this.store = store;
  }

  logMetric(metric, value){
    const roundedOffValue = this.roundOffValue(value);
    if(this.store[metric]) {
      this.store[metric]['values'].push({value: roundedOffValue, time: new Date().getTime()});
      this.store[metric]['sum'] += roundedOffValue;
      return {};
    } else{
      this.store[metric] = {
        'values': [{value: roundedOffValue, time: new Date().getTime()}],
        'sum': roundedOffValue,
      };
      return {};
    }
  }

  roundOffValue(value){
    return Math.round(value);
  }

}

module.exports = MetricLoggingService;
