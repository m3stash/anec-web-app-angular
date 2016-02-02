webapp.factory('Modules_type', function($resource){
  return $resource('/rest-api/modules/:idModule/modules_type/:idModuleType', {idModule: 'idModule', idModuleType: '@idModuleType'},
      {
        'create': {method: 'POST'},
        'update': {method: 'PUT'},
      });
  })
