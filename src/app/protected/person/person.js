angular.module('gorillasauth.protected.person', [
  'gorillasauth.services.billing',
  'ui.router'
])

  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider.state('protected.person', {
        url: '/person',
        templateUrl: 'protected/person/person.tpl.html',
        controller: 'PersonController as personCtrl',
        data: {
          pageTitle: 'Pessoas'
        }
      });
    }
  ])

;
