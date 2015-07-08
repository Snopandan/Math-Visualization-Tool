graphics.factory('Vector', function() {

  function create(vector, width, height, color) {
    var defaultVector = new THREE.Vector3(0,1,0);

    var bodyGeometry = new THREE.CylinderGeometry(width, width, height, 50, 50, false);
    var bodyMaterial = new THREE.MeshPhongMaterial( { color: color} );
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    var headGeometry = new THREE.CylinderGeometry(0, 2*width, 0.1, 50, 50, false);
    var headMaterial = new THREE.MeshPhongMaterial( { color: color } );
    var head = new THREE.Mesh(headGeometry, headMaterial);

    head.position.y = height/2;
    body.add(head);

    var rotation = computeRotation(defaultVector, vector);
    body.rotateOnAxis(rotation.axis, rotation.angle);

    return body;
  }

  function computeRotation(from, to) {
    var vectorAngle = from.angleTo(to);
    var vectorAxis = new THREE.Vector3();
    vectorAxis.crossVectors(from, to);
    vectorAxis.normalize();

    return {angle: vectorAngle, axis: vectorAxis};
  }

  var Vector = function(spec) {
    this.vector = new THREE.Vector3();
    this.vector.fromArray('vector' in spec ? spec.vector : [1, 1, 1]);
    this.currentVector = new THREE.Vector3();
    this.currentVector.copy(this.vector);
    this.color = 'color' in spec ? spec.color : 0xff0000;
    this.width = 'width' in spec ? spec.width : 0.01;
    this.length = 'length' in spec ? spec.length : 1;
    this.object = create(this.vector, this.width, this.length, this.color);

    this.goalVector = new THREE.Vector3(0,0,0);
    this.animationSpeed = 0;
    this.animationStep = 0;
  };

  Vector.prototype.setAnimationProperties = function(params) {
    this.goalVector.fromArray(params.vector || [1, 1, 1]);
    this.animationSpeed = 'speed' in params ? params.speed : 0.01;
  };

  Vector.prototype.animate = function() {
    if (this.animationSpeed === 0) {
        return;
    }

    this.animationStep += this.animationSpeed;
    this.animationStep = this.animationStep >= 1 ? 1 : this.animationStep;
    var lerpVector = new THREE.Vector3();
    lerpVector.lerpVectors(this.vector, this.goalVector, this.animationStep);

    var rotation = computeRotation(this.currentVector, lerpVector);
    this.currentVector.copy(lerpVector);
    this.object.rotateOnAxis(rotation.axis, rotation.angle);
  };

  return Vector;
});
