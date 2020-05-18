<template>
    <div class="alabel">
        <div class="panel panel-primary">
            <div class="panel-heading">
              <h3 class="panel-title">标签管理</h3>
            </div><br>
             <el-input style="padding-left:20px; width: 200px;" v-model="input" placeholder="请输入内容"></el-input>
             <el-button type="primary" @click="insertl" class="el-icon-s-promotion">发布</el-button>
        </div>
      <table class="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>
               <p>序号</p>  
            </th>
          <th>
              <p>名字</p>  
          </th>
          <th>
              <p>删除</p>  
          </th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in label" :key="item.id">
            <td>{{i+1}}</td>
            <td>{{item}}</td>
            <td>
                <el-button @click="DeletLab(item)" type="danger" icon="el-icon-delete" circle ></el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  data(){
    return{
      input:'',
      label:[]//存放标签
    }
  },
  created(){
    this.getLabel()
  },
  methods:{
    getLabel(){
      this.getRequest('/label/selcetAll').then(req=>{
        var data=req.data
        if(data.code==0){
          this.label=data.data
        }
      })
    },
    insertl(){
      this.postRequest('/label/insert',{latext:this.input}).then(resp=>{
        var data=resp.data
        if(data.code==0){
          this.$notify({
               title: '成功',
               message:data.data,
               type: 'success'
          });
          this.getLabel();
          this.input=''
        }else{
          this.$notify.error({
            title: '失败',
            message: data.msg
          });
        } 
      })
    },
    DeletLab(str){
      this.postRequest('/label/dell',{latext:str}).then(resp=>{
        var data=resp.data
        if(data.code==0){
          this.$notify({
               title: '成功',
               message:data.data,
               type: 'success'
          });
          this.getLabel();
        }else{
          this.$notify.error({
            title: '失败',
            message: data.msg
          });
        } 
      })
    }
  }

}
</script>

<style>
.alabel{
    height: 700px;
   
}
</style>
