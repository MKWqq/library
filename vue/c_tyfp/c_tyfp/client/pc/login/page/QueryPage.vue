<template>
  <div>
    <div class="flex-justify">
      <ul class="background-white width-1200 margin-top-20 flex-direction">
        <li class="flex-align font-24" style="margin-top: 60px">
          <img src="../../../assets/images/pc/icon-0.png" height="54" width="54"/>
          设置账户
        </li>
        <li>
          <div class="info-item margin-top-40">
            <span class="font-18">号码类型</span>
            <el-select
              v-model="flagType"
              class="margin-left-10"
              style="width: 17.5rem"
              placeholder="请选择">
              <el-option
                v-for="item in flagTypeList"
                :key="item.info_code"
                :label="item.info_name"
                :value="item.info_code">
              </el-option>
            </el-select>
          </div>
          <div class="info-item margin-top-20">
            <span class="font-18">号码</span>
            <el-input
              maxlength="32"
              v-model.trim="flagNum"
              class="margin-left-10"
              placeholder="请输入内容"
              style="width: 17.5rem">
            </el-input>
          </div>
        </li>
        <li class="flex-align margin-top-30">
          <el-button @click="queryBtn" class="blue-btn" type="primary">确认</el-button>
          <el-button @click="cancelBtn" class="margin-left-30 blue-white-border">取消</el-button>
        </li>
        <li class="margin-top-20" style="margin-bottom: 5rem">
          <div class="text-center text-danger margin-top-10" v-show="textShow">请把您的信息补全</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Http from "api/http";

  export default {
    data() {
      return {
        flagNum: '',              // 账号
        flagType: '',             // 号码类型
        flagTypeShow: '',         // 号码类型-展示文字
        flagTypeList: [],         // 号码类型-集合
        isChooseType: false,      // 选择类型弹框
        textShow: false           // 提示文字-是否显示
      };
    },
    computed: {
      businessInfo() {
        if (!this.$store.state.paramsEpay.businessInfo) {
          this.$store.commit('initBusinessInfoObj');
        }
        return this.$store.state.paramsEpay.businessInfo;
      },
      basisInfo() {
        if (!this.$store.state.paramsEpay.basisInfo) {
          this.$store.commit('initBasisInfoObj');
        }
        return this.$store.state.paramsEpay.basisInfo;
      }
    },
    created() {
      this.getLoginTypeHttp();
    },
    methods: {
      // 获取登录方式列表
      getLoginTypeHttp() {
        const _this = this;
        _this.$showViewLoading();
        let params = {
          app_id: _this.basisInfo ? _this.basisInfo.app_id : '',
          cid: _this.basisInfo ? _this.basisInfo.cid : '',
          login_mode_code: _this.basisInfo ? _this.basisInfo.cid_lx : '',
          school_code: _this.basisInfo ? _this.basisInfo.school_code : ''
        };
        Http.axios.post('/u/apiForKk/getLoginInfo', params).then(data => {
          _this.flagTypeList = data['sbhlx_list'];
          let myInfoObj = data.login_info_list.filter(el => {
            return el.info_code === _this.businessInfo.sbh_lx;
          })[0];
          _this.flagTypeShow = myInfoObj ? myInfoObj.info_name : '';
          _this.flagNum = myInfoObj ? myInfoObj.info_value : '';
          _this.flagType = myInfoObj ? myInfoObj.info_code : '';
          _this.$closeViewLoading();
        }).catch(e => {
          _this.$closeViewLoading();
          _this.$showFailureMsg(e.message);
        });
      },
      /* 号码类型列表 */
      numTypeList() {
        const _this = this;
        _this.$showViewLoading();
        let params = {
          dic_code: 'CUS_INFO_SBHLX'
        };
        Http.axios.post('/e/upms-sys/sysdicitem/findListCon', params).then(data => {
          _this.flagTypeList = data;
          if (!(Object.keys(this.$route.query).length === 0)) {
            _this.flagTypeShow = _this.flagTypeList.filter(el => {
              return el.item_code === _this.$route.query.sbh_lx;
            })[0].item_name;
            _this.flagNum = _this.$route.query.sbh;
          }
          _this.$closeViewLoading();
        }).catch(e => {
          _this.$closeViewLoading();
          _this.$showFailureMsg(e.message);
        });
      },
      /* 号码类型选中 */
      numTypeSelect(myData) {
        this.flagType = myData.info_code;
        this.flagTypeShow = myData.info_name;
        this.isChooseType = false;
      },
      /* 获取用户信息 */
      queryBtn() {
        const _this = this;
        if (!_this.flagType || !_this.flagNum) {
          _this.textShow = true;
          return false;
        }
        _this.$showViewLoading();
        let params = {
          sbh_lx: _this.flagType,
          sbh: _this.flagNum
        };
        Http.axios.post('/e/axinsf/ws/newwebcus/findCusInfoById', params).then(data => {
          // console.log(data);
          _this.$store.commit('SetBusinessInfoObj', data);
          _this.getSaveLoginHttp();
          // _this.$closeViewLoading();
        }).catch(e => {
          _this.$closeViewLoading();
          _this.$showFailureMsg(e.message);
        });
      },
      getSaveLoginHttp() {
        const _this = this;
        _this.$showViewLoading();
        let params = {
          app_id: _this.basisInfo ? _this.basisInfo.app_id : '',
          cid: _this.basisInfo ? _this.basisInfo.cid : '',
          login_mode_code: _this.basisInfo ? _this.basisInfo.cid_lx : '',
          school_code: _this.basisInfo ? _this.basisInfo.school_code : '',
          login_info_list: [
            { info_code: _this.flagType, info_value: _this.flagNum }
          ]
        };
        Http.axios.post('/u/apiForKk/saveLoginInfo', params).then(data => {
          location.href = "/cweb/pc/home/index.html#/";
          _this.$closeViewLoading();
        }).catch(e => {
          _this.$closeViewLoading();
          _this.$showFailureMsg(e.message);
        });
      },
      cancelBtn() {
        window.history.go(-1);
      }
    }
  };
</script>

<style scoped>
  .info-item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
