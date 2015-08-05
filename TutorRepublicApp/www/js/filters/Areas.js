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