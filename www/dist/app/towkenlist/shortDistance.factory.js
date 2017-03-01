
(function() {
    'use strict';
    ShortDistance.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
            .factory('ShortDistance', ShortDistance);

    function ShortDistance($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/list/sortedbyDistance/:lan/:lat?access_token=:UserToken', {'lat':'@lat', 'lng':'@lng', 'UserToken':'@UserToken'}, {});
    }
    ;
})();


