/**
 * Created by Cody on 12/25/13.
 */
var mfApp = angular.module('mfApp', []);

mfApp.controller('mfController', function($scope, $parse) {
   $scope.map = null;

   $scope.options = {
       zoom: {
           value: 8,
           min: 1,
           max: 21,
           type: "number"
       },
       center: {
           value: new google.maps.LatLng(-34.397, 150.644),
           type: "object"
       },
       panControl: {
           value: true,
           type: "boolean"
       }
   };

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
        //$scope.map.setZoom(parseInt($scope.options.zoom.value));
    };

    angular.element(document).ready(function () {
        $scope.initMap();

        google.maps.event.addListener($scope.map, 'idle', function() {
            $scope.updateOptions();
        });
    });
});

mfApp.directive('optionRange', function() {
   return {
       templateUrl: 'templates/option-range.html'
   };
});

mfApp.directive('optionCheckbox', function() {
    return {
        templateUrl: 'templates/option-checkbox.html'
    };
});