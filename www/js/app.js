var trApplication = angular.module('TutorRepublic', ['ionic', 'TutorRepublic.controllers', 'TutorRepublic.directives', 'TutorRepublic.services', 'TutorRepublic.filters', 'ngMessages', 'ngMap', 'angular-storage']);
var trControllers = angular.module('TutorRepublic.controllers', []);
var trDirectives = angular.module('TutorRepublic.directives', []);
var trServices = angular.module('TutorRepublic.services', []);
var trFilters = angular.module('TutorRepublic.filters', []);

trApplication

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.views.maxCache(0);

    if (!ionic.Platform.isIOS())
        $ionicConfigProvider.scrolling.jsScrolling(false);

    $httpProvider.interceptors.push(function ($rootScope) {
        return {
            request: function (config) {
                $rootScope.$broadcast('loading:show')
                return config;
            },
            response: function (response) {
                $rootScope.$broadcast('loading:hide')
                return response;
            }
        }
    });


    $stateProvider

    .state('app', {
        url: "/App",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'CommonCtrl'
    })

    .state('app.home', {
        url: "/Home",
        views: {
            'mainContent': {
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            }
        }
    })

    .state('app.login', {
        url: "/Login?isSetting&isAuthorizing",
        views: {
            'mainContent': {
                templateUrl: "templates/login.html",
                controller: 'LoginCtrl'
            }
        }
    })

    .state('app.register', {
        url: "/Register",
        views: {
            'mainContent': {
                templateUrl: "templates/register.html",
                controller: 'RegisterCtrl'
            }
        }
    })

    .state('app.enquiry', {
        url: "/Enquiry",
        views: {
            'mainContent': {
                templateUrl: "templates/enquiry.html"
            }
        }
    })

    .state('app.contact', {
        url: "/Contact",
        views: {
            'mainContent': {
                templateUrl: "templates/contact.html",
                controller: 'ContactCtrl'
            }
        }
    })

    .state('app.component', {
        url: "/Component",
        views: {
            'mainContent': {
                templateUrl: "templates/component.html",
                controller: 'HomeCtrl'
            }
        }
    })

    .state('app.about', {
        url: "/About",
        views: {
            'mainContent': {
                templateUrl: "templates/about.html"
            }
        }
    })

    .state('app.articles', {
        url: "/Articles",
        views: {
            'mainContent': {
                templateUrl: "templates/articles.html"
            }
        }
    });

    $urlRouterProvider.otherwise('App/Home');
})

.run(function ($rootScope, $ionicPlatform, $ionicLoading) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    $ionicPlatform.onHardwareBackButton(function () {
        $ionicPopup.confirm({
            title: 'System warning',
            template: 'Are you sure to leave ?'
        }).then(function (respond) {
            if (respond) {
                navigator.app.exitApp();
            }
        });
    });

    $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            animation: 'fade-in',
            showBackdrop: true,
            showDelay: 200
        });
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide()
    });

    $rootScope.emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,10})$/;
});
