GraphicsModule.factory('ParametricSurface', ['Vec3', function(Vec3) {
  var ParametricSurface = function(spec) {
    var that = {};
    spec = spec || {};

    var defaultFunction = function(x,y) {
      return Vec3(0, 0, 0);
    };

    var defaults = {
      func: defaultFunction,
      slices: 10,
      stacks: 10,
      uMax: Math.PI,
      uMin: 0,
      vMax: 2 * Math.PI,
      vMin: 0,
      Xuv: 'cos(u)*(2 + 1*cos(v))',
      Yuv: 'sin(u)*(2 + 1*cos(v))',
      Zuv: '1*sin(v)'
    };

    var func = 'func' in spec ? spec.func : defaults.func;
    var slices = 'slices' in spec ? spec.slices : defaults.slices;
    var stacks = 'stacks' in spec ? spec.stacks : defaults.stacks;


    var uMax = 'uMax' in spec ? spec.uMax : defaults.uMax;
    var uMin = 'uMin' in spec ? spec.uMin : defaults.uMin;
    var vMax = 'vMax' in spec ? spec.vMax : defaults.vMax;
    var vMin = 'vMin' in spec ? spec.vMin : defaults.vMin;
    var Xuv = 'Xuv' in spec ? spec.Xuv : defaults.Xuv;
    var Yuv = 'Yuv' in spec ? spec.Yuv : defaults.Yuv;
    var Zuv = 'Zuv' in spec ? spec.Zuv : defaults.Zuv;

    function createGraph()
    {
      // var uMax = 0;
      // var uMin =  Math.PI;
      // var vMax = 0;
      // var vMin = 2 * Math.PI;
      var segments = 200;
    	uRange = uMax - uMin;
    	vRange = vMax - vMin;

      xFuncText = Xuv;
      yFuncText = Yuv;
      zFuncText = Zuv;



    	xFunc = Parser.parse(xFuncText).toJSFunction( ['u','v'] );
    	yFunc = Parser.parse(yFuncText).toJSFunction( ['u','v'] );
    	zFunc = Parser.parse(zFuncText).toJSFunction( ['u','v'] );
    	meshFunction = function(u0, v0)
    	{
    		var u = uRange * u0 + uMin;
    		var v = vRange * v0 + vMin;
    		var x = xFunc(u,v);
    		var y = yFunc(u,v);
    		var z = zFunc(u,v);
    		if ( isNaN(x) || isNaN(y) || isNaN(z) )
    			return new THREE.Vector3(0,0,0); // TODO: better fix
    		else
    			return new THREE.Vector3(x, y, z);
    	};

    	// true => sensible image tile repeat...
    	graphGeometry = new THREE.ParametricGeometry( meshFunction, segments, segments, true );

    	// xMin = graphGeometry.boundingBox.min.x;
    	// xMax = graphGeometry.boundingBox.max.x;
    	// yMin = graphGeometry.boundingBox.min.y;
    	// yMax = graphGeometry.boundingBox.max.y;

      var material = new THREE.MeshPhongMaterial( { color: 0x2aa198, side: THREE.DoubleSide } );
    	var graphMesh = new THREE.Mesh( graphGeometry, material );
    	graphMesh.doubleSided = true;

      return graphMesh;
    }

    var object = createGraph();
    object.rotation.x = -Math.PI / 2.0;
    that.getObject = function() {
      return object;
    };

    return that;
  };

  return ParametricSurface;
}]);
