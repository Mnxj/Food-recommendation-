<template>
    <div class="alog">
          <p>日期 &nbsp;&nbsp;&nbsp;&nbsp;<el-date-picker  value-format="yyyy-MM-dd" v-model="title.jdate" type="date" placeholder="选择日期"> </el-date-picker></p>
        <br>
        <br>
        <el-row>
         <el-col :span="2"><div class="grid-content bg-purple"><p>纪录</p></div></el-col>
         <el-col :span="20"><div class="grid-content bg-purple-light"><el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="title.jtext"></el-input></div></el-col>
          <div class="upload"><el-button type="primary" @click="upload">上传<i class="el-icon-upload el-icon--right"></i></el-button></div>
        </el-row>
        
    </div>
</template>

<script>
export default {
  data() {
      return {
          title:{
          jdate:'',
          jtext: '',
          jname:''
          }
      }
   },
   methods: {
       upload(){
           this.title.jname=this.msg
           console.log(this.msg)
           this.postRequest('/journal/insert',this.title).then(
            resp=>{
                var data=resp.data;
                 if(data.code==0){
                   this.$notify({
                     title: '添加成功',
                     type: 'success'
                   });
                   this.title.jdate=''
                    this.title.jtext=''
                 }else{
                    this.$notify.error({
                      title: '添加成功',
                      message: data.msg
                    });
                 }
            })
       }
   },
   props:['msg']
}
</script>

<style>
.alog{
    width: 600px;
    height: 700px;
    margin-top: 30px;
    margin-left: 70px; 
}
.upload{

    margin-left: 150px;
}
</style>
