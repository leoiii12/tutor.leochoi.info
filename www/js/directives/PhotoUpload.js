var EMPTY_PHOTO = '//:0';

trDirectives
.directive('photoUpload', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        scope: {
            format: '@',
            targetWidth: '@',
            targetHeight: '@',
            quality: '@',
            albumLabel: '@',
            captureLabel: '@',
            onPhotoChange: '='
        },
        controller: function ($scope, $element, $attrs) {
            this.options = {
                quality: parseInt($scope.quality),
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: $scope.format === 'PNG' ? Camera.EncodingType.PNG : Camera.EncodingType.JPEG,
                targetWidth: parseInt($scope.targetWidth),
                targetHeight: parseInt($scope.targetHeight),
                correctOrientation: true
            };

            this.setPhotoLink = function (imageURI) {
                // Update display
                $timeout(function () {
                    $scope.link = "url('" + imageURI + "')";
                }, 0);

                // Callback function
                $scope.onPhotoChange(imageURI);
            };

            this.onGetPhotoError = function (message) {
                alert(message);
            };
        },
        template: '<photo-upload-display ng-style="{\'width\' : \'{{targetWidth}}px\', \'height\' : \'{{targetHeight}}px\', \'background-image\' : link }"></photo-upload-display></br></br>' + '<photo-upload-album>{{albumLabel}}</photo-upload-album></br></br>' + '<photo-upload-capture>{{captureLabel}}</photo-upload-capture>'
    };
}])
.directive('photoUploadDisplay', ['$ionicPopup', function ($ionicPopup) {
    return {
        restrict: 'E',
        require: '^photoUpload',
        scope: false,
        link: function ($scope, $element, $attrs, photoUpload) {
            $element[0].onclick = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Alert',
                    template: 'Are you sure you want to remove your profile picture?'
                });
                confirmPopup.then(function (respond) {
                    if (respond) {
                        photoUpload.setPhotoLink(EMPTY_PHOTO);
                    }
                });
            };
        }
    };
}])
.directive('photoUploadAlbum', function () {
    return {
        restrict: 'E',
        require: '^photoUpload',
        scope: false,
        link: function ($scope, $element, $attrs, photoUpload) {
            $element[0].onclick = function () {
                var _options = photoUpload.options;
                _options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
                navigator.camera.getPicture(photoUpload.setPhotoLink, photoUpload.onGetPhotoError, _options);
            };
        }
    };
})
.directive('photoUploadCapture', function () {
    return {
        restrict: 'E',
        require: '^photoUpload',
        scope: false,
        link: function ($scope, $element, $attrs, photoUpload) {
            $element[0].onclick = function () {
                var _options = photoUpload.options;
                _options.sourceType = Camera.PictureSourceType.CAMERA;
                navigator.camera.getPicture(photoUpload.setPhotoLink, photoUpload.onGetPhotoError, _options);
            };
        }
    };
});