/*
* 本组件只需要要两个api
* 1.setData(titleList,contentList);
* 其中，titleList包含的是tab标题的文字字符串，contentList是tab内容的html代码字符串
* 先使用setData方法设置数值后使用第二个方法
* 2.init(dom)
* 在自己的页面中创建一个dom元素，然后将其作为传入此方法，完成tab组件的挂载，tab组件将挂载到这个dom元素上。
* */

const Tab = (function(){
	let itemList;
	let contentList;
	let selectedIndex;
	let callBacks;
	class Tab{
		constructor(){
			itemList = [];
			contentList = [];
			selectedIndex = 0;
			callBacks= [];
		}
		setData(item,content){
			itemList = item;
			contentList = content;
		}

		init(dom,item,content){
			this.setData(item,content);//初始化数据
			let mydiv = document.createElement('div');
			mydiv.innerHTML = this.getElementString();
			dom.appendChild(mydiv);//增加元素
			this.setCss('main.css');//引入css样式
			this.setCursorAndItem();
			return this;
		}

		addCallBacks(fn){
			callBacks.push(fn);
		}
		//得到模板的代码字符串
		getElementString(){
			var	contentString = `
<section class="tab-title">
	<ul id="tab-title-item">`;
			itemList.forEach(item=>{
				contentString+=`<li>${item}</li>`
			});
			contentString += `
	</ul>
	<div class="cursor"></div>
</section>
<section class="tab-content">
	<ul id="tab-content-item">`;
			contentList.forEach(item=>{
				contentString += `<li>${item}</li>`;
			})
			contentString += `
	</ul>
</section>`;
			return contentString
		}

		//添加css文件
		setCss(url){
			var cssFile = document.createElement('link');
			cssFile.rel = 'stylesheet';
			cssFile.type = 'text/css';
			cssFile.href = url;
			document.head.appendChild(cssFile);
		}

		//下方函数用于动态设置cursor的长度
		getN(arr,node,n){
			node.style.width = arr[n].clientWidth+'px';
			console.log(arr)
			let sum = 20;
			arr.forEach((item,index)=>{
				if(index < n){
					sum += item.clientWidth+16;
				}
			});
			node.style.left = sum+'px';
		}

		setCursorColor(color){
			var cursor = document.querySelectorAll('.cursor')[0];
			cursor.style.backgroundColor = color;
		}//设置滑条颜色
		setActiveColor(color){
			var cssFile = document.createElement('style');
			cssFile.innerHTML = `
			.active{
				color: ${color};
			}`
		}//设置选中标题的颜色

		setCursorAndItem(){
			//获取各个dom元素
			let cursor = document.querySelectorAll('.cursor')[0];
			let titles = document.querySelectorAll('#tab-title-item li');
			let contents = document.querySelectorAll('#tab-content-item li');
			let firstWidth = titles[0].clientWidth;
			console.log(firstWidth)
			titles[0].classList.add('active');
			contents[0].classList.add('selected')
			this.getN(titles,cursor,0);
			titles.forEach((item,index)=>{
				item.addEventListener('click',()=>{
					if(index !== selectedIndex){
						this.getN(titles,cursor,index);//设置下滑条的宽度与位置
						titles[selectedIndex].classList.remove('active');
						contents[selectedIndex].classList.remove('selected');//去掉已选中的项目
						item.classList.add('active');
						selectedIndex = index;
						contents[selectedIndex].classList.add('selected');
						callBacks.forEach(item=>{
							item();
						})
					}
				})
			});

		}
	}
	return Tab
})()

var myTab = new Tab();




