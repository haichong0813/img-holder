
var Canvas = require('canvas');
var fs = require('fs');
var ERROR_MSG = ''; //错误提示

/*
* 根据尺寸获取图片占位符
* @options (object) 宽度，高度
*/
exports.getImageBySize = function(req, res){

    var params = req.params.id,
        options = {};

    // 验证参数
    checkParams(params);

    // 判断是否异常
    if(ERROR_MSG != ''){
        options['width'] = 200;
        options['height'] = 200;
        options['text'] = ERROR_MSG;
    }else{
        // 判断参数是否为数组
        if(params.indexOf('x') > -1){
            var arr = params.split('x');
            options['width'] = arr[0];
            options['height'] = arr[1];
            options['text'] = arr[0]+ 'x' +arr[1];
        }else{
            if(typeof +params == 'number'){
                options['width'] = params;
                options['height'] = params;
                options['text'] = params+ 'x' +params;
            }
        }
    }

    // 绘制图形
    var canvas = drawGraph(options);

    // 转换图片
    canvasToImage(canvas, req, res);

    ERROR_MSG = '';

};

var checkParams = function(params){

    if(!params){
        ERROR_MSG = 'no params';
    }

    // 解析路由，获取参数
    var params = params.toLowerCase(),
        options = {};

    // 判断参数是否格式正确
    if(params.indexOf('x') > -1){
        params = params.split('x');

        // 判断参数是否为数字
        if(isNaN(params[0]) || isNaN(params[1])){
            ERROR_MSG = 'size is number';
        }

        // 判断参数是否正常
        if(params[0] <= 0 || params[1] <= 0){
            ERROR_MSG = 'size error';
        }
    }else{
        // 判断参数是否为数字
        if(isNaN(params)){
            ERROR_MSG ='size is number';
        }

        // 判断参数是否正常
        if(params <= 0){
            ERROR_MSG = 'size error';
        }

    }

}

/*
* 绘制图形
* @width (Number) 图片宽度
* @height (Number) 图片高度
* @return (object) 已绘制的图形
*/
var drawGraph = function(options){

    //获取参数
    var width = +options.width || 0,
        height = +options.height || 0,
        text = options.text;
    
    //创建canvas
    var canvas = new Canvas();
    canvas.width = width;
    canvas.height = height;
    
    var ctx = canvas.getContext("2d");
    
    //开始绘制
    ctx.beginPath();
    
    //绘制图形
    ctx.fillStyle = '#ff69a2';
    ctx.fillRect(0, 0, width, height);

    //绘制文字
    ctx.font = getFontSize(width, height) +'px menlo, monospace';
    ctx.fillStyle = "#fff";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';    
    ctx.fillText(text, width/2, height/2);
    
    //结束绘制
    ctx.closePath();

    return canvas;
}


/*
* 已绘制的图形转换成图片并输出
* @canvas (object) 已绘制的图形
*/
var canvasToImage = function(canvas, req, res){
    var stream = canvas.createPNGStream(); 
    stream.on('data', function(imgdata) {
      res.write(imgdata);
    });

    stream.on('end', function() {
      res.end();
    }); 

    stream.on('error', function (err) {
      console.log(err);
    });
}

/*
* 根据宽度和高度获取字体大小
* @width (number) 宽度
* @height (numeber) 高度
*/
var getFontSize = function(width, height){
    var fontSize = 14, // 默认字体大小
        wh = width + height; // 宽+高
    if(wh > 300){
        fontSize = 16;
    }else if(wh > 600){
        fontSize = 18;
    }else if(wh > 900){
        fontSize = 20;
    }  
    return fontSize;
}