(function () {
    'use strict';
    angular.module('scale')
        .factory('stripeApi', stripeApi);

    stripeApi.$inject = ['$ionicLoading', '$http', 'Configurations'];

    function stripeApi($ionicLoading, $http, Configurations) {

        var service = {};

        //Use to creat customer on stripe using email
        service.createCustomer = function (email) {
            var url = Configurations.Hostserver + 'stripe/customer/create';
            return $http.post(url, { email: email });
        }

        return service;
    }
})();