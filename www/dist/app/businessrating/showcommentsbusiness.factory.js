(function() {
    'use strict';
    ShowCommentBusiness.$inject = ['$resource', 'Configurations', 'localStorageService'];
    angular.module('scale')
            .factory('ShowCommentBusiness', ShowCommentBusiness);

    function ShowCommentBusiness($resource, Configurations, localStorageService) {
         return $resource(Configurations.Hostserver + 'towken/business/showComment?access_token=:UserToken', {'UserToken':'@UserToken'}, {});
    }
    ;
})();