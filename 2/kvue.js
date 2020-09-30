class Kvue {
    constructor(options) {
        console.log(`constructor`)

        this.$data = options.data;

        //为 this.$data 中的每一个值设定一个 set 和 get 
        this.observe(this.$data)

    }

    observe(obj) {
        // console.log(`observe`,obj,typeof obj)
        if (!obj || typeof obj != 'object') {
            return 
        }

        //  Object.keys() 获取自身（不含继承的）的可枚举的属性值（不含Symbol的）
        Object.keys(obj).forEach(key => {
            this.defineReative(obj, key, obj[key])
        })

    }

    defineReative(obj, key, value) {
        // console.log(`defineReative`)

        this.observe(value) //用递归解决 value 也是对象的情况
        Object.defineProperty(obj, key, {
            get() {
                return value;
            },
            set(newValue) {
                if (value == newValue) {
                    return
                }

                value = newValue;
                console.log(`${key} 属性更新为`, newValue)

                //当数据发生变化的时候，可以在这里通知需要更新的地方去更新
            }
        })

    }

}