webapp.factory('Modules_type', function($resource){
  return $resource('/rest-api/modules/:idModule/modules_type/:idModuleType', {idModule: 'idModule', idModuleType: '@idModuleType'},
      {
        'get': {method: 'GET'},
        'create': {method: 'POST'},
        'update': {method: 'PUT'},
      });
  })
webapp.factory('Users', function($resource){
  return $resource('/rest-api/users', {} ,
      {
        'get': {method: 'GET'},
        // 'create': {method: 'POST'},
        // 'update': {method: 'PUT'},
      });
  })
webapp.factory('Customers', function($resource){
  return $resource('/rest-api/customers/:idCustomer', {idCustomer: '@idCustomer'} ,
      {
        'get': {method: 'GET'},
        // 'create': {method: 'POST'},
        // 'update': {method: 'PUT'},
      });
  })
