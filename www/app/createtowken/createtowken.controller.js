(function () {
    'use strict';

    angular.module('scale')
        .controller('CreateTowkenController', CreateTowkenController);

    CreateTowkenController.$inject = ['$state', '$stateParams', '$q',
        'UpdateTowken',
        'ApiError',
        '$ionicPopup',
        'tostService',
        'CreateTowken',
        'GetLatLng',
        'GeoCoderFactory',
        '$window',
        'geoService',
        '$scope',
        '$ionicLoading', '$ionicModal', '$ionicPopover',
        'localStorageService', 'customersService', 'Configurations', 'apiHelper', 'popupFactory'];

    function CreateTowkenController($state, $stateParams, $q, UpdateTowken, ApiError,
        $ionicPopup, tostService, CreateTowken, GetLatLng, GeoCoderFactory, $window, geoService,
        $scope, $ionicLoading, $ionicModal, $ionicPopover,
        localStorageService, customersService, Configurations, apiHelper, popupFactory) {

        var self = this;
        self.laterselected = false;
        self.duration = '1 Minutes';
        self.distance = '5 Miles';

        self.cost = '$5.00 dollars';
        self.typedDiscountCouponCode = null;
        self.currencySymbol = null;

        self.typeofDiscount = 10;

        $scope.selectedValue = null;

        var singleTowkenPriceDetails = null;
        var isTowkenQuantityApplied = false;

        var query1;
        var latitude;
        var longitude;

        self.typedDiscountCouponCode = null;
        self.isDiscountCodeValidAndApplied = false;
        self.costToDisplay = null;
        var discountCodeDetails = null;

        self.towkenQuantities = [
            {
                'id': 1,
                'quantity': 100,
                'isSelected': false
            },
            {
                'id': 2,
                'quantity': 500,
                'isSelected': false
            },
            {
                'id': 3,
                'quantity': 1000,
                'isSelected': true
            }];

        self.selectedTowkenQuantity = self.towkenQuantities[self.towkenQuantities.length - 1];

        self.handleTowkenQuantityChange = function (position, selectedQuantity) {

            //find if there is any checkbox that is selcted in the list            
            //keep atleast one checkbox checked
            if (_.find(self.towkenQuantities, { isSelected: true }) === undefined) {
                selectedQuantity.isSelected = true; return;
            }

            angular.forEach(self.towkenQuantities, function (subscription, index) {
                if (position != index) {
                    subscription.isSelected = false;
                }
                self.selectedTowkenQuantity = angular.copy(selectedQuantity);
            });
        }

        //Get the single towken cost from backend        
        function getSingleTowkenCost() {
            apiHelper.Get('towken/towkencost').then(function (response) {
                if (response.data.succeeded) {
                    singleTowkenPriceDetails = response.data.data[0];
                    self.singleTowkenCost = singleTowkenPriceDetails.price;
                    self.currencySymbol = singleTowkenPriceDetails.currencySymbol;
                    self.costToDisplay = self.currencySymbol + singleTowkenPriceDetails.price.toFixed(2);
                }
                else {
                    self.singleTowkenCost = null;
                    self.costToDisplay = null;
                    singleTowkenPriceDetails = null;
                    self.currencySymbol = '$'; //fallback currency symbol
                }
            })
        }

        self.showDiscountCodePopup = function () {

            self.typedDiscountCouponCode = null;

            $ionicPopup.show({
                template: `
                <md-input-container class="col font100">                     
                        <input type="text" class="text-uppercase text-center discount-code-input letter-spacing-5" autofocus mdInput placeholder="Enter discount code"
                         ng-model="create.typedDiscountCouponCode" />
                </md-input-container>`,
                title: 'Discount Code',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<span class="color">Apply</span>',
                        onTap: function (e) {
                            if (!self.typedDiscountCouponCode) {
                                e.preventDefault();
                            } else {
                                self.validateDicsountCodeFromServer(self.typedDiscountCouponCode);

                            }
                        }
                    }
                ]
            });
        };

        //validate dicsount code from server
        self.validateDicsountCodeFromServer = function (discountCode) {

            $ionicLoading.show();

            apiHelper.Get('stripe/coupons/retrieve/' + discountCode).then(function (response) {

                if (response.data.succeeded) {

                    self.isDiscountCodeValidAndApplied = true;

                    discountCodeDetails = response.data.data.coupon;

                    var percentOff = discountCodeDetails.percent_off;

                    //If percentOff is 100 then always show 0.00 regardless of the towkenPrice
                    if (percentOff === 100) {
                        self.costToDisplay = self.currencySymbol + 0.00.toFixed(2);
                    }
                    //handle other cases where percent off is < 100
                    else {

                        var totalTowkenCost = singleTowkenPriceDetails.price;

                        self.calculatedCost = (totalTowkenCost * percentOff) / 100;

                        self.costToDisplay = self.currencySymbol + self.calculatedCost.toFixed(2);
                    }



                    // //This will be cost when user updates the towken quantity                        
                    // if (self.towkenTotalCost) {
                    //     self.calculatedCost = (self.towkenTotalCost * percentOff) / 100;
                    //     self.costToDisplay = self.currencySymbol + self.calculatedCost.toFixed(2);
                    // }
                    // //else apply single towken cost
                    // else {
                    //     self.calculatedCost = (singleTowkenPriceDetails.price * percentOff) / 100;
                    // }

                    // //means 100% off                        
                    // if (self.calculatedCost - singleTowkenPriceDetails.price === 0) {
                    //     self.costToDisplay = self.currencySymbol + 0.00.toFixed(2);
                    // }
                    // //if there was a quantity applied then check the total calculated cost and also the percent waived off
                    // else if (self.calculatedCost - self.towkenTotalCost === 0 && self.towkenTotalCost) {
                    //     self.costToDisplay = self.currencySymbol + 0.00.toFixed(2);
                    // }
                    // else {
                    //     self.costToDisplay = self.currencySymbol + self.calculatedCost.toFixed(2);
                    // }

                    self.discountCouponCode = self.typedDiscountCouponCode.toUpperCase();

                    self.discountCodeInvalidMessage = '';

                    $ionicPopup.alert({
                        title: 'Success',
                        template: 'Discount code applied successfully!',
                        buttons: [{
                            text: '<span class="color">Ok</span>'
                        }]
                    });
                }
                else if (response.data.message) {

                    self.costToDisplay = singleTowkenPriceDetails.currencySymbol + self.singleTowkenCost.toFixed(2);

                    self.isDiscountCodeValidAndApplied = false;

                    self.discountCouponCode = null;

                    self.discountCodeInvalidMessage = response.data.message.message;
                }

                $ionicLoading.hide();
            });
        }

        //to create a towken        
        self.create = function () {

            //need business name            
            //this was filled on signup
            self.businessname = localStorageService.get('UserToken').name;

            //type of business filled on signup page            
            self.typeOftowken = localStorageService.get('UserToken').businessType;

            if (angular.isDefined(self.typeofDiscount) && angular.isDefined(self.details)) {

                $ionicLoading.show();

                var time_remaining;

                var spaceInDuration = _.findIndex(self.duration, function (o) {
                    return o == ' ';
                });

                var spaceInDistance = _.findIndex(self.distance, function (o) {
                    return o == ' ';
                });

                var Distance = self.distance.substring(0, spaceInDistance);

                var Discount = self.typeofDiscount; //.substring(0, self.typeofDiscount.length - 1);

                if (!self.DurationUpdate) {
                    var TimeUnit = self.duration.substring(spaceInDuration + 1, self.duration.length - 1);
                    if (TimeUnit == 'Da') {
                        TimeUnit = 'Day';
                    }
                    time_remaining = moment().add(self.duration.substring(0, spaceInDuration), TimeUnit).unix();
                } else {
                    time_remaining = $stateParams.time_remaining;
                }
                if (localStorageService.get('UserToken').location.length == 0) {
                    geoService.nearBy().then(function (position) {
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude
                        fireCreateApi(time_remaining, Distance, Discount);
                    });
                } else {
                    latitude = localStorageService.get('UserToken').location[1];
                    longitude = localStorageService.get('UserToken').location[0];
                    fireCreateApi(time_remaining, Distance, Discount);
                }


            } else {
                if (self.businessname && self.businessname.length > 30) {
                    tostService.notify('Business name should not be greater then 30 charcter', 'top');
                } else {
                    tostService.notify('Please fill all details ', 'top');
                }
            }
        }


        function fireCreateApi(time_remaining, Distance, Discount) {
            if (self.SubmitButton == "CREATE") {
                query1 = CreateTowken.save({
                    UserToken: localStorageService.get("UserToken").token,
                    start_time: moment().unix(),
                    business_name: self.businessname,
                    time_remaining: time_remaining,
                    mile: Distance,
                    discount: Discount,
                    latitude: latitude,
                    longitude: longitude,
                    towken_details: self.details,
                    type_of_towken: self.typeOftowken,
                    towken_quantity: self.quantity
                });
            } else {
                query1 = UpdateTowken.save({
                    UserToken: localStorageService.get("UserToken").token,
                    towken_id: $stateParams.id,
                    business_name: self.businessname,
                    time_remaining: time_remaining,
                    mile: Distance,
                    discount: Discount,
                    latitude: latitude,
                    longitude: longitude,
                    towken_details: self.details,
                    type_of_towken: self.typeOftowken,
                    towken_quantity: self.quantity
                });

            }

            query1.$promise.then(function (data) {
                if (data.status == 1) {
                    if (self.SubmitButton == "CREATE") {
                        $ionicLoading.hide();
                        $state.go('app.thankyou', {
                            "text": 'Your Towken successfully added',
                            'type': '',
                            'lat': latitude,
                            'lng': longitude,
                            'discount': Discount,
                            'time': time_remaining,
                            'des': self.details
                        });
                    } else {
                        $state.go('app.mytowkens');
                    }

                } else {
                    tostService.notify('Invalid input please try again ', 'top');
                }

            }).catch(function (err) {
                $ionicLoading.hide();
                ApiError.Alert();
            });
        }

        self.cancel = function () {
            if (self.SubmitButton == 'CREATE')
                $state.go('app.business');
            else
                $state.go('app.mytowkens');
        }

        $scope.created = {
            model: ''
        }

        self.distancePopup = function () {
            generatePopup("distancedropdown.html", "Distance").then(function (res) {
                self.distance = res;
                if (!self.distance) {
                    self.distance = '5 Miles';
                }
            });
        };

        self.durationPopup = function () {
            generatePopup("durationdropdown.html", "Duration").then(function (res) {
                self.duration = res;
                self.DurationUpdate = null;
                if (!self.duration) {
                    if ($stateParams.business_name) {
                        self.duration = ($stateParams.duration - moment().unix());
                        self.DurationUpdate = true;
                    } else {
                        self.duration = '1 Minutes';
                        self.DurationUpdate = false;
                    }
                }
            });
        }

        self.discountPopup = function () {
            generatePopup("discountdropdown.html", "Discount").then(function (res) {
                self.discount = res;
            });
        }

        self.typePopup = function () {
            generatePopup("typedropdown.html", "Type").then(function (res) {
                self.type = res;
            });
        }

        //display quantity popup       
        self.quantityPopup = function () {

            var properties = {
                'selectedPropertyName': 'selectedTowkenQuantity',
                'controllerName': 'create'
            }

            popupFactory.generatePopup('app/createtowken/template/quantitydropdown.html', 'Quantity', $scope, properties).then(function (result) {
                self.quantity = result.quantity;
                self.selectedTowkenQuantity = result;
            });


            // generatePopup("quantitydropdown.html", "Quantity").then(function (res) {

            //     debugger;

            //     self.quantity = res;
            //     //Uncomment this part to change the Towken price on quantity change

            //     // if (self.quantity) {

            //     //     isTowkenQuantityApplied = true;

            //     //     //if there is dicosunt coupon already applied and it is valid
            //     //     //apply the discounted price
            //     //     if (self.isDiscountCodeValidAndApplied) {

            //     //         var totalTowkenCost = +self.quantity * singleTowkenPriceDetails.price;

            //     //         //if applied discount code if 100%                        
            //     //         if (discountCodeDetails.percent_off === 100 && discountCodeDetails) {
            //     //             self.costToDisplay = self.currencySymbol + 0.00.toFixed(2);
            //     //         }
            //     //         else {
            //     //             self.calculatedCost = (totalTowkenCost * discountCodeDetails.percent_off) / 100;
            //     //             self.costToDisplay = self.currencySymbol + self.calculatedCost.toFixed(2);
            //     //         }
            //     //     }
            //     //     //else display the singleTowkenCost * quantity
            //     //     else {
            //     //         self.towkenTotalCost = singleTowkenPriceDetails.price * (+self.quantity);
            //     //         self.costToDisplay = self.currencySymbol + self.towkenTotalCost.toFixed(2);
            //     //     }
            //     // } else {
            //     //     isTowkenQuantityApplied = false;
            //     // }
            // });
        }

        function generatePopup(htmlFile, title) {
            $scope.created = {
                model: '',
                first: true
            }
            var defer = $q.defer();
            var myPopup = $ionicPopup.show({
                templateUrl: 'app/createtowken/template/' + htmlFile,
                title: title,
                scope: $scope,
                buttons: [{
                    text: 'CANCEL',
                }, {
                    text: '<span class="color">DONE</span>',
                    type: 'button-default',
                    onTap: function (e) {
                        if (!$scope.created.model) {
                            e.preventDefault();
                        } else {
                            return $scope.created.model;
                        }
                    }
                }]
            });
            myPopup.then(function (res) {
                defer.resolve(res);

            });
            return defer.promise;
        }


        //if request was an update request        
        if ($stateParams.business_name) {
            self.businessname = $stateParams.business_name;
            self.duration = ($stateParams.duration - moment().unix());
            self.distance = $stateParams.distance + " Miles";
            self.discount = $stateParams.discount;
            self.quantity = $stateParams.quantity;
            self.type = $stateParams.type;
            self.details = $stateParams.details;
            self.SubmitButton = "UPDATE";
            self.DurationUpdate = true;
        } else {
            self.SubmitButton = "CREATE";
        }

        getSingleTowkenCost();
    }
})();