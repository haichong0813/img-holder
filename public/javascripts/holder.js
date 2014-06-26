/*
* 图片占位符 holder
* 用法：<img alt="300x200" />
* by rufeng
*/
;(function(win){
    
    var holder = holder || {};
    
    holder.main = {
        run: function(){
            
            var imgs = document.getElementsByTagName('img');
        
            //遍历img
            for(var i = 0, len = imgs.length; i < len; i++){
                
                //获取图片尺寸
                var imgSrc = imgs[i].alt;
                if(!imgSrc){
                    continue;
                }
                
                //解析图片尺寸
                var imgSize = imgSrc.match('[^/]*$')[0];
                    imgSize = imgSize.split('x');
                
                //绘制图形
                imgs[i].src = this.drawGraph({
                    width: imgSize[0], 
                    height: imgSize[1]
                });
                
            }
        },
        
        /*
        * 绘制图形
        * width(Number) 图片宽度
        * height(Number) 图片高度
        * return dataURL(String) dataBase64图片URL
        */
        drawGraph: function(options) {
            
            //获取参数
            var width = options.width || 0,
                height = options.height || 0;
            
            //创建canvas
            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            
            var ctx = canvas.getContext("2d");
            
            //开始绘制
            ctx.beginPath();
            
            //绘制图形
            ctx.fillStyle = '#ff69a2';
            ctx.fillRect(0, 0, width, height);
            
            //绘制文字
            ctx.font = '14px menlo, monospace';
            ctx.fillStyle = "#fff";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';    
            ctx.fillText(width +'x'+ height, width/2, height/2);
            
            //结束绘制
            ctx.closePath();
            
            //返回dataBase64URL
            var dataURL = canvas.toDataURL(); 
            return dataURL;
        
        }
        
    }

    //初始化
    holder.init = function(){
        holder.main.run();
    }
    
    holder.init();
    
})(window);