(function(angular) {
  'use strict';

  // 获取主模块
  var todoApp = angular.module('TodoApp');

//自定义指令模块，有DOM操作的都放到里来,就是将一段重复使用的代码封装起来（属性、方法封装起来，一次性暴露到HTML标签）
  // 定义一个指令（指令的作用就是在双击这个任务时自动得到焦点）
  todoApp.directive('autoFocus', [function() {
    //返回的是一个对象，里面放的是各方法的集合
    return {
      link: function(scope, element, attributes) {
        //scope表示单独作用域，即作用域范围在单独自身bs-panel内部，而不会影响其他的bs-panel，
        //不像$scope的作用域是全局（ng-app="myApp"包涵的范围）的
         console.log(element);//element就是所作用的DOM
        // console.log(attributes);attributes就是这个DOM的属性
        element.on('dblclick', function() {
          angular.element(this).find('input').eq(1)[0].focus();
        });
      }
    }
  }]);

})(angular);
