VisualizationModule.factory('VisualizationCollection', ['$http', 'VisualizationParser',  function($http, VisualizationParser) {
  var VisualizationCollection = function() {
    var that = {};
    var parser = VisualizationParser();

    that.fetch = function(callback) {
      $http.get('js/build/visualizations.json').then(function(res) {
        var visualizations = [];
        var numberOfVisualizations = 0;

        vizData = parser.parse(res.data);

        callback(vizData.visualizations, vizData.numberOfVisualizations);
      });
    };

    return that;
  };

  return VisualizationCollection;
}]);
