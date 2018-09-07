<template></template>
<script>
    export default{
        methods:{
            // 合并单元格
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                const _self = this;
                let columnProps = column.property;
                let rowSpanOtherAllIndexArr = [];//每一列所有有合并行的设置除合并行设置外的所有其他行index
                if (_self.spanMethodColumn.includes(columnProps)) {
                    let currentColumnToRow = _self.spanMethodRow.filter((rowItem, rowDataIndex) => {
                        let rowToColumn = Object.keys(rowItem).join(',').split('_')[0];
                        if (rowToColumn === columnProps) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    let rowStartIndexArr = currentColumnToRow.map(meetRowItem => {
                        return meetRowItem['startIndex']
                    })
                    let rowSpanNumArr = currentColumnToRow.map(meetRowItem => {
                        let rowToColumn = Object.keys(meetRowItem).join(',').split('_')[0];
                        return meetRowItem[rowToColumn + '_' + meetRowItem['startIndex']]
                    })
                    // 得到合并单元格，除开始合并的rowIndex外的其他rowIndex
                    let rowSpanOtherIndexArr = currentColumnToRow.map(meetRowItem => {
                        return meetRowItem['otherIndexArr']
                    });
                    rowSpanOtherIndexArr.forEach((otherRowItem) => {
                        rowSpanOtherAllIndexArr.push(...otherRowItem)
                    });
                    if (rowStartIndexArr.includes(rowIndex)) {
                        let meetRowIndex = rowStartIndexArr.findIndex((meetDataItem) => {
                            return rowIndex === meetDataItem;
                        })
                        return {
                            rowspan: rowSpanNumArr[meetRowIndex],
                            colspan: 1
                        }
                    }
                    else if (rowSpanOtherAllIndexArr.includes(rowIndex)) {
                        return [0, 0]
                    }
                    else {
                        // _self.setRowSpanIndex=null;
                        return [1, 1]
                    }
                }
                // else if(columnIndex===0){
                //     return {}
                // }
                else {
                    return {
                        rowspan: 1,
                        colspan: 1
                    }
                }

            },
        }
    }
</script>
<style></style>



