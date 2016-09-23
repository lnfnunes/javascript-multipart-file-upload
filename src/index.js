'use strict';

angular
    .module(CONFIG.name, ['s3uploadmultipart'])
    .value('s3FileUploadMultipartOptions', options)
    .directive('s3uploadmultipart', function() {
        return { 
            restrict: 'E',
            templateUrl: 'views/angular-s3-fileupload-multipart.html',
            controller: 's3uploadmultipartcontroller',
            scope: {
                fileupload: '='
            }
        };
    })
    .controller('s3uploadmultipartcontroller', ['$scope', function($scope) {
        $scope.$watch('fileupload', function(value) {
            console.log(value);
        })
    }])
    .run([
        function() {
        }
    ]);
