'use strict';

import CONFIG from './config.json';

import options from './values/options'

import serviceS3Enumerable from './services/S3Enumerable';
import serviceS3Stack from './services/S3Stack';
import serviceS3Queue from './services/S3Queue';

angular
    .module(CONFIG.name, [])
    .value('s3FileUploadMultipartOptions', options)
    .factory('S3Enumerable', serviceS3Enumerable)
    .factory('S3Stack', serviceS3Stack)
    .factory('S3Queue', serviceS3Queue)
    .run([
        'S3Enumerable',
        'S3Stack',
        'S3Queue',
        function(S3Enumerable, S3Stack, S3Queue) {
        }
    ]);
