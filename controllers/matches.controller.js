(function() {
    'use strict';

    angular.module('MatchApp').controller('matchesController', matchesController);

    matchesController.$inject = ['MatchDataService', 'matches'];

    function matchesController(MatchDataService, matches) {
        var matchesCtrl = this;
        matchesCtrl.matches = matches;
        console.log(matchesCtrl.matches);
    }
})();
