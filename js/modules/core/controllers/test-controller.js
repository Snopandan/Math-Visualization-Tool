function TestCtrl($scope, RenderWindow) {
  this.hej = function() {
    RenderWindow.sayHello();
  };
}

core.controller('TestCtrl', ['$scope', 'RenderWindow', TestCtrl]);
