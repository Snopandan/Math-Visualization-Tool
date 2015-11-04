VisualizationModule.factory('Component', [function() {
  var Component = function() {
    var that = {};

    var dependencies_ = [];
    var numberOfDependencies_ = 0;
    var child_ = null;
    var output_ = null;


    that.fun = function() {
      console.log('Fun is undefined!');
    };

    that.resolve = function() {

      for (var i = 0; i < numberOfDependencies_; i++) {
        dependencies_[i].resolve();
      }

      that.fun();

      if (child_ !== null) {
        child_.resolve();
      }
    };

    that.addDependency = function(dependency) {
      dependencies_.push(dependency);
      numberOfDependencies_++;
    };

    that.setOutput = function(output) {
      output_ = output;
    };

    that.setFun = function(fun) {
      that.fun = fun;
    };

    that.getOuput = function() {
      return output_;
    };

    return that;
  };

  return Component;

}]);
