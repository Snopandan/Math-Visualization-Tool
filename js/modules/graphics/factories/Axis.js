graphics.factory('Axis', ['Vec3', 'Vector', function(Vec3, Vector) {
    function create(size, width, xColor, yColor, zColor) {
      var axis = new THREE.Mesh();
      var xAxis = Vector({vector: Vec3(1, 0, 0), width: width, length: size, color: xColor});
      var yAxis = Vector({vector: Vec3(0, 1, 0), width: width, length: size, color: yColor});
      var zAxis = Vector({vector: Vec3(0, 0, 1), width: width, length: size, color: zColor});
      axis.add(xAxis.getObject());
      axis.add(yAxis.getObject());
      axis.add(zAxis.getObject());

      return axis;
    }

    var Axis = function(spec) {
      spec = spec || {};
      var defaults = {
        size: 5,
        width: 0.03,
        xColor: 0xff0000,
        yColor: 0x00ff00,
        zColor: 0x0000ff
      };

      var that = {};
      var size = 'size' in spec ? spec.size : defaults.size;
      var width = 'width' in spec ? spec.width : defaults.width;
      var xColor = 'xColor' in spec ? spec.xColor : defaults.xColor;
      var yColor = 'yColor' in spec ? spec.yColor : defaults.yColor;
      var zColor = 'zColor' in spec ? spec.zColor : defaults.zColor;
      var object = create(size, width, xColor, yColor, zColor);


      that.getSize = function() {
        return size;
      };

      that.getWidth = function() {
        return width;
      };

      that.getObject = function() {
        return object;
      };

      return that;
    };

    return Axis;

}]);
