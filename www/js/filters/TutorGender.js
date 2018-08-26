trFilters.filter('TutorGender', function () {

    return function (gender) {
        return gender + '導師';
    }

});