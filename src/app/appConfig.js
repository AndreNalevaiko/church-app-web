angular.module('gorillasauth')

  .provider('configuration', [function () {
    var config = null;

    var configs = {
      development: {
        environment: 'development',
        hostnames: ['localhost'],
        apiUrl: 'http://localhost:5000',
      }
    };

    angular.forEach(configs, function (configItem) {
      angular.forEach(configItem.hostnames, function (hostname) {
        if (window.location.hostname == hostname) {
          config = configItem;
        }
      });
    });

    if (!config) {
      var hostname = window.location.hostname;
        config = {
          environment: 'development',
          hostnames: [hostname],
          apiUrl: 'http://' + hostname + ':5000',
      };
    }
    if (!config) {
      throw new Error('Configuração não encontrada para o ambiente');
    }

    console.log('Configurações carregadas para: ' + config.environment);

    this.$get = function () {
      return config;
    };

  }
  ])
;
