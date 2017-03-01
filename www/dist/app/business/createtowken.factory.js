(function () {
    'use strict';
    CreateTowken.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
        .factory('CreateTowken', CreateTowken);

    function CreateTowken($resource, Configurations, localStorageService) {
        return $resource(Configurations.Hostserver + 'towken/create?access_token=:UserToken', { 'UserToken': '@UserToken' }, {});
    };
})();