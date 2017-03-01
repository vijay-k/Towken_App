(function() {
    'use strict';
    staticTowkenApi.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
            .factory('staticTowkenApi', staticTowkenApi);

    function staticTowkenApi($resource, Configurations, localStorageService) {
        return $resource(Configurations.StaticServer + 'towkens.json', {}, {});
    }
    ;
})();