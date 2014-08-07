// Responsible for outputting map HTML + Javascript
app.factory('mapCodeService', ['mapOptionsService', 'mapFeatureService', 'mapEventsService', function(mapOptionsService, mapFeatureService, mapEventsService) {
    var showCode = false;

    //region Static Code
    var staticBeginHtml = '' +
        '&lt;!DOCTYPE html&gt;\n' +
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
        '&lt;script&gt;\n';

    var staticEndHtml = '' +
        '&lt;/script&gt;\n' +
        '&lt;/body&gt;\n' +
        '&lt;/html&gt;\n';

    var staticBeginJs = '' +
                        '(function() {\n' +
                        '    var map;\n' +
                        '    function initialize() {\n';

    var staticInitMapJs ='' +
                        '        map = new L.Map("map", options);\n' +
                        '        var osm = new L.TileLayer(options.url, options);\n' +
                        '        map.addLayer(osm);\n';

    var staticEndJs =
                        '    }\n' +
                        '    initialize();\n' +
                        '}());\n';

    //endregion

    var getMapOptions = function() {
        var js = '        var options = {\n',
            options = mapOptionsService.getAllModified();

        _.forIn(options, function(option, key) {
            js += "            ";

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

            if (parseInt(key) < options.length - 1) {
                js += ",\n";
            } else {
                js += "\n";
            }
        });
        js += "        };\n";
        return js;
    };

    var getMapFeatures = function() {
        var js = "",
            features = mapFeatureService.getAllUsed();

        _.forIn(features, function(feature) {
            js += "        ";
            var options = feature.options();
            js += "var " + feature.name + " = L." + feature.name + "(";

            var index = 0;
            _.forIn(options, function(option, key) {
                js += JSON.stringify(option);
                index += 1;

                if (parseInt(key) < options.length - 1) {
                    js += ", ";
                }
            });
            js += ").addTo(map);\n";
        });

        return js == "" ? js : "\n" + js;
    };

    var getMapFeaturePopups = function() {
        var js = "",
            features = mapFeatureService.getAllUsedPopups();

        _.forIn(features, function(feature) {
            js += "        ";
            js += feature.name + ".bindPopup(&quot;&lt;b&gt;Hello world&lt;/b&gt;&lt;br&gt;I&#39;m a popup attached to " + feature.name + "&quot;);\n";
        });
        return js == "" ? js : "\n" + js;
    };

    var getMapEvents = function () {
        var js = "",
            events = mapEventsService.getAllEnabled();
        
        _.forIn(events, function(event) {
            js += "        var popup = L.popup();\n";
            js += "        function onMapClick(e) {\n";
            js += "            popup\n";
            js += "                .setLatLng(e.latlng)\n";
            js += "                .setContent('You clicked the map at ' + e.latlng.toString())\n";
            js += "                .openOn(map);\n";
            js += "            }\n";
            js += "        map.on('click', onMapClick);\n";

        });
        return js == "" ? js : "\n" + js;
    };

    var getCodeView = function() {
        var html = "";
        html += staticBeginHtml;
        html += staticBeginJs;
        html += getMapOptions();
        html += staticInitMapJs;
        html += getMapFeatures();
        html += getMapFeaturePopups();
        html += getMapEvents();
        html += staticEndJs;
        html += staticEndHtml;
        return html;
    };

    var toggleShowCode = function() {
        showCode = !showCode;
        return showCode;
    };

    return {
        getCodeView: getCodeView,
        showCode: function() { return showCode },
        toggleShowCode: toggleShowCode
    };
}]);