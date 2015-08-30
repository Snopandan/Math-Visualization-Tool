CoreModule.filter('SanitizeHtml', ['$sce', function($sce){
  return function(html) {
    return $sce.trustAsHtml(html);
  };
}]);
