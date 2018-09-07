<script>
    // 调用
    myAddHtml() {
        const self=this
        let _printBeforePro=new Promise((resolve,reject)=>{
            self.$nextTick(()=>{
                resolve()
            })
        })
        let _result=_printBeforePro.then(()=>{
            return currentProUtils.printFuncLoop("g-print-content", self)
        })
        return _result
    }

    multiPrintClick(){
        // 检测打印机
        if(currentProUtils.checkPrinter()==='print0001'){
            // 打印机异常
            self.printPendingDialog=false
        }else{
            self.printPendingDialog=true
        }
        currentProUtils.checkPrinter(self).then(()=>{
            self.printPendingDialog=true
            // self.$showViewLoading()
            Http.axios.post('/axinsf/xxtk/previewTkList', _params).then(data => {
                (async ()=>{
                    // self.$closeViewLoading()
                    // 根据list是否为空数组来判断是否打印完成
                    if(data.resp_data.list && data.resp_data.list.length<=0){
                        // 打印结束
                        self.isResolvePrint=true
                        self.printNum=0
                        self.printPendingNum=0
                    }else{
                        self.printTotal=data.resp_data.total
                    }
                    for(let idx=0,len=data.resp_data.list.length?data.resp_data.list.length:0;idx<len;idx++){
                        self.printData = data.resp_data.list[idx]
                        self.tableData = data.resp_data.list[idx].tk_info
                        self.printStatus=true
                        self.printNum=self.printPendingNum+idx+1
                        await self.myAddHtml().then(()=>{
                            // console.log('打印成功')
                            if(idx===(data.resp_data.list.length-1)){
                                self.printPendingNum=idx+1
                                self.multiPrintClick(Number(data.resp_data.page_num)+1)
                            }
                        }).catch(()=>{
                            // 打印失败
                            self.printStatus=false
                            self.isCancelPrint=true
                        })
                        if(self.isCancelPrint){
                            break
                        }
                    }
                })()
            }).catch(e => {
                self.$closeViewLoading()
                self.$showFailureMsg(e.message)
            })
        }).catch(()=>{
            self.printPendingDialog=false
        })
    }
</script>

