define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'collections/tasks',
  'models/task',
  'text!templates/tasks/list.html',
  'text!templates/widgets/loading.html'
  ], function($, _, Backbone, config, taskCollection, taskModel, taskListTemplate,loadingTemplate){
    var TaskListView = Backbone.View.extend({
      el: '.taskList',

      events: {

        'click #btn-remove' : 'removeTask'

      },
      
      intialize: function () {


      },
      
      render: function () {

        var el = this.$el,
        tasks = new taskCollection(),
        error = '';

        if(el === undefined){
          el = $('.taskList');
        }

        // Show the loading widget
        el.html(loadingTemplate);

        //Wait until the task list is fetched before rendering
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

      },

      removeTask: function(event){

        var that = this,
            el = this.$el,
            btn = ($(event.target).context.tagName === 'BUTTON') ? $(event.target) : $(event.target.parentNode),
            taskId = btn ? btn.attr('data-task-id') : '',
            task = new taskModel({id: taskId}),
            tasks = this.collection,
            error;

          if(taskId !== ''){

            el.html(loadingTemplate);
            console.log('Deleting task id=' + taskId);

            el.ajaxStop(function(){

              el.unbind('ajaxStop');

              that.render();

            });

            //delete the task
            task.destroy({
              headers: {
                'Authorization' : 'Bearer ' + config.authToken
              },
              success: function(model, response){
                console.log('Deleted task id=' + taskId);
              },
              error: function(xhr, response, options){
                alert('Error deleting task id=' + taskId);
              }
            });

          }
          else{
            alert('Invalid task Id');
          }

      }

    });

      return TaskListView;

    });
