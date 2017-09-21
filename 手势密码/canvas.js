   canvasCtrl.$inject = ['$scope', '$remote', '$nativeCall', "$timeout", "$filter", "$rootScope"];
   function canvasCtrl($scope, $remote, $nativeCall, $timeout, $filter, $rootScope) {
    $scope.init = function() {
        //R:半径，CW:canvas宽，CH:canvas高，OffsetX:左侧预留距离，OffsetY:右侧预留距离
        var R = 26, CW = 400, CH = 320, OffsetX = 30, OffsetY = 30;
        //计算9个圈的位置
        function CaculateNinePointLotion(diffX, diffY) {
            var Re = [];
            for (var row = 0; row < 3; row++) {//行
                for (var col = 0; col < 3; col++) {//列
                    var Point = {
                        X: (OffsetX + col * diffX + ( col * 2 + 1) * R),//预留距离+圆外间隔+半径
                        Y: (OffsetY + row * diffY + (row * 2 + 1) * R)
                    };
                    Re.push(Point);
                }
            }
            return Re;//返回9个圈圆心坐标数组
        }
            var PointLocationArr = [];
            var c = document.getElementById("myCanvas");
            CW = document.getElementById("canvas").offsetWidth;
            CH = document.getElementById("canvas").offsetHeight;
            c.width = CW;
            c.height = CH;
            var cxt = c.getContext("2d");
            //两个圆之间的外距离 就是说两个圆心的距离去除两个半径
            var X = (CW - 2 * OffsetX - R * 2 * 3) / 2;//offsetX,offsetY点击位置距点击元素的距离
            var Y = (CH - 2 * OffsetY - R * 2 * 3) / 2;
            PointLocationArr = CaculateNinePointLotion(X, Y);
            InitEvent(c, cxt);//给canvas添加事件
            //CW=2*offsetX+R*2*3+2*X
            Draw(cxt, PointLocationArr, [],null);//canvas上下文，9个圈坐标数组，选中的全的数组，相对canvas的鼠标坐标

            function Draw(cxt, _PointLocationArr, _LinePointArr,touchPoint) {
            if (_LinePointArr.length > 0) {
                cxt.beginPath();
                //画线
                for (var i = 0; i < _LinePointArr.length; i++) {
                    var pointIndex = _LinePointArr[i];
                    cxt.lineTo(_PointLocationArr[pointIndex].X, _PointLocationArr[pointIndex].Y);
                }
                cxt.lineWidth = 10;
                cxt.strokeStyle = "#627eed";
                cxt.stroke();
                cxt.closePath();
                if(touchPoint!=null)
                {
                    var lastPointIndex=_LinePointArr[_LinePointArr.length-1];
                    var lastPoint=_PointLocationArr[lastPointIndex];
                    cxt.beginPath();
                    cxt.moveTo(lastPoint.X,lastPoint.Y);
                    cxt.lineTo(touchPoint.X,touchPoint.Y);
                    cxt.stroke();
                    cxt.closePath();
                }
            }
            //画三个圆
            for (var i = 0; i < _PointLocationArr.length; i++) {
                var Point = _PointLocationArr[i];
                cxt.fillStyle = "#627eed";
                cxt.beginPath();
                cxt.arc(Point.X, Point.Y, R, 0, Math.PI * 2, true);
                cxt.closePath();
                cxt.fill();
                cxt.fillStyle = "#ffffff";
                cxt.beginPath();
                cxt.arc(Point.X, Point.Y, R - 3, 0, Math.PI * 2, true);
                cxt.closePath();
                cxt.fill();
                if(_LinePointArr.indexOf(i)>=0)
                {
                    cxt.fillStyle = "#627eed";
                    cxt.beginPath();
                    cxt.arc(Point.X, Point.Y, R -16, 0, Math.PI * 2, true);
                    cxt.closePath();
                    cxt.fill();
                }

            }
        }
        function IsPointSelect(touches,LinePoint)
        {
            for (var i = 0; i < PointLocationArr.length; i++) {
                var currentPoint = PointLocationArr[i];
               // console.log(document.getElementById('canvas').offsetLeft);
                var xdiff = Math.abs(currentPoint.X - touches.pageX+document.getElementById('canvas').offsetLeft);
                var ydiff = Math.abs(currentPoint.Y - touches.pageY+document.getElementById('canvas').offsetTop);
                var dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
              
                if (dir < R ) {
                    if(LinePoint.indexOf(i) < 0){ LinePoint.push(i);}
                    break;
                }
            }
        }
        function InitEvent(canvasContainer, cxt) {
            var LinePoint = [];
            canvasContainer.addEventListener("touchstart", function (e) {
                //console.log(1);
                IsPointSelect(e.touches[0],LinePoint);
            }, false);
            canvasContainer.addEventListener("touchmove", function (e) {
                //console.log(2);
                e.preventDefault();
                var touches = e.touches[0];
                IsPointSelect(touches,LinePoint);
                cxt.clearRect(0,0,CW,CH);
                Draw(cxt,PointLocationArr,LinePoint,{X:touches.pageX-document.getElementById('canvas').offsetLeft,Y:touches.pageY-document.getElementById('canvas').offsetTop});
            }, false);
            canvasContainer.addEventListener("touchend", function (e) {
                console.log(3);
                cxt.clearRect(0,0,CW,CH);
                Draw(cxt,PointLocationArr,LinePoint,null);
                alert("密码结果是："+LinePoint);
                if(LinePoint=="0,1,2,5,8"){
                     alert("right");
                }else{
                    alert("false");
                }
                LinePoint=[];
            }, false);
        }
    }
  }
   
   
   
   