<template>
  <!--列及列绑定的变量字段都是从父级元素中传过来的-->
  <!--操作处理事件都在父级标签中体现，只要将操作需要的参数传给父级标签即可-->
  <div>
    <table class="g-treeTable" v-if="isChecked">
      <!--header-->
      <thead>
        <tr>
          <th v-for="(content,index) in columns" v-text="content.name"></th>
          <th><el-checkbox @change="chooseAllChange" v-model="isChooseAll">全选</el-checkbox></th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <!--tbody-->
        <tr v-for="(row,rowIndex) in tableData" v-show="row._show">
          <td v-for="(column,columnIndex) in columns">
            <!--spaceIconShow用于判断除第一列之外没有图标和空格-->
            <span class="g-tree-space" v-if="spaceIconShow(columnIndex)" v-for="(space,levelIndex) in row._level"></span>
            <span class="g-iconC" v-if="toggleIconShow(columnIndex,row)" @click="toggle(rowIndex)">
              <i class="el-icon-plus" v-if="!row._expand"></i>
              <i class="el-icon-minus" v-if="row._expand"></i>
            </span>
            <span class="g-tree-space"  v-if="!toggleIconShow(columnIndex,row) && columnIndex===0"></span>
            {{row[column.props]}}
          </td>
          <td><el-checkbox v-model="row.ifUser" @change="useTypeChange(rowIndex)">使用该分类</el-checkbox></td>
          <td v-if="handleButton.parentHandle.length>0 || handleButton.childHandle.length>0">
            <!--操作处理事件都在父级标签中体现，只要将操作需要的参数传给父级标签即可-->
            <!--/*isSpecific判断哪条数据为具体条例，因为button不同*/-->
            <el-button v-if="row.isSpecific" type="text" v-for="(buttonTxt,bIndex) in handleButton.childHandle" @click="handleDialog(buttonTxt.msg,rowIndex)" :key="bIndex" v-text="buttonTxt.name" :class="[buttonTxt.cls?buttonTxt.cls:'']"></el-button>
            <el-button v-if="!row.isSpecific" type="text" v-for="(buttonTxt,bIndex) in handleButton.parentHandle" @click="handleDialog(buttonTxt.msg,rowIndex)" :key="bIndex" v-text="buttonTxt.name" :class="[buttonTxt.cls?buttonTxt.cls:'']"></el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <el-table class="g-NotHover" v-else ref="treeTable" :data="tableData" style="width:100%" @sort-change="sortChange"
              :row-style="showTr">
      <el-table-column v-for="(column,columnIndex) in columns" :label="column.name" :key="columnIndex">
        <template scope="props">
          <span class="g-tree-space" v-if="spaceIconShow(columnIndex)" v-for="(space,levelIndex) in props.row._level"></span>
          <span class="g-iconC" v-if="toggleIconShow(columnIndex,props.row)" @click="toggle(props.$index)">
            <i class="el-icon-plus" v-if="!props.row._expand"></i>
            <i class="el-icon-minus" v-if="props.row._expand"></i>
          </span>
          <span class="g-tree-space"  v-if="!toggleIconShow(columnIndex,props.row) && columnIndex===0"></span>
          <!--isParent为0表示最里面一层-->
          <input type="text" class="tableInput" @input="inputChange('inputChange',props.$index)" v-model="props.row[column.props]" v-if="!Number(props.row.isParent) && columnIndex===(columns.length-1)" />
          <span v-else>{{props.row[column.props]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" v-if="handleButton.parentHandle.length>0 || handleButton.childHandle.length>0">
        <template scope="props">
          <!--操作处理事件都在父级标签中体现，只要将操作需要的参数传给父级标签即可-->
          <!--/*isParent判断哪条数据为具体条例，因为button不同[考评方向],isParent为0则为最里面一层*/-->
          <el-button :disabled="buttonState" v-if="!Number(props.row.isParent)" type="text" v-for="(buttonTxt,bIndex) in handleButton.childHandle" @click="handleDialog(buttonTxt.msg,props.$index)" :data-msg="buttonTxt.msg" :key="bIndex" v-text="buttonTxt.name" :class="[buttonTxt.cls?buttonTxt.cls:'']"></el-button>
          <el-button :disabled="buttonState" v-if="Number(props.row.isParent)" type="text" v-for="(buttonTxt,bIndex) in handleButton.parentHandle" @click="handleDialog(buttonTxt.msg,props.$index)" :data-msg="buttonTxt.msg" :key="bIndex" v-text="buttonTxt.name" :class="[buttonTxt.cls?buttonTxt.cls:'']"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {} from '@/api/http'
  import initData from './utils/index'
  export default{
    data(){
      return {
        /*复选框选择的值*/
        multipleData:[],
        isCheckAll:true,//选中或取消选中
        /*全选*/
        isChooseAll:false,
      }
    },
    props: {
      /*操作中button循环*/
      handleButton:{
        type:Object,
        default:function(){
          return {parentHandle:[],childHandle:[]}
        }
      },
      /*是否有复选框*/
      isChecked:{
        type:Boolean,
        default:function(){
          return false
        }
      },
      /*操作按钮是否禁用*/
      buttonState:{
        type:Boolean,
        default:function(){
          return false
        }
      },
      /*操作向父级元素传参*/
      /*此处只有一个参数情况*/
      ParamObj:{
        type:Array,
        default:function () {
          return [];
        }
      },
      /*列循环*/
      columns: {
        type:Array,
        default: function () {
          return [];
        }
      },
      /*循环数据*/
      dataSource: {
        type:Array,
        default: function () {
          return [];
        }
      },
      /*是否展开*/
      expand: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      /*是否满足树表格数据循环格式*/
      treeStructure: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      /*给一个index，为了方便检测复选框选中数据的位置*/
      treeIndex:{
        type:Number,
        default:0
      },
    },
    computed: {
      tableData(){
        let _self = this;
        if (!_self.treeStructure) {
          let data = initData.treeToArray(_self.dataSource, null, null, _self.expand);
          return data;
        }
        return _self.dataSource;
      }
    },
    watch:{
      tableData(newValue){
        if(this.isChecked){
          this.defineTableInit();
          this.checkChooseAll();
        }
      }
    },
    methods: {
      /*table*/
      handleStudentTable(section){
        /*section为选择项行信息组成的数组*/
        let isHasChild/*含有子节点*/,isChild/*是子节点*/;
        section.forEach((value,index)=>{
          isHasChild=Object.keys(value).includes('childs');
          isChild=!Object.keys(value).includes('childs');
          if(isHasChild){
            this.checkChildChoose(value.childs);
          }
        });
      },
      sortChange(column){
        /*table排序回调*/
//        console.log(column)
      },
      /*选中父级，子级一起选中*/
      checkChildChoose(obj){
        const _self=this;
        obj.forEach((value,index)=>{
          _self.$refs.treeTable.toggleRowSelection(_self.tableData[Number(value._index)],_self.isCheckAll);
          if(value.childs){
            _self.checkChildChoose(value.childs);
          }
        });
      },
      /*自定义*/
      /*显示行*/
      showTr(row, index){
        let show = (row._parent ? (row._parent._expand && row._parent._show) : true);
        row._show = show;
        return show ? '' : 'display:none;';
      },
      /*展开下级*/
      toggle(trIndex){
        let _self = this;
        _self.tableData[trIndex]._expand=!_self.tableData[trIndex]._expand;
        if(_self.isChecked){
          /*自定义table*/
          _self.defineTableInit();
        }else{
          /*el-table*/
          _self.showTr(_self.tableData[trIndex]);
        }
      },
      /*显示层级关系空格或图标*/
      spaceIconShow(index){
        let _self = this;
        if (index === 0) {
          return true;
        }
        return false;
      },
      /*点击展开和关闭图标切换*/
      toggleIconShow(index, record){
        let _self = this;
        if (index === 0 && record.childs && record.childs.length > 0) {
          return true;
        }
        return false;
      },
      defineTableInit(){
        let _self=this;
        _self.tableData.forEach((value,index)=>{
          _self.showTr(value);
        });
      },
      /*input框change事件*/
      inputChange(msg,rowI){
        if(isNaN(Number(this.tableData[rowI]['score']))){
          this.$message({
            message:'请输入合法分数值！',
            type:'warning'
          });
          this.tableData[rowI]['score']='';
        }
        else{
          if(Number(this.tableData[rowI]['score'])>Number(this.tableData[rowI].scoreAll)){
            this.$message({
              message:'评分不能超过最大分值！',
              type:'warning'
            });
            this.tableData[rowI]['score']='';
          }
          else if(Number(this.tableData[rowI]['score'])<0){
            this.$message({
              message:'评分必须大于0！',
              type:'warning'
            });
            this.tableData[rowI]['score']='';
          }
        }
      },
      /*操作*/
      /*操作弹框显示*/
      handleDialog(msg,rowI){
        if(this.ParamObj.length>0){
          let params={};
          this.ParamObj.forEach((value)=>{
            if(value in this.tableData[rowI]){
              params[value]=this.tableData[rowI][value];
            }
            else{
              params[value]='';
            }
          });
          this.$emit('handleDialog',msg,params);
        }
        else{
          this.$emit('handleDialog',msg);
        }
      },
      /*el-checkbox的change事件*/
      useTypeChange(rowI){
        let params={};
        this.ParamObj.forEach((value)=>{
          if(value in this.tableData[rowI]){
            params[value]=this.tableData[rowI][value];
          }
          else{
            params[value]='';
          }
        });
        /*检测勾选或不勾选全选checkbox框*/
        this.checkChooseAll();
        this.$emit('handleDialog','isUsed',params);
      },
      /*全选change事件*/
      chooseAllChange(){
        let params={};
        this.ParamObj.forEach((value)=>{
          if(this.isChooseAll){
            /*全选中*/

            params[value]='all';
          }
          else{
            /*全部不选中*/
            params[value]='noall';
          }
        });
        this.$emit('handleDialog','isUsed',params);
      },
      /*检测是否全选*/
      checkChooseAll(){
        for(let i=0;i<this.tableData.length;i++){
          if(!this.tableData[i].ifUser){
            /*有false则退出循环*/
            this.isChooseAll=false;
            break;
          }
          else{
            if(i==(this.tableData.length-1)){
              /*最后一项也是选中状态即为全选*/
              this.isChooseAll=true;
            }
          }
        }
      },
    },
    created(){
      if(this.isChecked){
        this.defineTableInit();
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../style/test';
  @import '../../style/style';
  table,table tr th, table tr td { border:1px solid @borderColor; }
  .g-treeTable{width:100%;border-collapse:collapse;border-spacing:0;
    th,td{color:@normalColor;padding:0.5rem;}
    thead{width:100%;
      tr{width:100%;background:@backgroundBlue;
        th{text-align:left;}
      }
    }
    tbody{
      tr{}
    }
  }
</style>





