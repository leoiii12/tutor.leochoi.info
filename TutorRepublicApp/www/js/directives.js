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

            $scope.$on('slideBox.nextSlide', function () {
                slider.next();
            });

            $scope.$on('slideBox.prevSlide', function () {
                slider.prev();
            });

            $scope.$on('slideBox.setSlide', function (e, index) {
                slider.slide(index);
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

            $timeout(function () {
                slider.load();
                $scope.tabCount = slider.count;
                $scope.tabLabels = [];
            });
        }],
        template: '<div class="slider"><div class="slider-slides" ng-transclude></div></div>'
    };
}])
.directive('slidingTabsPage', function () {
    return {
        restrict: 'E',
        require: '^slidingTabs',
        scope: false,
        link: function ($scope, $element, $attrs, $parent) {
            $element.addClass('slider-slide');
            console.log($scope);
            console.log($attrs.slidingTabsPageLabel);
            console.log($parent);
            // $parent.tabLabels.push($attrs.slidingTabsPageLabel);
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