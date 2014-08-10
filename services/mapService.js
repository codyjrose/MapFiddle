app.factory('mapService', ['$rootScope', function($rootScope) {

    var map, legend;

    var getMap = function() {
        return map
    };

    var getZoom = function() {
        return map.getZoom();
    };

    var getMapCenter = function() {
        var center = map.getCenter();
        return [ center.lat, center.lng ];
    };

    var addLogo = function() {
        var logo = L.control({position: 'bottomleft'});

        logo.onAdd = function (map) {
            var branding = L.DomUtil.create('h3', 'brand legend')

            //branding.innerHTML = "<img src='assets/logo.jpg' height='50'/>"
            branding.innerHTML += "<span id='logo'><i class='fa fa-map-marker'></i> MapFiddle</span>";
            return branding;
        };

        logo.addTo(map);
    };

    var getLatLngInCurrentBounds = function() {
        var ne = map.getBounds().getNorthEast();
        var sw = map.getBounds().getSouthWest();

        var lat = Math.random() * (ne.lat - sw.lat) + sw.lat;
        var lng = Math.random() * (ne.lng - sw.lng) + sw.lng;

        return [lat, lng];
    };

    var initMap = function (options) {
        map = new L.Map('map', options);

        // create the tile layer with correct attribution
        var osm = new L.TileLayer(options.url, options);

        map.addLayer(osm);

        map.on('moveend', function() {
            $rootScope.$broadcast('mapMoveEnd');
        });

        addLogo();

    };

    // For options that are properties of the map. Ref: http://leafletjs.com/reference.html#map-properties
    var toggleProperty = function(option) {
        if (option.value) {
            map[option.name].enable();
        } else {
            map[option.name].disable();
        }
    };

    // For options that are map controls. Ref: http://leafletjs.com/reference.html#map-addcontrol
    var toggleControl = function(option) {
        if (option.value) {
            map[option.name].addTo(map)
        } else {
            map[option.name].removeFrom(map);
        }
    };

    var updatePropertyOfOptions = function(option) {
        map.options[option.name] = option.value;
    };

    var setMapOption = function(option) {
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
                console.log('could not update: ' + option.name);
                break;
        }
    };

    var addFeature = function(feature) {
        feature.obj = L[feature.name]
            .apply(null, feature.options())
            .addTo(map);
    };

    var removeFeature = function(feature) {
        map.removeLayer(feature.obj);
        feature.obj = null;
    };

    var toggleMapFeature = function(feature) {
        if (feature.obj) {
            unbindPopupToFeature(feature);
            removeFeature(feature);
        } else {
            addFeature(feature);
        }
        return feature;
    };

    var bindPopupToFeature = function(feature) {
        feature.obj.bindPopup("<b>Hello world</b><br>I'm a popup attached to " + feature.name);
        feature.popupEnabled = true;
    };

    var unbindPopupToFeature = function(feature) {
        feature.obj.unbindPopup();
        feature.popupEnabled = false;
    };

    var toggleBindPopupToFeature = function(feature) {
        if (feature.popupEnabled) {
            bindPopupToFeature(feature);

        } else {
            unbindPopupToFeature(feature);
        }
    };

    var enableEvent = function(event) {
        map.on(event.name, function(e) {
            var latLng = event.eventLatLng(e);

            L[event.method]()
                .setLatLng(latLng)
                .setContent(event.popupOptions.content + "<b>" + latLng.lat + "," + latLng.lng + "</b>!")
                .openOn(map);
        });
    };

    var disableEvent = function(event) {
        map.off(event.name);
    };

    var toggleMapEvent = function(event) {
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
    }
}]);
