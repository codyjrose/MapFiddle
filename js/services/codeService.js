// Responsible for the map code inside the HTML + Javascript modal.
app.factory('mapCodeService', ['mapOptionsService', 'mapFeatureService', 'mapEventsService', function (mapOptionsService, mapFeatureService, mapEventsService) {
    "use strict";

    var showCode = false,

        // Static Code
        staticBeginHtml = '&lt;!DOCTYPE html&gt;\n' +
            '&lt;html&gt;\n' +
            '&lt;head&gt;\n' +
            '&lt;title&gt;Simple Map&lt;/title&gt;\n' +
            '&lt;meta name="viewport" content="initial-scale=1.0, user-scalable=no"&gt;\n' +
            '&lt;meta charset="utf-8"&gt;\n' +
            '&lt;link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" /&gt;\n' +
            '&lt;style&gt;html, body, #map { height: 100%; margin: 0; padding: 0 }&lt;/style&gt;\n' +
            '&lt;script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"&gt;&lt;/script&gt;\n' +
            '&lt;/head&gt;\n' +
            '&lt;body&gt;\n' +
            '&lt;div id="map"&gt;&lt;/div&gt;\n' +
            '&lt;script&gt;\n',

        staticEndHtml = '&lt;/script&gt;\n' +
            '&lt;/body&gt;\n' +
            '&lt;/html&gt;\n',

        staticBeginJs =     '"use strict";\n' +
                            '(function() {\n',

        staticCreateMap =   '\n  // Create map.\n' +
                            '  // First param is id of div that will contain the map. Second param is the map options object \n' +
                            '  var map = new L.Map("map", options);\n' +
                            '  var osm = new L.TileLayer(options.url, options);\n' +
                            '  map.addLayer(osm);\n',

        staticEndJs =       '}());\n';

    var getMapOptions = function () {
        var js = '  // Create map options object\n' +
                 '  var options = {\n',
            options = mapOptionsService.getAllModified();

        _.forIn(options, function (option, key) {
            js += "    ";

            switch (option.type) {
            case "object":
                js += option.name + ": " + option.value.toString();
                break;
            case "array":
                js += option.name + ": [" + option.value + "]";
                break;
            case "number":
                js += option.name + ": " + option.value;
                break;
            case "boolean":
                js += option.name + ": " + option.value;
                break;
            default:
                js += option.name + ": '" + option.value + "'";
                break;
            }

            if (parseInt(key, 10) < options.length - 1) {
                js += ",\n";
            } else {
                js += "\n";
            }
        });
        js += "  };\n";
        return js;
    };

    var getMapFeatures = function () {
        var js = "",
            features = mapFeatureService.getAllUsed();

        if (features.length) {
            js += "\n   // Add features\n";
        } else {
            return "";
        }

        _.forIn(features, function (feature) {
            js += "  ";
            var options = feature.options();
            js += "var " + feature.name + " = L." + feature.name + "(";

            _.forIn(options, function (option, key) {
                js += JSON.stringify(option);

                if (parseInt(key, 10) < options.length - 1) {
                    js += ", ";
                }
            });
            js += ").addTo(map);\n";
        });

        return js;
    };

    var getMapFeaturePopups = function () {
        var js = "",
            popups = mapFeatureService.getAllUsedPopups();

        if (popups.length) {
            js += "\n  // Add feature popups\n";
        } else {
            return "";
        }

        _.forIn(popups, function (popup) {
            js += "  ";
            js += popup.name + ".bindPopup(&quot;&lt;b&gt;Hello world&lt;/b&gt;&lt;br&gt;I&#39;m a popup attached to " + popup.name + "&quot;);\n";
        });
        return js;
    };

    var getMapEvents = function () {
        var js = "",
            events = mapEventsService.getAllEnabled();

        if (events.length) {
            js += "\n  // Add map events\n";
        } else {
            return "";
        }

        _.forIn(events, function (event, key) {
            var popupName = event.name + "Popup";
            var eventFunctionName = event.name + "Event";

            js += "  var " + popupName + " = L.popup();\n";
            js += "  function " + eventFunctionName + "(e) {\n";
            js += "    " +  popupName + "\n";
            js += "      .setLatLng(" + event.popupOptions.latLng + ")\n";
            js += "      .setContent('" + event.popupOptions.content + "' + " + event.popupOptions.eventResultContent + ")\n";
            js += "      .openOn(map);\n";
            js += "  }\n";
            js += "  map.on('" + event.name + "', " + eventFunctionName + ");\n";

            if (parseInt(key, 10) < events.length - 1) {
                js += "\n";
            }
        });

        return js;
    };

    var getCodeView = function () {
        var code = [];
        code.push(staticBeginHtml);
        code.push(staticBeginJs);
        code.push(getMapOptions());
        code.push(staticCreateMap);
        code.push(getMapFeatures());
        code.push(getMapFeaturePopups());
        code.push(getMapEvents());
        code.push(staticEndJs);
        code.push(staticEndHtml);

        return code.join("");
    };

    var toggleShowCode = function () {
        showCode = !showCode;
        return showCode;
    };

    return {
        getCodeView: getCodeView,
        showCode: function () { return showCode; },
        toggleShowCode: toggleShowCode
    };
}]);