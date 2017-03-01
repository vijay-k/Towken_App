(function() {
    'use strict';

        showCustomer.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
        .factory('showCustomer', showCustomer);
        function showCustomer($resource, Configurations, localStorageService){
             return $resource(Configurations.Hostserver + 'towken/showCustomer?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
        }

})();        
