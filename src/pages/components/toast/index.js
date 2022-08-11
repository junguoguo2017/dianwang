import Vue from "vue";
import Toast from "./index.vue";
let singleToast = true;
let queue = [];
function createInstance() {
    // 返回一个扩展实例构造器
    const ToastConstructor = Vue.extend(Toast);
    // 构造一个实例
    var toastDom = new ToastConstructor({
        el: document.createElement("div"),
    });
    // 把实例化的 toast.vue 添加到 body 里
    document.body.appendChild(toastDom.$el);
    queue.push(toastDom);
    singleToast = true;
    return toastDom;
}

// 注册为全局组件的函数
function toast(options) {
    let toastDom = createInstance();

    toastDom.message = typeof options === "string" ? options : options.message;
    toastDom.type = options.type || "text";
    toastDom.duration = options.duration || 2000;
    toastDom.position = options.position || "middle";
    toastDom.mask = options.mask || false;
    toastDom.forbidClick = options.forbidClick || false;

    if (!toastDom.message) {
        toastDom.showToast = singleToast = false;
    } else {
        toastDom.showToast = true;
        if (toastDom.duration != 0) {
            this.timer = setTimeout(() => {
                toastDom.showToast = singleToast = false;
            }, toastDom.duration);
        }
    }
    this.clear = () => {
        toastDom.showToast = false;
        this.timer && clearTimeout(this.timer);
    };
    return {
        clear: this.clear,
    };
}

Vue.prototype.$showToast = toast;
export default toast;
