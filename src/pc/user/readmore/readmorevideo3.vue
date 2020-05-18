<template>
    <div>
        <!-- 头部 -->
        <utop></utop>
        <div class="readmorevideo">
            <div class="readmorevideo2">
                <span style="font-size:25px; color:#000; font-weight: 500;">{{morevideo.videotitle}}</span>
                <p style="font-size:14px;padding-top: 14px;">{{morevideo.dynamicTags}}&nbsp;&nbsp;&nbsp;&nbsp;{{morevideo.videotime}}</p>
                <p style="font-size:14px;padding-top: 14px;">{{vcount}}播放·{{ePl}}评论</p>
                <div style="float: left;">
                  <div class='demo'>
                    <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions" muted>
                    </video-player>
                  </div>
                </div>
                <div class="rvr" style="float: right;">
                  <p style=" letter-spacing:7px;text-shadow: 3px 5px 5px #FFA54F; ">相关推荐</p>
                  <hr>
                  <span v-if="Object.keys(this.morevideo2).length==0"><p>暂时没有...</p></span>
                  <span v-else>
                      <ul class="mui-table-view mui-table-view-chevron" style="cursor: pointer;">
                            <li class="mui-table-view-cell mui-media" v-for="(item,i) in morevideo2" :key="item.videoid">
                                <a class="mui-navigate-right" @click="getreadmorevideo(i)">
                                    <img class="mui-media-object mui-pull-left" :src="item.videourl">
                                        <div class="mui-media-body">{{item.videotitle}}
                                              <p class='mui-ellipsis'>{{item.videosource}}</p>
                                        </div>
                                </a>
                            </li>
                        </ul>
                  </span>
                </div>
                <div class="rvrpl">
                   <p class="rvrplfont">发表评论</p>
                   <p class="rvrplbg"></p>
                   <!-- 先查询一个评论列表，然后下面显示一个输入框 -->
                   <div class="rvrplcenter">
                        <p><span v-if="Object.keys(this.vcomment).length==0">暂时还没有人<span @click="videoFlag" style="cursor: pointer; color:dodgerblue;">评论</span></span>
                           <span v-else>
                                <div v-for="(item,i) in vcomment" :key="item.vcid">
                                    <div  class="vcomment" v-if="i<count">
                                      <div class="vecomment">
                                         <img  :src="item.src" alt="">
                                         <p class="vcommentfont">{{item.name}}</p>
                                      </div>
                                      <p style="padding-top:7px;padding-left:5px; color:#000;font-size:13px;">{{item.vctext}}</p>
                                      <p style="text-align: right;font-size:12px;">{{item.vcdate}}</p>
                                      <div class="vcbox">
                                         <span class="vcztongbox"><i @click="addlike(item.vcid,1)" v-if="item.vlike" class="el-icon-star-off vcstatr"></i>
                                         <i @click="addlike(item.vcid,2)" v-else class="el-icon-star-on vcstatr"></i><span style="color: cornflowerblue; font-size:12px;"> {{item.vcount}} 赞同</span></span>
                                         <span class="vccommt"><i @click="VFalgFont(i,item.vcid,item.id)" class="el-icon-chat-square"></i></span><span style="font-size:12px;">{{item.count}}条评论</span>
                                         <a v-if="item.vtrashflag" style="float :right; cursor: pointer;" @click="Readvideotrash(item.vcid,item.id)"><span class="mui-icon mui-icon-trash" style="font-size:18px;"></span></a>
                                      </div>
                                      <span v-if="item.vlflag">
                                        <!-- 有人回复 -->
                                        <div class="vcboxzz">
                                            <span v-if="Object.keys(item.vccomment).length==0">暂时还没有人<a @click="videoFlag2(i)">回复</a>
                                                <div class="vcbox2" v-if="vtextfalg2">
                                                    <el-input type="textarea"  @focus="Focus3(i)" :rows="item.vtextfont2" placeholder="回复..." v-model="formdate.vcctext"> </el-input>
                                                    <el-button v-if="item.vbutton"  type="primary" plain @click="addCommentc(i)">提交</el-button>
                                                </div>
                                            </span>
                                            <span v-else>
                                                <div v-for="(item2,n) in item.vccomment" :key="item2.vccid">
                                                    <div class="boxcommentc">
                                                        <img  :src="item2.src" alt="">
                                                        <p style=" font-size: 12px;">&nbsp;{{item2.name2}} <span style="color:#000;">&nbsp;回复：</span>{{item2.name1}} </p>
                                                        <p style="padding-top:10px;padding-left:5px;padding-bottom:6px; color:#000; font-size: 12px;">{{item2.vcctext}}</p>
                                                        <p style="text-align: right; font-size: 12px;">{{item2.vccdate}}</p>
                                                        <div class="vcbox">
                                                            <span class="vcztongbox"><i @click="addlike2(i,item.vcid,item2.vccid,1)" v-if="item2.vlike" class="el-icon-star-off vcstatr"></i>
                                                            <i @click="addlike2(i,item.vcid,item2.vccid,2)" v-else class="el-icon-star-on vcstatr"></i><span style="color: cornflowerblue;font-size:12px;"> {{item2.vcount}} 赞同</span></span>
                                                            <span class="vccommt"><i class="el-icon-chat-square" @click="VHf(i,n)"></i></span><span style="font-size:12px;">回复</span>
                                                            <a v-if="item2.vtrashflag2" @click="Readvideotrash(i,item2.vccid,item2.id2)" style="float :right; cursor: pointer;"><span class="mui-icon mui-icon-trash" style="font-size:18px;"></span></a>
                                                        </div>
                                                    </div>
                                                    <div class="vcbox2" v-if="item2.vhf">
                                                        <el-input type="textarea"  @focus="Focus2(i,n)" :rows="item2.textfont2" placeholder="回复..." v-model="formdate.vcctext"> </el-input>
                                                        <el-button v-if="item2.vbutton"  type="primary" plain @click="addCommentcc(i,item2.id2)">提交</el-button>
                                                    </div>
                                                </div>
                                            </span>
                               
                                        </div>
                                      </span>
                                    </div>
                                    <span v-else-if="i==count">
                                      <span class="vcommentSUM"  @click="count=count+3">加载更多</span>
                                    </span>
                                </div>
                           </span>
                        </p>
                        <span v-if="videoflag">
                         <el-input type="textarea"  @focus="Focus" :rows="vtextfont" placeholder="写下你的评论..." v-model="vtextarea"> </el-input>
                         <el-button v-if="vtextfalg" style=" float: right;" type="primary" plain @click="addVComment">提交</el-button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import utop from '../relesase/utop'
