(function() {
    'use strict';

    angular.module('MatchApp').controller('statsController', statsController);

    statsController.$inject = ['MatchDataService', 'stats'];

    function statsController(MatchDataService, stats) {
        var statsCtrl = this;
        statsCtrl.stats = stats;
        console.log(statsCtrl.stats);
    }
})();
