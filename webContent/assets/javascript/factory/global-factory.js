webapp.factory('glbFac', function($filter) {
  return {
    '_i': function(key) {
      if(key !== null){
        return $filter('translate')(key);
      }else{
        return null;
      }
    }
  };
});
