/**
 * Created by Cody on 12/25/13.
 */
var mfApp = angular.module('mfApp', ['ui.bootstrap']);

mfApp.controller('mfController', function($scope, mapOutputService) {
   $scope.map = null;
   $scope.options = mapOutputService.getOptions();

    $scope.initMap = function() {
        var mapOptions = {};
        angular.forEach($scope.options, function(value, key) {
            if (value.type == "number") {
                mapOptions[key] = parseInt(value.value);
            } else {
                mapOptions[key] = value.value;
            }
        });
        $scope.map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
    };

    $scope.updateOptions = function() {
        // Map is up to date, sync to map options.
        angular.forEach($scope.options, function (value, key) {
            $scope.options[key].value = $scope.map[key];
            console.log(key + ": " + $scope.options[key].value);
        });

        // Save Apply
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.updateMap = function() {
        // Options are up to date, sync to map.
        var mapOptions = {};
        angular.forEach($scope.options, function(value, key) {
            if (value.type == "number") {
                mapOptions[key] = parseInt(value.value);
            } else {
                mapOptions[key] = value.value;
            }
        });

        $scope.map.setOptions(mapOptions);
    };

    angular.element(document).ready(function () {
        $scope.initMap();

        google.maps.event.addListener($scope.map, 'idle', function() {
            $scope.updateOptions();
        });
    });
});

// Angular UI modal stuff
mfApp.controller('HtmlOutputController', function($scope, $modal, mapOutputService) {
    $scope.header = "Copy/Pasta this into an HTML file.";

    $scope.open = function () {
        $scope.body = mapOutputService.generateHtml();

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            resolve: {
                innerScope: function () {
                    return $scope;
                }
            }
        });

//        modalInstance.result.then(
//            function () {
//                $log.info("Modal OK'd at: " + new Date());
//            },
//            function () {
//                $log.info('Modal dismissed at: ' + new Date());
//            }
//        );
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
var ModalInstanceCtrl = function ($scope, $modalInstance, innerScope) {
    $scope.header = innerScope.header;
    $scope.body = innerScope.body;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

/*  Directives */
mfApp.directive('optionRange', function() {
    return {
        scope: {
            item: '=optionRange'
        },
        restrict: 'AEC',
        templateUrl: 'templates/option-range.html'
    };
});

mfApp.directive('optionCheckbox', function() {
    return {
        scope: {
            item: '=optionCheckbox'
        },
        restrict: 'AEC',
        templateUrl: 'templates/option-checkbox.html'
    };
});
/* /Directives */