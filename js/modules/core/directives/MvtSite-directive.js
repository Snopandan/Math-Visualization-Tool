CoreModule.directive('mvtSite', ['MultiTransclude', function(MultiTransclude) {
  return {
    restrict: 'E',
    scope: {},
    transclude: true,
    template: '<div transclude-id="main"></div>'+
              '<div class="gui sidebar">'+
                '<div id="content" transclude-id="gui-content"></div>'+
              '</div>' +
              '<div title="Open a visualization" class="gui circle button open"><img class="buttonImage" src="images/icons/open.png" /></div>' +
              '<a ng-href="#/pattern/"><div ng-href="/pattern" title="Create a new visualization" class="gui circle button add"><img class="buttonImage" src="images/icons/add.png" /></div></a>' +
              '<div title="Information about this application" class="gui circle button info"><img class="buttonImage" src="images/icons/info.png" /></div>',
    link: function(scope, element, attributes, controller, transclude) {
      MultiTransclude.transclude(element, transclude);
    }
  };
}]);
