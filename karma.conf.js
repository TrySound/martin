// Karma configuration
// Generated on Sun May 17 2015 02:46:23 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['qunit'],

    files: [
      'dist/martin.js',
      'tests/[^_]*.js'
    ],

    // possible values: 'dots', 'progress'
    reporters: ['progress'],

    port: 8081,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Firefox'],

    singleRun: false
  });
};
