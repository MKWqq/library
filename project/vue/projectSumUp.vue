<script>
    // todo computed与data
    /**
     * computed与data监听数据
     * 1、data监听数据不能调用computed计算属性，因为data先执行，再执行computed。。
     * 2、computed具有监听和改变值
     * */
    export default{
        /*打印数据：data computed*/
        data(){
            console.log('data')
            return {}
        },
        computed:{
            test1(){
                console.log('computed')
                return 1
            },
            // todo get()、set()，set根据新值改变依赖变量的值
            dateObject:{
                get(){
                    return new Date(this.dateServer)
                },
                set(newV){
                    this.dateServer=utils.getFormatDate(newV)
                }
            }
        }
    }
</script>


