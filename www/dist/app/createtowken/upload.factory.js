(function() {
    'use strict';
    upload.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
            .factory('upload', upload);

    function upload($resource, Configurations, localStorageService) {
        //return $resource(Configurations.Hostserver + 'towken/list/:lat/:lng?access_token='+localStorageService.get("UserToken"), {'lat':'@lat', 'lng':'@lng'}, {});
        return $resource(Configurations.Hostserver + 'towken/upload', {}, {});
    }
    ;
})();