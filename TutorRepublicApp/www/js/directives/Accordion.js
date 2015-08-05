trDirectives.directive('accordion', function () {
    return {
        restrict: 'E',
        scope: {
            collection: '='
        },
        templateUrl: "templates/components/accordion.html"
    }
});
