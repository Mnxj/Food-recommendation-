<template>
    <div class="video">
      
        <div class="videoquill-editor">
            <el-row class="warp">

       <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
          <el-form-item label="标题" prop="videotitle">
            <el-input v-model="infoForm.videotitle"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="videosource">
            <el-input v-model="infoForm.videosource"></el-input>
          </el-form-item>
          <!-- 上传图片 -->
            <el-form-item label="首图"> 
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
          <!--上传视频-->
          <el-form-item label="vlog"> 
            <el-upload
             class="upload-demo" 
             action="string" 
             :limit="1"
             :before-upload="beforeAvatarUpload"
             :on-change="handleChange" 
              :http-request="uploadVideo" 
             accept=".mp4"
             :file-list="fileList">
              <el-button class="upload_button" size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过100Mb</div>
            </el-upload>
          </el-form-item>
            <!-- 添加标签 -->
          <el-form-item label="标签"> 
            <el-tag :key="tag" class="pictag" v-for="tag in infoForm.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
               {{tag}}
            </el-tag>
            <el-input class="input-new-tag"
             v-if="inputVisible"
             v-model="inputValue" 
             ref="saveTagInput" 
             size="small"  
             @keyup.enter.native="handleInputConfirm" 
             @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-form-item>
            <el-form-item>
              <el-button class="picsubmit"  type="primary" @click="onSubmit">确认提交</el-button>
            </el-form-item>
           </el-form>
          </el-col>
         </el-row>
        </div>
    </div>
</template>

<script>
import Cropper from '../../user/ucropper';
export default {
    data(){
        return{
          nnum:0,
        fileList:[],//视频
        inputVisible: false,
        inputValue: '',
        form:{
            uploadFile:'',
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
        //传回给后台
        infoForm: {
          id:'',
          rid:'',
          dynamicTags: ['美食'],
          videotitle: '',
          videosource: '',
          videocontent:'',//视频链接
          videourl:'',//图片
           radname:'',//名字
          radcode:'',
          vdate:0,//时间
          editorOption: {theme:'snow'}
         },
         //表单验证
         rules: {
           videotitle: [
             {required: true, message: '请输入标题', trigger: 'blur'}
            ],
             videosource: [
             {required: true, message: '请输入描述', trigger: 'blur'}
            ],
           },

        }
    },
    created(){
        this.getUser()
    },
     mounted() {
      //初始化
    },
    methods: {
      getUser(){
        this.infoForm.id=this.$store.getters.getUser.id;
      },
      //视频上传
      uploadVideo(file){
        
      },
      //限制视频大小
       beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 100;
        var url = URL.createObjectURL(file);
        var audioElement = new Audio(url);
        var duration;
        audioElement.addEventListener("loadedmetadata", function (_event) {
          duration = audioElement.duration; //时长为秒，小数，182.36
        });
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 100 MB!');
        }else{
          let from1=new FormData();
          from1.append("uploadFile",file)
          this.uploadFileRequest('/file/upload',from1).then(req=>{
          var data=req.data;
          this.infoForm.videocontent=data.data[0];
          this.$notify({
               title: '成功',
               message:data.msg,
               type: 'success'
            });
        })
        }
        return isLt2M;
      }, 
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-1);
      },
      onSubmit() {
        //提交
        //this.$refs.infoForm.validate，这是表单验证
        this.$refs.infoForm.validate((valid) => {
          if(valid) {
            console.log(this.infoForm)
            this.postRequest('/video/addVideo',this.infoForm).then(
             resp=>{
                var data=resp.data;
                if(data.code=='0'){
                   this.list=data.data;
                   this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                  this.infoForm.dynamicTags=[];
                  this.infoForm.videourl='';
                  this.infoForm.videotitle='';
                  this.infoForm.videocontent='';
                   this.infoForm.videosource='';
                  this.fileList=[];
                   this.fileList2=[];
                 }else{
                    this.$notify.error({
                      title: '获取失败',
                      message:data.msg,
                    });
                 }
             })
          }else{
            this.$notify.error({
                  title: '请完善内容！！！',
            });
          }
        });
      },
      //标签
      handleClose(tag) {
        this.infoForm.dynamicTags.splice(this.infoForm.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.infoForm.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
    //上传图片
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
        console.log(formData)
        if (typeof (key) == "undefined" || key == '') {
        this.uploadFileRequest('/file/upload',formData).then(req=>{
          var data=req.data;
          const currentPic =data.data[0];
          this.infoForm.videourl =currentPic;
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
  }
}
</script>

<style>
.video{
 width: 1024px;
 height: 700px;
 margin: auto;
 
 background: url(../../../imgas/102991.jpg);
}
.videoquill-editor{
  background-color: #ffffff80;
  width: 800px;
  margin: auto;
  height: 700px;
}
.warp-main{
  padding-top: 50px;
  width: 650px;
}
.editer{
  width: 650px;
  height: 400px;
  padding-bottom: 100px;
}
.picsubmit{
   margin-left: 200px;
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
/* 上传视频 */
.upload-demo{
  padding-top: 15px;
}
.upload-demo input{
  opacity: 0;
  display: none;
}
.avatar-uploader input{
    opacity: 0;
    display: none;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.pictag{
  margin-bottom: 40px;
}
</style>