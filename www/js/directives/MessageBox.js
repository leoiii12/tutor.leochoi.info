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