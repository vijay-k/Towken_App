(function () {
    'use strict';

    angular.module('scale')

        .config(function ($ionicConfigProvider, $httpProvider, $mdThemingProvider, $provide) {

            //$ionicConfigProvider.views.forwardCache(true);

            //$ionicConfigProvider.views.maxCache(3);

            // if (!ionic.Platform.isIOS()) {
            //     $ionicConfigProvider.scrolling.jsScrolling(false);
            // }

            // $mdThemingProvider.generateThemesOnDemand(true);

            // $mdThemingProvider
            //     .theme('default')
            //     .primaryPalette('blue')
            //     .accentPalette('teal')
            //     .warnPalette('red')
            //     .backgroundPalette('grey');

            // $mdThemingProvider.alwaysWatchTheme(true);

            // $provide.value('themingProvider', $mdThemingProvider);

            $ionicConfigProvider.backButton.previousTitleText(false).text(' ');

            $ionicConfigProvider.views.transition('none');

            $httpProvider.interceptors.push('timeoutHttpIntercept');

            $ionicConfigProvider.views.swipeBackEnabled(false);
        });

})();

