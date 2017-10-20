(function() {
    'use strict';

    angular.module('MatchApp').controller('singlematchController', singlematchController);

    singlematchController.$inject = ['MatchDataService', 'singlematch'];

    function singlematchController(MatchDataService ,singlematch) {
        var singlematchCtrl = this;
        singlematchCtrl.singlematch = singlematch;
        console.log(singlematchCtrl.singlematch);
    }
})();
