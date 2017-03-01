(function() {
    'use strict';
    showRedeemCode.$inject = ['$resource', 'Configurations'];
    angular.module('scale')
            .factory('showRedeemCode', showRedeemCode);

    function showRedeemCode($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'towken/showRedeemCode?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();