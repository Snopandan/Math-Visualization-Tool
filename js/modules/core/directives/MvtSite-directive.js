CoreModule.directive('mvtSite', ['MultiTransclude', function(MultiTransclude) {
  return {
    restrict: 'E',
    scope: {},
    transclude: true,
    template: '<div id="wrapper">' +
                '<div id="header"><div transclude-id="header" id="header-content"></div></div>' +
                '<div id="content">' +
                '<div id="sidebar" transclude-id="sidebar"></div>' +
                '<div id="main" transclude-id="main">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="footer">' +
                '<div id="footer-content" transclude-id="footer"></div>' +
                '</div>',
    link: function(scope, element, attributes, controller, transclude) {
      MultiTransclude.transclude(element, transclude);
    }
  };
}]);