export default {
    data() {
        return {
            vtextarea:"",//内容
            count:3,//默认显示多少
            vtextfont:1,//现实
            videoflag:false,
            vtextfalg:false,
            vtextfalg2:false,
            src:'',
            url:'',
            playerOptions:{},//存放播放器的配置文件
            vcount:0,//播放
            ePl:0,//评论
            sum:0,//存放总评论数量
            //接受数据
            morevideo:'',//接受传过来的参数
            vcomment:[],//存放评论
            morevideo2:[],//存放相关标签的视频
            //发送去的数据
            formdate:{
                videoid:'',
                vctext:'',
                id:'',
                vcid:'',//评论
                id1:'',//评论用户
                id2:'',//当前用户
                flag:'',
                vcctext:''
            },
             //点赞
            like:{
                vlike:'',
                vllik2:'',
                id:'',
                vcid:'',
                vccid:'',
            },
            videolike:{
                dynamicTags:'',
                videoid:''

            },
            //删除
            redvideotrash:{
                id:'',
                vcid:'',
                vccid:'',
                id2:'',
            }
        }
    },
    created(){
        //初始化必须参数
        this.getmoreVideo()
    },
    methods: {
        getreadmorevideo(i){
            this.$router.push({name:'readmorevideo',params:{video:this.morevideo2[i]}});
        },
        VHf(i,n){
            if(!this.vcomment[i].vccomment[n].vhf){
                 this.vcomment[i].vccomment[n].textfont2=1;
                 this.vcomment[i].vccomment[n].vbutton=false;
            }
            this.vcomment[i].vccomment[n].vhf=!this.vcomment[i].vccomment[n].vhf;
        },
        //逻辑修改
        videoFlag(){
            this.videoflag=!this.videoflag;
            if(this.vtextfalg){
                this.vtextfalg=false;
                this.vtextfont=1;
            }
        },
        videoFlag2(i){
            this.vtextfalg2=!this.vtextfalg2;
            if(!this.vtextfalg){
               this.vcomment[i].vtextfont2=1;
               this.vcomment[i].vbutton=false;
            }
        },
        //显示输入框
        Focus(){
            this.vtextfont=4;
            this.vtextfalg=true;
        },
        Focus2(i,n){
             this.vcomment[i].vccomment[n].vtextfont2=3;
             this.vcomment[i].vccomment[n].vbutton=true;
        },
        Focus3(i){
            this.vcomment[i].vtextfont2=3;
            this.vcomment[i].vbutton=true;
        },
        getmoreVideo(){
            this.morevideo=JSON.parse(localStorage.getItem('video2'));
            this.src =this.morevideo.videocontent;
            this.url=this.morevideo.videourl;
            this.formdate.videoid=this.morevideo.videoid;
            this.onLive(this.src, this.url);
            //获取播放量
            this.postRequest("/video/addVcount",this.morevideo).then(req=>{
                var data=req.data
                if(data.code==0){
                    this.vcount=data.data
                }
            })
            //获取所有的评论
            this.getVComment()
            //获取相关的视频
            this.videolike.dynamicTags=this.morevideo.dynamicTags;
             this.videolike.videoid=this.morevideo.videoid;
            this.postRequest("/video/SelectVideo",this.videolike).then(req=>{
                var data=req.data;
                if(data.code==0){
                    this.morevideo2=data.data
                  
                }

            })
        },
         //打开和关闭子评论的窗口
        VFalgFont(i,num,num2){
           var user=this.$store.getters.getUser;
           this.formdate.vctext=this.vtextarea;
           this.formdate.id=user.id;
           this.vcomment[i].vlflag=!this.vcomment[i].vlflag;
           this.formdate.vcid=num;
           this.formdate.id1=num2;
           this.formdate.id2=this.formdate.id
            if(this.vcomment[i].vlflag){
                this.vcomment[i].vtextfont2=1;
                this.vcomment[i].vbutton=false;
                this.getVCommentc(i);
            }else{
               this.vcomment[i].vtextfont2=3;
               this.vcomment[i].vbutton=true;
            }
        },
        //删除
        Readvideotrash(num,num2){
            this.redvideotrash.id=num2;
            this.redvideotrash.vcid=num;
             this.postRequest("/vcommentc/vcreleasetrash",this.redvideotrash).then(req=>{
                var data=req.data;
                if(data.code==0){
                      this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                   this.getVComment()
                }else{
                      this.$notify.error({
                       title: '失败',
                       message:data.msg,
                     });
                }
            })
        },
        Readvideotrash(i,num,num2){
            this.redvideotrash.id2=num2;
            this.redvideotrash.vccid=num;
            this.postRequest("/vccomment/vreleaseromeve",this.redvideotrash).then(req=>{
                 var data=req.data;
                if(data.code==0){
                      this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                   this.vcomment[i].count=this.vcomment[i].count-1;
                   this.getVCommentc(i);
                   this.videoFlag2(i);
                }else{
                      this.$notify.error({
                       title: '失败',
                       message:data.msg,
                     });
                }
            })
        },
        //喜欢
        addlike(num2,num3){
            this.like.id=this.formdate.id;
            this.like.vcid=num2;
            if(num3==1){
                this.like.vlike='true';
            }else{
                this.like.vlike='false';
            }
             this.postRequest("/vcommentc/vcaddrzcan",this.like).then(req=>{
                var data=req.data;
                if(data.code==0){
                    this.getVComment()
                }
            })
        },
        addlike2(i,count,num2,num3){
            this.like.id=this.formdate.id;
            this.like.vccid=num2;
            this.like.vcid=count;
            if(num3==1){
                this.like.vllik2='true';
            }else{
                this.like.vllik2='false';
            }
           
            this.postRequest("/vccomment/vaddrzcan",this.like).then(req=>{
                var data=req.data;
                if(data.code==0){
                  this.getVCommentc(i)
                }
            })

        },
        //获取评论信息
        getVComment(){
             this.formdate.id=this.$store.getters.getUser.id;
             this.postRequest('/vcommentc/vcselectAll',this.formdate).then(
             resp=>{
                 this.vcomment=resp.data.data;
                 this.sum=this.vcomment.length;
             })
        },
        //获取子评论
        getVCommentc(i){
               this.postRequest("/vccomment/vselectAll",this.formdate).then(req=>{
                      var data=req.data;
                      if(data.code==0){
                           this.vcomment[i].vccomment=data.data;
                      }
                })
        }, 
        //添加评论
        addVComment(){
            var user=this.$store.getters.getUser;
            this.formdate.vctext=this.vtextarea;
            this.formdate.id=user.id;
            this.postRequest('/vcommentc/vcaddComment',this.formdate).then(
             resp=>{
                 var data=resp.data;
                 if(data.code==0){
                    this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                   this.getVComment()
                   this.vtextarea=''
                 }else{
                    this.$notify.error({
                     title: '失败',
                     message:data.msg,
                   });
                 }
             }) 
        },
        addCommentc(i){
            this.formdate.vcid=this.vcomment[i].vcid;
             this.postRequest('/vccomment/vaddComment',this.formdate).then(
             resp=>{
                 var data=resp.data;
                 if(data.code==0){
                    this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                   this.vcomment[i].count=this.vcomment[i].count+1;
                   this.getVCommentc(i);
                   this.formdate.vcctext=''
                 }else{
                    this.$notify.error({
                     title: '失败',
                     message:data.msg,
                   });
                 }
             })
        },
        addCommentcc(i,num){
            this.formdate.id1=num;
            this.formdate.id2=this.formdate.id;
             this.postRequest('/vccomment/vaddComment',this.formdate).then(
             resp=>{
                 var data=resp.data;
                 if(data.code==0){
                    this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                   this.vcomment[i].count=this.vcomment[i].count+1;
                   this.getVCommentc(i);
                   this.formdate.vcctext=''
                 }else{
                    this.$notify.error({
                     title: '失败',
                     message:data.msg,
                   });
                 }
             })
        },
        //设置视频播放插件
        onLive(onM3u8,onCover){
			this. playerOptions =  {
			  //播放速度
                    playbackRates: [0.5, 1.0, 1.5, 2.0], 
                    //如果true,浏览器准备好时开始回放。
                    autoplay: false, 
                    // 默认情况下将会消除任何音频。
                    muted: false, 
                    // 导致视频一结束就重新开始。
                    loop: false, 
                    // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    preload: 'auto', 
                    language: 'zh-CN',
                     // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    aspectRatio: '16:9',
                     // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    fluid: true,
                    sources: [{
                        //类型
                        type: "video/mp4",
                        //url地址
                        src: onM3u8
                    }],
                    //你的封面地址
                    poster: onCover, 
                     //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        //全屏按钮
                        fullscreenToggle: true  
                 }
				            
			}
		}
    },
    mounted(){
	},
     components: {
      utop
   }
}
</script>
<style lang="scss" scoped>
.readmorevideo{
    width: 1024px;
    background-color: #fff;
    margin: auto;
    padding-bottom: 40px;
    .readmorevideo2{
        width: 850px;
        margin: auto;
        padding-top: 50px;
        .demo{
             display: inline-block;
             width: 600px;
            height: 338px;
            text-align: center;
            line-height: 100px;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
             background: #fff;
            position: relative;
             box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
             margin-right: 4px;
         }
        .demo:hover{
            display: block;
        }
        .rvr{
            margin-top: -20px;
            width: 220px;
            height: 370px;
            text-align: center;
            padding-top: 20px;
            border-radius: 10px;
            background-color:snow;
            box-shadow: 0 2px 12px 0 #adadad;
        }
        .rvrpl{
            width: 600px;
            margin-top: 390px;
            border: 1px solid #ddd;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            padding-bottom: 40px;
            
            .rvrplfont{
                padding-top: 5px; 
                text-shadow: 3px 5px 5px dodgerblue; 
                width: 80px;
                height: 30px;
                text-align: center;
                float: left;
               
            }
            .rvrplbg{
                background-color: rgba(0, 0, 0, 0.1);
                width: 518px;
                height: 30px;
                margin-left: 80px;
                border-radius: 0px 4px 0px 0px;
            }
            .rvrplcenter{
                margin-left: 20px;
                margin-right: 20px;
                //所有评论相关的样式
                .vcomment{
                    border-radius: 10px;
                    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                    padding-left: 15px;
                    padding-right: 15px;
                    padding-top: 15px;
                    .vecomment{
                        .vcommentfont{ 
                            padding-top: 3px;
                            margin-left: 35px;
                            color: #67a7d5;
                            font-size: 13px;
                        }
                        img{
                            float: left;
                            width: 25px;
                            height: 25px;
                            border-radius: 30px;
                        }
                    }
                    .vcbox{
                        margin-top: -10px;
                        padding-bottom: 10px;
                        .vcztongbox{
                            border-radius: 3px;
                            background:#99CCFF;
                            padding-right: 7px;
                            padding-top: 7px;
                            padding-left: 7px;
                            padding-bottom: 3px;
                            margin-right: 7px;
                            .vcstatr{
                                color:orangered;
                                margin-right: 3px;
                                font-size: 22px;
                                cursor: pointer;
                            }
                        }
                        .vccommt{
                            color: cornflowerblue;
                            font-size: 20px;
                            cursor: pointer;
                        } 
                    }
                    .vcboxzz{
                        padding: 10px;
                        border-radius: 12px;
                        .boxcommentc{
                            padding-left: 15px;
                            padding-right: 15px;
                            padding-top: 15px;
                            border-radius: 10px;
                            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                            img{
                                float: left;
                                width: 30px;
                                height: 30px;
                                border-radius: 30px;
                            }
                        }
                        .vcbox2{
                            width: 350px;
                            margin: auto;
                            border-radius: 10px;
                         }
                    }
                }
                .vcommentSUM{
                    color:#67a7d5;
                    cursor: pointer;
                    padding-left: 260px;
                }
            }
        }
       
    }
}
</style>
