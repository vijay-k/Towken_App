(function() {
    'use strict';
    redeemFactory.$inject = ['$resource', 'Configurations'];
    angular.module('scale')
            .factory('redeemFactory', redeemFactory);

    function redeemFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'towken/redeem?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    };
})();