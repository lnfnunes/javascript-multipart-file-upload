'use strict';

require('./services/S3Enumerable');
require('./services/S3Stack');
require('./services/S3Queue');
require('./services/S3Object');

var CONFIG = require('./config.json');

angular
    .module(CONFIG.name, [])
    .value('s3FileUploadMultipartOptions', options)
    .run([
        function() {
        }
    ]);
