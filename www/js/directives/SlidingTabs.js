trDirectives
.directive('slidingTabs', ['$timeout', '$compile', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$ionicSideMenuDelegate', '$ionicHistory', function ($timeout, $compile, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicSideMenuDelegate, $ionicHistory) {
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
                auto: 0,
                continuous: false,
                startSlide: $scope.activeSlide,
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

            var deregisterInstance = $ionicSlideBoxDelegate._registerInstance(slider, $attrs.delegateHandle, function () {
                return $ionicHistory.isActiveScope($scope);
            });

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

            $scope.$on('$destroy', function () {
                deregisterInstance();
                slider.kill();

                // Enable sidemenu
                $ionicSideMenuDelegate.canDragContent(true);
            });

            this.selectTab = function (index) {
                slider.slide(index);
            };

            $scope.tabLabels = [];
            this.addTabLabel = function (tabLabel) {
                $scope.tabLabels.push(tabLabel);
            };

            $timeout(function () {
                slider.load();
            });
        }],
        template: '<div style="padding-bottom: 48px;" class="slider">' + '<div class="slider-slides" style="height: 100%;" ng-transclude>' + '</div>' + '</div>',
        link: function ($scope, $element, $attr) {
            var selectorScope = $scope.$new();
            var selector = angular.element('<sliding-tabs-selector></sliding-tabs-selector>');
            $element.prepend(selector);
            selector = $compile(selector)(selectorScope);
        }
    };
}])
.directive('slidingTabsPage', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        require: '^slidingTabs',
        scope: {
            isPadding: '='
        },
        transclude: true,
        template: '<ion-scroll style="height: 100%;"><div ng-class="{\'padding\' : isPadding}" ng-transclude></div></ion-scroll>',
        link: function ($scope, $element, $attrs, slidingTabs) {
            $element.addClass('slider-slide');
            slidingTabs.addTabLabel($attrs.slidingTabsPageLabel);
        }
    };
}])
.directive('slidingTabsSelector', function () {
    return {
        restrict: 'E',
        require: '^slidingTabs',
        template: '<sliding-tabs-label ng-repeat="(key, tabLabel) in tabLabels track by key" ng-bind="tabLabel" ng-click="selectTab(key)"></sliding-tabs-label>',
        link: function ($scope, $element, $attr, slidingTabs) {
            $scope.selectTab = function (index) {
                slidingTabs.selectTab(index);
            };

            var selectPage = function (index) {
                var children = $element[0].children;
                for (var i = 0; i < children.length; i++) {
                    if (i == index) {
                        children[i].classList.add('active');
                    } else {
                        children[i].classList.remove('active');
                    }
                }
            };

            $scope.$watch('currentSlide', function (v) {
                selectPage(v);
            });
        }
    };
})
;