export function debounce(fn:Function, delay:number) {
    let timer:any = null; // 形成闭包
    return function () {
        if (timer) {
            clearTimeout(timer); // 防抖
        }
        timer = setTimeout(() => {
            fn(); // 执行传入的函数
        }, delay);
    };
}
