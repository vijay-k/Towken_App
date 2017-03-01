(function() {
    'use strict';
    showComment.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
            .factory('showComment', showComment);

    function showComment($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/showComment?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();