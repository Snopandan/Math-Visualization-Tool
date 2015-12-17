GraphicsModule.factory('ParametricGeometry', ['Vec3', function(Vec3) {
  var ParametricGeometry = function(spec) {
    var that = {};
    spec = spec || {};

    var defaultFunction = function(x,y) {
      return Vec3(0, 0, 0);
    };

    var defaults = {
      func: defaultFunction,
      slices: 10,
      stacks: 10,
      xMax: 10,
      xMin: -10,
      yMax: 10,
      yMin: -10,
      Fxy: 'sin(sqrt(x^2  + y^2))'
    };

    var func = 'func' in spec ? spec.func : defaults.func;
    var slices = 'slices' in spec ? spec.slices : defaults.slices;
    var stacks = 'stacks' in spec ? spec.stacks : defaults.stacks;

    var xMax = 'xMax' in spec ? spec.xMax : defaults.xMax;
    var xMin = 'xMin' in spec ? spec.xMin : defaults.xMin;
    var yMax = 'yMax' in spec ? spec.yMax : defaults.yMax;
    var yMin = 'yMin' in spec ? spec.yMin : defaults.yMin;
    var Fxy = 'Fxy' in spec ? spec.Fxy : defaults.Fxy;

    function createGraph()
    {
      // var xMax = 10;
      // var xMin = -10;
      // var yMax = 10;
      // var yMin = -10;
      // var a = 1;
      // var b = 1;
      var segments = 200;
      zFuncText = Fxy;

    	xRange = xMax - xMin;
    	yRange = yMax - yMin;
    	zFunc = Parser.parse(zFuncText).toJSFunction( ['x','y'] );
    	meshFunction = function(x, y)
    	{
    		x = xRange * x + xMin;
    		y = yRange * y + yMin;
    		var z = zFunc(x,y); //= Math.cos(x) * Math.sqrt(y);
    		if ( isNaN(z) )
    			return new THREE.Vector3(0,0,0); // TODO: better fix
    		else
    			return new THREE.Vector3(x, y, z);
    	};

    	// true => sensible image tile repeat...
    	graphGeometry = new THREE.ParametricGeometry( meshFunction, segments, segments, true );

      var material = new THREE.MeshPhongMaterial( { color: 0x2aa198, side: THREE.DoubleSide } );
    	var graphMesh = new THREE.Mesh( graphGeometry, material );
      return graphMesh;
    	// scene.add(graphMesh);
    }

    var object = createGraph();
    object.rotation.x = -Math.PI / 2.0;
    that.getObject = function() {
      return object;
    };

    return that;
  };

  return ParametricGeometry;
}]);
