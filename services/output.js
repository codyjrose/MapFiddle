// Responsible for outputting map HTML + Javascript
mfApp.factory('mapOutputService', function() {
    var usedOptions;

    //region Static HTML
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
    //endregion

    var getMapJS = function() {

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

            if (index !== usedOptions.length - 1) {
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

    var getMapMarkup = function() {
        // TODO Need to do some beautifying here at some point: https://github.com/einars/js-beautify
        return staticBeginHtml + getMapJS() + staticEndHtml;
    };

    return {
        generateHtml: function(mapOptions) {
            usedOptions = mapOptions;
            return getMapMarkup();
        }
    };
});