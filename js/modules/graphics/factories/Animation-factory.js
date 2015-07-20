graphics.factory('Animation', function() {

  var Animation = function(from, target, onUpdate, spec) {
    spec = spec || {};

    var that = {};

    var defaults = {
      time: 1000,
      delay: 0,
      repeat: 0
    };
    var time = 'time' in spec ? spec.time : defaults.time;
    var delay = 'delay' in spec ? spec.delay : defaults.delay;
    var repeat = 'repeat' in spec ? spec.repeat : defaults.repeat;

    var tween = new TWEEN.Tween(from).to(target, time);
    tween.onUpdate(onUpdate);
    tween.delay(delay);
    tween.repeat(repeat);
    tween.easing(TWEEN.Easing.Linear.None);

    that.start = function() {
      tween.start();
    };

    that.stop = function() {
      tween.stop();
    };

    that.chain = function(animation) {
      tween.chain(animation.getObject());
    };

    that.getObject = function() {
      return tween;
    };

    that.onStart = function(callback) {
      tween.onStart(callback);
    };

    that.onStop = function(callback) {
      tween.onStop(callback);
    };

    return that;
  };

  return Animation;
});
