/*
Jquery获取元素相对body的位置
*/
;
(function(window, jQuery, $, undefined) {

    $.fn.extend({
        getElementPosition: function() {
            var $this = $(this);

            var left = 0;
            var top = 0;

            var obj = $this[0];
            top = obj.offsetTop;
            left = obj.offsetLeft;

            while (obj = obj.offsetParent) {
                top += obj.offsetTop;
                left += obj.offsetLeft;
            }

            $this.left = left;
            $this.top = top;

            return $this;
        }
    });

})(window, window.jQuery, window.$);
