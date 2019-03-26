<template>
  <!--首页-->
  <div></div>

</template>

<script>
  import Http from "api/http";
  import { handleDateTime,goToHrefATage } from "assets/js/utilsMultiImport";

  export default {
    data() {
      return {
        infoShow: false,          // 用户信息显示状态
        paymentItem: [],           // 缴费项目
        app_name:'',// 当前项目类型名称
        // send ajax params
        loginObj: {
          sbh: '',
          sbh_lx: ''
        }
      };
    },
    computed: {
      businessInfo() {
        return this.$store.state.paramsEpay.businessInfo;
      },
      basisInfo() {
        return this.$store.state.paramsEpay.basisInfo;
      },
      homeUrl(){
        return this.$store.state.paramsEpay.homeUrl;
      }
    },
    created() {
      if (Object.keys(this.$route.query).length) {
        this.$store.commit('SetBasisInfoObj', {
          cid: this.$route.query.cid,
          cid_lx: this.$route.query.cid_lx,
          app_id: this.$route.query.app_id,
          school_code: this.$route.query.school_code,
          dl_dm: this.$route.query.dl_dm
        });
        if(this.$route.query['home_url']){
          // 非单应用
          this.$store.commit('SetHomeUrl',this.$route.query['home_url'])
        }else{
          this.$store.commit('SetHomeUrl','')
        }
        this.app_name=this.$route.query.app_name;
        if(this.app_name){
          document.getElementsByTagName('title')[0].innerHTML=this.app_name;
        }
        // 查询上次登录的sbh和sbh_lx
        this.getLastLoginMsgHttp();
      } else {
        if (!this.businessInfo) {
          this.$store.commit('initBusinessInfoObj');
        }
        if (!this.basisInfo) {
          this.$store.commit('initBasisInfoObj');
        }
        if(!this.homeUrl){
          this.$store.commit('initHomeUrl')
        }
        this.getList();
      }
      if (this.businessInfo && this.businessInfo.sbh && this.businessInfo.sbh_lx) {
        this.infoShow = true;
      } else {
        this.infoShow = false;
      }
      if (window.history && window.history.pushState) {
        history.pushState(null,null,document.url)
        window.addEventListener("popstate", this.popStateEmit,false);
      }
    },
    destroyed(){
      window.removeEventListener('popstate',this.popStateEmit,false)
    },
    methods: {
      popStateEmit(){
        if(this.homeUrl){
          goToHrefATage(this.homeUrl);
        } else{
          // 单应用 禁止返回
          history.pushState(null,null,document.url);
        }
      },
      // send ajax
      /* 获取项目列表 */
      getList() {
        const _this = this;
        _this.$showViewLoading();
        let params = {
          dl_dm: _this.basisInfo ? _this.basisInfo.dl_dm : '',
          sbh: _this.businessInfo ? _this.businessInfo.sbh : '',
          sbh_lx: _this.businessInfo ? _this.businessInfo.sbh_lx : ''
        };
        Http.axios.post('/e/axinsf/ws/newwebcus/findXmByBindKey', params).then(data => {
          _this.paymentItem = data;
          // 时间格式化
          _this.paymentItem.forEach(el => {
            el.myTime = handleDateTime(el.jz_sj);
          });
          _this.$closeViewLoading();
        }).catch(e => {
          _this.$closeViewLoading();
          _this.$showFailureMsg(e.message);
        });
      },
      // 查询上次登录的sbh和sbh_lx
      getLastLoginMsgHttp() {
        const _this = this;
        _this.$showViewLoading();
        let params = {
          app_id: _this.basisInfo ? _this.basisInfo.app_id : '',
          cid: _this.basisInfo ? _this.basisInfo.cid : '',
          login_mode_code: _this.basisInfo ? _this.basisInfo.cid_lx : '',
          school_code: _this.basisInfo ? _this.basisInfo.school_code : ''
        };
        Http.axios.post('/u/apiForKk/getLoginInfo', params).then(data => {
          data['login_info_list'].forEach(item => {
            _this.loginObj.sbh_lx = item.info_code;
            _this.loginObj.sbh = item.info_value;
          });
          if (data['login_info_list'].length) {
            // 有登陆信息
            _this.getUserMsgHttp();
          } else {
            // 无登录信息保存sbh、sbh_lx
            if (_this.loginObj.sbh_lx && _this.loginObj.sbh) {
              _this.$store.commit('SetBusinessInfoObj', _this.loginObj);
            } else {
              _this.$store.commit('SetBusinessInfoObj', null);
            }
            // 用最新识别号和姓名获取项目列表
            _this.getList();
          }
          _this.$closeViewLoading();
        }).catch(e => {
          _this.$closeViewLoading();
          _this.$showFailureMsg(e.message);
        });
      },
      // 通过识别号获取用户信息
      getUserMsgHttp() {
        const _this = this;
        _this.$showViewLoading();
        let params = {
          ..._this.loginObj
        };
        Http.axios.post('/e/axinsf/ws/newwebcus/findCusInfoById', params).then(data => {
          // console.log(data);
          // 无登录信息保存sbh、sbh_lx
          _this.$store.commit('SetBusinessInfoObj', data);
          // 用最新识别号和姓名获取项目列表
          _this.getList();
          _this.infoShow = true;
          _this.$closeViewLoading();
        }).catch(e => {
          _this.$store.commit('SetBusinessInfoObj', _this.loginObj);
          _this.$closeViewLoading();
          _this.$showFailureMsg(e.message);
        });
      }
    }
  };
</script>

<style scoped>
  .payment-header-img {
    padding: 0 10px;
    background: url("../../../assets/images/old_img/bg.png") no-repeat;
    background-size: cover;
    height: 50px;
  }

  .info-bar {
    height: 65px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 6px #32c0de;
  }

  .padding-LR-10 {
    padding: 0 10px;
  }

  .white-box {
    height: 45px;
    background-color: #ffffff;
  }

  .details-box {
    padding: 10px 10px 10px 15px;
    background-color: #ffffff;
    border-top: 1px #f0f0f5 solid;
  }
</style>
