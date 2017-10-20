(function() {
    'use strict';

    angular.module('MatchApp')
        .component('matches', {
           templateUrl: 'templates/matches.component.html',
            bindings: {
                matches: '<'
            }
        });
})();
