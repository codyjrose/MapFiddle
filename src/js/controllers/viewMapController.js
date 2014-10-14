app.controller("ViewMapController", [
        '$scope',
        'mapOptionsService',
        'mapFeatureService',
        'mapEventsService',
        'mapService',
        'geoLocationService',
        'mapTypeService',
        function ($scope,
                  mapOptionsService,
                  mapFeatureService,
                  mapEventsService,
                  mapService,
                  geoLocationService,
                  mapTypeService) {

    "use strict";

    $scope.showMapType = mapTypeService.getActiveMapTypeName();

//    var loadMap = function() {
//        // Get the location of the user and zoom/center around it.
//        geoLocationService.userLatLng()
//            .success(function(data, status, headers, config) {
//                if (status === 200) {
//                    mapOptionsService.set('center', geoLocationService.getCountryLatLng(data.country_code));
//                    mapOptionsService.broadcastChangedOption('center');
//                }
//            }).
//            error(function(data, status, headers, config) {
//                // Set zoom to 3 so it shows all continents at 0,0
//                mapOptionsService.set('zoom', 3);
//                mapOptionsService.broadcastChangedOption('zoom');
//            }).
//            finally(function() {
//
//                // Get map options object to create the map
//
//
//                // Initialize the map
//                mapService.initMap();
//            });
//    };
//
//    loadMap();

    $scope.$on('mapTypeChange', function (e, mapTypeName) {
        $scope.showMapType = mapTypeName;

        mapService.initMap();

    });

    mapService.initMap();

    $scope.$on('mapOptionChange'), function () {
        mapService.initMap();
    };

    // Options have been changed via the sidebar, update the map.
    $scope.$on('mapOptionChange', function () {
        var option = mapOptionsService.lastUpdatedOption();
        mapService.setMapOption(option);
    });

    // Marker, circle, polygon has been added or removed, let everyone know.
    $scope.$on('mapFeatureChange', function () {
        var feature = mapFeatureService.lastUpdatedFeature();
        mapService.toggleMapFeature(feature);
    });

    // Marker, circle, polygon POPUP has been added or removed, let everyone know.
    $scope.$on('mapFeaturePopupChange', function () {
        var feature = mapFeatureService.lastUpdatedFeature();
        mapService.toggleBindPopupToFeature(feature);
    });

    // Map event added or removed, let everyone know.
    $scope.$on('mapEventChange', function () {
        var event = mapEventsService.lastUpdatedEvent();
        mapService.toggleMapEvent(event);
    });

    // The map has changed, update the options values (such as center and zoom level).
    $scope.$on('mapMoveEnd', function () {
        var options = mapOptionsService.getAllWithStateMethod();

        _.forIn(options, function (option) {
            // Run the options' state method to get the new value.
            var newValue = mapService.getMap()[option.stateMethod]();
            mapOptionsService.set(option.name, newValue);
        });
    });
}]);