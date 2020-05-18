<template>
    <div class="aid">

      <div class="panel panel-primary">
         <div class="panel-heading">
          <h3 class="panel-title">账户管理</h3>
        </div>
      </div>
      <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
         
          <th>
             <p>账号</p>  
           </th>
          <th>
              <p>姓名</p>  
          </th>
          <th>
              <p>性别</p>
          </th>
          <th>
              <p>邮箱</p>
          </th>
          <th>
              <p>年龄</p>
          </th>
          <th>
              <p>生日</p>
           </th>
          <th><p>创建时间</p>
          </th>
          <th><p>操作</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listname" :key="item.id">
            <td>{{item.anumber}}</td>
            <td>{{item.name}}</td>
            <td>{{item.gender}}</td>
            <td>{{item.emeil}}</td>
             <td>{{item.age}}</td>
            <td>{{item.birthday}}</td>
            <td>{{item.creationdate}}</td>
            <td>
                <el-button @click="Deletuser(item.id)" type="danger" icon="el-icon-delete" circle ></el-button>
            </td>
        </tr>
       </tbody>
      </table>
     
    </div>
</template>

<script>
export default {
    data() {
        return {
            listname:[]
        }
    },
    created(){
        this.sumbitClick()
    },
    methods: {
        sumbitClick:function(){
            var _this=this;
            this.loding=true;
            this.getRequest('/user/list').then(
                resp=>{
                    _this.loding=false;
                    var data=resp.data;
                    _this.listname=data.data;
                    for(var i=0;i<_this.listname.length;i++){
                        if(_this.listname[i].id==this.num){
                            _this.listname.splice(i,1);
                        }
                    }

                    // console.log(listname);
                }
            )
            
        },
        Deletuser(i){
             this.postRequest('/user/detflag',{id:i}).then(
                resp=>{
                    var data=resp.data
                    if(data.code==0){
                        this.sumbitClick()
                    } 
                }
            )
        },
        
    },
    props:['num']

}
</script>

<style >
.aid{
    height: 700px;
    
}
</style>
