mathVisualizationTool.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/visualization/:name', {
        templateUrl: 'views/visualization.html',
        controller: 'VisualizationCtrl',
        controllerAs: 'viz'
      }).
      when('/scheme', {
        templateUrl: 'views/scheme.html'
      }).
      otherwise({
        redirectTo: '/visualization/open'
      });
}]);
