(function(angular) {

  // 获取主模块
  var todoApp = angular.module('TodoApp');

  // 注册一个服务，相当于一个公共的数据输入输出模块，这里负责业务逻辑，进行动态数据绑定
  // 1.首先注册一个服务 注册方式就是借助于模块的service方法，service的参数主要是一个构造函数
  // 2.使用这个服务时会自动构造一个对应的对象供使用,this就是指向这个对象
  // 3.在需要使用该服务的控制器上注入该服务
  todoApp.service('Storage', ['$window', function($window) {
    var storage = $window.localStorage;

    function getId() {
      return Math.random();
    }

    var todos = JSON.parse(storage.getItem('my_todos') || '[]'); // x00001

    this.save = function() {
      storage.setItem('my_todos', JSON.stringify(todos));
    };

//将从$window.localStorage获取的todos返回
    this.get = function() {
      return todos;
    };

    this.add = function(input) {
      //将输入的任务（这个任务有自己的id，和输入值，以及是否完成）push到todos数组中
      todos.push({ id: getId(), text: input, completed: false });
      this.save();//并且存到$window.localStorage里
    };

    this.remove = function(current) {
      console.log(current);
      var index = todos.indexOf(current);//获取当前todo在todos的索引值
      todos.splice(index, 1);//删除todos索引值从index开始到index+1的todo任务
      this.save();//然后保存
    };

    this.hasCompleted = function() {
      //todos.some(满足条件)，下面等价todos.some(todo.completed),遍历到todo.completed的代表满足，返回ture，否则返回false
      return todos.some(todo => todo.completed);//function(todo){retrun todo.completed}
    };

    this.clearCompleted = function() {
      // 先找到所有没有完成的任务 装到一个新的数组中
      var unCompleteds = [];
      todos.forEach(todo => {
        if (!todo.completed) {
          unCompleteds.push(todo);
        }
      });
      todos = unCompleteds;
      return todos;
    };

    this.allCompleted = function(checked) {
      todos.forEach(todo => { todo.completed = checked; });
    };


  }]);

})(angular);
