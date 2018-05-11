angular.module('gorillasauth.protected.add-presences', [
  'ui.router'
])

  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider.state('protected.add-presences', {
        url: '/add-presences',
        templateUrl: 'protected/add-presences/add-presences.tpl.html',
        controller: 'AddPresencesController as addPresencesCtrl',
        data: {
          pageTitle: 'Cadastro de presenças'
        }
      });
    }
  ])

;
