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
