<template>
 <div>
    <!-- 头部 -->
    <utop></utop>
  <div class="setEassy">
      <div>
        <h2>日志管理</h2>
        <hr>
        <el-button type="success" round>已发布</el-button>
        <p v-if="Eassy=='undefined'||Eassy==''||Eassy==null"><span><hr></span>暂时没有日志</p>
             <span v-else >
                <ul class="mui-table-view mui-table-view-chevron" style="cursor: pointer;">
                     <li class="mui-table-view-cell mui-media" v-for="(item,i) in Eassy" :key="item.essayid">
                          <a @click="readmoretext3(i)">
                           
                            <img class="mui-media-object mui-pull-left" :src="item.essayurl">
                             <div style="float:right;">
                                <i class="el-icon-video-play"> {{item.ecount}}</i>
                                <i class="el-icon-star-off">{{item.elikecount}}</i>
                                <i class="el-icon-chat-dot-round">{{item.ercomment}}</i>
                                <i class="el-icon-close" @click="setEassyid(item.essayid)"></i>
                                <el-dialog
                                title="提示"
                                :visible.sync="dialogVisible"
                                width="30%"
                                :before-close="handleClose">
                                <span>确定删除?不可找回！</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="setEclose(i)">确 定</el-button>
                                </span>
                                </el-dialog>
                            </div>
                            <div class="mui-media-body">{{item.essaytitle}}
                               <p class='mui-ellipsis'>{{item.essaysource}}</p>
                            </div>
                           
                          </a>
                    </li>
                 </ul>
             </span>
        <br>
        <br>
         <el-button type="info" round>审核中</el-button>
        <p v-if="Eassy2=='undefined'||Eassy2==''||Eassy2==null"><span><hr></span>暂时没有</p>
         <span v-else >
                <ul class="mui-table-view mui-table-view-chevron" style="cursor: pointer;">
                     <li class="mui-table-view-cell mui-media" v-for="item in Eassy2" :key="item.essayid">
                            <img class="mui-media-object mui-pull-left" :src="item.essayurl">
                            <div class="mui-media-body">{{item.essaytitle}}
                               <p class='mui-ellipsis'>{{item.essaysource}}</p>
                            </div>
                    </li>
                 </ul>
             </span>
      </div>
  </div>
 </div> 
</template>

<script>
import utop from '../relesase/utop'
export default {
    data(){
        return{
            dialogVisible: false,
            from:{
                id:'',
                essayid:'',
            },
            Eassy:[],//存放日志管理信息
            Eassy2:[],
        }
    },
    created(){
        this.getEassy()
    },
    methods: {
        handleClose(done) {
         this.$confirm('确认关闭？')
           .then(_ => {
             done();
           })
          .catch(_ => {});
        },
        setEclose(){
            this.dialogVisible=false;
            console.log(this.from.essayid);
            this.postRequest('/essay/DeleteE',{url:this.Eassy[i].essayurl,essayid:this.Eassy[i].essayid}).then(req=>{
                var data =req.data;
                if(data.code==0){
                   this.getEassy();
                   this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                }else{
                     this.$notify.error({
                      title: '失败',
                      message: data.msg
                    });
                }
            })
        },
        //设置参数
        setEassyid(num){
            this.dialogVisible=true;
            this.from.essayid=num
        },
        getEassy(){
            this.from.id=this.$store.getters.getUser.id;
            this.postRequest('/essay/selectP',this.from).then(req=>{
                var data=req.data;
                this.Eassy=data.data;
            }) 
            this.postRequest('/essay/selectER',this.from).then(req=>{
                var data=req.data;
                this.Eassy2=data.data;
                
            })
        },
        readmoretext3(i){
            var Text1=this.Eassy[i]
            this.$router.push({name:'readmoretext',params:{Text:Text1}});
        },
    },
    components: {
      utop
    }

}
</script>
<style lang="scss" scoped>
.setEassy{
    width: 800px;
    margin: auto;
    padding: 10px;
    background-color: aliceblue;
      li:hover {
      background-color: hotpink;
      transition: all 0.8s ease;
    }
}
</style>

