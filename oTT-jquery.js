;(function (window, undefind){
	//变量声明
	
	
	//创建工厂
	oTT = function (str){
		return new oTT.fn.init(str);
	}
	//改变工厂原型指向
	oTT.fn = oTT.prototype = {
		//将构造函数指回oTT
		constructor : oTT,
		//添加扩展方法
		extend : function (nature , value) {
			if(typeof nature ==="object"){
				for(var k in nature){
				     this[k] = nature[k];
				  }
			}else{
				this[nature] = value;
			}
		},
		//添加内部迭代方法
		doFor : function (fn){
			for(var i = 0; i < this.length; i++){
			    fn.call(this,i);
			}
		},
		//添加splice方法 让模仿更真实
		splice : function (){
			
		}
	}
	
	//在原型上添加初始化构造函数
	oTT.fn.init = function (str){
		var elements = document.querySelectorAll(str);
		//将oTT对象变成伪数组 并将获取到的元素添加上去
		;[].push.apply(this,elements);
	}
	//将原型上的构造函数原型指向oTT工厂
	oTT.fn.init.prototype = oTT.prototype;
	
//模块化添加属性和方法  start
	//css模块
	oTT.fn.extend({
		//css函数
		css : function (nature, value){
			var reg = /px$/i;
			if(nature instanceof Object){
				for(var k in nature){
				     this.doFor(function (i){
						this.needPx(k) && (nature[k] = reg.test(nature[k]) ? nature[k] : nature[k] +"px");	
				     	this[i].style[k] = nature[k];
				     });
				  }
			}else if(typeof nature === "string" && value){
				this.needPx(nature) && (value = reg.test(value) ? value : value + "px"); 
				this.doFor(function (i){
					this[i].style[nature] = value;
				});
			}else if(typeof nature === "string" && !value){
				return this.getStyle(this[0],nature);
			}
			return this;
		},
		//判断属性是否需要单位
		needPx : function (k){
			if(k === "width" || k === "height" || k === "top" || k === "left" || k ==="right" || k === "bottom"){
				return true;
			}else {
				return false;
			}
		},
		//获取样式函数
		getStyle : function (element,style){
			element =  element instanceof Array ? element[0] : element;
			if("getComputedStyle" in window){
				return window.getComputedStyle(element,null)[style];
			}else {
				return element.currentStyle[style];
			}
		}
	});
	//事件模块
	
//模块化添加属性和方法  end
	
	window.oTT = oTT;
	
})(window);
