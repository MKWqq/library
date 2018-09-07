<el-row>
    <el-col :span="12">
        <div class="w-form-item__input">
            <label>支付渠道商户号</label>
            <span class="l-red">*</span>
        </div>
        <div class="w-form-item__input margin-left-24">
            <el-input class="input-width" v-model="formData.merchCode" placeholder="请输入支付渠道商户号"></el-input>
            <div class="w-form-item__error" v-show="formRequired.merchCode">请输入支付渠道商户号</div>
        </div>
    </el-col>
    <el-col :span="12">
        <div class="w-form-item__input">
            <label>商户名称</label>
            <span class="l-red">*</span>
        </div>
        <div class="w-form-item__input margin-left-10">
            <el-input class="input-width" v-model="formData.merchName" placeholder="请输入商户名称"></el-input>
            <div class="w-form-item__error" v-show="formRequired.merchName">请输入商户名称</div>
        </div>
    </el-col>
</el-row>



