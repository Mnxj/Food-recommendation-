<template>
    <div class="re">
        <!-- 头部 -->
        <utop></utop>
        <!-- 中间显示信息 -->
       <div v-if="num==0">
         <div class="center">
            <!-- 图片加内容 -->
            <div class="relase">
                  <h2 class="wenzi">{{release.rname}}</h2>
                <img style="float:left;" :src="release.rurl" width="300px" height="300px" alt="">
                <div class="text">
                    <p><span style="color:black;">标签：</span>   <span>{{this.recontext}}</span></p>
                    <p><span style="color:black;">评价:</span>   <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate></p>
                    <p><span style="color:black;">人均消费:</span>
                        <span v-if="release.rcost!='[]'">
                            <span style="color:red;">{{release.rcost}}</span>
                        </span>
                        <span v-else>
                            <span style="color:red;">0</span>
                        </span>
                        ￥
                    </p>
                    <p><span style="color:black;">类型:</span>    <span>{{release.rtype}}</span></p>
                    <p><span style="color:black;">距离:</span><span>{{release.kM}}</span> </p>
                </div>
            </div>
            <!-- 地图位置 -->
            <div class="map">
                <el-amap vid="amapDemo" :center="center" :zoom="17"  class="amap-demo"></el-amap>
            </div>
        </div>
        <!-- 优美段子 +天气提醒-->
        <div class="duanziW">
           <div class="duanzi">
            <h4 class="my">每日一句</h4>
            
            <hr class=”style-one“>
            <p>{{text}}</p>
           </div>
           <div class="weather">
               <img src="../../../imgas/weather.png" alt="">
               <p class="wfont">天气小提示</p>
               <div class="Weaher">
                   <el-row>
                       <el-col :span="8"><div class="grid-content bg-purple">
                            <span v-if="lives.weather=='阴'||lives.weather=='多云'">
                                <i class="el-icon-cloudy wiocn"></i>
                            </span>
                            <span v-if="lives.weather=='雪'">
                                <i class="el-icon-light-rain wiocn"></i>
                            </span>
                            <span v-if="lives.weather=='晴'">
                                <i class="el-icon-sunny wiocn"></i>
                            </span>
                           </div></el-col>
                       <el-col :span="8"><div class="grid-content bg-purple-light">
                            <p class="wiconfont1">{{lives.humidity}}</p>
                           <p class="wiconfont">{{lives.reporttime}}</p>
                           </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple-light">
                           <p class="wCelsius">{{lives.temperature}}℃</p>
                           </div></el-col>
                    </el-row>
                  <p class="WTip"> 
                      <span v-if="lives.temperature<=0">
                            外出注意地滑，
                      </span>
                      <span v-else-if="lives.temperature<=10">
                            天气寒冷注意保暖，
                      </span>
                      <span v-else-if="lives.temperature<=30">
                            气温舒适，
                      </span>
                       <span v-else-if="lives.temperature>30">
                            温度过高注意避暑，
                      </span>
                      此时{{lives.temperature}}℃， 
                      {{lives.winddirection}}风 
                      天气状况：{{lives.weather}} 
                      空气质量：{{lives.humidity}} 
                  </p>
               </div>
            </div>
        </div> 
        <!-- 评论上传视频，文章 附近东西 -->
        <div class="rcenter2">
            <div class="center2div">
             <el-tabs type="border-card">
                <el-tab-pane>
                     <span slot="label"><i class="el-icon-s-comment"></i> 评论发表</span>
                     <!-- 先查询一个评论列表，然后下面显示一个输入框 -->
                     <p><span v-if="Object.keys(this.comment).length==0">暂时还没有人评论</span>
                     <span v-else>
                         <div v-for="(item,i) in comment" :key="item.rcid">
                           <div  class="rcomment" v-if="i<count">
                             <div class="recomment">
                              <img  :src="item.src" alt="" @click="UserData(item.id)" style="  cursor: pointer;">
                              <p class="recommentfont">{{item.name}}</p>
                             </div>
                             <p style="padding-top:10px;padding-left:5px;padding-bottom:10px; color:#000;">{{item.rctext}}</p>
                             <p style="text-align: right;">{{item.rcdate}}</p>
                             <hr>
                             <div class="rcbox">
                                 <span class="rcztongbox"><i @click="addlike(item.rcid,1)" v-if="item.like" class="el-icon-star-off rcstatr"></i>
                                 <i @click="addlike(item.rcid,2)" v-else class="el-icon-star-on rcstatr"></i><span style="color: cornflowerblue;"> {{item.rcount}} 赞同</span></span>
                                 <span class="rccommt"><i @click="FalgFont(i,item.rcid,item.id)"  class="el-icon-chat-square"></i></span><span>  {{item.count}}  条评论</span>
                                 <a v-if="item.trashflag" style="float :right; cursor: pointer;" @click="Releasetrash(item.rcid,item.id)"><span class="mui-icon mui-icon-trash"></span></a>
                             </div>
                             <span v-if="item.lflag">
                                 <!-- 有人回复 -->
                             <div class="rcboxzz">
                               <span v-if="Object.keys(item.rccomment).length==0">暂时还没有人回复</span>
                               
                               <span v-else>
                                   <div v-for="(item2,n) in item.rccomment" :key="item2.rccid">
                                       <div class="boxcommentc">
                                          <img  :src="item2.src" alt="" @click="UserData(item2.id2)" style="  cursor: pointer;">
                                          <p style=" font-size: 12px;">&nbsp;{{item2.name2}} <span style="color:#000;">&nbsp;回复：</span>{{item2.name1}} </p>
                                          <p style="padding-top:10px;padding-left:5px;padding-bottom:6px; color:#000; font-size: 12px;">{{item2.rcctext}}</p>
                                          <p style="text-align: right; font-size: 12px;">{{item2.rccdate}}</p>
                                           <div class="rcbox">
                                               <span class="rcztongbox"><i @click="addlike2(i,item.rcid,item2.rccid,1)" v-if="item2.like" class="el-icon-star-off rcstatr"></i>
                                               <i @click="addlike2(i,item.rcid,item2.rccid,2)" v-else class="el-icon-star-on rcstatr"></i><span style="color: cornflowerblue;"> {{item2.rcount}} 赞同</span></span>
                                               <span class="rccommt"><i class="el-icon-chat-square" @click="Hf(i,n)"></i></span><span>回复</span>
                                               <a v-if="item2.trashflag2" @click="releaseromeve(i,item2.rccid,item2.id2)" style="float :right; cursor: pointer;"><span class="mui-icon mui-icon-trash"></span></a>
                                            </div>
                                        </div>
                                        <div class="rcbox2" v-if="item2.hf">
                                          <el-input type="textarea"  @focus="Focus2(i,n)" :rows="item2.textfont2" placeholder="回复..." v-model="textarea3"> </el-input>
                                          <el-button v-if="item2.button"  type="primary" plain @click="addCommentcc(i,item2.id2)">提交</el-button>
                                        </div>
                                   </div>
                               </span>
                                <el-input type="textarea"  @focus="Focus3(i)" :rows="item.textfont2" placeholder="评论..." v-model="textarea2"> </el-input>
                                <el-button v-if="item.button"  type="primary" plain @click="addCommentc(i)">提交</el-button>
                              </div>
                             </span>
                            
                           </div>
                           <span v-else-if="i==count">
                               <span class="rcommentSUM"  @click="count=count+3">加载更多</span>
                           </span>
                         </div>
                     </span></p>
                     <el-input type="textarea"  @focus="Focus" :rows="textfont" placeholder="写下你的评论..." v-model="textarea"> </el-input>
                     <el-button v-if="textfalg" style=" float: right;" type="primary" plain @click="addComment">提交</el-button>
                </el-tab-pane>
                <el-tab-pane>
                     <span slot="label"><i class="el-icon-upload"></i> 发布创作</span>
                     <div class="relupload">
                         <el-button @click="picture"  plain>日志&nbsp;&nbsp;&nbsp;<i class="el-icon-picture rifont"></i></el-button>
                          <el-button @click="video" plain>vlog&nbsp;&nbsp;&nbsp;<i class="el-icon-video-camera-solid rifont1"></i></el-button>
                     </div>
                </el-tab-pane>
             </el-tabs>
            </div>
            <!-- 显示日志和视频 -->
            <div class="center3div">
                <div class="rcenter2essay">
                    <p> <i class="el-icon-tickets">日志</i></p>
                      <p v-if="essay=='undefined'||essay==''||essay==null"><span><hr></span>暂时没有日志</p>
                      <span v-else >
                          	<ul class="mui-table-view mui-table-view-chevron" style="cursor: pointer;">
                                  <li class="mui-table-view-cell mui-media" v-for="(item,i) in essay" :key="item.essayid">
                                      <a class="mui-navigate-right" @click="readmoretext2(i)">
                                          <img class="mui-media-object mui-pull-left" :src="item.essayurl">
                                          <div class="mui-media-body">{{item.essaytitle}}
                                              <p class='mui-ellipsis'>{{item.essaysource}}</p>
                                          </div>
                                      </a>
                                  </li>
                            </ul>
                      </span>
                </div>
                <div class="rcenter2video">
                     <p> <i class="el-icon-video-camera">vlog</i></p>
                      <p v-if="videos=='undefined'||videos==''||videos==null"><span><hr></span>暂时没有vlog</p>
                      <span v-else >
                          	<ul class="mui-table-view mui-table-view-chevron" style="cursor: pointer;">
                                  <li class="mui-table-view-cell mui-media" v-for="(item,i) in videos" :key="item.essayid">
                                      <a class="mui-navigate-right" @click="getreadmorevideo2(i)">
                                          <img class="mui-media-object mui-pull-left" :src="item.videourl">
                                          <div class="mui-media-body">{{item.videotitle}}
                                              <p class='mui-ellipsis'>{{item.videosource}}</p>
                                          </div>
                                      </a>
                                  </li>
                            </ul>
                      </span>
                </div>
            </div>
            
        </div>
       </div>
       {{getTolist}}
    </div>
