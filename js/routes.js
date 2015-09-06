mathVisualizationTool.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/visualization/:name', {
        templateUrl: 'views/visualization.html',
        controller: 'VisualizationCtrl',
        controllerAs: 'viz'
      }).
      when('/schematic', {
        templateUrl: 'views/schematic.html'
      }).
      otherwise({
        redirectTo: '/visualization/open'
      });
}]);
