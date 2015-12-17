CoreModule.directive('guiComponent', ['MultiTransclude', function(MultiTransclude) {
  return {
    restrict: 'E',
    scope: {
      nextCallback: '=',
      previousCallback: '=',
      title: '=',
      maxStage: '=',
      currentStage: '=',
      asfasf: '=',
      nextVizCallback: '=',
      previousVizCallback: '='
    },
    transclude: true,
    template: '<div id="topBar">' +
                '<span id="titleSpan">{{title}}' +
                '<span id="leftBottomSpan"><img id="previousButton" class="previousButton" ng-click="previousVizCallback()" src="images/icons/arrow_disabled.png"/></span>' +
                '---'+
                '<span id="rightBottomSpan"><img id="nextButton" class="nextButton" ng-click="nextVizCallback()" src="images/icons/arrow.png"/></span>' +
                '<img id="hideButton" ng-click="clickHide()" class="hideButton" src="images/icons/eye_open.png"/>' +
                '<hr>' +
              '</div>' +
              '<div ng-show="sidebarVisible" id="content" transclude-id="content"></div>' +
              '<div ng-show="sidebarVisible" id="bottomBar">' +
                '<hr>' +
                '<span id="leftBottomSpan"><img id="previousButton" class="previousButton" ng-click="previous()" src="images/icons/arrow_disabled.png"/></span>' +
                '<span class="stageNumbers" id="centerBottomSpan"> {{currentStage}} / {{maxStage}} </span>' +
                '<span id="rightBottomSpan"><img id="nextButton" class="nextButton" ng-click="next()" src="images/icons/arrow.png"/></span>' +
              '</div>',
    link: function($scope, element, attributes, controller, transclude) {
      MultiTransclude.transclude(element, transclude);

      $scope.sidebarVisible = true;
      $scope.clickHide = function() {
        if ($scope.sidebarVisible) {
          $scope.sidebarVisible = false;
          document.getElementById("hideButton").src = "images/icons/eye_closed.png";
        }else {
          $scope.sidebarVisible = true;
          document.getElementById("hideButton").src = "images/icons/eye_open.png";
        }
      };

      var nextDisabled = false;
      var previousDisabled = true;
      function toogleNext() {
        nextDisabled = !nextDisabled;
        document.getElementById("nextButton").src = nextDisabled ? 'images/icons/arrow_disabled.png' : 'images/icons/arrow.png';
      }

      function tooglePrevious() {
        previousDisabled = !previousDisabled;
        document.getElementById("previousButton").src = previousDisabled ? 'images/icons/arrow_disabled.png' : 'images/icons/arrow.png';
      }

      $scope.next = function() {
        if (!nextDisabled) {
          $scope.nextCallback();
          if(previousDisabled) {
            tooglePrevious();
          }
        }

        if ($scope.currentStage === $scope.maxStage - 1) {
          if (!nextDisabled) {
            toogleNext();
          }
        }
      };

      $scope.previous = function() {
        if (!previousDisabled) {
          $scope.previousCallback();
          if(nextDisabled) {
            toogleNext();
          }
        }

        if ($scope.currentStage === 2) {
          if (!previousDisabled) {
            tooglePrevious();
          }
        }

      };


    }
  };
}]);
