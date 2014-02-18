mfApp.factory('mapOutputService', function() {

    var options =
    [
        {
            "zoom": {
                "value": 8,
                "min": 1,
                "max": 21,
                "type": "number",
                "label": "Zoom",
                "default": 8,
                "required": true
            }
        },
        {
            "center": {
                value: new google.maps.LatLng(-34.397, 150.644),
                type: "object",
                label: "Map Center",
                required: true
            }
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
    ];

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

        var usedOptions = Enumerable.From(options).Where(function(o) { return o.Value.value != o.Value.default || o.Value.required == true }).ToArray();

        angular.forEach(usedOptions, function(o) {
            console.log(o.Key + ": " + o.Value.value);
        });

        var js = '' +
            'var map;' +
            'function initialize() {' +
            'var mapOptions = {' +
            'zoom: ' + options.zoom.value + ',' +
            'center: new google.maps.LatLng(-34.397, 150.644)' +
            '};' +
            'map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);' +
            '}' +
            'google.maps.event.addDomListener(window, "load", initialize);' +
            '';


        return js;
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