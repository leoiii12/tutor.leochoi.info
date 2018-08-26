trDirectives.directive('tutorSurfaceBox', function () {
    return {
        restrict: 'E',
        scope: {
            collection: '='
        },
        templateUrl: "templates/components/tutor-surface-box.html"
    }
});