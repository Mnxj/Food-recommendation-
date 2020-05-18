<template>
  <div>
     <!-- 头部 -->
    <utop></utop>
    <div class="data">
        <div class="Ddata">
            <h3 class="font">修改资料</h3>
            <hr>
            <div class="form">
            <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">    
              <el-form-item label="昵称">
                <el-input  class="iw" v-model="ruleForm.name"></el-input>
             </el-form-item>
             <el-form-item label="签名">
                <el-input  v-model="ruleForm.signature"></el-input>
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
             <el-form-item label="性别">
              <el-radio v-model="ruleForm.gender" label="男">男</el-radio>
              <el-radio v-model="ruleForm.gender" label="女">女</el-radio>
             </el-form-item>
             <el-form-item label="生日">
              <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="ruleForm.birthday"  
              type="date" 
              placeholder="选择日期" 
              :picker-options="pickerOptions">
              </el-date-picker>
              </el-form-item>
              <el-form-item>
                  <el-button class="butt" type="primary" @click="submitForm()">提交</el-button>
                  <el-button @click="resetForm()">重置</el-button>
              </el-form-item>
           </el-form>
           </div>
        </div>
    </div>
  </div>
</template>

<script>
import utop from '../relesase/utop'
import Cropper from '../../user/ucropper';
export default {
    data(){ 
        return{
        pickerOptions: {
          disabledDate(time){
            return time.getTime() > Date.now();
          }
        },
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
          anumber:'',//账号
          src:'',//图片
          name:'',//昵称
          gender:'',//性别
          birthday:'',//生日
          signature:''//签名

        }
    }
  },
  methods: {
      submitForm(formName) {
        this.ruleForm.anumber=this.$store.getters.getUser.anumber;
        var from=this.ruleForm;
       if (from.src!=''||from.name!=''||from.gender!=''||from.birthday!=''||from.signature!='') {
           this.postRequest('/user/UpdateSig',from).then(resp=>{
                var data=resp.data;
                if(data.code==0){
                    console.log(data)
                   this.$notify({
                     title: '成功',
                     message:data.data.name,
                     type: 'success'
                   });
                    this.$store.commit('remove');
                    this.$store.commit('addUser',data.data);
                }else{
                     this.$notify.error({
                      title: '失败',
                      message: data.msg
                    });
                }
           })
        } else {
          this.$notify.error({
            title: '表单错误！',
          });
        }  
      },
      resetForm() {
       this.ruleForm.src='';
        this.ruleForm.name='';
         this.ruleForm.gender='';
          this.ruleForm.birthday='';
           this.ruleForm.signature='';
      },
      consoleFL (file, fileList) {
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
       }
      },
  },
  components: {
      Cropper,
      utop
  }
}
</script>
<style>
.data{
    width: 1024px;
    height: 700px;
    background: url(../../../imgas/psddata.jpg) no-repeat;
    margin: auto;
}
    .Ddata{
        padding-top: 10px;
        margin: auto;
        width: 850px;
        height: 700px;
        background-color: #ffffff50;
    }
        .font{
             padding-top: 10px;
            padding-left: 20px;
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
        .form{
            margin-right: 100px;
        }
        .iw{
            width: 170px;
        }
    

</style>