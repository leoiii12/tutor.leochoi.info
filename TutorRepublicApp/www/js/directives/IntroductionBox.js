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