/**
 * 得到导出表头
 * @params dateObject为vue中的列数组,prop为页面绑定的字段，label为中文列名
 * @returns {columnKeys:{props:列的label},extraTotal:{[props+'Extra']:extra}}
 */
module.exports.getExportColumn = function (dateObject, prop, label) {
    let returnData = {columnKeys: {}, extraTotal: {}}
    if (dateObject) {
        Array.from(dateObject).forEach(column => {
            returnData['columnKeys'][column[prop]] = column[label]
            if ('extra' in column) {
                returnData['extraTotal'][column[prop]] = column['extra']
            }
        })
    }
    return returnData
}

/**
 * 导出数据得到按页面列顺序的列名
 * @params dateObject页面列配置,绑定在页面的字段名
 * @returns 导出数据得到按页面列顺序的列名
 */
module.exports.getExportColumnProps = function (dateObject, prop) {
    let returnData = []
    Array.from(dateObject).forEach(columnItem => {
        returnData.push(columnItem[prop])
    })
    return returnData
}

/**
 * 导出数据处理
 * @params dateObject后台返回数据,columnTitle为列名
 * @returns 返回能够写入excel的数据格式
 */
module.exports.getExportData = function (dateObject, columnTitle) {
    let returnData = []
    if (!dateObject) {
        return [];
    }
    if (columnTitle) {
        returnData.push(Object.values(columnTitle['columnKeys']));
        let _columnKeyArr = Object.keys(columnTitle['columnKeys']);
        Array.from(dateObject).forEach(rowItem => {
            let _everyColumnArr = [];
            _columnKeyArr.forEach(columnKey => {
                if (columnKey in columnTitle['extraTotal']) {
                    let _currentExtraArr=Array.from(columnTitle['extraTotal'][columnKey]);
                    if(_currentExtraArr.length>0){
                        if(rowItem[columnKey]==='' || rowItem[columnKey]===null || rowItem[columnKey]===undefined){
                            _everyColumnArr.push('');
                        }
                        else{
                            for(let i=0;i<_currentExtraArr.length;i++){
                                if (_currentExtraArr[i]['value'] == rowItem[columnKey]) {
                                    _everyColumnArr.push(_currentExtraArr[i]['label']);
                                    break
                                }else{
                                    if(i==(_currentExtraArr.length-1)){
                                        // 最后一项
                                        _everyColumnArr.push(rowItem[columnKey]);
                                    }
                                }
                            }
                        }
                    }
                    else if(rowItem[columnKey]==='' || rowItem[columnKey]===null || rowItem[columnKey]===undefined){
                        _everyColumnArr.push('');
                    }
                    else{
                        _everyColumnArr.push(rowItem[columnKey]);
                    }
                } else {
                    _everyColumnArr.push(rowItem[columnKey]);
                }
            });
            returnData.push(_everyColumnArr);
        });
    }
    return returnData
}


/**
 * 合并行单元格的格式数据
 */
/**
 * 得到传入数据除children字段的所有字段组成对象
 * @params record为一条数据，childFiled为子数组的字段名，rowSpanName为合并单元格行数的字段名
 * @returns 返回handleredObject为传入数据除children字段的所有字段组成对象，rowSpanNum为合并行的数量
 */
function getRecordsData(record, childFiled,rowSpanName='row') {
    let handleredObject = {};
    let rowSpanNum = 0;
    Object.keys(record).forEach((item, columnIndex) => {
        if (item === childFiled) {
            rowSpanNum = Object.keys(record).includes(rowSpanName) ? record[rowSpanName] : 1
        } else {
            if (item !== rowSpanName) {
                handleredObject[item] = record[item]
            }
        }
    });
    return {handleredObject, rowSpanNum}
}

/**
 * 导出excel表合并单元格的格式数据——需要用getRecordsData方法协助
 * @params data为后台返回原始数据，childFiled为子数组的字段名，rowSpanName为合并单元格行数的字段名
 * @returns 返回tmp为页面需要的el-table格式，补充所有数据；spanMethodObject为合并单元格设置
 */
module.exports.getSpanMethodsData = function (data, childFiled = 'children',rowSpanName='row') {
    // spanMethodObject返回合并单元格信息
    let spanMethodObject = {columns: [], rows: [], firstRowSpan: []}
    // 返回数组
    // lastRowSpanNum为上一层合并格数
    // rowParentIndex为记录上一级合并格数
    let tmp = [], rowParentIndex = 0, lastRowSpanNum = 0, _startIndex = 0,
        _lastChildRowSpanNum = 0;

    function handlerDataFunc(data, childFiled = 'children', parentRecord, rowSpanArr) {
        Array.from(data).forEach((record, rowIndex) => {
            let recordObject_1 = getRecordsData(record, childFiled,rowSpanName)
            rowParentIndex = recordObject_1['rowSpanNum'];
            // rowSpanTotal为拼接数据
            let rowSpanTotal = JSON.parse(JSON.stringify(recordObject_1['handleredObject']));
            if (parentRecord) {
                // has parent code
                rowSpanTotal = Object.assign({}, parentRecord, recordObject_1['handleredObject']);
                // spanMethodObject.rows.forEach(rowSpanItem => {
                //     // rowSpanItem
                // });
            }
            else {
                _startIndex = lastRowSpanNum;
                // first folder,第一层
                lastRowSpanNum = rowParentIndex + _startIndex;
                _lastChildRowSpanNum = 0;
            }
            if (childFiled in record && record[childFiled].length>0) {
                // 含有子级数组
                // confirm child whether has children code
                // 需要父级数据与子级数据叠加的，需要由父级数据到子级数据循环中
                spanMethodObject.columns.push(...Object.keys(recordObject_1['handleredObject']));
                spanMethodObject.columns = Array.from(new Set(spanMethodObject.columns));
                let otherRowIndexArr = [];
                for (let otherRowIndex = (_startIndex + Number(_lastChildRowSpanNum) + 1); otherRowIndex < (_startIndex + Number(_lastChildRowSpanNum)) + recordObject_1['rowSpanNum']; otherRowIndex++) {
                    otherRowIndexArr.push(otherRowIndex)
                }
                Object.keys(recordObject_1['handleredObject']).forEach((columnProp) => {
                    spanMethodObject.rows.push({
                        [columnProp + '_' + (_startIndex + Number(_lastChildRowSpanNum))]: recordObject_1['rowSpanNum'],
                        startIndex: _startIndex + Number(_lastChildRowSpanNum),
                        otherIndexArr: otherRowIndexArr,
                        childStartIndex: _startIndex + Number(_lastChildRowSpanNum)
                    });
                })
                handlerDataFunc(record[childFiled], childFiled, rowSpanTotal,);
            } else {
                tmp.push(rowSpanTotal);
            }
            // 记录有子级数组也有父级数组的上一次合并行数
            _lastChildRowSpanNum = recordObject_1['rowSpanNum'];
        });
        return {tmp, spanMethodObject}
    }

    return handlerDataFunc(data, childFiled);
}

