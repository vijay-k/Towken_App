(function() {
    'use strict';
    changeProfilePasswordFactory.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
            .factory('changeProfilePasswordFactory', changeProfilePasswordFactory);

    function changeProfilePasswordFactory($resource, Configurations, localStorageService) {
        // return $resource(Configurations.Hostserver + 'customer/password?access_token='+localStorageService.get("UserToken"), {}, {});
        return $resource(Configurations.Hostserver + 'customer/password?access_token=:UserToken', {'UserToken':'@UserToken'}, {});

    }
    ;
})();