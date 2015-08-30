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

trControllers.controller('HomeCtrl', function ($scope, $ionicModal, PopupServices) {

    var servicePackage = ['basic', 'premium'];
    var studentEducationLevel = ['小一', '小二', '小三', '小四', '小五', '小六', '中一', '中二', '中三', '中四', '中五', '中六'];
    var tutorEducationLevel = ['文憑', '高級文憑', '學士', '碩士', '博士'];
    var area = ['中西區', '灣仔區', '東區', '南區', '油尖旺區', '深水埗區', '九龍城區', '黃大仙區', '觀塘區', '葵青區', '荃灣區', '屯門區', '元朗區', '北區', '大埔區', '沙田區', '西貢區', '離島區'];
    var gender = ['男', '女', '隨意'];
    var university = ['香港中文大學', '香港科技大學', '香港大學'];
    var universitySubject = ['醫學學系', '牙醫學學系', '生物科學學系', '物理科學學系', '數學科學學系', '電腦科學及資訊科學系技', '工程及科技學系', '建築學及城市規劃學系', '工商管理學系', '社會科學學系', '法律學系', '大眾傳播及文件管理學系', '語言及相關科目學系', '人文學科學系', '藝術、設計及演藝學系', '教育學系'];
    var universityStudyLevel = ['就讀一年級', '就讀二年級', '就讀三年級', '就讀四年級', '一級榮譽畢業', '二級榮譽畢業', '三級榮譽畢業', '畢業'];
    var subject = ['音樂類別', '運動類別', '藝術教育', '舞蹈類別', '其它語言', '主要語言', '小學教育', '初中教育', '高中教育'];
    var englishGender = ['Male', 'Female'];
    var nationality = ['Chinese', 'English', 'American'];
    var occupation = ['現職教師', '兼職教師', '其他'];
    var teachingLanguage = ['廣東話', '英語', '普通話'];

    $scope.initializeHomeData = function () {
        $scope.jobDetailsInstances = new Array();
        $scope.tutorDetailsInstances = new Array();

        for (var i = 0; i < 20; i++) {
            var jobDetails = {
                jobId: Math.floor((Math.random() * 9999) + 1000),
                servicePackage: servicePackage[Math.floor((Math.random() * 2))],
                subject: subject[Math.floor((Math.random() * 9))],
                area: area[Math.floor((Math.random() * 18))],
                duration: 10 * Math.floor((Math.random() * 3)) + 60,
                weekCount: Math.floor((Math.random() * 4)) + 1,
                studentGender: gender[Math.floor((Math.random() * 2))],
                studentEducationLevel: studentEducationLevel[Math.floor((Math.random() * 12))],
                studentCount: 1,
                requiredEducationLevel: tutorEducationLevel[Math.floor((Math.random() * 5))],
                requiredGender: gender[Math.floor((Math.random() * 3))],
                budget: 10 * Math.floor((Math.random() * 4)) + 100,
                remainingTime: '0,0,' + Math.floor((Math.random() * 30)) + ',' + Math.floor((Math.random() * 24)) + ',' + Math.floor((Math.random() * 60)) + ',' + Math.floor((Math.random() * 60))
            };
            $scope.jobDetailsInstances.push(jobDetails);
        }

        for (var i = 0; i < 20; i++) {
            var tutorDetails = {
                tutorId: Math.floor((Math.random() * 9999) + 1000),
                age: Math.floor((Math.random() * 10) + 18),
                gender: englishGender[Math.floor((Math.random() * 2))],
                nationality: nationality[Math.floor((Math.random() * 3))],
                occupation: occupation[Math.floor((Math.random() * 3))],
                teachingLanguage: teachingLanguage[Math.floor((Math.random() * 3))],
                areas: new Array(),
                teachingSubjects: new Array(),
                universitySubject: new Array()
            };
            for (var b = 0; b <= Math.floor((Math.random() * 2) + 5) ; b++) {
                var selectedArea = area[Math.floor((Math.random() * 18))];
                if (tutorDetails.areas.indexOf(selectedArea) == -1)
                    tutorDetails.areas.push(selectedArea);
            }
            for (var c = 0; c <= Math.floor((Math.random() * 2) + 3) ; c++) {
                var selectedTeachingSubject = { name: subject[Math.floor((Math.random() * 9))], experience: Math.floor((Math.random() * 10)) };
                if (tutorDetails.teachingSubjects.indexOf(selectedTeachingSubject) == -1)
                    tutorDetails.teachingSubjects.push(selectedTeachingSubject);
            }
            for (var d = 0; d <= Math.floor((Math.random() * 2) + 2) ; d++) {
                var selectedUniversitySubject = { university: university[Math.floor((Math.random() * 3))], subject: universitySubject[Math.floor((Math.random() * 16))], level: universityStudyLevel[Math.floor((Math.random() * 8))] };
                tutorDetails.universitySubject.push(selectedUniversitySubject);
            }
            $scope.tutorDetailsInstances.push(tutorDetails);
        }
    };

    $scope.initializeCompoinentData = function () {
        $scope.introductionCollection = [
            { header: '什麼是 QTagPass？', content: 'QTagPass 是基於 SIM 卡上的一個功能強大的身份驗證軟件，來保護您的帳戶。使用 QTagPass 前，請使用流動電訊商網絡。', isOpen: false },
            { header: '它是如何運作？', content: '- 香港流動電訊商', isOpen: false },
            { header: '流動電訊商支援名單', content: '', isOpen: false },
            { header: '聯絡我們', content: '香港新界，沙田香港科學園，科技大道西 5 號企業廣場 3 樓 311-313 室', isOpen: false }
        ];
    };

    $scope.showJobDetails = function (jobKey) {
        $ionicModal.fromTemplateUrl('templates/modals/job-details.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.selectedJobDetails = $scope.jobDetailsInstances[jobKey];
            modal.show();
            $scope.closeModal = function () {
                modal.remove();
            };
        });
    };

    $scope.showTutorDetails = function (tutorKey) {
        $ionicModal.fromTemplateUrl('templates/modals/tutor-details.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.selectedTutorDetails = $scope.tutorDetailsInstances[tutorKey];
            modal.show();
            $scope.closeModal = function () {
                modal.remove();
            };
        });
    };

    $scope.onPhotoChange = function (URI) {
        console.log('Callback:' + URI);
    };
});
trControllers.controller('LoginCtrl', function ($scope) {

});
trControllers.controller('RegisterCtrl', function ($scope) {

});
