angular.module('gorillasauth.protected.person')

  .controller('PersonController', ['$scope', 'PersonService', '$mdDialog', '$state', 'NotificationService',
    function ($scope, PersonService, $mdDialog, $state, NotificationService) {
      var self = this;
      self.requesting = false;
      self.searchText = null;

      self.searchByName = function () {
        self.requesting = true;
        var params = null;
        if (self.searchText) {
          var likeStr = '%' + self.searchText + '%';
          params = {
            q: {
              filters: [
                {"or":[
                  {"name":"first_name","op":"like","val":likeStr},
                  {"name":"last_name","op":"like","val":likeStr}
                ]}
              ]
            }
          };
          PersonService.get(params).then(function (response) {
            self.peoples = response.objects;
            self.requesting = false;
          });
        } else {
          NotificationService.error('Digite o nome no campo de busca');
        }
      };

      self.refresh = function () {
        self.searchText = null;
        search();
      };

      function search() {
        self.requesting = true;

        PersonService.get().then(function (response) {
          self.peoples = response.objects;
          self.requesting = false;
        });
      }

      search();

      self.addPerson = function (ev) {
        var dialog = {
          controller: 'AddPersonController as ctrl',
          templateUrl: 'protected/person/add-person.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: true
        };

        $mdDialog.show(dialog).then(function (result) {
          PersonService.save(result).then(function (response) {
            NotificationService.success('Pessoa adicionada sucesso.');
            $state.reload();
          });

        });

      };

      self.editPerson = function (ev, person) {
        var dialog = {
          controller: 'EditPersonController as ctrl',
          locals: {
            person: person
          },
          templateUrl: 'protected/person/add-person.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: true
        };

        $mdDialog.show(dialog).then(function (result) {
          PersonService.save(result).then(function (response) {
            NotificationService.success('Pessoa editada sucesso.');
            $state.reload();
          });

        });

      };
    }
  ])

  .controller('AddPersonController', ['$scope', 'PersonService', '$mdDialog',
    function ($scope, PersonService, $mdDialog) {
      var self = this;
      self.person = {};

      self.selectProfilePhoto = function (file, event) {
        if (!file) {
          return;
        }
        var reader  = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = function () {
          console.log(reader.result);
          self.person.photo = reader.result;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      };


      self.close = function () {
        $mdDialog.cancel();
      };

      self.save = function () {
        $mdDialog.hide(self.person);
      };

      function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          console.log(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }
    }
  ])


  .controller('EditPersonController', ['$scope', 'PersonService', '$mdDialog', 'person',
    function ($scope, PersonService, $mdDialog, person) {
      var self = this;
      self.person = person;

      self.selectProfilePhoto = function (file, event) {
        if (!file) {
          return;
        }
        var reader  = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = function () {
          console.log(reader.result);
          self.person.photo = reader.result;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      };


      self.close = function () {
        $mdDialog.cancel();
      };

      self.save = function () {
        $mdDialog.hide(self.person);
      };

      function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          console.log(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }
    }])

  ;
