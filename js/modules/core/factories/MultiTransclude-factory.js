core.factory('MultiTransclude', function() {
  return {
    transclude: function(element, transcludeFunction) {
      transcludeFunction(function(clone) {
        angular.forEach(clone, function(cloneElement) {
          var cloneAttributes = cloneElement.attributes;
          if(cloneAttributes) {
            var targetId = cloneAttributes['transclude-to'].value;
            var target = element.find('[transclude-id="'+ targetId +'"]');
            if(target.length) {
              target.append(cloneElement);
            }else {
              cloneElement.remove();
              throw new Error('Could not find transclude-to attribute. ' + targetId);
            }
          }
        });
      });
    }
  };
});