</template>

<script>
import utop from '../relesase/utop'
export default {
    data(){
        return{
            recontext:'',
            sum:0,//存放总评论数量
            count:3,//默认显示多少
            lives:{},
            key:'aa2dcbd88df68a670472cab2791dde83',
            text:'',//存放段子
            center: [],
            value:'',
            release:'',
            num:0,//切换窗体
            textarea:'',
            textarea2:'',
            textarea3:'',
            textfont:1,//评论初始大小
            textfalg:false,//控制显示评论的按钮
            statr:true,//显示每个用户是否点赞
            essay:[],//存放日志信息
            videos:[],//存放视频
            formdate:{
                rid:'',
                rctext:'',
                id:'',
                rcid:'',//评论
                id1:'',//评论用户
                id2:'',//当前用户
                flag:'',
                rcctext:''
            },
            //评论
            comment:{
            },
            //点赞
            like:{
                llike:'',
                llike2:'',
                id:'',
                rcid:'',
                rccid:'',
            },
            //删除
            releasetrash:{
                id:'',
                rcid:'',
                rccid:'',
                id2:'',
            }
        }
    },
    created(){
        this.getRelease()
        this.getParagraph()
        this.getComment()
        this.getVideoEssay()
    },
    methods: {
        UserData(i){
            this.postRequest("/user/SelectUserid",{id:i}).then(req=>{
                var data=req.data
                if(data.code==0){
                     this.$router.push({name:'userdata',params:{user2:data.data}});
                }
            })
        },
        //跳转
        readmoretext2(i){
            var Text1=this.essay[i]
            this.$router.push({name:'readmoretext',params:{Text:Text1}});
        },
        getreadmorevideo2(i){
            var video1=this.videos[i]
            this.$router.push({name:'readmorevideo'});
            localStorage.setItem('video',JSON.stringify(video1))
        },
        
        Hf(i,n){
             if(!this.comment[i].rccomment[n].hf){
                 this.comment[i].rccomment[n].textfont2=1;
                 this.comment[i].rccomment[n].button=false;
            }
            this.comment[i].rccomment[n].hf=!this.comment[i].rccomment[n].hf;

        },
        //删除子评论的操作
        releaseromeve(i,num,num2){
            this.releasetrash.id2=num2;
            this.releasetrash.rccid=num;
            console.log(this.releasetrash)
            this.postRequest("/rccomment/releaseromeve",this.releasetrash).then(req=>{
                 var data=req.data;
                if(data.code==0){
                      this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                   this.comment[i].count=this.comment[i].count-1;
                   this.getCommentc(i)
                }else{
                      this.$notify.error({
                       title: '失败',
                       message:data.msg,
                     });
                }
            })
        },
        //删除操作
        Releasetrash(num,num2){
            this.releasetrash.id=num2;
            this.releasetrash.rcid=num;
            this.postRequest("/rcommentc/releasetrash",this.releasetrash).then(req=>{
                var data=req.data;
                if(data.code==0){
                      this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                   this.getComment()
                }else{
                      this.$notify.error({
                       title: '失败',
                       message:data.msg,
                     });
                }
            })
        },
        //打开和关闭子评论的窗口
        FalgFont(i,num,num2){
           var user=this.$store.getters.getUser;
           this.formdate.rctext=this.textarea;
           this.formdate.id=user.id;
           this.comment[i].lflag=!this.comment[i].lflag;
           this.formdate.rcid=num;
           this.formdate.id1=num2;
           this.formdate.id2=this.formdate.id
            if(this.comment[i].lflag){
                this.comment[i].textfont2=1;
                this.comment[i].button=false;
                 this.getCommentc(i);
            }else{
                this.comment[i].textfont2=3;
                this.comment[i].button=true;
             }
        },
        video(){
            var user=this.$store.getters.getUser;
            this.$router.push({ name: 'video', params: { id:user.id,rid:this.formdate.rid,list:this.release}});
        },
        picture(){
            var user=this.$store.getters.getUser;
            this.$router.push({ name: 'picture', params: { id:user.id,rid:this.formdate.rid,list:this.release}});
        },
        //喜欢
        addlike(num2,num3){
            this.like.id=this.formdate.id;
            this.like.rcid=num2;
            if(num3==1){
                this.like.llike='true';
            }else{
                this.like.llike='false';
            }
            this.postRequest("/rcommentc/addrzcan",this.like).then(req=>{
                this.getComment();
            })

        },
        addlike2(i,count,num2,num3){
            this.like.id=this.formdate.id;
            this.like.rccid=num2;
            this.like.rcid=count;
            if(num3==1){
                this.like.llike2='true';
            }else{
                this.like.llike2='false';
            }
            this.postRequest("/rccomment/addrzcan",this.like).then(req=>{
                var data=req.data;
                if(data.code==0){
                 this.getCommentc(i);
                }
            })

        },
        //天气的处理
        getRelease(){
            this.release=JSON.parse(localStorage.getItem('release'));
            this.formdate.rid=this.release.rid;
            if(this.release.rtag.length>45){
                var string1 =this.release.rtag
                this.recontext=string1.substr(1,45)+"..."
            }
            var url='https://restapi.amap.com/v3/weather/weatherInfo?city='+this.release.radcode+'&key='+this.key;
            this.$http.get(url).then(
                rep=>{
                    var data=rep.body.lives[0];
                    this.lives=data;
                    var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];  
                    var myDate = new Date(Date.parse(this.lives.reporttime));  
                    this.lives.reporttime=weekDay[myDate.getDay()];
                    if(this.lives.humidity<=50){
                        this.lives.humidity="优"
                    }else if(this.lives.humidity<=100){
                        this.lives.humidity="良"
                    }else if(lives.humidity<=150){
                        this.lives.humidity="轻度"
                    }else if(lives.humidity<=200){
                        this.lives.humidity="中度"
                    }else if(lives.humidity<=300){
                        this.lives.humidity="中度"
                    }
                   
                }
            );
            this.value=parseFloat(this.release.rating);
            if(this.release.rcost=='[]'){
                this.release.rcost="";
            }
            this.center.push(this.release.rlong);
            this.center.push(this.release.rlat);
        },
        //获取笑话 
        getParagraph(){
            this.getRequest('/paragraph/api').then(
             resp=>{
                 this.text=resp.data.data;
             });
        },
        //获取评论信息
        getComment(){
             this.formdate.id=this.$store.getters.getUser.id;
             this.postRequest('/rcommentc/selectAll',this.formdate).then(
             resp=>{
                 this.comment=resp.data.data;
                 this.sum=this.comment.length;
             })
        },
        //获取子评论
        getCommentc(i){
               this.postRequest("/rccomment/selectAll",this.formdate).then(req=>{
                      var data=req.data;
                      if(data.code==0){
                          this.comment[i].rccomment=data.data;  
                      }
                      
                })
        },
        //获取日志和视频
        getVideoEssay(){
           this.release=JSON.parse(localStorage.getItem('release'));
          this.postRequest('/essay/selectE',this.release).then(
             resp=>{
                this.essay=resp.data.data;
               
          });
          this.postRequest('/video/selectV',this.release).then(
                   resp=>{
                  this.videos=resp.data.data;
          });
        },
        //传过来的数据
        dataNum(num){
            this.num=num;
        },
        //显示输入框
        Focus(){
            this.textfont=4;
            this.textfalg=true;
        },
        Focus2(i,n){
              this.comment[i].rccomment[n].textfont2=3;
             this.comment[i].rccomment[n].button=true;
  
        },
        Focus3(i){
              this.comment[i].textfont2=3;
             this.comment[i].button=true;
        },
        //添加评论
        addComment(){
            var user=this.$store.getters.getUser;
            this.formdate.rctext=this.textarea;
            this.formdate.id=user.id;
            this.postRequest('/rcommentc/addComment',this.formdate).then(
             resp=>{
                 var data=resp.data;
                 if(data.code==0){
                    this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                   this.getComment()
                   this.textarea=''
                 }else{
                    this.$notify.error({
                     title: '失败',
                     message:data.msg,
                   });
                 }
             })
        },
         //添加评论
        addCommentc(i){
            this.formdate.rcctext=this.textarea2;
            var user=this.$store.getters.getUser;
            this.postRequest('/rccomment/addComment',this.formdate).then(
             resp=>{
                 var data=resp.data;
                 if(data.code==0){
                    this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                    this.postRequest('/api/ws/sendOne',{
                       id:user.id,
                       type:2,
                       message:'用户:'+user.name+',回复了您在店铺('+this.release.rname+")评论的内容",
                       id2:this.comment[i].id,
                       menuid:this.release.rid,
                       menu:'店铺',
                       url1:this.release.rurl
                    }).then(req=>{})
                   this.comment[i].count=this.comment[i].count+1;
                   this.getCommentc(i)
                   this.textarea2=''
                 }else{
                    this.$notify.error({
                     title: '失败',
                     message:data.msg,
                   });
                 }
             })
        },
        addCommentcc(i,num){
              var user=this.$store.getters.getUser;
              this.formdate.rcctext=this.textarea3;
            this.formdate.id1=num;
            this.formdate.id2=this.formdate.id;
             this.postRequest('/rccomment/addComment',this.formdate).then(
             resp=>{
                 var data=resp.data;
                 if(data.code==0){
                    this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                   this.postRequest('/api/ws/sendOne',{
                       id:user.id,
                       type:2,
                       message:'用户:'+user.name+',回复了您在店铺('+this.release.rname+")评论的内容",
                       id2:this.formdate.id1,
                       menuid:this.release.rid,
                       menu:'店铺',
                       url1:this.release.rurl
                    }).then(req=>{})
                   this.comment[i].count=this.comment[i].count+1;
                   this.getCommentc(i);
                   this.textarea3=''
                 }else{
                    this.$notify.error({
                     title: '失败',
                     message:data.msg,
                   });
                 }
             })
        }
    },
    computed:{     
        getTolist(){
            if(history.length==4){
               this.getRelease()
               this.getVideoEssay()
            }
        }
    },
    components:{
        utop,
    }
}
</script>
<style lang="scss" scoped>
.center{
  
    margin: auto;
    padding-top: 30px;
    width: 1024px;
    height: 430px;
    margin-bottom: 10px;
    .relase{
     background-color: #fff;
     float: left;
     width: 680px;
     padding-bottom: 10px;
     padding-left:30px;
     .wenzi{
         margin-top: 20px;
         padding-bottom:20px;
     }
     .text{
         margin-left: 350px;
         line-height: 40px;
     }
     
    }
    .map{
        float: right;
        background-color: #fff;
        padding: 10px;
        .amap-demo{
            width: 300px;
            height: 300px;
        }
      }
}
.duanziW{
    margin: auto;
    width: 1024px;
   
    .duanzi{
        height: 180px;
        background-color: #fff;
        width: 680px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        float: left;
        .my{
          padding-top: 15px;

        }
    }
    .weather{
        float: right;
        width: 320px;
        height: 220px;
        background-color: #fff;
        margin-top: -50px;
        img{
            margin-top: -30px;
            margin-left: -20px;
            width: 70px;
            height: 70px;
            margin-bottom: -27px;
        }
        .wfont{
            text-align: center;
            font-weight: 700;
            color:darkseagreen;
        }
        .Weaher{
            background-color: #67a7d5;
            height: 170px;
            color: #fff;
            padding-left: 25px;
            padding-top: 10px;
            .wiocn{
                font-size: 60px;
            }
            .wiconfont{
                 padding-left: 7px;
                color: #fff;
            }
            .wiconfont1{
                padding-top:  8px;
                padding-left: 15px;
                color: #fff;
            }
            .wCelsius{
                font-size: 35px;
                color: #fff;
                padding-top:  15px;
            }
            .WTip{
                padding-top: 30px;
                 color: #fff;
            }
        }
    }
     
}
.rcenter2{
    margin: auto;
    width: 1024px;
    margin-top: 200px;
    .center2div{
        padding-top: 30px;
        padding-bottom: 10px;
        background-color: #fff;
        width: 680px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        float: left;
        .relupload{
            padding-left: 140px;
            .rifont{
                font-size: 25px;
                color:darkturquoise;
            }
            .rifont1{
                font-size: 25px;
                color:#000;
            }
       }
       .rcomment{
           border-radius: 10px;
           box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
           padding-left: 15px;
           padding-right: 15px;
           padding-top: 15px;
          .recomment{

            .recommentfont{
                
                padding-top: 10px;
                margin-left: 45px;
                color: #67a7d5;
             }

            img{
               float: left;
               width: 35px;
               height: 35px;
               border-radius: 30px;
            }
           

          }

         .rcbox{
             margin-top: -10px;
             padding-bottom: 10px;
            .rcztongbox{
               border-radius: 3px;
               background:#99CCFF;
               padding-right: 10px;
               padding-top: 10px;
               padding-left: 10px;
               padding-bottom: 5px;
               margin-right: 10px;
              .rcstatr{
               color:orangered;
               margin-right: 3px;
               font-size: 24px;
               cursor: pointer;
               }
             }
              .rccommt{
                color: cornflowerblue;
                font-size: 24px;
                cursor: pointer;
             }
             
           }
          .rcboxzz{
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
            .rcbox2{
             width: 350px;
             margin: auto;
             border-radius: 10px;
             }
          }
         
       }
       .rcommentSUM{
           color:#67a7d5;
           cursor: pointer;
           padding-left: 260px;
       }
    }
    .center3div{
        border-radius: 10px;
        float: right;
        width: 320px;
        background-color: #F5F5F5;
        padding:10px;
        
        .rcenter2essay{
            background-color:#fff;
            border-radius: 10px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            padding-left: 10px;
            padding-top: 10px;
            padding-right: 10px;
            padding-bottom: 5px;
        }
        .rcenter2video{
            background-color:#fff;
            margin-top: 3px;
            border-radius: 10px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            padding-left: 10px;
            padding-top: 10px;
            padding-right: 10px;
            padding-bottom: 5px;
        }
    }

}
.releasedata{
    margin-top: 600px;
    width: 320px;
    height: 200px;
    background-color: #fff;
}
hr.style-4 {
    height: 12px;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(0,0,0,0.5);
}
</style>
