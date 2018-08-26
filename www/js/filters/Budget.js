trFilters.filter('Budget', function () {

    return function (budget) {
        return '$ ' + budget;
    }

});