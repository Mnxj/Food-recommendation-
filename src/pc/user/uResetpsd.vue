<template>
    <el-card class="box-card">
        <h1>重置密码</h1>
        <hr>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
             </el-form-item>
        </el-form>
   </el-card>
</template>

<script>
export default {
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{
            ruleForm: {
                pass: '',
                checkPass: '',
                Emeil:'',
                password:''
             },
            rules: {
             pass: [
             { validator: validatePass, trigger: 'blur' }
             ],
             checkPass: [
              { validator: validatePass2, trigger: 'blur' }
             ]
            }
      };
    },
     methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.ruleForm.Emeil=this.$route.params.email;
              this.ruleForm.password=this.$md5(this.ruleForm.pass);
             this.postRequest('/user/UpdatePsd',this.ruleForm).then(
             resp=>{
                 if(resp.data.code==0){
                  this.$router.push({name:'ulogin'});
                 }
             })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

}
</script>

<style>

.text {
    font-size: 14px;
}

  .item {
    padding: 18px 0;
  }

  .box-card {
    margin: auto;
    margin-top: 10%;
    width: 480px;
  }
</style>
