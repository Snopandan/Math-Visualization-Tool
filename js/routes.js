mathVisualizationTool.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/visualization/:name', {
        templateUrl: 'views/visualization.html',
        controller: 'VisualizationCtrl',
        controllerAs: 'viz'
      }).
      when('/schematic', {
        templateUrl: 'views/schematic.html',
        controller: 'SchematicCtrl',
        controllerAs: 'schematic'
      }).
      otherwise({
        redirectTo: '/visualization/open'
      });
}]);
