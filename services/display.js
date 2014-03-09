/**
 * Created by Cody on 3/9/14.
 * Responsible for controlling the map type (Google or Leaflet/OSM) and displaying the map.
 */
mfApp.factory('mapDisplayService', function() {
    var mapType = {
        Leaflet: "leaflet",
        Google: "google"
    };

    var currentMapType = mapType.Leaflet;

    var toggleCurrentMapType = function() {
        currentMapType = currentMapType == mapType.Leaflet ? mapType.Google : mapType.Leaflet;

        return currentMapType;
    };

    return {
        getMapType: function() {
            return mapType;
        },
        getDefaultMapType: function() {
            return mapType.Google;
        },
        getCurrentMapType: function() {
            return currentMapType;
        },
        setCurrentMapType: function(newMapType) {
          currentMapType = newMapType;
        },
        toggleCurrentMapType: function() {
            return toggleCurrentMapType();
        }
    };
});