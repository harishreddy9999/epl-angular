(function() {
    'use strict';

    angular.module('MatchApp')
        .component('singlematch', {
           templateUrl: 'templates/singlematch.component.html',
            bindings: {
                singlematch: '<'
            }
        });
})();
