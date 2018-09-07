let BaseRequest = require('../api/base-request')
var fs = require("fs")
var path = require('path')
var xlsx = require('node-xlsx')
var utils=require('./node-xlsx-handler-data')
// TODO handler return web data
// 合并行返回到web端数据处理
router.post('/settleQuery/merchNoDetail', (req, res, next) => {
    BaseRequest.REQUEST(req, res, (data) => {
        data['object']['records'] = utils.getSpanMethodsData(data['object']['records']);
        res.json(data);
    }, (err) => {
        res.json(err);
    });
});
// TODO node download excel
// 下载excel到本地
router.get('/download',(req, res, next) => {
    let _fileName=req.query.fileName;
    let _path = path.resolve(APIServerConfig.exportAddress, _fileName+'.xlsx')
    let stats=fs.statSync(_path)
    if(stats.isFile()){
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=' + _fileName+'.xlsx',
            'Content-Length': stats.size
        });
        fs.createReadStream(_path).pipe(res);
    }else{
        console.log('导出的不是文件！')
    }
    // res.download(_path,function(err){
    //     if(err){
    //         console.log(err);
    //     }
    // });
});
// 合并行导出excel到服务器
BaseRequest.REQUEST(req, res, (data) => {
    if (data['status'] === APIServerConfig.successCode) {
        let fileName='settleAccount' + _exportName+new Date().getTime();
        let exportResultData = {"msg": "导出成功",'fileName':fileName, "status": "0", "success": true}
        let _columns = req.body.columns
        let _exportColumn = utils.getExportColumn(_columns, 'prop', 'label');
        let exportExcelObject = utils.getSpanMethodsData(data['object']['records']);
        let exportExcelData = utils.getExportData(exportExcelObject['tmp'], _exportColumn);
        // let totalData = utils.getExportData(exportExcelObject['tmp']);
        let columnTotal = utils.getExportColumnProps(_columns, 'prop')
        let columns = exportExcelObject['spanMethodObject']['columns']
        let rows = exportExcelObject['spanMethodObject']['rows']
        let optionArr = [];
        columnTotal.forEach((columnItem, columnIndex) => {
            if (columns.includes(columnItem)) {
                // 合并列
                rows.forEach((rowItem, rowIndex) => {
                    let rowLabel = Object.keys(rowItem).join(',').split("_")[0];
                    let rowNum = Number(rowItem[rowLabel + '_' + rowItem['startIndex']]);
                    if (rowLabel === columnItem) {
                        optionArr.push({
                            s: {c: columnIndex, r: rowItem['startIndex'] + 1},
                            e: {c: columnIndex, r: (Number(rowItem['startIndex'] + 1) + rowNum - 1)}
                        })
                    }
                })
            }
        })
        let option = {'!merges': optionArr};
        let buffer = xlsx.build([{name: 'exportExcel', data: exportExcelData}], option);

        fs.writeFileSync(APIServerConfig.exportAddress + '/'+fileName + '.xlsx', buffer, 'binary', function (err) {
            if (err) {
                exportResultData = {
                    "msg": "导出失败",
                    "status": "-1",
                    "success": false
                }
            }
        });
        res.json(exportResultData);
    } else {
        res.json(data)
    }
}, (err) => {
    res.json(err);
})
// 不合并行导出到服务器
router.post('/channelOrder/refundOrder/exportExcel', (req, res, next) => {
    // get data
    // carry out exportExcel
    // return exportExcel result
    req.url = '/channelOrder/refundPage';
    BaseRequest.REQUEST(req, res, (data) => {
        if (data['status'] === APIServerConfig.successCode) {
            let fileName='refundOrderPayExcel'+new Date().getTime();
            let exportResultData = {"msg": "导出成功",'fileName':fileName, "status": "0", "success": true}
            let _columns = req.body.columns
            let _exportColumn = utils.getExportColumn(_columns, 'prop', 'label');
            let returnData = data['object']['records'];
            let exportFormatData = utils.getExportData(returnData, _exportColumn);
            let buffer = xlsx.build([{name: 'exportExcel', data: exportFormatData}]);

            fs.writeFileSync(APIServerConfig.exportAddress +'/'+fileName+ '.xlsx', buffer, 'binary', function (err) {
                if (err) {
                    exportResultData = {
                        "msg": "导出失败",
                        "status": "-1",
                        "success": false
                    }
                }
            });
            res.json(exportResultData);
        } else {
            res.json(data);
        }
    }, (err) => {
        res.json(err);
    });
});

