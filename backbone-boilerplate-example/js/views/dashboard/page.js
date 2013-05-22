define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'text!templates/dashboard/authorizing.html',
  'text!templates/dashboard/page.html'
], function($, _, Backbone, config, authorizingTemplate, dashboardPageTemplate){
  var DashboardPage = Backbone.View.extend({
    el: '.page',
    render: function () {
      var el = $(this.el);

        el.html(authorizingTemplate);

        // Load google api and authorize if necessary
        if(config.authToken === ''){
          require(['https://apis.google.com/js/client.js'], function() {
            // Poll until gapi is ready
            function checkGAPI() {
              if (gapi && gapi.auth) {
                var auth_config = {
                    'client_id': '330576716746.apps.googleusercontent.com',
                    'scope': 'https://www.googleapis.com/auth/tasks'
                };
               gapi.auth.authorize(auth_config, function() {
                    config.authToken = gapi.auth.getToken().access_token;
                    el.html(dashboardPageTemplate);
               }); 

              } else {
                setTimeout(checkGAPI, 100);
              }
            }
            
            checkGAPI();
          });
        }
        else{
          el.html(dashboardPageTemplate);
        }
      
    }
  });
  return DashboardPage;
});
