trDirectives.directive('accordion', function () {
    return {
        restrict: 'E',
        scope: {
            collection: '='
        },
        templateUrl: "templates/components/accordion.html"
    }
});

trDirectives.directive('introductionBox', function () {
    return {
        restrict: 'E',
        scope: {
            iconSrc: '@',
            header: '@',
            subHeader: '@?',
            content: '@'
        },
        templateUrl: "templates/components/introduction-box.html",
        controller: function ($scope) {
            $scope.subHeader = angular.isDefined($scope.subHeader) ? $scope.subHeader : false;
        }
    }
});
trDirectives.directive('jobSurfaceBox', function () {
    return {
        restrict: 'E',
        scope: {
            collection: '='
        },
        templateUrl: "templates/components/job-surface-box.html",
        link: function (scope, element, attribute) {
            if (scope.collection.servicePackage == 'premium') {
                element.addClass('premium');
            }
        }
    }
});
trDirectives.directive('remindMessageBox', function () {
    return {
        restrict: 'E',
        scope: {
            header: '@?',
            messages: '='
        },
        templateUrl: "templates/components/message-box.html",
        controller: function ($scope) {
            $scope.header = angular.isDefined($scope.header) ? $scope.header : 'Remind';
        }
    }
})
.directive('errorMessageBox', function () {
    return {
        restrict: 'E',
        scope: {
            header: '@?',
            messages: '='
        },
        templateUrl: "templates/components/message-box.html",
        controller: function ($scope) {
            $scope.header = angular.isDefined($scope.header) ? $scope.header : 'Error';
        }
    }
})
.directive('successMessageBox', function () {
    return {
        restrict: 'E',
        scope: {
            header: '@?',
            messages: '='
        },
        templateUrl: "templates/components/message-box.html",
        controller: function ($scope) {
            $scope.header = angular.isDefined($scope.header) ? $scope.header : 'Success';
        }
    }
});
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

            this.onGetPhotoError = function (message) {
                alert(message);
            };

            this.setPhotoLink = function (imageURI) {
                // Update display
                $timeout(function () {
                    $scope.link = "url('" + imageURI + "')";
                }, 0);

                // Callback function
                $scope.onPhotoChange(imageURI);
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
trDirectives
.directive('slidingTabs', [
  '$timeout',
  '$compile',
  '$ionicSlideBoxDelegate',
  '$ionicHistory',
  '$ionicScrollDelegate',
  '$ionicSideMenuDelegate',
function ($timeout, $compile, $ionicSlideBoxDelegate, $ionicHistory, $ionicScrollDelegate, $ionicSideMenuDelegate) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            disableScroll: '@',
            onSlideChanged: '&',
            activeSlide: '=?'
        },
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
            var _this = this;
            $scope.tabLabels = [];

            // Disable sidemenu
            $ionicSideMenuDelegate.canDragContent(false);

            var slider = new ionic.views.Slider({
                el: $element[0],
                startSlide: $scope.activeSlide,
                continuous: false,
                slidesChanged: function () {
                    $scope.currentSlide = slider.currentIndex();
                    // Try to trigger a digest
                    $timeout(function () { });
                },
                callback: function (slideIndex) {
                    $scope.currentSlide = slideIndex;
                    $scope.onSlideChanged({ index: $scope.currentSlide, $index: $scope.currentSlide });
                    $scope.$parent.$broadcast('slideBox.slideChanged', slideIndex);
                    $scope.activeSlide = slideIndex;
                    // Try to trigger a digest
                    $timeout(function () { });
                },
                onDrag: function () {
                    freezeAllScrolls(true);
                },
                onDragEnd: function () {
                    freezeAllScrolls(false);
                }
            });

            var freezeAllScrolls = function (shouldFreeze) {
                if (shouldFreeze && !_this.isScrollFreeze) {
                    $ionicScrollDelegate.freezeAllScrolls(shouldFreeze);

                } else if (!shouldFreeze && _this.isScrollFreeze) {
                    $ionicScrollDelegate.freezeAllScrolls(false);
                }
                _this.isScrollFreeze = shouldFreeze;
            };

            slider.enableSlide($scope.$eval($attrs.disableScroll) !== true);

            $scope.$watch('activeSlide', function (nv) {
                if (angular.isDefined(nv)) {
                    slider.slide(nv);
                }
            });

            var deregisterInstance = $ionicSlideBoxDelegate._registerInstance(
              slider, $attrs.delegateHandle, function () {
                  return $ionicHistory.isActiveScope($scope);
              }
            );

            $scope.$on('$destroy', function () {
                deregisterInstance();
                slider.kill();
            });

            this.selectTab = function (index) {
                slider.slide(index);
            };

            this.addTabLabel = function (tabLabel) {
                $scope.tabLabels.push(tabLabel);
            };


            $timeout(function () {
                slider.load();
                $scope.tabCount = slider.count;
            });
        }],
        template: '<div class="slider">' + '<div class="slider-slides" ng-transclude>' + '</div>' + '</div>',
        link: function ($scope, $element, $attr) {
            var childScope = $scope.$new();
            pager = angular.element('<sliding-tabs-selector></sliding-tabs-selector>');
            $element.prepend(pager);
            pager = $compile(pager)(childScope);
        }
    };
}])
.directive('slidingTabsPage', function () {
    return {
        restrict: 'E',
        require: '^slidingTabs',
        scope: false,
        link: function ($scope, $element, $attrs, slidingTabs) {
            $element.addClass('slider-slide');
            slidingTabs.addTabLabel($attrs.slidingTabsPageLabel);
        }
    };
})
.directive('slidingTabsSelector', function () {
    return {
        restrict: 'E',
        require: '^slidingTabs',
        template: '<sliding-tabs-label ng-repeat="(key, tabLabel) in tabLabels track by key" ng-bind="tabLabel" ng-click="selectTab(key)">' + '</sliding-tabs-label>',
        link: function ($scope, $element, $attr, slidingTabs) {
            var selectPage = function (index) {
                var children = $element[0].children;
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    if (i == index) {
                        children[i].classList.add('active');
                    } else {
                        children[i].classList.remove('active');
                    }
                }
            };

            $scope.selectTab = function (index) {
                slidingTabs.selectTab(index);
            };

            $scope.$watch('currentSlide', function (v) {
                selectPage(v);
            });
        }

    };
});
trDirectives.directive('tutorSurfaceBox', function () {
    return {
        restrict: 'E',
        scope: {
            collection: '='
        },
        templateUrl: "templates/components/tutor-surface-box.html"
    }
});