/**
 * Handles configuration values
 * http://stackoverflow.com/questions/5608685/using-requirejs-how-do-i-pass-in-global-objects-or-singletons-around
 */

define([
], function(){

	var apiBaseUrl = 'https://www.googleapis.com/tasks/v1/'; 
    
	// This task list id is from my account, you will need to either 
	// use your own task list or maybe implement task list selection 
	// as an excercize
    var taskListId = 'MTA4NjY3ODU1NTA3NjgwMjM0NTk6MTIyMDY1MDUxNzow';
    
    var authToken = '';

    return {
    	apiBaseUrl : apiBaseUrl,
        taskListId : taskListId,
        authToken : authToken
    };

});


