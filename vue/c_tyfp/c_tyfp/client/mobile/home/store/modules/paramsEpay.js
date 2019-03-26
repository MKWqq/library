/**
 * 页面所需参数*/
export default {
  state: {
    // 缴费详情——缴费信息确认 缴费数据储存
    chargeInfoObj: null,
    // 缴费详情——缴费说明
    chargeIntroduce: '',
    /* 系统基本信息{cid:'',cid_lx:'',dl_dm:'',app_id:'',school_code:''} */
    basisInfo: null,
    /* 用户信息——查询账号 */
    businessInfo: null,
    /* 返回壳壳地址 */
    homeUrl:''
  },
  mutations: {
    SetChargeInfoObj: function(state, payload) {
      state.chargeInfoObj = payload;
      if (window.localStorage) {
        window.localStorage.chargeInfoObj = JSON.stringify(state.chargeInfoObj);
      }
    },
    initChargeInfoObj: function(state) {
      if (window.localStorage && window.localStorage.chargeInfoObj) {
        state.chargeInfoObj = JSON.parse(window.localStorage.chargeInfoObj);
      }
    },
    SetBusinessInfoObj: function(state, payload) {
      state.businessInfo = payload;
      if (window.localStorage) {
        window.localStorage.businessInfo = JSON.stringify(state.businessInfo);
      }
    },
    initBusinessInfoObj: function(state) {
      if (window.localStorage && window.localStorage.businessInfo) {
        state.businessInfo = JSON.parse(window.localStorage.businessInfo);
      }
    },
    SetBasisInfoObj: function(state, payload) {
      state.basisInfo = payload;
      if (window.localStorage) {
        window.localStorage.basisInfo = JSON.stringify(state.basisInfo);
      }
    },
    initBasisInfoObj: function(state) {
      if (window.localStorage && window.localStorage.basisInfo) {
        state.basisInfo = JSON.parse(window.localStorage.basisInfo);
      }
    },
    SetChargeIntroduce: function(state, payload) {
      state.chargeIntroduce = payload;
      if (window.localStorage) {
        window.localStorage.chargeIntroduce = state.chargeIntroduce;
      }
    },
    initChargeIntroduce: function(state) {
      if (window.localStorage) {
        state.chargeIntroduce = window.localStorage.chargeIntroduce;
      }
    },
    SetHomeUrl: function(state, payload) {
      state.homeUrl = payload;
      if (window.localStorage) {
        window.localStorage.homeUrl = state.homeUrl;
      }
    },
    initHomeUrl: function(state) {
      if (window.localStorage) {
        state.homeUrl = window.localStorage.homeUrl;
      }
    }
  },
  getters: {}
};


