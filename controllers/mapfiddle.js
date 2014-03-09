var mfApp = angular.module('mfApp', ['ui.bootstrap']);

mfApp.controller('mfController', function($scope, mapOutputService, mapDisplayService) {

    // Wrapping map divs with ng-controller seems to bonk the map update. Need to figure out how to show and hide map.
//    $scope.showGoogleMap = true;
//    $scope.showLeafletMap = false;

    var mapTypes = mapDisplayService.getMapType();
    $scope.mapType = mapDisplayService.getDefaultMapType();

    $scope.options = mapOutputService.getOptions($scope.mapType);
    $scope.map = null;

    // Returns an options object for map creation.
    $scope.getOptions = function() {
        var mapOptions = {};
        angular.forEach($scope.options, function(value, key) {
            if (value.type == "number") {
                mapOptions[key] = parseInt(value.value);
            } else {
                mapOptions[key] = value.value;
            }
        });
        return mapOptions;
    }

    // Initialized the map.
    $scope.initMap = function() {
        var mapOptions = $scope.getOptions();

        $scope.map = $scope.mapType == mapTypes.Leaflet ?
            L.map('leaflet-map-canvas', mapOptions) :
            new google.maps.Map(document.getElementById("google-map-canvas"), mapOptions);
    };

    // Updates the options side bar when the map is changed. updateOption's sister function.
    $scope.updateOptions = function() {
        // Map is up to date, sync to map options.
        angular.forEach($scope.options, function (value, key) {
            $scope.options[key].value = $scope.map[key];
//            console.log(key + ": " + $scope.options[key].value);
        });

        // Save Apply
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    };

    // Updates the map when options are changed from the sidebar. updateMap's sister function.
    $scope.updateMap = function() {
        var mapOptions = $scope.getOptions();

        $scope.map.setOptions(mapOptions);
    };


    $scope.mapTypeItems = [
        "Leaflet w/ OSM",
        "Google Maps"
    ];

    $scope.toggleMapType = function() {
        $scope.mapType = mapDisplayService.toggleCurrentMapType();
        $scope.showGoogleMap = $scope.showLeafletMap;
        $scope.showLeafletMap = !$scope.showGoogleMap;

        //$scope.safeApply();
        //location.reload();
    };

    angular.element(document).ready(function () {
        $scope.initMap();

        if ($scope.mapType == mapTypes.Leaflet) {
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