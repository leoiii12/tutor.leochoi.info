trControllers.controller('CommonCtrl', function ($scope, $ionicSideMenuDelegate) {

    
    $scope.openedContentBackdrop = function () {
        return $ionicSideMenuDelegate.isOpenLeft();
    };

    // Menu
    $scope.$on('$ionicView.enter', function (e) {
        $scope.userBasicInformation = {
            image: './img/Male.png',
            name: '蔡文建'
        };

        $scope.menuCollection = [
            { title: 'Home', link: 'app.home' },
            { title: 'Login', link: 'app.login' },
            { title: 'Register', link: 'app.register' },
            { title: 'About', link: 'app.about' },
            { title: 'Enquiry', link: 'app.enquiry' },
            { title: 'Contact', link: 'app.contact' },
            { title: 'Articles', link: 'app.articles' },
            { title: 'Component', link: 'app.component' }
        ];
    });

});