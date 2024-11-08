    // 思路分析：
	// ①点击图片实现用户切换功能
	// 	1-1：默认两个用户，通过点击来回切换
	// ②点击发送按钮，把用户的聊天内容展示连天区域
	// 	2-1：点击发送按钮，把聊天内容展示在聊天区域
	// 	2-2：设定聊天在连天区域内不同位置显示
		// 获取图片标签
        var img = document.getElementById("icon");
		var arr = ["../../imag/tx/xq.png","../../imag/wo/hxsl.jpg"];
		var tag = 0;
		// 给图片对象绑定点击事件
		img.onclick = function(){
			// 根据当前显示的图片切换用户图片。
			if(tag == 0){
				img.src = arr[1];
				tag = 1;
				console.log(img.src);
			}else{
				img.src = arr[0];
				tag = 0;
			}
		}
		var btn = document.getElementById("btn");
		var num = 0; //统计聊天记录
		btn.onclick = function(){
			// 判断用户内容是否为空
			var text = document.getElementById("text").value;
			if(text == ""){
				alert("聊天内容不能为空");
			}else{
				// 把用户内容添加到区域区域
				var content = document.getElementsByTagName("ul")[0];
				content.innerHTML += "<li><img src='"+arr[tag]+"'/><span>"+text+"</span></li>"
			}
			var imgs = content.getElementsByTagName("img");
			var span = content.getElementsByTagName("span");
			num++;
			console.log(imgs[num]);
			console.log(span[num]);
			console.log(num);
			// 判断当前聊天的用户
			if(tag == 0){
				imgs[num].className = "imgleft";
				span[num].className = "spanleft";
			}else{
				imgs[num].className = "imgright";
				span[num].className = "spanright";
			}
			//清空聊天内容
			document.getElementById("text").value= "";			
		}
        