(function() {
    'use strict';

        TotalCheckins.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
        .factory('TotalCheckins', TotalCheckins);
        function TotalCheckins($resource, Configurations, localStorageService){
             return $resource(Configurations.Hostserver + 'customer/getTotalCheckIn?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
        }

})();        
