<template>
    <div>
        <utop></utop>
        <div class="userdata">
            <div class="userdata2">
                <div class="dataurl">
                    <img :src="user.src" alt="">
                    <span style=" margin-right: 80px;">账号：{{user.anumber}}</span>
                </div>
                <div class="datasore">
                    <p>性别：{{user.gender}}</p>
                    <p>年龄：{{user.age}}岁</p>
                    <p>名字：{{user.name}}</p>
                    <p>邮箱：{{user.emeil}}</p>
                    <p>个性签名：{{user.signature}}</p>
                    <p>生日:{{user.birthday}}</p>
                    
                </div>
                <el-tabs type="border-card">
                        <el-tab-pane label="视频">
                             <p v-if="Videos=='undefined'||Videos==''||Videos==null"><span><hr></span>暂时没有vlog</p>
                            <span v-else >
                          	    <ul class="mui-table-view mui-table-view-chevron" style="cursor: pointer;">
                                  <li class="mui-table-view-cell mui-media" v-for="(item,i) in Videos" :key="item.essayid">
                                      <a class="mui-navigate-right" @click="getreadmorevideo2(i)">
                                          <img class="mui-media-object mui-pull-left" :src="item.videourl">
                                          <div class="mui-media-body">{{item.videotitle}}
                                              <p class='mui-ellipsis'>{{item.videosource}}</p>
                                          </div>
                                      </a>
                                  </li>
                                </ul>
                             </span>
                        </el-tab-pane>
                        <el-tab-pane label="日志">
                            <p v-if="Eassy=='undefined'||Eassy==''||Eassy==null"><span><hr></span>暂时没有日志</p>
                            <span v-else >
                          	    <ul class="mui-table-view mui-table-view-chevron" style="cursor: pointer;">
                                  <li class="mui-table-view-cell mui-media" v-for="(item,i) in Eassy" :key="item.essayid">
                                      <a class="mui-navigate-right" @click="readmoretext2(i)">
                                          <img class="mui-media-object mui-pull-left" :src="item.essayurl">
                                          <div class="mui-media-body">{{item.essaytitle}}
                                              <p class='mui-ellipsis'>{{item.essaysource}}</p>
                                          </div>
                                      </a>
                                  </li>
                                </ul>
                            </span>
                        </el-tab-pane>
                </el-tabs>
            </div>
            
        </div>
    </div>
</template>

<script>
import utop from '../relesase/utop'
export default {
    data(){
        return{
            user:'',
            primary:'primary',
            text:'加为好友',
            check:'el-icon-check',
            Videos:[],
            Eassy:[],//存放日志管理信息
        }
    },
    created(){
        this.getUserid()
    },
    methods:{
        getUserid(){
              this.user=this.$route.params.user2;
              this.postRequest('/video/selectP',{id:this.user.id}).then(req=>{
                var data=req.data;
                this.Videos=data.data;
            })
            this.postRequest('/essay/selectP',{id:this.user.id}).then(req=>{
                var data=req.data;
                this.Eassy=data.data;
                console.log(this.Eassy)
            })

        },
        readmoretext2(i){
            var Text1=this.Eassy[i]
            this.$router.push({name:'readmoretext',params:{Text:Text1}});
        },
        getreadmorevideo2(i){
            var video1=this.Videos[i]
            this.$router.push({name:'readmorevideo',params:{video:video1}});
        },
    },
    components:{
        utop
    }
}
</script>
<style lang="scss" scoped>
.userdata{
    width: 1024px;
    margin: auto;
    background-color: #fff;
    padding-top: 40px;
    padding-bottom: 40px;
    .userdata2{
        width: 500px;
        margin: auto;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding-top: 40px;
       padding-bottom: 40px;
        .dataurl{
             width: 500px;
             height: 60px;
             border-bottom-style: dotted;
             border-width: 1px;
             border-color: #000;
             padding-left: 40px;
              img{
                width: 50px;
                height: 50px;
                border-radius: 50px;
                margin-right: 40px;
             }
        }
        .datasore{
             padding: 40px;
        }
    }
}
</style>
