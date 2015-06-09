(function(){
  'use strict';
  var almacen={};
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert(''+device.uuid);
      }, 100);
    };
  });

  module.controller('DetailController', function($scope, $data) {
    $scope.item = $data.selectedItem;
    //navigator.notification.vibrate(2000); //milliseconds
	//navigator.notification.beep(2); // numbr of times
  });

  module.controller('AlmacenController', function($scope, $data, $http) {
    $scope.items = almacen;  
    $http.get('http://www.empowerlabs.com/intellibanks/data/Sandbox/VeronicaLopez/almacen.php').
  success(function(data, status, headers, config) {
  	data.reverse();
    $data.items=data;
    almacen=data;
    $scope.items = $data.items;  
    $scope.showDetail = function(item) {
      var selectedItem = item;
      $data.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('detailAlmacen.html', {title : selectedItem.title});
    };
  }).
  error(function(data, status, headers, config) {
  	
  });
  });

  module.factory('$data', function() {
      var data = {};
      
      data.items = almacen;
      
      return data;
  });
})();