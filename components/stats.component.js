(function() {
    'use strict';

    angular.module('MatchApp')
        .component('stats', {
            templateUrl: 'templates/stats.component.html',
            bindings: {
                stats: '<'
            }
        });
})();
