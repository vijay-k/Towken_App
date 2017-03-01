(function() {
    'use strict';

angular.module('scale')

.config(['$ionicConfigProvider', '$httpProvider', function($ionicConfigProvider,  $httpProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false).text(' ');
    $ionicConfigProvider.views.transition('none');
    $httpProvider.interceptors.push('timeoutHttpIntercept');
    $ionicConfigProvider.views.swipeBackEnabled(false);
}]);

})();

