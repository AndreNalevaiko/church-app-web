angular.module('gorillasauth.services.person', [
    'gorillascode.resource'
])

    .service('PersonService', ['configuration', 'ResourceFactory', '$http',
        function (configuration, ResourceFactory, $http) {

            var Person = new ResourceFactory(configuration.apiUrl, 'v1/person');

            this.get = function (searchParameters) {
                if (!searchParameters) {
                    searchParameters = {};
                }
                
                return Person.get(searchParameters).$promise;
            };

            this.save = function (person) {
                if (person.id) {
                  return Person.patch(person).$promise;
                }
                else {
                  return Person.save(person).$promise;
                }
            };

        }
    ])
;

