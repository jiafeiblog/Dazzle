/**
 * 事件总线  以前阅读Vue2源码的时候学到的 就照搬了
 */
var events = {};
function on(name, func) {
    if (!events[name]) {
        events[name] = [];
    }
    events[name].push(func);
}
function off(name, func) {
    if (events[name]) {
        if (func) {
            var arr = events[name];
            for (var i = 0, size = arr.length; i < size; i++) {
                if (func === arr[i]) {
                    //移除对应的事件
                    events[name].splice(i, 1);
                    break;
                }
            }
        }
        else {
            //移除所有 
            events[name] = null;
            delete events[name];
        }
    }
}
function once(name, func) {
    if (!events[name]) {
        events[name] = [];
    }
    //只会执行一次的监听
    var warp = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        try {
            off(name, warp);
            func.apply(void 0, param);
        }
        catch (err) {
            console.error(err);
        }
    };
    events[name].push(warp);
}
function emit(name) {
    var param = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        param[_i - 1] = arguments[_i];
    }
    if (events[name]) {
        events[name].forEach(function (func) {
            try {
                func.apply(void 0, param);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
var index = {
    $on: on,
    $off: off,
    $once: once,
    $emit: emit,
    $events: function () {
        return events;
    }
};

export default index;
