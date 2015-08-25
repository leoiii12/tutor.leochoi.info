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

            this.getHeight = function () {
                return $element[0].parentElement.clientHeight - 48 -44;
            };

            $timeout(function () {
                slider.load();
                $scope.tabCount = slider.count;
            });
        }],
        template: '<div class="slider">' + '<div class="slider-slides" ng-transclude>' + '</div>' + '</div>',
        link: function ($scope, $element, $attr) {
            var childScope = $scope.$new();
            var pager = angular.element('<sliding-tabs-selector></sliding-tabs-selector>');
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
        transclude: true,
        template: '<ion-scroll style="height: {{containerHeight}}px" class="padding"><div ng-transclude></div></ion-scroll>',
        link: function ($scope, $element, $attrs, slidingTabs) {
            $element.addClass('slider-slide');
            slidingTabs.addTabLabel($attrs.slidingTabsPageLabel);
            $scope.containerHeight = slidingTabs.getHeight();
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