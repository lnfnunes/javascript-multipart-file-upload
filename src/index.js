'use strict';

var CONFIG = require('./config.json');

var options = require('./values/options.js');

angular
    .module(CONFIG.name, ['s3uploadmultipart'])
    .value('s3FileUploadMultipartOptions', options)
    .run([
        function() {
        }
    ]);
