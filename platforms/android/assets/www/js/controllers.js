
angular.module('scientificConference.controllers', ['ngCordova'])

.controller('ProgramCtrl', function($scope,$http,$ionicPopup,$cordovaLocalNotification, $ionicPlatform) {
    $http.get("http://192.168.1.3:8888/htdocs/ScientificConference/updater.php?program")
        .success(function(data) {
            sessionToReturn=[];


            for(var i=0; i<data.length;i++)
            {
                datetime=data[i].DataOra.split(" ");
                if(moment(moment()._d).format("DD-MM-YYYY")==datetime[0]){

                    sessionToReturn.push(data[i]);

                    time=datetime[1].split(":");
                    var alarmTime = new Date();
                    alarmTime.setHours(time[0])
                    alarmTime.setMinutes(time[1]-1);
                    /*
                    $ionicPlatform.ready(function () {
                    $cordovaLocalNotification.schedule({
                        id: data[i].DataOra,
                        date: alarmTime,
                        message: data[i].Info,
                        title: data[i].DataOra,
                        autoCancel: true,
                        sound: true
                    })
                })*/
                }

            }
            $scope.sessioni =sessionToReturn;
        })
        .error(function() {
            $ionicPopup.alert({ title: "Errore", template:"Il programma non può essere caricato dal serv