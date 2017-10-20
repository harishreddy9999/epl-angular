(function() {
    'use strict';

    angular.module('data').service('MatchDataService', MatchDataService);

    MatchDataService.$inject = ['$q', '$http', 'ApiBasePath'];

    function MatchDataService($q, $http, ApiBasePath) {
        var service = this;
        service.singleMatchData = {};

        service.setYear = function(year){
            service.year = year;
        }

        service.getAllMatchesList = function() {
            return $http({
                method: "GET",
                url: (ApiBasePath + '/' + service.year + '/en.1.json')
            }).then(function(response) {
                return response.data;
            });
        };

        service.getTheSingleMatch = function(matchday,team1code){
            service.matchData = {};
            var deffered = $q.defer();
            service.singleMatchData = {};
            var promise =  service.getAllMatchesList();
            promise.then(function(response){
                service.matchData = response;
                for(var i=0;i<service.matchData.rounds.length;i++){
                    if(service.matchData.rounds[i].name === matchday){//console.log(service.matchData.rounds[i].name);
                        for(var j=0;j<service.matchData.rounds[i].matches.length;j++){
                            if(service.matchData.rounds[i].matches[j].team1.code === team1code){
                                service.singleMatchData.date = service.matchData.rounds[i].matches[j].date;
                                service.singleMatchData.team1name = service.matchData.rounds[i].matches[j].team1.name;
                                service.singleMatchData.team2name = service.matchData.rounds[i].matches[j].team2.name;
                                service.singleMatchData.score1 = service.matchData.rounds[i].matches[j].score1;
                                service.singleMatchData.score2 = service.matchData.rounds[i].matches[j].score2;
                                service.singleMatchData.name = matchday;
                            }
                        }
                    }
                }
                //console.log(service.singleMatchData);
                deffered.resolve(service.singleMatchData);
            },function(error){
                console.log('something went wrong!!!');
                deffered.reject(error);
                });
            return deffered.promise;
        };

        service.getTeamStats = function(){
          var teamStats = [];
          var teamArray = [];
          var deffered = $q.defer();
          var promise = service.getAllMatchesList();
          promise.then(function(response){
            service.teamData = response;
            var rounds = service.teamData.rounds;
            for(var i=0; i<rounds.length; i++){
                for(var j=0; j<rounds[i].matches.length; j++){
                    teamArray.push(rounds[i].matches[j].team1);
                    teamArray.push(rounds[i].matches[j].team2);
                }
            }console.log(teamArray);
            teamArray = _.uniqBy(teamArray, 'code');
            // teamArray = teamArray.filter(function(x, i, a){return a.indexOf(x)==i;});
            console.log(teamArray);
            for(var eachTeam in teamArray){
                var teamObj = {};
                teamObj.count = 0;
                teamObj.won = 0;
                teamObj.lost = 0;
                teamObj.draw = 0;
                rounds.forEach(function(eachRound){
                    eachRound.matches.forEach(function(eachMatch){
                        if(teamArray[eachTeam].code === eachMatch.team1.code){
                            teamObj.code = teamArray[eachTeam].code;
                            teamObj.name = teamArray[eachTeam].name;
                            teamObj.count += eachMatch.score1;
                            if(eachMatch.score1 > eachMatch.score2){
                                teamObj.won += 1;
                            }
                            if(eachMatch.score1 < eachMatch.score2){
                                teamObj.lost += 1; 
                            }
                            if(eachMatch.score1 == eachMatch.score2 && eachMatch.score1 !== null){
                                teamObj.draw += 1;
                            }
                        }
                        if(teamArray[eachTeam].code === eachMatch.team2.code){
                            teamObj.code = teamArray[eachTeam].code;
                            teamObj.count += eachMatch.score2;
                            if(eachMatch.score1 > eachMatch.score2){
                                teamObj.lost += 1;
                            }
                            if(eachMatch.score1 < eachMatch.score2){
                                teamObj.won += 1; 
                            }
                            if(eachMatch.score1 == eachMatch.score2 && eachMatch.score1 !== null){
                                teamObj.draw += 1;
                            }
                        }
                    });
                });
                teamStats.push(teamObj);
            }
            console.log(teamStats[0]);
            console.log(teamStats);
            deffered.resolve(teamStats);
          },function(error){
                console.log('something went wrong in team stats');
                deffered.reject(error);
            });
          return deffered.promise;
        };
    }
})();
                //console.log(service.matchData);
                //console.log(matchday);
                //console.log(service.matchData.rounds[0].name);