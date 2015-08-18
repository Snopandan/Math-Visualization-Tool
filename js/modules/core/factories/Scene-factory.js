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

    that.clear = function() {
      for (var i = scene.children.length - 1; i >= 0; i--) {
        scene.remove(scene.children[i]);
      }
    };

    return that;
  };

  return Scene;
});
