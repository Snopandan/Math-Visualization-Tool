VisualizationModule.factory('VisualizationParser', ['Visualization', 'Stage', 'Vector', 'Plane', 'Vec3', 'DirectionalLight', function(Visualization, Stage, Vector, Plane, Vec3, DirectionalLight) {
  var VisualizationParser = function() {
    var that = {};

    that.parse = function(json) {
      var visualizations = [];
      var numberOfVisualizations = 0;
      for (var property in json) {
        if (json.hasOwnProperty(property)) {
          var viz = Visualization();
          numberOfVisualizations++;
          var vizObject = json[property];
          console.log(vizObject);

          viz.setName(vizObject.name);

          var stagesObject = vizObject.stages;
          for (var i in stagesObject) {
            var stageObject = stagesObject[i];

            var stageSpec = {
              description: stageObject.description,
              inhereting: stageObject.inhereting
            };
            var stage = Stage(stageObject);

            var contentObject = stageObject.content;

            for (var j in contentObject) {

              switch (contentObject[j].type) {
                case 'Vector':
                  stage.add(Vector(convertJsonSpec(contentObject[j].spec)));
                break;
                case 'Plane':
                  stage.add(Plane(convertJsonSpec(contentObject[j].spec)));
                break;
                case 'DirectionalLight':
                  stage.add(DirectionalLight(convertJsonSpec(contentObject[j].spec)));
                  console.log("added light");
                break;
                default:
                  console.log('Could not recognize type ' + content[j].type);
              }


            }
            viz.addStage(stage);
          }
          viz.init();
          visualizations.push(viz);
        }
      }


      return {visualizations: visualizations,
              numberOfVisualizations: numberOfVisualizations};
    };

    function convertJsonSpec(spec) {
      var needsConverting = ['vector', 'position', 'normal'];

      function doesThisNeedToBeConverted(thing) {
        var numberOfObjectsToConvert = needsConverting.length;
        for (var i = 0; i < numberOfObjectsToConvert; i++) {
          if (thing === needsConverting[i])
          return needsConverting[i];
        }
      }

      for (var attribute in spec) {
        var attributeToConvert = doesThisNeedToBeConverted(attribute);
        if (attributeToConvert) {
          var internal = Vec3(spec[attribute][0], spec[attribute][1], spec[attribute][2]);
          spec[attributeToConvert] = internal;
        }
      }

      return spec;
    }

    return that;
  };

  return VisualizationParser;
}]);
