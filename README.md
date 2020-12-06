# metricsEphemeral
An ephemeral web store to log and report metrics.

# Installation Steps
1. Clone to your system
2. Go to source folder where `package.json` is available.
3. Run `npm install`

# Environment Variables
1. DURATION - The time in milliseconds after which the values in the metrics can be considered stale. If not provided, the application will consider values stale after 1 hour.

# Tests and Coverage
1. Run `npm run-script test` to run test cases.
2. Run `npm run-script coverage` to get the code-coverage. The reports will be available in `testResults` folder.

# API's
The application has following api's available:
  1. GET `/heartbeat` : This api will return a string `ok` and status 200 in response signifying that the app is up and running.
  2. POST `/metric/:key` : This api takes input as a path parameter in the `key` variable which will be the metric. The value of the metric should be available in the body as an         Object, i.e., *{"value": "ACTUAL VALUE OF THE METRIC"}*.
  3. GET `/metric/:key/sum` : This api takes input as a path parameter in the `key` variable which will be the metric. This api returns the sum of all the valid values of the           metric present in the application.
  4. GET `/metric/:key/avg` : This api takes input as a path parameter in the `key` variable which will be the metric. This api returns the average of all the valid values of the     metric present in the application.
  5. GET `/metric/:key/getValuesOfMetric`: This api takes input as a path parameter in the `key` variable which will be the metric. This api returns all the valid values along           with their timestamp of entry of the metric present in the application.
