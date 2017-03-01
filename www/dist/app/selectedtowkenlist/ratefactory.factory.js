(function() {
    'use strict';
    RateFactory.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
            .factory('RateFactory', RateFactory);

    function RateFactory($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/rating?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();