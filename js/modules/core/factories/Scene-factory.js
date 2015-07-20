core.factory('Scene', function() {

  var Scene = function() {
    var that = {};

    var scene = new THREE.Scene();

    that.add = function(object) {
      scene.add(object.getObject());
    };

    that.getObject = function() {
      return scene;
    };

    return that;
  };

  return Scene;
});
