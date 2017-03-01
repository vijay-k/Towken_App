
(function() {
    'use strict';
    ShortDiscount.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
            .factory('ShortDiscount', ShortDiscount);

    function ShortDiscount($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/list/sortedbyDiscount/:lan/:lat?access_token=:UserToken', {'lat':'@lat', 'lng':'@lng', 'UserToken':'@UserToken'}, {});
    }
    ;
})();


