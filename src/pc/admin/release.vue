<template>
<div class="release">
   <ol class="breadcrumb" style="background-color:#fff;">
      <li class="active">首页</li>
      <li class="active">管理</li>
      <li class="active">发布管理</li>
   </ol>
   <br>
   <div class="releasebz">
     <el-steps :active="active" simple>
       <el-step title="步骤 1" icon="el-icon-edit"></el-step>
       <el-step title="步骤 2" icon="el-icon-picture"></el-step>
       <el-step title="步骤 3" icon="el-icon-upload"></el-step>
     </el-steps>
   </div>

  <!-- 发布商品的 -->
    <el-form v-show="active==0" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item class="sdsd" label="名称" prop="rname">
        <el-input v-model="ruleForm.rname" ></el-input>
      </el-form-item>
     
     <!-- 上传图片 -->
 
     <div class="img1s">
       <el-button  size="small" type="primary" @click="openBrowse">点击上传</el-button>
       <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
       <input  accept="image/png, image/jpeg" id="pic"  @change="upload($event)" type="file" class="picinput"/>
          <div v-show="disabled" class="img1s-ss">
           <img :src="ruleForm.rurl" width="100px" height="100px"  alt="">
           <p>{{fileList.name}}</p>
           </div>
          <el-progress :percentage="percentage" v-show="disabled"></el-progress>
       
     </div>
      
       <el-form-item class="sdsd" label="电话" prop="rtel">
        <el-input v-model="ruleForm.rtel" ></el-input>
      </el-form-item>
       <el-form-item class="sdsd" label="区名" prop="radname">
        <el-input v-model="ruleForm.radname" ></el-input>
      </el-form-item>
       <el-form-item class="sdsd" label="区号" prop="radcode">
        <el-input v-model="ruleForm.radcode" ></el-input>
      </el-form-item>
       <el-form-item label="选择类型" prop="rtype">
        <el-radio-group v-model="ruleForm.rtype">
         <el-radio label="餐饮服务"></el-radio>
         <el-radio label="景点"></el-radio>
         </el-radio-group>
       </el-form-item>
      <el-form-item label="输入坐标" prop="rlong">
         <input type="text" v-model="ruleForm.rlong" class="zuobiao"  @change="keyPress()">
         <input type="text" v-model="ruleForm.rlat" class="zuobiao" @change="keyPressy()">
      </el-form-item>
       <el-form-item class="sdsd" label="标签" prop="rtag">
        <el-input v-model="ruleForm.rtag" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 发布图片介绍的 -->
    <div v-show="active==1" class="buzhou2">
      <el-upload
          class="upload"
           action="http://localhost:8080/file/upload"
           accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
           list-type="picture-card"
          :limit="4"
          :before-upload="onBeforeUpload"
          :on-exceed="handleExceed"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="true"
          >
          <i class="el-icon-plus"></i>
      </el-upload>
        <el-dialog :visible.sync="dialogVisible">
           <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
          <el-button type="primary" icon="el-icon-arrow-left" @click="active=0">上一部</el-button>
          <el-button type="primary" @click="insertImg">上传<i class="el-icon-upload el-icon--right"></i></el-button>
         <el-button type="primary">下一部<i class="el-icon-arrow-right el-icon--right" @click="active=2"></i></el-button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
          fileList1:[],//存放传回来的图片
          dialogImageUrl: '',//缓存url
          dialogVisible: false,
          active: 0,//存放步骤
          percentage:0,//进度
          fileList:{name:'',url:''},
          disabled: false,//显示图片框
          ruleForm:{
           rname: '',//名称
           rtype:'',//类型
           rlong:'',
           rlat:'',
           rurl:'',
           radname:'',
           radcode:'',
           rtel:'',
           rtag:''
           },
           
          rules: {
             radcode:[
            { required: true, message: '请输入区号', trigger: 'blur' },
             { min: 6, max: 6, message: '长度为6位', trigger: 'blur' }
          ],
             radname: [
            { required: true, message: '请输入城市', trigger: 'blur' },
          ],
             rtag: [
            { required: true, message: '请输入标签', trigger: 'blur' },
          ],
           rname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          rtype: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          rlong:[
            { required: true, message: '请输入x,y轴坐标', trigger: 'blur' },
             { min: 3, max: 9, message: '长度在 3 到 9', trigger: 'blur' }
          ],
           rtel:[
            { required: true, message: '请输入电话号码', trigger: 'blur' },
             { min: 11, max: 11, message: '长度为11位', trigger: 'blur' }
          ]

        }

        }
    },
    methods: {
        upload(event){
            var _this=this;
            const file=event.target.files[0]; 
            const formdate= new FormData();
            formdate.append('uploadFile',file)
            this.fileList.name=file.name;
            this.uploadFileRequest('/file/upload',formdate).then(req=>{
                 var data=req.data;
                  _this.ruleForm.rurl=data.data;
            })
            this.percentage=100;
        },
        //提交表单
         submitForm(formName) {
          const name =formName;
          this.$refs[name].validate((valid) => {
           if (valid) {
              this.postRequest('/release/insert',this.ruleForm).then(req=>{
                var data=req.data
                console.log(data)
                if(data.code==0){
                  this.active=1;
                }
              
             })
           } else {
             console.log('error submit!!');
             return false;
            }
           });
         },
         //重置
         resetForm(formName) {
           this.$refs[formName].resetFields();
         }
         //替换input
         ,openBrowse(){
          var obg=document.getElementById('pic');
          if(obg){
            this.disabled=true;
            obg.click();
          }
         }
         ,keyPress(){
             var rlong=this.ruleForm.rlong;
              var r = rlong.match(/^\d{3}$/);
              var x1=rlong.match(/^\d{3}(\.\d*)?$/);
               if(r == null&&x1==null){
                   alert("请按规则重新输入");
                   this.ruleForm.rlong="";
               }
         }
         ,keyPressy(){
            var rlat=this.ruleForm.rlat;
              var r = rlat.match(/^\d{3}$/);
              var rlong=rlat.match(/^\d{2}(\.\d*)?$/);
               if(r == null&&rlong==null){
                   alert("请按规则重新输入");
                   this.ruleForm.rlat="";
               }
         },
          handleRemove(file, fileList) {
            console.log(file, fileList);
         },
         handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
         },
         handleExceed(files, fileList) {
              this.$message.warning(`当前限制选择 4 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
         },
         //上传到服务器照片
         onBeforeUpload(file){
                var formdate =new FormData()
                formdate.append("uploadFile",file)
                this.uploadFileRequest('/file/upload',formdate).then(req=>{
                 var data=req.data;
                      this.fileList1.push(data.data[0]);
                })
         },
         //把返回的路径放回表格
         insertImg(){
           var formdate =new FormData()
            formdate.append("name",this.ruleForm.name)
           formdate.append("img1",this.fileList1[0])
           formdate.append("img2",this.fileList1[1])
           formdate.append("img3",this.fileList1[2])
           formdate.append("img4",this.fileList1[3])
           console.log(formdate)
           this.uploadFileRequest('/img/insert',formdate).then(req=>{
                 var data=req.data;
           })
         }

    },
}
</script>

<style lang="scss" >
.release{
    height: 1000px;
    .releasebz{
      margin: 0% 40% 7% 0%;
     
    }
    .ruleForm{
        position: absolute;
        width: 60%;
        .img1s{
          padding-left: 15%;
          width: 80%;
          padding-bottom: 40px;
        }
        .picinput{
          display: none;
        }

        .zuobiao{
          width: 200px;
          
        }
    }
    .buzhou2{
       margin-left: 10%;
       margin-right: 10%;
       padding-top: 20%;
     .upload{

       input{
        opacity: 0;
        display: none;
       }
      }
     }
}
</style>

