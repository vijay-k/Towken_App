(function() {
    'use strict';
    updateProfileFactory.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
            .factory('updateProfileFactory', updateProfileFactory);

    function updateProfileFactory($resource, Configurations, localStorageService) {
        // return $resource(Configurations.Hostserver + 'customer/profile?access_token='+localStorageService.get("UserToken"), {}, {});
         return $resource(Configurations.Hostserver + 'customer/profile?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();