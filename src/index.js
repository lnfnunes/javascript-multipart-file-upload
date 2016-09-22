'use strict';

var CONFIG = require('./config.json');

var options = require('./values/options.js');

angular
    .module(CONFIG.name, ["s3queue", "s3stack"])
    .value('s3FileUploadMultipartOptions', options)
    .run([
        function() {
        }
    ]);
