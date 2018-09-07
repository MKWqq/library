/**
 * Created by Administrator on 2017/9/26 0026.
 */

import Vue from 'vue'
let index;
export default {
  treeToArray:function(data,parent,level,expand){
    let tmp=[];const _self=this;
    Array.from(data).forEach((record)=>{
      if(!index){
        index=0;
      }
      Vue.set(record,'_index',index++);
      if(record._expand===undefined){
        Vue.set(record,'_expand',expand);
      }
      if(parent){
        Vue.set(record,'_parent',parent);
      }
      let _level=0;
      if(level!==undefined && level!==null){
        _level=level+1;
      }
      Vue.set(record,'_level',_level);
      tmp.push(record);
      if(record.childs && record.childs.length>0){
        let childs=_self.treeToArray(record.childs,record,_level,expand,index);
        tmp=tmp.concat(childs);
      }
    });
    return tmp;
  }
}



