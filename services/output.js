mfApp.factory('mapOutputService', function() {

    var options = {
        zoom: {
            value: 8,
            min: 1,
            max: 21,
            type: "number",
            label: "Zoom",
            required: true,
            default: 8
        },
        center: {
            value: new google.maps.LatLng(-34.397, 150.644),
            type: "object",
            typeText: "new google.maps.LatLng",
            label: "Map Center",
            required: true,
            default: new google.maps.LatLng(-34.397, 150.644)
        },
        panControl: {
            value: true,
            type: "boolean",
            label: "Pan Control",
            default: true
        },
        zoomControl: {
            value: true,
            type: "boolean",
            label: "Zoom Control",
            default: true
        },
        streetViewControl: {
            value: true,
            type: "boolean",
            label: "Street View Control",
            default: true
        },
        mapTypeControl: {
            value: true,
            type: "boolean",
            label: "Map Type Control",
            default: true
        }
    };

    var staticBeginHtml = '' +
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<title>Simple Map</title>' +
        '<meta name="viewport" content="initial-scale=1.0, user-scalable=no">' +
        '<meta charset="utf-8">' +
        '<style>html, body, #map-canvas { height: 100%; margin: 0px; padding: 0px }</style>' +
        '<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>' +
        '<script>';

    var staticEndHtml = '' +
        '</script>' +
        '</head>' +
        '<body>' +
        '<div id="map-canvas"></div>' +
        '</body>' +
        '</html>';

    var mapJS = function() {

        var usedOptions = getUsedOptions();

        var js = '' +
            'var map;' +
            'function initialize() {' +
            'var mapOptions = {';

        angular.forEach(usedOptions, function(o, index) {

            if (o.Value.type == "object")
            {
                js += o.Key + ": " + o.Value.typeText + o.Value.value.toString();
            } else {
                js += o.Key + ": " + o.Value.value;
            }

            if (index !== usedOptions.length) {
                js += ",";
            }

        });

        js +=
            '};' +
            'map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);' +
            '}' +
            'google.maps.event.addDomListener(window, "load", initialize);' +
            '';

        return js;
    };

    var getUsedOptions = function() {
        Enumerable.From(options).Where(function(o) { return o.Value.value != o.Value.default || o.Value.required == true }).ToArray()
    };

    var genHtml = function() {
        var return_html = staticBeginHtml + mapJS() + staticEndHtml;
        // Need to do some beautifying here at some point: https://github.com/einars/js-beautify

        return return_html;
    };

    return {
        generateHtml: function(data) {
            return genHtml(data);
        },
        getOptions: function() {
            return options;
        }
    };
});