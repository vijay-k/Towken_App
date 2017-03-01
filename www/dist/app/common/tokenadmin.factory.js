(function() {
    'use strict';
    tokenAdminFactory.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
            .factory('tokenAdminFactory', tokenAdminFactory);

    function tokenAdminFactory($resource, Configurations, localStorageService) {
       // return $resource(Configurations.Hostserver + 'towken/business/list?access_token=' + localStorageService.get("UserToken"), {}, {});
         return $resource(Configurations.Hostserver + 'towken/business/list?access_token=:UserToken' , {'UserToken':'@UserToken'}, {});
    }
    ;
})();