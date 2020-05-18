<template>
    <div class="Alluserdata">
        <br>
        <el-row>
         <el-col :span="2"><div class="grid-content bg-purple"><p>通知</p></div></el-col>
         <el-col :span="20"><div class="grid-content bg-purple-light"><el-input type="textarea" :rows="7" placeholder="请输入内容" v-model="text"></el-input></div></el-col>
        </el-row>
        <div class="Alluserdataup"><el-button type="primary" @click="uploaddata"><i class="el-icon-s-promotion"></i> &nbsp;&nbsp;发布</el-button></div>
    </div>
</template>

<script>
export default {
  data() {
      return {
        text:'',
      }
   },
   methods: {
       uploaddata(){
         console.log(this.msg)
           this.postRequest('/api/ws/sendAll',{admin:this.msg, message:this.text}).then(
            resp=>{
                var data=resp.data;
                 if(data.code==0){
                   this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                   this.text=''
                 }else{
                    this.$notify.error({
                      title: '失败成功',
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
.Alluserdata{
    width: 600px;
    height: 600px;
    margin-top: 30px;
    margin-left: 70px; 
}
.Alluserdataup{
    margin-top: -90px;
    margin-left: 150px;
}
</style>
