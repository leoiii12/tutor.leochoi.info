trFilters.filter('TutorEducationLevel', function () {

    return function (educationLevel) {
        return educationLevel + '或以上';
    }

});