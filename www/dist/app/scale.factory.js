(function () {
    'use strict';

    angular.module('scale').factory('popupFactory', ['$q', '$ionicPopup', function ($q, $ionicPopup) {

        var service = {};

        service.generatePopup = function (templateUrl, title, scope) {

            var defer = $q.defer();

            var popup = $ionicPopup.show({
                templateUrl: templateUrl,
                title: title,
                scope: scope,
                buttons: [{
                    text: 'CANCEL',
                }, {
                    text: '<span class="color">DONE</span>',
                    type: 'button-default',
                    onTap: function (e) {
                        if (!scope.signup.selectedBusinessType) {
                            e.preventDefault();
                        } else {
                            return scope.signup.selectedBusinessType;
                        }
                    }
                }]
            });

            popup.then(function (res) {
                defer.resolve(res);
            });

            return defer.promise;
        }

        return service;

    }]);

})();