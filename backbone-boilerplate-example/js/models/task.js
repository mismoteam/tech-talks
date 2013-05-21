define([
  'backbone',
  'config'
], function(Backbone, config) {
  var taskModel = Backbone.Model.extend({


    initialize: function(){

    },

    url: function(){
      
        var url = config.apiBaseUrl + 'lists/' + config.taskListId + '/tasks/';

        if(this.get('id')){
          url += this.get('id');
        }

        return url;

    }

  });

  return taskModel;

});
