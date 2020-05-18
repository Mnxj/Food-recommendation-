<template>
  <div>
     <!-- 头部 -->
    <utop></utop>
    <div class="psd">
        <div class="Dpsd">
            <h1 class="fontpasdy">- - 修改密码- -</h1>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密码" prop="psd">
                  <el-input placeholder="原密码" v-model="ruleForm.psd" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                  <el-input placeholder="新密码" v-model="ruleForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item label="确入密码" prop="newpassword">
                  <el-input placeholder="确入密码" v-model="ruleForm.newpassword" show-password></el-input>
                </el-form-item>
                <el-form-item>
                   <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                   <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
  </div>
</template>

<script>
import utop from '../relesase/utop'
export default {
    data(){
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.newpassword !== '') {
            this.$refs.ruleForm.validateField('newpassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{
             ruleForm:{
               psd:'',
               password:'',
               newpassword:'',
               //
               anumber:'',//账号
               password1:'',//旧密码
               password2:'',//新密码
            },
            rules: {
             psd:[
                { required: true, message: '请输入密码', trigger: 'change' }
             ],
             password: [
               { validator: validatePass, trigger: 'blur' }
              ],
             newpassword: [
               { validator: validatePass2, trigger: 'blur' }
              ],
        }
        }
    },
     methods: {
        submitForm(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.password==this.ruleForm.psd){
               this.$notify.error({
                      title: '请不要输入相同的密码',
                    });
            }else{
             
              this.ruleForm.anumber=this.$store.getters.getUser.anumber;
              this.ruleForm.password1=this.$md5(this.ruleForm.psd);
              this.ruleForm.password2=this.$md5(this.ruleForm.newpassword);
              this.postRequest('/user/Updatenewpsd',this.ruleForm).then(
                resp=>{
                 var data=resp.data;
                 if(data.code==0){
                    this.$store.commit('remove');
                    this.$router.push({name:'ulogin'});
                     this.$notify({
                     title: '修改成功',
                      message: data.msg,
                     type: 'success'
                   });
                 }else{
                     this.$notify.error({
                      title: '修改失败',
                      message: data.msg
                    });
                 }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components:{
        utop,
    }
}
</script>
<style lang="scss" scoped>
.psd{
    width: 1024px;
    height: 600px;
    background: url(../../../imgas/psddata.jpg) no-repeat;
    margin: auto;
    margin-top: -7px;
    .Dpsd{
        background-color: #ffffff50;
        padding-right: 60px;
        padding-left: 30px;
        padding-right: 80px;
        margin: auto;
        width: 850px;
        height: 600px;
    }
}
 .fontpasdy{
            color:blanchedalmond;
            text-shadow: 3px 5px 5px #FFA54F;
            padding-top: 80px;
            padding-bottom: 50px;
            text-align: center;
}
</style>
