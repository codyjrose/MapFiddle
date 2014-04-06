var mfApp = angular.module('mfApp', ['ui.bootstrap']);

mfApp.controller('mfController', function($scope, mapOutputService, mapChoiceService, mapOptionsService) {

    $scope.initController = function() {
        $scope.mapTypes = mapChoiceService.getMapTypes();
        $scope.currentMapType = mapChoiceService.getDefaultMapType();

        // Used to build sidebar.
        $scope.options = mapOptionsService.getDefaultMapOptions($scope.currentMapType);

        // Init map object
        $scope.map = null;

        // TODO make toggling work. These are currently unused.
        $scope.showGoogleMap = $scope.currentMapType == $scope.mapTypes.Google;
        $scope.showLeafletMap = $scope.currentMapType == $scope.mapTypes.Leaflet;
    };

    // Initialize the map.
    $scope.initMap = function() {
        var mapOptionsObject = mapOptionsService.getMapOptionsObject();

        $scope.map = $scope.currentMapType == $scope.mapTypes.Leaflet ?
            L.map('leaflet-map-canvas', mapOptionsObject) :
            new google.maps.Map(document.getElementById("google-map-canvas"), mapOptionsObject);
    };

    // Updates the options side bar when the map is changed. reflectMapChangesToSidebar's sister function.
    $scope.reflectMapChangesToSidebar = function() {
        // Map has changed, sync to sidebar map options.
        angular.forEach($scope.options, function (value, key) {
            $scope.options[key].value = $scope.map[key];
        });

        // Save Apply
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    };

    // Updates the map when options are changed from the sidebar. reflectSidebarChangesToMap's sister function.
    $scope.reflectSidebarChangesToMap = function() {
        var mapOptionsObject = mapOptionsService.getMapOptionsObject();

        $scope.map.setOptions(mapOptionsObject);
    };

    $scope.toggleMapType = function() {
        console.log("Toggling map..");
        // Toggle $scope.currentMapType
        $scope.currentMapType = mapChoiceService.toggleCurrentMapType();
        // Hide the one map

        // Show the other
    };

    // Get this party started
    $scope.initController();

    // Setup map on DOM ready.
    angular.element(document).ready(function () {
        $scope.initMap();

        if ($scope.mapType == $scope.mapTypes.Leaflet) {
            // Write method to update leaflet options.
        } else {
            google.maps.event.addListener($scope.map, 'idle', function() {
                $scope.reflectMapChangesToSidebar();
            });
        }
    });
});

// TODO Move these out of this file.
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

mfApp.directive('googleMapCanvas', function() {
    return {
        restrict: 'AEC',
        template: '<div id="google-map-canvas" class="span8"></div>'
    };
});

mfApp.directive('leafletMapCanvas', function() {
    return {
        restrict: 'AEC',
        template: '<div id="leaflet-map-canvas" class="span8"></div>'
    };
});
/* /Directives */