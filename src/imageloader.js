'use strict';

/**
 * 预加载图片函数
 * @param  {Array or Object}   images   加载图片的数组或者对象
 * @param  {Function} callback 全部图片加载完毕后调用的回调函数
 * @param  {Number}   timeout  加载超时的时长
 * @return {[type]}            [description]
 */
function loadImage(images, callback, timeout) {
	//加载完成图片的计数器
	var count = 0;
	// 全部图片加载成功的一个标志位
	var success = true;
	// 超时 timer 的 id
	var timeoutId = 0;
	// 是否加载超时的标志位
	var isTimeout = false;

	//对图片数组（或对象）进行
	for (var key in images) {
		//过滤 prototype 上的属性
		if (!images.hasOwnProperty(key)) {
			continue;
		}
		//获得每个图片元素
		//期望格式十个 object: {src: xxx}
		var item = images[key];

		if (typeof item === 'string') {
			item = images[key] = {
				src: item
			};
		} 
		//如果格式不满足期望，则丢弃此条数据进行下一次遍历
		if (!item || !item.src) {
			continue;
		}

		//计数 + 1
		count++；
		//设置图片元素的 id
		item.id = '__img__' + key + getId();
		//设置图片元素的 img，它是一个 Image 对象
		item.img = window[item.id] = new Image();

		doLoad(item);
	}

	/**
	 * 真正进行图片加载的函数
	 * @param  {Object} item 图片元素对象
	 * @return {[type]}      [description]
	 */
	function doLoad(item) {
		
		item.status = 'loading';

		var img = item.img;
		//定义图片加载成功的回调函数
		img.onload = function () {
			success = success & true;
			item.status = 'loaded';
			done();
		}	
		//定义图片加载失败的回调函数
		img.onerror = function () {
			success = false;
			item.status = 'error';
			done();
		}

		//发起了一个 http(s) 的请求
		img.src = item.src;

		/**
		 * 每张图片加载完成的回调函数
		 * @return {Function} [description]
		 */
		function done() {
			
			img.onload = img.onerror = null;

			try{
				delete window[item.id];
			} catch (e) {

			}

			if (!--count) {
				callback(success);
			}
		}
	}
}

var __id = 0;

function getId() {
	
	return ++__id;
}

module.exports= loadImage;