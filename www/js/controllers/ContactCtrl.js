trControllers.controller('ContactCtrl', function ($scope, $window, PopupServices) {

    $scope.openMap = function () {
        PopupServices.confirm(
                   '是否要開啟全屏幕地圖？',
                   {
                       text: '是', action: function () {
                           if (ionic.Platform.isAndroid())
                               $window.open('geo:22.4256335,114.2123085?z=20&q=22.4256335,114.2123085(Tutor Republic)', '_blank');
                           else
                               $window.open('https://goo.gl/maps/L0mU2', '_blank');
                       }
                   },
                   {
                       text: '否', action: function () { }
                   });
    };

});
