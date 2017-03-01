(function() {
    'use strict';
    getRating.$inject = ['$resource', 'Configurations'];
    angular.module('scale')
            .factory('getRating', getRating);

    function getRating($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'towken/getRating?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();