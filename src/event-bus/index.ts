/**
 * 事件总线  以前阅读Vue2源码的时候学到的 就照搬了 
 */

const events = {};

function on(name: string, func: any) {
    if (!events[name]) {
        events[name] = [];
    }
    events[name].push(func);
}

function off(name: string, func: any) {
    if (events[name]) {
        if (func) {
            let arr = events[name];
            for (let i = 0, size = arr.length; i < size; i++) {
                if (func === arr[i]) {
                    //移除对应的事件
                    events[name].splice(i, 1);
                    break;
                }
            }
        } else {
            //移除所有 
            events[name] = null;
            delete events[name];
        }
    }
}

function once(name: string, func: any) {
    if (!events[name]) {
        events[name] = [];
    }
    //只会执行一次的监听
    let warp = function (...param) {
        try {
            off(name, warp);
            func(...param);
        } catch (err) {
            console.error(err);
        }
    }
    events[name].push(warp);
}

function emit(name: string, ...param: any) {
    if (events[name]) {
        events[name].forEach((func) => {
            try {
                func(...param)
            } catch (err) {
                console.error(err);
            }
        })
    }
}

export default {
    $on: on,//监听事件
    $off: off,//移除监听
    $once: once,//监听事件 执行一次后自动移除监听
    $emit: emit,//触发事件
    $events() { // 返回事件总线监听的事件对象
        return events;
    }
};
