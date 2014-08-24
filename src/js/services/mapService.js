app.factory('mapService', ['$rootScope', '$location', function ($rootScope, $location) {
    "use strict";

    var map;

    var addLogo = function () {
        var logo = L.control({position: 'bottomleft'});

        logo.onAdd = function () {
            var branding = L.DomUtil.create('h3', 'brand legend');

            branding.innerHTML += "<span id='logo'><i class='fa fa-map-marker'></i> MapFiddle</span>";
            return branding;
        };

        logo.addTo(map);
    };

    var addMoveEndEvent = function () {
        map.on('moveend', function () {
            $rootScope.$broadcast('mapMoveEnd');
        });
    };

    var initMap = function (options) {

        if ($location.absUrl().indexOf('/src') > 0) {
            // Hacky way to check if work in dev or prod env. When in prod, images are served up via cdn.
            L.Icon.Default.imagePath = 'assets/leaflet/';
        }

        map = new L.Map('map', options);

        // create the tile layer with correct attribution
        var osm = new L.TileLayer(options.url, options);

        map.addLayer(osm);

        addMoveEndEvent();
        addLogo();
    };

    var getMap = function () {
        return map;
    };

    var getZoom = function () {
        return map.getZoom();
    };

    var getMapCenter = function () {
        var center = map.getCenter();
        return [ center.lat, center.lng ];
    };

    var getLatLngInCurrentBounds = function () {
        var ne = map.getBounds().getNorthEast(),
            sw = map.getBounds().getSouthWest(),
            lat = Math.random() * (ne.lat - sw.lat) + sw.lat,
            lng = Math.random() * (ne.lng - sw.lng) + sw.lng;

        return [lat, lng];
    };

    // Properties
    // For options that are properties of the map. Ref: http://leafletjs.com/reference.html#map-properties
    var toggleProperty = function (option) {
        if (option.value) {
            map[option.name].enable();
        } else {
            map[option.name].disable();
        }
    };

    // For options that are map controls. Ref: http://leafletjs.com/reference.html#map-addcontrol
    var toggleControl = function (option) {
        if (option.value) {
            map[option.name].addTo(map);
        } else {
            map[option.name].removeFrom(map);
        }
    };

    var updatePropertyOfOptions = function (option) {
        map.options[option.name] = option.value;
    };

    var setMapOption = function (option) {
        switch (option.updateMethod) {
        case "mapProperty":
            toggleProperty(option);
            break;
        case "control":
            toggleControl(option);
            break;
        case "propertyOfMapDotOptions":
            updatePropertyOfOptions(option);
            break;
        default:
            break;
        }
    };

    // Features
    var addFeature = function (feature) {
        feature.obj = L[feature.name]
            .apply(null, feature.options())
            .addTo(map);
    };

    var removeFeature = function (feature) {
        map.removeLayer(feature.obj);
        feature.obj = null;
    };

    var bindPopupToFeature = function (feature) {
        feature.obj.bindPopup("<b>Hello world</b><br>I'm a popup attached to " + feature.name);
        feature.popupEnabled = true;
    };

    var unbindPopupToFeature = function (feature) {
        feature.obj.unbindPopup();
        feature.popupEnabled = false;
    };

    var toggleMapFeature = function (feature) {
        if (feature.obj) {
            unbindPopupToFeature(feature);
            removeFeature(feature);
        } else {
            addFeature(feature);
        }
        return feature;
    };

    var toggleBindPopupToFeature = function (feature) {
        if (feature.popupEnabled) {
            bindPopupToFeature(feature);

        } else {
            unbindPopupToFeature(feature);
        }
    };

    // Events
    var enableEvent = function (event) {
        map.on(event.name, function (e) {
            var latLng = event.eventLatLng(e);

            L[event.method]()
                .setLatLng(latLng)
                .setContent(event.popupOptions.content + "<b>" + latLng.lat + "," + latLng.lng + "</b>!")
                .openOn(map);
        });
    };

    var disableEvent = function (event) {
        map.off(event.name);

        // Need to make sure moveend isn't turned off for the background map..
        if (event.name === "moveend") {
            addMoveEndEvent();
        }
    };

    var toggleMapEvent = function (event) {
        if (!event.enabled) {
            enableEvent(event);
            event.enabled = true;

        } else {
            disableEvent(event);
            event.enabled = false;
        }
    };

    return {
        initMap: initMap,
        getMap: getMap,
        getMapCenter: getMapCenter,
        getZoom: getZoom,
        getLatLngInCurrentBounds: getLatLngInCurrentBounds,
        setMapOption: setMapOption,
        toggleMapFeature: toggleMapFeature,
        toggleBindPopupToFeature: toggleBindPopupToFeature,
        toggleMapEvent: toggleMapEvent
    };
}]);
