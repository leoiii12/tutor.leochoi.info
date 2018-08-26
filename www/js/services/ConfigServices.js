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
