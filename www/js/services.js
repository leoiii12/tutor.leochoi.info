trServices.factory('ConfigServices', function () {

    var serverURL = [
        "http://dev.businsoft.com/businstore/businstore_server/www/", // Live server
        "http://192.168.0.100/www.potato/qtagpass.api/api/",
        "http://192.168.0.100/www.leochoi/", // Own server
        "http://203.186.159.74/PolyM/msisdn/testing_get/",
        "http://203.186.159.74/PolyM/msisdn/real_get/"
    ];

    function redirect() {
    }


    return {
        url: {
            server: serverURL[2],
            final: serverURL[2] + "QTPDev_Backend/",
            polym: serverURL[3]
        }
    };
});

trServices.factory('PopupServices', function ($ionicPopup) {
    return {
        remind: function (message, callbackAction) {
            var remindPopup = $ionicPopup.alert({
                title: 'Alert',
                template: message
            });
            remindPopup.then(function () {
                remindPopup.close();
                callbackAction();
            });
        },
        confirm: function (message, confirm, cancel) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirm',
                template: message,
                okText: confirm.text,
                cancelText: cancel.text
            });
            confirmPopup.then(function (isConfirmed) {
                if (isConfirmed) {
                    if (typeof confirm.action !== "undefined") {
                        confirm.action();
                    }
                } else {
                    if (typeof cancel.action !== "undefined") {
                        cancel.action();
                    }
                }
            });
        }
    }
});