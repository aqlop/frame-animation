/**
 * 帧动画
 */

'use strict'

//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

/**
 * 帧动画库类
 * @constructor
 */
function Animation() {
	
	this.taskQuere = [];
	this.index = 0;
	this.state = STATE_INITIAL;
}

/**
 * 添加一个同步任务，预加载图片
 * @param  {Array} imglist 图片数组
 * @return {[type]}         [description]
 */
Animation.prototype.loadImage = function (imglist) {
	// body...
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
	// body...
}

/**
 * 添加一个异步定时任务，通过定时改变 image 标签的 src 属性，实现帧动画
 * @param  {Object} ele     dom对象
 * @param  {[type]} imglist [description]
 * @return {[type]}         [description]
 */
Animation.prototype.changeSrc = function (ele, imglist) {
	// body...
}


/**
 * 高级用法，添加一个异步定时执行的任务，
 * 该任务自定义动画每帧执行的任务函数
 * @param  {Function} taskFn 自定义每帧执行的任务函数
 * @return {[type]}        [description]
 */
Animation.prototype.enterFrame = function (taskFn) {
	// body...
}

/**
 * 添加一个同步任务，可以在上一个任务
 * 完成后，执行回调函数
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Animation.prototype.then = function (callback) {
	// body...
}

/**
 * 开始执行任务，异步定时任务执行的间隔
 * @param  {Number} interval 时间间隔
 * @return {[type]}          [description]
 */
Animation.prototype.start = function (interval) {
	// body...
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

