(function() {
    'use strict';
    BusinessLocation.$inject = ['$resource', 'Configurations'];
    angular.module('scale')
            .factory('BusinessLocation', BusinessLocation);

    function BusinessLocation($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'customer/location/business?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();