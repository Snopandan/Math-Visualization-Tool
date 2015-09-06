CoreModule.directive('mvtSite', ['MultiTransclude', function(MultiTransclude) {
  return {
    restrict: 'E',
    scope: {},
    transclude: true,
    template: '<div transclude-id="main"></div>'+
              '<div class="gui sidebar">'+
                '<div id="content" transclude-id="gui-content"></div>'+
              '</div>' +
              '<div ng-click="toggleOpenOverlay()" title="Open a visualization" class="gui circle button open"><img class="buttonImage" src="images/icons/open.png" /></div>' +
              '<a ng-href="#/scheme/"><div ng-href="/pattern" title="Create a new visualization" class="gui circle button add"><img class="buttonImage" src="images/icons/add.png" /></div></a>' +
              '<div ng-click="toggleInfoOverlay()" title="Information about this application" class="gui circle button info"><img class="buttonImage" src="images/icons/info.png" /></div>' +
              '<div ng-show="showInfoOverlay" class="overlay">Info</div>' +
              '<div ng-show="showOpenOverlay" class="overlay">Open</div>',
    link: function(scope, element, attributes, controller, transclude) {
      MultiTransclude.transclude(element, transclude);
      scope.showInfoOverlay = false;
      scope.showOpenOverlay = false;
      scope.toggleInfoOverlay = function() {
        scope.showInfoOverlay = !scope.showInfoOverlay;
        if (scope.showInfoOverlay) {
          scope.showOpenOverlay = false;
        }
      };
      scope.toggleOpenOverlay = function() {
        scope.showOpenOverlay = !scope.showOpenOverlay;
        if (scope.showOpenOverlay) {
          scope.showInfoOverlay = false;
        }
      };
    }
  };
}]);
