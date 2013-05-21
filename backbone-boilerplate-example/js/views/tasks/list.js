define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'collections/tasks',
  'text!templates/tasks/list.html',
  'text!templates/widgets/loading.html'
  ], function($, _, Backbone, config, taskCollection, taskListTemplate,loadingTemplate){
    var TaskListView = Backbone.View.extend({
      el: '.taskList',
      
      intialize: function () {

      },
      
      render: function () {

        var el = this.$el,
        tasks = new taskCollection(),
        error = '';

        // Show the loading widget
        el.html(loadingTemplate);

        //Wait until the task list is fetched before 
        el.ajaxStop(function(){

          el.unbind('ajaxStop');
          
          el.html(_.template(taskListTemplate, {error: error, tasks: tasks}));

        });

        //Fetch the tasks
        tasks.fetch({
          headers: {
            'Authorization' : 'Bearer ' + config.authToken
          },
          success: function(model, response){
            
          },
          error: function(xhr, response, options){
            error = response.statusText;
          }
        });

        

      }

    });

      return TaskListView;

    });
