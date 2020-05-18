<template>
  <el-card class="box-card">

    <h1>注册</h1>
    <hr>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div v-if="flag==0">
    
    <el-form-item label="昵称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="">
     <el-upload 
      accept=".jpg"
      class="avatar-uploader"
      action='string' 
      list-type="picture-card" 
      :auto-upload="false"  
      :http-request="uploadproductimg" 
      :limit="1"
      :on-change="consoleFL"
      :file-list="fileList2">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny" :show-close=true :modal=false>
            <img width="100%" :src="bigpigurl" alt="">
          </el-dialog>
          <!-- 剪裁组件弹窗 -->
        <el-dialog :visible.sync="cropperModel" width="1100px" :before-close="beforeClose" append-to-body :close-on-click-modal="false">
            <Cropper :img-file="fileurl" :skuname="skufilekey" ref="vueCropper" v-on:upload="uploadproductimg">
            </Cropper>
          </el-dialog>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
    <el-radio v-model="ruleForm.gender" label="男">男</el-radio>
    <el-radio v-model="ruleForm.gender" label="女">女</el-radio>
    </el-form-item>
    <el-form-item label="生日" prop="birthday">
     <el-date-picker
     value-format="yyyy-MM-dd"
      v-model="ruleForm.birthday"
      type="date"
      placeholder="选择日期" :picker-options="pickerOptions">
     </el-date-picker>
     </el-form-item>
  <el-form-item prop="email" label="邮箱">
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
  </div>
  <div v-if="flag==1" >
    <el-form-item label="验证码" prop="yanz">
    <input type="text"  placeholder="请输入"  class="border" v-model="ruleForm.yanz">
    </el-form-item>
    <el-button class="butt" type="primary" @click="sumbit">提交</el-button>
  </div>
  <div v-if="flag==2">
    <el-form-item label="您的账号为：" >
     <h3 style="color=#6495ED">{{userid}}</h3>
     <el-row class="len">
        <el-col :span="11"><div class="grid-content bg-purple"><p class="zz"  @click="flag=0">注册账户</p></div></el-col>
        <el-col :span="1"><div class="grid-content bg-purple-light">|</div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple-light"><p class="zz" @click="login">登录</p></div></el-col>
      </el-row>
  </el-form-item>
  </div>
 </el-form>
</el-card>
</template>

<script>
import Cropper from '../user/ucropper';
export default {
    data() {
     
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          var str=this.ruleForm.pass
           if (str.indexOf(" ")>=0) {
            callback(new Error('不能包含空格'));
          }else if (this.ruleForm.checkPass !== '') {
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
      var checkname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        } else {
          var str=this.ruleForm.name
           if (str.indexOf(" ")>=0) {
            callback(new Error('不能包含空格'));
          }else{
             callback();
          }
        }
      };
      return {
         pickerOptions: {
          disabledDate(time){
            return time.getTime() > Date.now();
          }
       },
        flag:0,//进行下一步
        userid:'',//储存返回账号
        form:{
          img:'',
          imgs:[]
        },
         imageUrl: '',
        skufilekey:'',
        fileurl:'',
        cropperModel:false,
        bigpigurl:'',
        dialogVisible: false,
        fileList2:[],
        ruleForm: {
          src:'',//图片
          name:'',//昵称
          pass: '',//密码
          checkPass: '',//确认密码
          gender:'',//性别
          birthday:'',//生日
          email:'',
          Emeil: '',//邮箱
          password:'',//存放MD5加密存放
          yanz:''//验证码
        },
        rules: {
            name: [
            { required: true, validator:checkname, trigger: 'blur' },
          ],
          birthday: [
            { required: true, message: '请选择日期', trigger: 'blur' },
          ],
          yanz: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          pass: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required:true,validator: validatePass2, trigger: 'blur' }
          ],
           email:[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}]
        }
      }
    },
    methods: {
      login(){
        this.$router.push({name:'ulogin'});
      },
      sumbit(){
         this.postRequest('/user/InsertUser',this.ruleForm).then(
            resp=>{
                var data=resp.data;
                if(data.code==200){
                   this.userid=data.data;
                   this.flag=2;
                   this.$notify({
                     title: '注册成功',
                     message: '注意保存您的账号',
                     type: 'success'
                   });
                 }else{
                    this.$notify.error({
                      title: '注册失败',
                      message: data.msg
                    });
                 }
            })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
         this.ruleForm.password=this.$md5(this.ruleForm.pass);
         this.ruleForm.birthday=this.ruleForm.birthday;
         this.ruleForm.Emeil=this.ruleForm.email;
        console.log(this.ruleForm)
          if (valid) {
              this.postRequest('/user/InsertEmail',this.ruleForm).then(
              resp=>{
                console.log(resp)
                var data=resp.data;
                 if(data.code==0){
                   this.flag=1;
                   this.$notify({
                     title: '成功',
                     message: '请于60秒内查收邮箱验证码并验证注册',
                     type: 'success'
                   });
                 }else{
                    this.$notify.error({
                      title: '错误',
                      message: data.msg
                    });
                 }
             })
          } else {
            this.$message.error('表单错误');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      consoleFL (file, fileList) {
      // 弹出剪裁框，将当前文件设置为文件
      // console.log(file.url);
      // console.log(file);
      this.file = file;
      this.fileurl = file.url;
      this.skufilekey = '';
      this.cropperModel = true;

    },
   beforeClose () {
      //判断是否点击的商品图片打开的裁剪框
      if (this.skufilekey == ''){
        //点击关闭刷新商品图片展示
        this.fileList2.push(this.file);
        this.fileList2.pop();
      }
      this.cropperModel = false;
    },
    //上传
    uploadproductimg (data, key) {
      let formData = new FormData();
      formData.append('uploadFile', data, this.file.name);
      console.log(this.file.name)
       console.log(data)
      if (typeof (key) == "undefined" || key == '') {
        this.uploadFileRequest('/file/upload',formData).then(req=>{
          var data=req.data;
          const currentPic =data.data[0];
          this.ruleForm.src =currentPic;
          this.form.img = currentPic;
          this.form.imgs.push(currentPic);
          this.fileList2.push({
            url: currentPic,
            uid: '111'
          });
          this.$refs.vueCropper.isDisabled = false;
          this.cropperModel = false;
        })
      } else {
        // addimg(formData).then(res => {
        //   this.skuimg[key] = res.url;
        //   // 刷新图片
        //   this.isshowskuimg = false;
        //   this.isshowskuimg = true;
        //   this.$refs.vueCropper.isDisabled = false;
        //   this.cropperModel = false;
        // })
        }
      },
      


    },
    components: {
      Cropper,
    },
  
}
</script>px
<style>
.box-card {
    margin: auto;
    margin-top: 30px;
     margin-bottom: 30px;
    padding-left: 50px;
    width: 950px;
    padding-right: 50px;
    height: 900px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader input{
     opacity: 0;
        display: none;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .butt{
    margin-left: 46%;
  }
  .zz{
            color:blue;
            cursor: pointer;
        }
</style>