(function () {
    'use strict';

    angular.module('scale').directive('matchPassword', function () {

        var controllers = ['^ngModel', '^form'];

        return {
            scope: false,
            restrict: 'A',
            require: controllers,
            link: function (scope, elem, attrs, ctrls) {

                var formController = ctrls[1];
                var ngModel = ctrls[0];
                var otherPasswordModel = formController[attrs.matchPassword];

                var getMatchValue = function () {
                    return otherPasswordModel.$viewValue;
                };

                scope.$watch(getMatchValue, function () {
                    ngModel.$$parseAndValidate();
                });

                if (ngModel.$validators) {
                    ngModel.$validators.passwordMatch = function (modelValue) {
                        return (!modelValue && !otherPasswordModel.$modelValue) || (modelValue === otherPasswordModel.$modelValue);
                    };
                } else {
                    ngModel.$parsers.push(function (value) {
                        ngModel.$setValidity('passwordMatch', (!value && !otherPasswordModel.$viewValue) || value === otherPasswordModel.$viewValue);
                        return value;
                    });
                }

                otherPasswordModel.$parsers.push(function (value) {
                    ngModel.$setValidity('passwordMatch', (!value && !ngModel.$viewValue) || value === ngModel.$viewValue);
                    return value;
                });
            }
        }
    });

})();