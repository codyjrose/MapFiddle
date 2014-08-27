app.factory('mapTypeService', ['$rootScope', function ($rootScope) {
    "use strict";

    var mapTypes = {},
        activeMapType = {};

    mapTypes = [
        {
            name: "OSM",
            label: "OpenStreetMap + Leaflet"
        },
        {
            name: "GM",
            label: "Google Maps"
        }
    ];

    var getActiveMapType = function () {
        return activeMapType;
    };

    var getActiveMapTypeName = function() {
        return getActiveMapType().name;
    };

    var getAll = function () {
        return mapTypes;
    };

    var setMapType = function (mapTypeName) {
        // Toggle active map
        activeMapType = _.find(getAll(), function (type) { return type.name === mapTypeName; });
    };

    var broadcastMapTypeChange = function () {
        // Let everyone else know the map type has changed.
        $rootScope.$broadcast('mapTypeChange', getActiveMapTypeName());
    };

    // Set default to OSM.
    setMapType("OSM");

    return {
        getAll: getAll,
        getActiveMapType: getActiveMapType,
        getActiveMapTypeName: getActiveMapTypeName,
        setMapType: setMapType,
        broadcastMapTypeChange: broadcastMapTypeChange
    };
}]);
