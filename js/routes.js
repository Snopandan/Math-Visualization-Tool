mathVisualizationTool.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/visualization/:name', {
        templateUrl: 'views/visualization.html',
        controller: 'VisualizationCtrl',
        controllerAs: 'viz'
      }).
      when('/pattern', {
        templateUrl: 'views/pattern.html'
      }).
      otherwise({
        redirectTo: '/visualization/open'
      });
}]);
