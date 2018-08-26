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