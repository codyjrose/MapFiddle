app.controller('NavController', ['$scope', '$location', 'mapCodeService', function($scope, $location, mapCodeService) {
    var path = {
        '/options': 1,
        '/data': 2,
        '/events': 3
    };

    this.selectTab = function(setTab) {
        this.tab = setTab;
    };

    this.isSelected = function(checkTab) {
        return this.tab === checkTab;
    };

    // Make initial selection.
    this.selectTab(path[$location.path()]);

    this.toggleShowCode = function() {
        mapCodeService.toggleShowCode();
    };
}]);