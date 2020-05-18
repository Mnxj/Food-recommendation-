<template>
    <div class="aesticky">
         <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">日志置顶</h3>
            </div>
         </div>
        <table class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>
                        <p>标题</p>  
                    </th>
                    <th>
                        <p>作者</p>  
                     </th>
                    <th>
                        <p>图片</p>
                    </th>
                    <th>
                        <p>阅读量</p>
                    </th>
                    <th>
                        <p>喜欢数</p>
                    </th>
                    <th>
                        <p>评论数</p>
                    </th>
                    <th>
                        <p>创建时间</p>
                    </th>
                    <th><p>置顶</p>
                    </th>
                </tr>
            </thead>
        <tbody>
            <tr v-for="(item,i) in estickey" :key="item.essayid">
                <td>{{item.essaytitle}}</td>
                <td>{{item.name}}</td>
                <td>  <img :src="item.essayurl" alt="" style="width: 40px;height: 40px;border-radius: 50px;"></td>
                <td>{{item.ecount}}</td>
                <td>{{item.elikecount}}</td>
                <td>{{item.ercomment}}</td>
                <td>{{item.essaytime}}</td>
                <td>
                    <span v-if="item.esticky==0">
                        <el-button @click="updateEsticky(i,1)" type="warning" icon="el-icon-top" circle ></el-button>
                    </span>
                    <span v-else>
                         <el-button @click="updateEsticky(i,2)" type="warning"  circle >取消</el-button>
                    </span>
                </td>
            </tr>
       </tbody>
      </table>
      <div class="Fye">
           <el-pagination   @current-change="handleCurrentChange" :page-size="7" :total="sum" layout="prev, pager, next"> </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
       return{
           estickey:[],
           sum:0,
           count:1
       }   
    },
    created(){
        this.getEsticky();
        this.getCount();
    },
    methods:{
        getCount(){
            this.postRequest('/essay/selcetCount',{n:1}).then(
             resp=>{
                 var data=resp.data;
                 this.sum=data.data;
             })
        },
        getEsticky(){
            this.postRequest('/essay/selecetAll',{pag:1}).then(resp=>{
                var data=resp.data
                if(data.code==0){
                this.estickey=data.data
                }
            })
        },
        handleCurrentChange(val){
            this.count=val
            this.postRequest('/essay/selecetAll',{pag:val}).then(resp=>{
                 var data=resp.data;
                  if(data.code==0){
                    this.estickey=data.data
                }
            })
        },
        updateEsticky(i,num2){
             this.postRequest('/essay/updateEsticky',{essayid:this.estickey[i].essayid,n:num2}).then(resp=>{
                 var data=resp.data;
                  if(data.code==0){
                   this.$notify({
                     title: '成功',
                     type: 'success'
                   });
                   var text;
                   if(data.data==2){
                       var text='管理员置顶了你的文章'+this.estickey[i].essaytitle
                   }
                   if(data.data==1){
                       var text='管理员取消置顶了你 的文章'+this.estickey[i].essaytitle
                   }
                    this.postRequest('/api/ws/sendOne',{

                       type:5,
                       message:text,
                       id2:this.estickey[i].id,
                       url1:this.estickey[i].essayurl
                    }).then(req=>{})
                   this.handleCurrentChange(this.count)
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
<style lang="scss" scoped>
.aesticky{
    height: 700px;
    .Fye{
        padding-top: 30px;
        margin-left: 300px;
        
    }
}
</style>

