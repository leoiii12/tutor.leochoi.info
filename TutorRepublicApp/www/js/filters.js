trFilters.filter('Areas', function () {

    return function (areas) {
        var connectedArea = '';
        for (var i = 0; i < areas.length; i++) {
            if (i == areas.length - 1)
                connectedArea += areas[i];
            else
                connectedArea += areas[i] + '、';
        }
        return connectedArea;
    }

});
trFilters.filter('Budget', function () {

    return function (budget) {
        return '$ ' + budget;
    }

});
trFilters.filter('RemaingTime', function () {

    var timeUnit = ['年', '個月', '天', '小時', '分鐘', '秒'];

    return function (connectedRemainingTime) {
        var splittedRemainingTime = connectedRemainingTime.split(',');
        for (var i = 0 ; i <= 5; i++) {
            if (splittedRemainingTime[i] != '0') {
                if (i == 2 && splittedRemainingTime[i] > 7) {
                    return Math.floor(splittedRemainingTime[i] / 7) + ' 個星期';
                }
                return splittedRemainingTime[i] +' '+ timeUnit[i];
            }
        }
    }

});
trFilters.filter('TutorEducationLevel', function () {

    return function (educationLevel) {
        return educationLevel + '或以上';
    }

});
trFilters.filter('TutorGender', function () {

    return function (gender) {
        return gender + '導師';
    }

});