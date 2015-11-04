VisualizationModule.factory('Variable', [function() {
  var Variable = function(type, name, value) {
    var that = {};

    var type_ = type;
    var name_ = name;
    var value_ = value;

    that.getType = function() {
      return type_;
    };

    that.getName = function() {
      return name_;
    };

    that.getValue = function() {
      return value_;
    };

    that.setType = function(rhs) {
      type_ = rhs;
    };

    that.setName = function(rhs) {
      name_ = rhs;
    };

    that.setValue = function(rhs) {
      value_ = rhs;
    };

    return that;
  };

  return Variable;

}]);
