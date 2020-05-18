<template>
 <div>
     <!-- 头部 -->
    <utop></utop>
  <div class="setVideo">
      <div>
        <h2>Vlog</h2>
        <hr>
        <el-button type="success" round>已发布</el-button>
       <p v-if="Videos=='undefined'||Videos==''||Videos==null"><span><hr></span>暂时没有vlog</p>
             <span v-else >
                <ul class="mui-table-view mui-table-view-chevron" style="cursor: pointer;">
                     <li class="mui-table-view-cell mui-media" v-for="(item,i) in Videos" :key="item.essayid">
                          <a @click="getreadmorevideo3(i)">
                           
                            <img class="mui-media-object mui-pull-left" :src="item.videourl">
                             <div style="float:right;">
                                <i class="el-icon-video-play"> {{item.vcount}}</i>
                                <i class="el-icon-chat-dot-round">{{item.plcount}}</i>
                                <i class="el-icon-close" @click="setVideosid(item.videoid)"></i>
                                <el-dialog
                                title="提示"
                                :visible.sync="dialogVisible"
                                width="30%"
                                :before-close="handleClose">
                                <span>确定删除?不可找回！</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="setVclose(i)">确 定</el-button>
                                </span>
                                </el-dialog>
                            </div>
                            <div class="mui-media-body">{{item.videotitle}}
                               <p class='mui-ellipsis'>{{item.videosource}}</p>
                            </div>
                           
                          </a>
                    </li>
                 </ul>
             </span>
        <br>
         <el-button type="info" round>审核中</el-button>
        <p v-if="Videos2=='undefined'||Videos2==''||Videos2==null"><span><hr></span>暂时没有</p>
         <span v-else >
                <ul class="mui-table-view mui-table-view-chevron" style="cursor: pointer;">
                     <li class="mui-table-view-cell mui-media" v-for="item in Videos2" :key="item.videoid">
                            <img class="mui-media-object mui-pull-left" :src="item.videourl">
                            <div class="mui-media-body">{{item.videotitle}}
                               <p class='mui-ellipsis'>{{item.videosource}}</p>
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
                videoid:'',
            },
            Videos:[],
            Videos2:[],
        }
    },
    created(){
        this.getVideos()
    },
    methods: {
        handleClose(done) {
         this.$confirm('确认关闭？')
           .then(_ => {
             done();
           })
          .catch(_ => {});
        },
        setVclose(){
            this.dialogVisible=false; 
            this.postRequest('/video/DeleteV',{src:this.Videos[i].videourl,url:this.Videos[i].videocontent,videoid:this.Videos[i].videoid}).then(req=>{
                var data =req.data;
                if(data.code==0){
                   this.getVideos();
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
        setVideosid(num){
            this.dialogVisible=true;
            this.from.videoid=num
        },
        getVideos(){
            this.from.id=this.$store.getters.getUser.id;
            this.postRequest('/video/selectP',this.from).then(req=>{
                var data=req.data;
                this.Videos=data.data;
            })
            this.postRequest('/video/selectER',this.from).then(req=>{
                var data=req.data;
                this.Videos2=data.data;
            })
        },
        getreadmorevideo3(i){
            var video1=this.Videos[i]
            this.$router.push({name:'readmorevideo',params:{video:video1}});
        }
    },
    components: {
      utop
    }

}
</script>
<style lang="scss" scoped>
.setVideo{
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

