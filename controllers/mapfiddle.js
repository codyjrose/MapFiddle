var mfApp = angular.module('mfApp', ['ui.bootstrap']);

mfApp.controller('mfController', function($scope, mapOutputService) {
    var mapType = {
        Leaflet: "leaflet",
        Google: "google"
    }

    $scope.map = null;
    $scope.mapType = mapType.Leaflet;
    $scope.options = mapOutputService.getOptions($scope.mapType);

    $scope.initMap = function() {
        var mapOptions = {};
        angular.forEach($scope.options, function(value, key) {
            if (value.type == "number") {
                mapOptions[key] = parseInt(value.value);
            } else {
                mapOptions[key] = value.value;
            }
        });

        $scope.map = $scope.mapType == mapType.Leaflet ?
            L.map('map-canvas', mapOptions) :
            new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

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

        if ($scope.mapType == mapType.Leaflet) {
            // Write method to update leaflet options.
        } else {
            google.maps.event.addListener($scope.map, 'idle', function() {
                $scope.updateOptions();
            });
        }
    });
});


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