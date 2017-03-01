(function() {
    'use strict';
    GetLatLng.$inject = ['$resource', 'Configurations'];
    angular.module('scale')
            .factory('GetLatLng', GetLatLng);

    function GetLatLng($resource, Configurations) {
        return $resource(Configurations.GeoCoder + 'address=:address&key='+ Configurations.googleApiKey, {}, {});

    }
    ;
})();