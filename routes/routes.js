(function() {
    'use strict';

    angular.module('MatchApp').config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.template.html',
                controller: 'homeController as homeCtrl'
            })
            .state('matches', {
                url: '/matches',
                templateUrl: 'templates/matches.template.html',
                controller: 'matchesController as matchesCtrl',
                resolve: {
                    matches: ['MatchDataService', function(MatchDataService) {
                        return MatchDataService.getAllMatchesList();
                    }]
                }
            })
            .state('stats', {
                url: '/stats',
                templateUrl: '/templates/stats.template.html',
                controller: 'statsController as statsCtrl',
                resolve: {
                    stats: ['MatchDataService', function(MatchDataService) {
                        return MatchDataService.getTeamStats();
                    }]
                }
            })
            .state('singlematch',{
                url: '/singlematch/{matchday}/{team1code}',
                templateUrl: 'templates/singlematch.template.html',
                controller: 'singlematchController as singlematchCtrl',
                params: {
                    matchday: null,
                    team1code: null
                },
                resolve: {
                    singlematch: ['$stateParams', 'MatchDataService', function($stateParams,MatchDataService){
                        return MatchDataService.getTheSingleMatch($stateParams.matchday,$stateParams.team1code);
                    }]
                }
            });
    }
})();
