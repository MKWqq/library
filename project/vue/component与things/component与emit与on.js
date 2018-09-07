/**①②③④⑤⑥⑦⑧⑨⑩
 * $on与$emit
 * 1、绑定事件监听可以通过$on绑定，也可以用v-on绑定。。
 * ①$on绑定需要$off取消事件监听，否则会触发几次；而v-on绑定则不需要自己使用$off
 * ②组件使用：在组件上用v-on绑定事件，在子组件中直接使用this.$emit()触发事件，
 *   在父组件中使用this.$refs.组件的ref属性值.$emit()触发【先获取实例再触发】
 * ③④⑤⑥⑦⑧⑨⑩
 * */

// todo $on与$emit
/*
// a.vue 父组件
<b @test='testThing' ref="bVue"></b>
testThing(params){}
this.$refs.bVue.$emit('test',parmas)
// b.vue 子组件
this.$emit('test',params)
*/






