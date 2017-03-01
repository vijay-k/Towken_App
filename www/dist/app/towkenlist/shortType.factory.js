
(function() {
    'use strict';
    ShortType.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
            .factory('ShortType', ShortType);

    function ShortType($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/list/:type/:lan/:lat?access_token=:UserToken', {'lat':'@lat', 'lng':'@lng', 'UserToken':'@UserToken', 'type':'@type'}, {});
    }
    ;
})();


