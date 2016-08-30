/**
 * 帧动画
 */

'use strict'

var loadImage = require('./imageloader');
var Timeline = require('./timeline.js')

//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

//同步任务
var TASK_SYNC = 0;
//异步任务
var TASK_ASYNC = 1;

/**
 * 简单的函数封装，执行callback
 * @param  {Function} callback 执行的函数
 * @return {Function}          [description]
 */
function next(callback) {
	
	callback && callback();
}

/**
 * 帧动画库类
 * @constructor
 */
function Animation() {
	
	this.taskQuere = [];
	this.index = 0;
	this.timeline = new Timeline;
	this.state = STATE_INITIAL;
}

/**
 * 添加一个同步任务，预加载图片
 * @param  {Array} imglist 图片数组
 * @return {[type]}         [description]
 */
Animation.prototype.loadImage = function (imglist) {
	
	var taskFn = function (next) {
		loadImage(imglist.slice(), next);
	};
	var type = TASK_SYNC;

	return this._add(taskFn, type);
}


/**
 *  添加一个定时任务，通过定时改变
 *  图片背景位置，实现帧动画
 * @param  {Object} ele       dom对象
 * @param  {Array} positions 背景位置数组
 * @param  {String} imgUrl    图片地址
 * @return {[type]}           [description]
 */
Animation.prototype.changePosition = function (ele, positions, imgUrl) {
	
	var len = positions.length;
	var taskFn;
	var type;
	if (len) {

		taskFn = function (next, time) {
			
			if (imageUrl) {

				ele.style.backgroundImage = 'url(' + imageUrl + ')';
			}
			//获得当前背景图片位置索引
			var index = Math.min(time / me.interval | 0, len - 1);
			var position = positions[index].split(' ');
			//改变 dom 对象的背景图片位置
			ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';

			if (index === len - 1) {

				next();
			}
		}

		type = TASK_ASYNC;
	}
	else{

		taskFn = next;
		type = TASK_SYNC;
	}

	return this._add(taskFn, type);
}

/**
 * 添加一个异步定时任务，通过定时改变 image 标签的 src 属性，实现帧动画
 * @param  {Object} ele     dom对象
 * @param  {[type]} imglist [description]
 * @return {[type]}         [description]
 */
Animation.prototype.changeSrc = function (ele, imglist) {
	
	var len = imglist.length;
	var taskFn;
	var type;
	if (len) {

		var me = this;
		taskFn = function (next, time) {
			//获得当前图片索引
			var index = Math.min(time / me.interval | 0, len - 1);
			//改变image对象的图片地址
			ele.src = imaglist[index];
			if (index === len - 1) {

				next();
			}
		}

		type = TASK_ASYNC;
	}
	else{

		taskFn = next;
		type = TASK_SYNC
	}

	return this._add(taskFn, type);
}


/**
 * 高级用法，添加一个异步定时执行的任务，
 * 该任务自定义动画每帧执行的任务函数
 * @param  {Function} taskFn 自定义每帧执行的任务函数
 * @return {[type]}        [description]
 */
Animation.prototype.enterFrame = function (taskFn) {
	
	return this._add(taskFn, TASK_ASYNC);
}

/**
 * 添加一个同步任务，可以在上一个任务
 * 完成后，执行回调函数
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Animation.prototype.then = function (callback) {
	
	var taskFn = function (next) {
		
		callback();
		
	}
}

/**
 * 开始执行任务，异步定时任务执行的间隔
 * @param  {Number} interval 时间间隔
 * @return {[type]}          [description]
 */
Animation.prototype.start = function (interval) {
	
	if (this.state === STATE_START) {

		return this;
	}
	//如果任务链中没有任务，则返回
	if (!this.taskQuere.length) {

		return this;
	}

	this.state = STATE_START;
	this.interval = interval;
	this._runTask();
	return this;
}

/**
 * 添加一个同步任务，该任务就是回退到上一个任务中，
 * 实现重复上一个任务的效果，可以定义重复的次数
 * @param  {Number} times 重复次数
 * @return {[type]}       [description]
 */
Animation.prototype.repeat = function (times) {
	// body...
}

/**
 * 添加一个同步任务，相当于 repeat()
 * 更友好的接口，无线循环上一次任务
 * @return {[type]} [description]
 */
Animation.prototype.repeatForever = function () {
	// body...
}

/**
 * 设置当前任务执行结束后到下一个任务开始前的等待时间
 * @param  {Number} time 等待时长
 * @return {[type]}      [description]
 */
Animation.prototype.wait = function (time) {
	// body...
}

/**
 * 暂停当前的异步定时任务
 * @return {[type]} [description]
 */
Animation.prototype.pause = function () {
	// body...
}



/**
 * 重新执行上一次暂停的异步任务
 * @return {[type]} [description]
 */
Animation.prototype.restart = function () {
	// body...
}



/**
 * 释放资源
 * @return {[type]} [description]
 */
Animation.prototype.dispose = function () {
	// body...
}

/**
 * 添加一个任务到任务队列中
 * @param {Function} taskFn 任务方法
 * @param {Number} type   任务类型
 */
Animation.prototype._add = function (taskFn, type) {
	
	this.taskQuere.push({
		taskFn: taskFn,
		type: type
	});

	return this;
};

/**
 * 执行任务
 * @private
 * @return {[type]} [description]
 */
Animation.prototype._runTask = function() {
	
	if(!this.taskQueue || this.state !== STATE_START){

		return;
	}
	//任务执行完毕
	if (this.index === this.taskQueue.length) {

		this.dispose();
		return;
	}
	//获得任务链上的当前任务
	var task = this.taskQueue[this.index];
	if (task.type === TASK_SYNC) {

		this._syncTask(task);
	}
	else{
		this._asyncTask(task);
	}
};

/**
 * 同步任务
 * @param  {Object} task 执行任务对象
 * @private
 * @return {[type]}      [description]
 */
Animation.prototype._syncTask = function(task) {
	
	var me = this;
	var next = function () {
		//切换到下一个任务
		me._next();
	}
	var taskFn = task.taskFn;
	taskFn(next);
};

/**
 * 异步任务
 * @param  {Object} task 执行任务对象
 * @private
 * @return {[type]}      [description]
 */
Animation.prototype._asyncTask = function(task) {
	var me = this;
	//定义每一帧执行的回调函数
	var enterFrame = function (time) {
		
		var taskFn = task.taskFn;
		var next = function () {
			
			//停止当前任务
			me.timeline.stop();
			//执行下一个任务
			me._next();
		};
		taskFn(next, time);
	}

	this.timeline.onenterframe = enterFrame;
	this.timeline.start(this.interval);
};

/**
 * 切换到下一个任务
 * @private
 * @return {[type]} [description]
 */
Animation.prototype._next = function() {
	
	this.index++;
	this._runTask;
};