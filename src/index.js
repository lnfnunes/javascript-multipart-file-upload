'use strict';

require('./commons/collections/S3Enumerable');
require('./commons/collections/S3Stack');
require('./commons/collections/S3Queue');
require('./commons/S3Object');

var CONFIG = require('./config.json');

var options = require('./values/options.js');

angular
    .module(CONFIG.name, [])
    .value('s3FileUploadMultipartOptions', options)
    .run([
        function() {
        }
    ]);
