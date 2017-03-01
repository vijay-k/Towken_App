(function() {
    'use strict';
    forgotPassword.$inject = ['$resource', 'Configurations'];
    angular.module('scale')
            .factory('forgotPassword', forgotPassword);

    function forgotPassword($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'customer/forgot_password', {}, {});
    }
    ;
})();