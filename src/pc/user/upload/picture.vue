<template>
    <div class="picture">
      
        <div class="quill-editor">
            <el-row class="warp">
                <el-col :span="24" class="warp-breadcrum">
                  <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{path:'/pc_index/uHome'}"><b>首页</b></el-breadcrumb-item>
                    <el-breadcrumb-item><a  @click="Xq">详情</a></el-breadcrumb-item>
                    <el-breadcrumb-item>上传日志</el-breadcrumb-item>
                  </el-breadcrumb>
        </el-col>
       <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
          <el-form-item label="标题" prop="essaytitle">
            <el-input v-model="infoForm.essaytitle"></el-input>
          </el-form-item>
          <!-- <el-form-item label="来源" prop="essaysource">
            <el-input v-model="infoForm.essaysource"></el-input>
          </el-form-item> -->
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
          <!--使用编辑器-->
            <el-form-item label="详细" prop="essaycontent">
              <div class="edit_container">
                <quill-editor v-model="infoForm.essaycontent"
                            ref="myQuillEditor"
                            class="editer"
                            :options="infoForm.editorOption" @ready="onEditorReady($event)">
                </quill-editor>
              </div>
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
          
          inputVisible: false,
          inputValue: '',
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
        infoForm: {
          id:'',
          rid:'',
          dynamicTags: ['美食'],
          essaytitle: '',
          essaysource: '',
          essaycontent:'',
          radname:'',//名字
          radcode:'',
          essayurl:'',//图片
          editorOption: {theme:'snow'}
         },
         //表单验证
         rules: {
           essaytitle: [
             {required: true, message: '请输入标题', trigger: 'blur'}
            ],
             essaycontent: [
             {required: true, message: '请输入', trigger: 'blur'}
            ]
           },

        }
    },
    created(){
        this.getUser()
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
     mounted() {
      //初始化
    },
    methods: {
      getUser(){
        this.infoForm.id=this.$route.params.id;
        this.infoForm.rid=this.$route.params.rid;
        this.infoForm.essaysource=this.$route.params.list.rname;
        this.infoForm.radname=this.$route.params.list.radname;
         this.infoForm.radcode=this.$route.params.list.radcode;
      },
      onEditorReady(editor) {
      },
      onSubmit() {
        //提交
        //this.$refs.infoForm.validate，这是表单验证
        this.$refs.infoForm.validate((valid) => {
          if(valid) {
            console.log(this.infoForm)
            this.postRequest('/essay/addEssay',this.infoForm).then(
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
                  this.infoForm.essayurl='';
                  this.infoForm.essaytitle='';
                  this.infoForm.essaycontent='';
                  this.fileList2=[];
                 }else{
                    this.$notify.error({
                      title: '获取失败',
                      message:data.msg,
                    });
                 }
             })
          }
        });
      },
      Xq(){
         this.$router.push({name:'release',params:{list:this.$route.params.list}});
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
       console.log(data)
       if (typeof (key) == "undefined" || key == '') {
        this.uploadFileRequest('/file/upload',formData).then(req=>{
          var data=req.data;
          const currentPic =data.data[0];
          this.infoForm.essayurl =currentPic;
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
.picture{
 width: 1024px;
 height: 1000px;
 margin: auto;
 background: url(../../../imgas/102986.jpg);
}
.quill-editor{
  background-color: #ffffff80;
  width: 800px;
  margin: auto;
  height: 1000px;
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
.avatar-uploader input{
    opacity: 0;
    display: none;
}
.warp-breadcrum{
  margin: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 800px;
  height: 40px;
  padding-left: 30px;
  padding-top: 15px;
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
