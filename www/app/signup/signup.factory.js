(function () {
    'use strict';
    angular.module('scale')
        .factory('signupFactory', signupFactory);

    function signupFactory($resource, Configurations) {

        var service = {};

        // to regsiter simple user        
        service.registerUser = function () {
            return $resource(Configurations.Hostserver + 'customer/register', {}, {});
        }

        // to regsiter business user
        service.registerBusinessUser = function () {
            return $resource(Configurations.Hostserver + 'customer/signup/business', {}, {});
        }

        return service;
    };
})();