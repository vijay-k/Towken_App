(function() {
    'use strict';
    GeoCoderFactory.$inject = ['$resource', 'Configurations'];
    angular.module('scale')
            .factory('GeoCoderFactory', GeoCoderFactory);

    function GeoCoderFactory($resource, Configurations) {
        return $resource(Configurations.GeoCoder + 'latlng=:lat,:lng&key='+ Configurations.googleApiKey, {}, {});

    }
    ;
})();