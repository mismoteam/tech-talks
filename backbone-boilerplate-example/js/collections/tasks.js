define([
  'backbone',
  'config',
  'models/task'
], function(Backbone, config, taskModel){
  var taskCollection = Backbone.Collection.extend({
    model: taskModel,
    initialize: function(){

    },

    url: function(){
      
        var url = config.apiBaseUrl + 'lists/' + config.taskListId + '/tasks';

        return url;

    },

    parse: function(response){
      return response.items;
    }

  });

  return taskCollection;

});