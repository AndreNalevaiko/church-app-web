angular.module('gorillasauth.services.person', [
    'gorillascode.resource'
])

    .service('PersonService', ['configuration', 'ResourceFactory', '$http',
        function (configuration, ResourceFactory, $http) {

            var Person = new ResourceFactory(configuration.apiUrl, 'v1/person');

            this.get = function (params) {
                var parameters = {
                    q: {
                      filters: params.filters ? params.filters : [],
                      order_by: [{
                        field: params.order.replace("-", ""),
                        direction: params.order.startsWith("-") ? "desc" : "asc"
                      }]
                    },
                    page: params.page,
                    results_per_page: params.limit
                  };
          
                  return Person.get(parameters).$promise.then(function (response) {
          
                    return {
                      result: response.objects,
                      limit: response.num_results,
                      page: response.page,
                      total_pages: response.total_pages
                    };
                  });
            };

            this.save = function (person) {
                if (person.id) {
                  return Person.patch(person).$promise;
                }
                else {
                  return Person.save(person).$promise;
                }
            };

            this.registryPresence = function (barcode){
                return $http.post(configuration.apiUrl + '/person' +'/_add_presence', {barcode: barcode});
            };

        }
    ])
;

