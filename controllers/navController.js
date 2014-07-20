app.controller('NavController', ['$location', function($location) {
    this.selectTab = function(setTab) {
        this.tab = setTab;
    };

    this.isSelected = function(checkTab) {
        return this.tab === checkTab;
    };

    this.selectTab($location.path() === '/code' ? 2 : 1)
}]);