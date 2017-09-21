/**
 * myCanvas directive
 * 手势密码
 * @auther  fujing
 */

(function(window, vx, $) {
    'use strict';

    var mod = vx.module("ui.libraries");

    mod.directive("myCanvas", function() {
        return {
            restrict: 'A',
            link: function($scope, $element, attrs) {
                //关闭滑动
                $("body").css({ "overflow": "hidden", "height": "100vh" });
                //$('html, body').animate({scrollTop:$("body").offset()}, 500);/*滑动到最上面*/
                vx.element(document).on("touchmove", function(e) { /*禁止滑动*/
                    event = event || window.event;
                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;
                        return false;
                    }
                });
                var dposition = new Array(9);
                for (var i = 0; i < 9; i++) {
                    dposition[i] = { x: 0, y: 0, radius: 0 };
                }
                var passw = "";
                var canvas = $element[0];
                var context = canvas.getContext("2d");
                var canvasDivWidth = document.body.offsetWidth;
                canvas.setAttribute("width", canvasDivWidth + "px");
                canvas.setAttribute("height", canvasDivWidth + "px");
                var bbox;
                var canvasTop;
                var canvasLeft;
                var isKeyDown = false;
                $element.bind("touchend", release);
                $element.bind("touchmove", drawline);
                $element.bind("touchstart", setBegin);
                $("#gestureCha").bind('click', function() {
                    //开启滑动
                    $("body").css({ "overflow": "auto", "height": "auto" });
                    vx.element(document).off("touchmove");
                    window.history.back(-1);
                });
                init(20);

                function drawline(e) {
                    console.log("over");
                    if (!isKeyDown) { return; }
                    var flag = false;
                    var site = -1;
                    context.clearRect(0, 0, bbox.width, bbox.height);
                    init(20);
                    context.strokeStyle="rgb(22,106,268)";
                    context.beginPath();
                    for(var i=0,j=passw.length;i<j;i++){
                        context.lineTo(dposition[passw.charAt(i)-1].x, dposition[passw.charAt(i)-1].y);
                    }
                    context.lineTo((e.originalEvent.changedTouches[0].clientX - canvasLeft) / (bbox.width / canvas.width),(e.originalEvent.changedTouches[0].clientY - canvasTop) / (bbox.height / canvas.height));
                    context.stroke();
                    context.closePath();
                    for(var i=0,j=passw.length;i<j;i++){
                        context.beginPath();
                        context.arc(dposition[passw.charAt(i)-1].x, dposition[passw.charAt(i)-1].y, dposition[passw.charAt(i)-1].radius/2, 0, Math.PI * 2, false);
                        context.fill();
                        context.closePath();
                    }
                    for (var i = 0; i < 9; i++) {
                        var xjl = Math.abs((e.originalEvent.changedTouches[0].clientX - canvasLeft) / (bbox.width / canvas.width) - dposition[i].x);
                        var yjl = Math.abs((e.originalEvent.changedTouches[0].clientY - canvasTop) / (bbox.height / canvas.height) - dposition[i].y);
                        var jl = xjl * xjl + yjl * yjl
                        if (jl < dposition[i].radius * dposition[i].radius) {
                            flag = true;
                            site = i + 1;
                            break;
                        }
                    }
                    if (!flag) { return; }
                    if (passw.indexOf(site + "") != -1) { return; }
                    //debugger;
                    passw += site;
                    //context.arc(dposition[site - 1].x, dposition[site - 1].y, dposition[site - 1].radius / 2, 0, Math.PI * 2, false);
                    //context.fill();
                };

                function init(radius) {
                    context.lineCap = "round";
                    context.lineJoin = "round";
                    context.strokeStyle = "rgb(0,0,0)";
                    context.lineWidth = 2;
                    bbox = canvas.getBoundingClientRect();
                    canvasTop = $element.getElementPosition().top;
                    canvasLeft = $element.getElementPosition().left;
                    for (var i = 0; i < 9; i++) {
                        if (i < 3) {
                            dposition[i].x = (bbox.width / 6 * ((i + 1) * 2 - 1)) / (bbox.width / canvas.width);
                            dposition[i].y = (bbox.height / 12) / (bbox.height / canvas.height);
                            dposition[i].radius = radius / (bbox.height / canvas.height);
                        }
                        if (i >= 3 && i < 6) {
                            dposition[i].x = (bbox.width / 6 * ((i - 2) * 2 - 1)) / (bbox.width / canvas.width);
                            dposition[i].y = (bbox.height / 12 * 5) / (bbox.height / canvas.height);
                            dposition[i].radius = radius / (bbox.height / canvas.height);
                        }
                        if (i >= 6 && i < 9) {
                            dposition[i].x = (bbox.width / 6 * ((i - 5) * 2 - 1)) / (bbox.width / canvas.width);
                            dposition[i].y = (bbox.height / 12 * 9) / (bbox.height / canvas.height);
                            dposition[i].radius = radius / (bbox.height / canvas.height);
                        }
                    }
                    for (var i = 0; i < 9; i++) {
                        context.beginPath();
                        context.arc(dposition[i].x, dposition[i].y, dposition[i].radius, 0, Math.PI * 2, false);
                        context.stroke();
                        context.closePath();
                    }
                }

                function setBegin() {
                    console.log("down   ");
                    context.beginPath();
                    context.lineCap = "round";
                    context.lineJoin = "round";
                    context.strokeStyle = "rgb(22,106,268)";
                    context.fillStyle = "rgb(22,106,268)";
                    context.lineWidth = 2;
                    isKeyDown = true;
                };

                function release() {
                    context.clearRect(0, 0, bbox.width, bbox.height);
                    init(20);
                    isKeyDown = false;
                    console.log("released!!!!   " + passw);
                    if (passw != "") {
                        passw = "";
                        //开启滑动
                        $("body").css({ "overflow": "auto", "height": "auto" });
                        vx.element(document).off("touchmove");
                        window.history.back(-1);
                    }
                };
            }
        };
    });

})(window, window.vx, window.$);