angular.module('gorillasauth.protected.person')

  .controller('PersonController', [ 'BillingService', 'AbstractProductsService',
    function (BillingService, AbstractProductsService) {
      var self = this;

      self.billing = null;
      self.abstract_products = null;
      self.loading = {
        billing: false,
        abstract_products: false,
        abstract_brands: false,
        abstract_customers: false
      };

    }
  ])

;
