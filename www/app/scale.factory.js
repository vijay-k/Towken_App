(function () {
    'use strict';

    angular.module('scale').factory('popupFactory', ['$q', '$ionicPopup', function ($q, $ionicPopup) {

        var service = {};

        service.generatePopup = function (templateUrl, title, scope, props) {

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
                        var controller = scope[props.controllerName];
                        if (controller.hasOwnProperty(props.selectedPropertyName)) {
                            return controller.selectedPropertyName = controller[props.selectedPropertyName];
                            //return controller.selectedPropertyName = controller.selectedPropertyName;
                        }
                    }
                }]
            });

            popup.then(function (res) { defer.resolve(res); });

            return defer.promise;
        }

        return service;

    }]);

    angular.module('scale').factory('apiHelper', ['$http', 'Configurations', function ($http, Configurations) {

        var apiFactory = {};

        //Get function
        //@param1: url
        apiFactory.Get = function (uri) {
            return $http.get(Configurations.Hostserver + uri);
        };

        //Post function
        //@param1: url , @param2: data
        apiFactory.Post = function (uri, data) {
            return $http.post(Configurations.Hostserver + uri, data);
        }

        // //Delete function
        // //@param1: url , @param2: success function, @param3: error function
        // apiFactory.Delete = function (uri, successFunc, errorFunc) {

        //     $http.delete(Radar.rootPath + uri).
        //         success(function (result, status, headers, config) {
        //             if (typeof successFunc == 'function' && status == 200) {
        //                 successFunc(result, status);
        //             }
        //         }).
        //         error(function (result, status, headers, config) {
        //             if (typeof errorFunc == 'function') {
        //                 errorFunc(result, status);
        //             }
        //         });
        // }

        // apiFactory.DeleteViaPost = function (uri, data, successFunc, errorFunc) {

        //     $http({ method: 'DELETE', url: Radar.rootPath + uri, headers: { 'Content-Type': 'application/json' }, data: data }).
        //         success(function (result, status, headers, config) {
        //             if (typeof successFunc == 'function' && status == 200) {
        //                 successFunc(result, status);
        //             }
        //         }).
        //         error(function (result, status, headers, config) {
        //             if (typeof errorFunc == 'function') {
        //                 errorFunc(result, status);
        //             }
        //         });
        // }

        return apiFactory;
    }]);

})();