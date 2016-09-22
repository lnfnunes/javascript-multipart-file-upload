'use strict';

var CONFIG = require('./config.json');

angular
    .module(CONFIG.name, [])
    .value('s3FileUploadMultipartOptions', options)
    .run([
        function() {
        }
    ]);
