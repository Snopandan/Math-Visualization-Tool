SchematicModule.controller('SchematicCtrl', ['$scope', '$compile', function($scope, $compile) {
  this.addComponent = function() {
    // console.log('hej');
    var component = angular.element(document.createElement('schematic-component'));
    var el = $compile(component)($scope);

    angular.element(document.body).append(component);
    $scope.insertHere = el;
  };
}]);
