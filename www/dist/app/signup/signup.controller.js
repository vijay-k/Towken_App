(function () {
    'use strict';

    angular.module('scale')
        .controller('signupController', signupController);

    signupController.$inject = [
        '$state',
        'tostService',
        'googleLogin',
        '$stateParams',
        'facebookLogin',
        'signupApi',
        '$ionicLoading',
        'localStorageService',
        '$ionicHistory',
        'stripeApi',
        'popupFactory',
        '$scope'
    ];

    function signupController($state, tostService, googleLogin, $stateParams, facebookLogin, signupApi,
        $ionicLoading, localStorageService, $ionicHistory, stripeApi, popupFactory, $scope) {

        var self = this;

        self.signupTypes = ['user', 'business'];

        self.businessTypes = [
            { title: "Automotive", checked: false },
            { title: "Beauty & Spas", checked: false },
            { title: "Entertainment", checked: false },
            { title: "Fitness", checked: false },
            { title: "Food & Drink", checked: false },
            { title: "Retail", checked: false },
            { title: "Other", checked: false }];

        self.businessType = 'Type of Business';
        self.selectedBusinessType = null;

        // create user signup account       
        self.userSignup = function () {
            signupApi.fireApi(
                self.fullname,
                self.email,
                self.password,
                self.userType
            );
        }

        //create business signup account
        self.businessSignup = function (form, formDetails) {

            var businessSignupDetails = {};
            businessSignupDetails.name = form.businessName.$modelValue;
            businessSignupDetails.businessType = self.businessType;
            businessSignupDetails.email = form.email.$modelValue;
            businessSignupDetails.phone = form.businessPhone.$modelValue;
            businessSignupDetails.address = form.businessAddress.$modelValue;
            businessSignupDetails.city = form.businessCity.$modelValue;
            businessSignupDetails.state = form.businessState.$modelValue;
            businessSignupDetails.zip = form.zip.$modelValue;
            businessSignupDetails.hours = form.hours.$modelValue;
            businessSignupDetails.password = form.password.$modelValue;
            businessSignupDetails.userType = self.userType;

            //if form is valid then continue
            if (form.$valid) {
                signupApi.fireApi(businessSignupDetails);
            }
        }

        self.handleSelectedBusinessType = function (position, selectedType) {
            angular.forEach(self.businessTypes, function (subscription, index) {
                if (position != index) {
                    subscription.checked = false;
                }
                self.selectedBusinessType = angular.copy(selectedType);
            });
        }

        self.userType = $stateParams.type;

        if (self.userType == 'User') {
            self.user = true;
            self.userType == 'User'
        } else {
            self.business = true;
            self.userType == 'Business'
        }



        self.businessName = "New Business";
        self.businessEmail = 'self@gmail.com';
        self.businessPhone = '8968313436';
        self.businessAddress = '#221 North Street, Allentown, Pennsylvinia';
        self.businessCity = 'North Dakota';
        self.businessState = 'AL';
        self.businessZip = '35004';
        self.businessHours = '00-12';
        self.password = '123456';
        self.password = '123456';
        self.reconfirmPassword = '123456';

        self.previousSelectedBusinessType = null;

        //create business type popup
        self.createBusinessTypePopup = function () {

            //to check the previous selected type in the popup if user presses the cancel button            
            if (self.previousSelectedBusinessType) {
                angular.forEach(self.businessTypes, function (type, index) {
                    type.checked = false;
                    if (type.title.toLowerCase() === self.previousSelectedBusinessType.title.toLowerCase()) {
                        type.checked = true;
                    }
                });
            }

            popupFactory.generatePopup('app/signup/partials/businessTypePopupTemplate.html', 'Business Type', $scope)
                .then(function (selectedBusinessType) {

                    var elem = document.getElementsByClassName('selectbox')[0];

                    if (self.selectedBusinessType !== null && typeof (selectedBusinessType) !== 'undefined') {
                        self.previousSelectedBusinessType = self.selectedBusinessType;
                        self.businessType = self.selectedBusinessType.title;
                        elem.style.borderColor = '#bfbfbf';
                    }
                    else if (typeof (selectedBusinessType) === 'undefined' && self.previousSelectedBusinessType) {
                        self.businessType = self.previousSelectedBusinessType.title;
                        elem.style.borderColor = '#bfbfbf';
                    }
                    else if (typeof (selectedBusinessType) === 'undefined') {
                        elem.style.borderColor = 'rgb(221,44,0)';
                        self.businessType = null;
                    }

                    else if (self.selectedBusinessType !== null && typeof (selectedBusinessType) === 'undefined') {
                        self.businessType = self.selectedBusinessType.title;
                        elem.style.borderColor = '#bfbfbf';
                    }
                });
        }

        //to change the signup type        
        self.changeSignupType = function (type) {
            if (type.toLowerCase() === 'user') {
                self.userType = "User";
            }
            else {
                self.userType = "Business";
            }

            $state.go('signup', { "type": self.userType });
        }

        self.GoGoogle = function () {
            googleLogin.startLogin().then(function (response) {
                signupApi.fireApi(
                    response.name.substring(0, response.name.indexOf(' ')),
                    response.email,
                    "", //password field is blank for gmail id
                    self.userType,
                    "", //fb id blank for for gmail id 
                    response.google_id,
                    response.picture
                );
            });
        }
        self.GoFb = function () {
            facebookLogin.login().then(function (fbData) {
                var response;
                if (fbData.id) {
                    self.FbLogin(fbData);
                }
                if (fbData == 'unknown') {
                    facebookLogin.fbLoginSuccess().then(function (fbData1) {
                        self.FbLogin(fbData1);
                    }, function (data) {
                        console.log(data);
                    });
                }
            }, function (data) {
                console.log(data);
            });
        };

        self.FbLogin = function (response) {
            var picture = 'http://graph.facebook.com/' + response.id + '/picture?type=large';
            signupApi.fireApi(
                response.name.substring(0, response.name.indexOf(' ')),
                response.email,
                "", //password field is blank for fb id
                self.userType,
                response.id,
                "", // gmail id field blank for fb id
                picture
            );
        }

        self.goBack = function () {

            //always transition to user login page            
            $state.go('login');

            // if ($stateParams.type === undefined) {
            //     $state.go('login');
            // }
            // else {
            //     $ionicHistory.goBack();
            // }
        }
    }
})();