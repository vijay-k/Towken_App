(function() {
    'use strict';
    loginFactory.$inject = ['$resource', 'Configurations'];
    angular.module('scale')
            .factory('loginFactory', loginFactory);

    function loginFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'customer/login', {}, {});
    }
    ;
})();