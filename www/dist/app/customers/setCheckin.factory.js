(function() {
    'use strict';
    SetChekinFactory.$inject = ['$resource', 'Configurations'];
    angular.module('scale')
            .factory('SetChekinFactory', SetChekinFactory);

    function SetChekinFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + 'customer/setCheckIn?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();