SchematicModule.directive('anchor', function() {
  return {
    restrict: 'E',
    scope: {
      text: '@',
      position: '@'
    },
    template: '<div class="anchorWrapper">' +
                '<div style="float:{{position}}" class="anchorOuter">' +
                  '<div ng-show="!selected" class="anchorInner"></div>' +
                '</div>' +
                '<div style="float:{{position}}" class="anchorText">{{text}}</div>' +
              '</div>',
    link: function(scope, element, attributes, controller) {

      var anchor = element.children()[0];

      scope.selected = false;
      function onClick(event) {
        scope.selected = !scope.selected;
        scope.$apply();
      }

      anchor.addEventListener('click', onClick, false);
    }
  };
});
