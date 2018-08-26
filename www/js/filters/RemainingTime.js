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