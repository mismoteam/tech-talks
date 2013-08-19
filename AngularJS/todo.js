function TodoCtrl($scope){
	
	$scope.todos = [
		{text:"Aprender Angular", state:false},
		{text:"Construir un App", state:false}
	];

	$scope.getTotalTodos = function(){
		return $scope.todos.length;
	};

	$scope.addTodo = function(){
		$scope.todos.push({text:$scope.formTodoText, state:false});
		$scope.formTodoText = '';
	};

	$scope.clearDone = function(){
		$scope.todos = _.filter($scope.todos, function(todo){
			return !todo.state;
		})
	};
}