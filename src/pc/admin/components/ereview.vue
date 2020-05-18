<template>
    <div class="ereview">
         <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">日志审核</h3>
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
                        <p>描述</p>
                    </th>
                    <th>
                        <p>创建时间</p>
                    </th>
                    <th>
                        <p>查看</p>
                    </th>
                    <th><p>操作</p>
                    </th>
                </tr>
            </thead>
        <tbody>
            <tr v-for="(item,i) in estickey" :key="item.essayid">
                <td>{{item.essaytitle}}</td>
                <td>{{item.name}}</td>
                <td>  <img :src="item.essayurl" alt="" style="width: 40px;height: 40px;border-radius: 50px;"></td>
                <td> <p>{{item.essaysource}}</p></td>
                <td>{{item.essaytime}}</td>
                <td><i class="el-icon-view" @click="play(i)" style="font-size:30px;cursor: pointer; "></i></td>
                <td>
                    <el-button @click="updatEreview(i,1)" type="success" icon="el-icon-check" circle></el-button>
                    <el-button  @click="updatEreview(i,2)" type="danger" icon="el-icon-delete" circle></el-button>
                </td>
            </tr>
       </tbody>
      </table>
      <div class="Fye">
           <el-pagination   @current-change="handleCurrentChange" :page-size="7" :total="sum" layout="prev, pager, next"> </el-pagination>
        </div>
         <transition >
            <div class='demo' v-if="dialogVisible">
                <div class="rtop">
                 <h3>《{{essay.essaytitle}}》</h3>
                 <p>作者：{{essay.name}}</p>
                 <hr>
                </div>
                <div  style="padding: 20px;"  v-html="essay.essaycontent">
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data(){
       return{
           estickey:[],
           sum:0,
           count:1,
           dialogVisible:false,
           essay:''
       }   
    },
    created(){
        this.getEsticky();
        this.getCount();
    },
    methods:{
        getCount(){
            this.postRequest('/essay/selcetCount',{n:2}).then(
             resp=>{
                 var data=resp.data;
                 this.sum=data.data;
             })
        },
        getEsticky(){
            this.postRequest('/essay/selecetAllV',{pag:1}).then(resp=>{
                var data=resp.data
                if(data.code==0){
                this.estickey=data.data
                }
            })
        },
        handleCurrentChange(val){
            this.count=val
            this.postRequest('/essay/selecetAllV',{pag:val}).then(resp=>{
                 var data=resp.data;
                  if(data.code==0){
                    this.estickey=data.data
                }
            })
        },
        updatEreview(i,num2){
             this.postRequest('/essay/updatEreview',{url:this.estickey[i].essayurl,essayid:this.estickey[i].essayid,n:num2}).then(resp=>{
                 var data=resp.data;
                  if(data.code==0){
                   this.$notify({
                     title: '成功',
                     type: 'success'
                     
                   });
                   
                   var text;
                   if(data.data==2){
                       var text='你的文章'+this.estickey[i].essaytitle+'通过了审核'
                   }
                   if(data.data==1){
                       var text='你的文章'+this.estickey[i].essaytitle+'没有通过审核'
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
        },
        play(i){
            this.dialogVisible=!this.dialogVisible
            if(this.dialogVisible){
                this.essay=this.estickey[i]
            }
        }
    }

}
</script>
<style lang="scss" scoped>

.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
.v-enter,.v-leave-to
{
  transform: translatex(100%);
  opacity: 0;
}
.a-enter-active,
.a-leave-active {
  transition: all 1s ease;
}
.a-enter,.v-leave-to
{
  transform: translatey(100%);
  opacity: 0;
}
.ereview{
    height: 750px;
    .Fye{
        padding-top: 30px;
        margin-left: 300px;
        
    }
    .demo{
        padding-top: 15px;
        position: fixed;
        top:14%;
        left:14%;
        z-index: 99999;
        display: inline-block;
        width: 700px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
        border-radius: 20px;
        padding-bottom: 50px;
        .rtop{
            text-align: center;
        }
    }
}
</style>

