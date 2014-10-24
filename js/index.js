
$(document).ready(function(){

	//基本参数
	var config = {
		totalLayer:10,
		currentLayer:1,
		layerHeight: 50,
		borderWidth:1,
		layerQuene:[]
	};

	//搭建电梯结构
	constructDepart();

	//设置所在的层数
	setLayer(1);

	//启动电梯
	setInterval(function(){
		animate();
	},1000);
	
	//构造DOM元素
	function constructDepart (){
		
		$("#loft").height(config.layerHeight);
		$("#depart").height(config.totalLayer * (config.layerHeight + config.borderWidth ) );
		
		//add layer
		for(var i = config.totalLayer; i >= 1; i-- ){
			var elvatorLayer = "<div class='e_layer' id='e_layer_"+i+"'>"+i+"</div>";
			var	departLayer = "<div class='d_layer' id='d_layer_"+i+"'><input type='button' value='use'></input></div>";
			$("#depart .elvator").append(elvatorLayer);
			$("#elvator-room").append(departLayer);
		}
		//set height
		$(".e_layer").height(config.layerHeight);
		$(".d_layer").height(config.layerHeight).width($("#elvator-room").width() - $("#depart .elvator").width());
		$(".d_layer").eq(0).css("border-top","1px solid #ccc");
	}

	//电梯到达哪一层
	function animateToLayer (layer){
		var animateLayer = Math.abs(config.currentLayer-layer);//移动过的层数
		var endHeight = (config.layerHeight + config.borderWidth) * (config.totalLayer - layer);
		$("#loft").animate({top:endHeight},1000 * animateLayer,function(){
			hilightLayer(layer);
		});

		config.currentLayer = layer;
		
	}

	//设置电梯在哪一层
	function setLayer(n){
		$("#loft").css("top",(config.totalLayer - n)*(config.layerHeight + config.borderWidth));
		config.currentLayer = n;
	}

	//高亮显示到达层
	function hilightLayer(n){
		$("#ins").append("<p>"+n+"</p>");

		$("#d_layer_" + n).addClass("arrive");
		setTimeout(function(){
			$(".d_layer").removeClass("arrive");
		},750);
	}

	//事件绑定
	$(".d_layer input").on("click",function(){
		var index = $(this).parent().attr("id").split("_")[2];
		if(!_.contains(config.layerQuene,index)){
			config.layerQuene.push(index);
		}
	});

	//主函数
	function animate(){
		while(config.layerQuene.length > 0){
			animateToLayer(config.layerQuene[0]);
			config.layerQuene.shift();
		}
	}

});


