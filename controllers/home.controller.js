(function() {
    'use strict';

    angular.module('MatchApp').controller('homeController', homeController);

    homeController.$inject = ['MatchDataService'];
    function homeController(MatchDataService) {
        var homeCtrl = this;
        homeCtrl.year = '';
        homeCtrl.firYear = function(){
        	homeCtrl.year ="2015-16";
        	MatchDataService.setYear(homeCtrl.year);
        	//home.year = homeCtrl.year;
        	//console.log(home.year);
        	console.log(homeCtrl.year);
        }
        homeCtrl.secYear = function(){
        	homeCtrl.year = "2016-17";
        	MatchDataService.setYear(homeCtrl.year);
        	//home.year = homeCtrl.year;
        	//console.log(home.year);
        	console.log(homeCtrl.year);
        }
        homeCtrl.samplefunc = function(){
        	console.log("button is working");
        }
        console.log(this.year);
        //homeCtrl.home = home;
        //console.log(homeCtrl.home);
    }
})();
