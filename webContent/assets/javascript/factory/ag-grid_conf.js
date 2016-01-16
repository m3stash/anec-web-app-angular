webapp.factory('agGridConf', function($q, $location, $rootScope) {
  return {
    'checkboxFn': function(params, thiz) {
      var eHeader = document.createElement('span');
      if(params.colDef.checkboxSelection === true){
        eHeader.innerHTML = '<input id="checkboxAll" type="checkbox">';
        eHeader.addEventListener('click', function() {
            if(eHeader.querySelector('#checkboxAll').checked === true){
              thiz.gridOptions.api.selectAll();
            }else{
              thiz.gridOptions.api.deselectAll();
            }
        });
      }else{
        eHeader.innerHTML = params.value
      }

      return eHeader;
    }
  };
});
