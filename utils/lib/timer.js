module.exports={
    /**
     * 获取当前月的第一天
     * @returns {*}
     */
    getCurrentMonthFirst: function () {
        let date = new Date()
        date.setDate(1)
        let dateStr = date.toISOString()
        return dateStr.split('T')[0]
    },
    /**
     * 获取当前月的最后一天
     * @returns {*}
     */
    getCurrentMonthLast: function () {
        let date = new Date()
        let currentMonth = date.getMonth()
        let nextMonth = ++currentMonth
        let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
        let lastDate = new Date(nextMonthFirstDay)
        let lastDateStr = lastDate.toISOString()
        return lastDateStr.split('T')[0]
    },
    /**
     * 获取当前月
     */
    getCurrentMonth: function () {
        return new Date().toISOString().substring(0, 7)
    },
    /**
     * 获取当前年
     */
    getCurrentYear: function () {
        return new Date().getFullYear().toString()
    },
    /**
     * 获取月份
     */
    getMonth: function (dateVal) {
        let date = new Date(dateVal)
        var currDate = date.getDate()
        var currMonth = date.getMonth() + 1
        var currYear = date.getFullYear()
        String(currMonth).length < 2 ? (currMonth = '0' + currMonth) : currMonth
        String(currDate).length < 2 ? (currDate = '0' + currDate) : currDate
        var formatDate = currYear + '-' + currMonth
        return formatDate
    },
    /**
     * 获取年份
     */
    getYear: function (date) {
        return date.getFullYear().toString()
    },
    /**
     * 获取指定格式日期yyyy-MM-dd
     * @param dateVal
     * @returns {string}
     */
    getFormatDate: function (dateVal) {
        let date = new Date(dateVal)
        var currDate = date.getDate()
        var currMonth = date.getMonth() + 1
        var currYear = date.getFullYear()
        String(currMonth).length < 2 ? (currMonth = '0' + currMonth) : currMonth
        String(currDate).length < 2 ? (currDate = '0' + currDate) : currDate
        var formatDate = currYear + '-' + currMonth + '-' + currDate
        return formatDate
    },
    /**
     * 获取指定格式日期yyyy-MM-dd HH:mm:ss
     * @param dateVal
     * @returns {string}
     */
    getFormatFullDate: function (dateVal) {
        let date = new Date(dateVal)
        let currDate = date.getDate()
        let currMonth = date.getMonth() + 1
        let currYear = date.getFullYear()
        let currHours = date.getHours()
        let currMunite = date.getMinutes()
        let currSeconds = date.getSeconds()
        String(currMonth).length < 2 ? (currMonth = '0' + currMonth) : currMonth
        String(currDate).length < 2 ? (currDate = '0' + currDate) : currDate
        String(currHours).length < 2 ? (currHours = '0' + currHours) : currHours
        String(currMunite).length < 2 ? (currMunite = '0' + currMunite) : currMunite
        String(currSeconds).length < 2 ? (currSeconds = '0' + currSeconds) : currSeconds
        var formatDate = currYear + '-' + currMonth + '-' + currDate + ' ' + currHours + ':' + currMunite + ':' + currSeconds
        return formatDate
    },
}