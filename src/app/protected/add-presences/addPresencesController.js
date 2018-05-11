angular.module('gorillasauth.protected.add-presences')

  .controller('AddPresencesController', ['$scope', 'PersonService', '$mdDialog', '$state', 'NotificationService',
    function ($scope, PersonService, $mdDialog, $state, NotificationService) {
      var self = this;

      self.lastPresence = null;
      self.barcode = null;

      self.registryPresence = function () {
        console.log('registra a presença');

        PersonService.registryPresence({barcode: self.barcode}).then(function (response){
          self.lastPresence = response.data;
          self.barcode = null;
          $scope.$apply();
        }, function (error){
          self.lastPresence = null;
          self.barcode = null;
        });
      };
      
    }
  ]);

 