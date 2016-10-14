angular.module('nodeNote', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.todoData = {};
  // Get all notes
  $http.get('/api/notes')
  .success((data) => {
    $scope.noteData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  
  // Create a new note
$scope.createNote = () => {
  $http.post('/api/notes', $scope.formData)
  .success((data) => {
    $scope.formData = {};
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
};
// Delete a note
$scope.deleteNote= (noteID) => {
  $http.delete('/api/notes/' + noteID)
  .success((data) => {
    $scope.noteData = data;
    console.log(data);
  })
  .error((data) => {
    console.log('Error: ' + data);
  });
};
});