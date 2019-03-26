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
        window.localStorage.chargeInfoObjPC = JSON.stringify(state.chargeInfoObj);
      }
    },
    initChargeInfoObj: function(state) {
      if (window.localStorage && window.localStorage.chargeInfoObjPC) {
        state.chargeInfoObj = JSON.parse(window.localStorage.chargeInfoObjPC);
      }
    },
    SetBusinessInfoObj: function(state, payload) {
      state.businessInfo = payload;
      if (window.localStorage) {
        window.localStorage.businessInfoPC = JSON.stringify(state.businessInfo);
      }
    },
    initBusinessInfoObj: function(state) {
      if (window.localStorage && window.localStorage.businessInfoPC) {
        state.businessInfo = JSON.parse(window.localStorage.businessInfoPC);
      }
    },
    SetBasisInfoObj: function(state, payload) {
      state.basisInfo = payload;
      if (window.localStorage) {
        window.localStorage.basisInfoPC = JSON.stringify(state.basisInfo);
      }
    },
    initBasisInfoObj: function(state) {
      if (window.localStorage && window.localStorage.basisInfoPC) {
        state.basisInfo = JSON.parse(window.localStorage.basisInfoPC);
      }
    },
    SetChargeIntroduce: function(state, payload) {
      state.chargeIntroduce = payload;
      if (window.localStorage) {
        window.localStorage.chargeIntroducePC = state.chargeIntroduce;
      }
    },
    initChargeIntroduce: function(state) {
      if (window.localStorage) {
        state.chargeIntroduce = window.localStorage.chargeIntroducePC;
      }
    },
    SetHomeUrl: function(state, payload) {
      state.homeUrl = payload;
      if (window.localStorage) {
        window.localStorage.homeUrlPC = state.homeUrl;
      }
    },
    initHomeUrl: function(state) {
      if (window.localStorage) {
        state.homeUrl = window.localStorage.homeUrlPC;
      }
    }
  },
  getters: {}
};
