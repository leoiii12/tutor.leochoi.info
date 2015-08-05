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