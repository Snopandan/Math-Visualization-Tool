CoreModule.directive('renderWindow', ['RenderWindow' , '$window', function(RenderWindow, $window) {
  return {
    restrict: 'E',
    scope: {},
    template: '<div id="renderDiv"></div>',
    link: function(scope, element, attributes, controller) {
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      RenderWindow.init(windowWidth, windowHeight);
      var container = document.getElementById('renderDiv');
      container.appendChild(RenderWindow.getDomElement());
      RenderWindow.renderStart();

      scope.onResize = function() {
        RenderWindow.setSize(window.innerWidth, window.innerHeight);
      };

      angular.element($window).bind('resize', function() {
        scope.onResize();
      });
    }
  };
}]);
