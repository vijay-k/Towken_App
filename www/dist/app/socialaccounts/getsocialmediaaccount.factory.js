(function() {
    'use strict';
    getSocialMediaAccount.$inject = ['$resource', 'Configurations'];
    angular.module('scale')
            .factory('getSocialMediaAccount', getSocialMediaAccount);

    function getSocialMediaAccount($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'customer/getSocialMediaAccount?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();