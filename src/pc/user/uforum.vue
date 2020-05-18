<template>
    <div class="uforum">
        <utop></utop>
        <!-- 第一个轮播图+信息卡 -->
        <div class="uforum1">
            <div class="uforuml">
                 <mt-swipe :auto="4000">
                    <mt-swipe-item>
                        <img src="../../imgas/11223311.jpg" style=" cursor: pointer;" alt="" @click="readmoretext1(0)">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img :src="rul"  style=" cursor: pointer;" @click="readmoretext2(0)" alt="">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img :src="rul2" style=" cursor: pointer;" @click="getreadmorevideo2(0)" alt="">
                    </mt-swipe-item>
                  </mt-swipe>
            </div>
            <div class="uforumr">
                <img :src="user.src" alt="">
                <p style="font-size: 16px;">{{user.name}}</p>
                <div style=" width: 300px;">
                <table class="table table-bordered table-hover table-striped" >
                    <thead>
                        <tr>
                            <th>
                                <p>文章</p>  
                            </th>
                            <th>
                                <p>vlog</p>  
                            </th>
                            <th>
                                <p>好友</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{user.ecount}}</td>
                            <td>{{user.vcount}}</td>
                            <td>{{user.ewcount}}</td>
                        </tr>
                    </tbody>
                </table>
                    <span><i class="el-icon-upload"></i> 发布创作</span>
                    <div class="relupload">
                         <el-button @click="upicture"  plain>日志&nbsp;&nbsp;&nbsp;<i class="el-icon-picture rifont"></i></el-button>
                          <el-button @click="uvideo" plain>vlog&nbsp;&nbsp;&nbsp;<i class="el-icon-video-camera-solid rifont1"></i></el-button>
                    </div>
                </div>

            </div>
        </div>
        <!-- 显示置顶消息+天气插件 -->
        <div class="uforum2">
            <div class="uforum2l">
                 <span v-if="esticky=='undefined'||esticky==''||esticky==null"></span>
                 <span v-else>
                     <div v-for="(item,i) in esticky" :key="item.essayid" class="uforum2ldiv">
                         <img :src="item.essayurl" alt="">
                         <div class="font2">
                                <span style="color:red; font-size:25px;">【置顶】</span>{{item.essaytitle}}
                                 <p><i class="el-icon-user" style="color:#FF7F24"></i>{{item.name}}&nbsp;
                                   <i class="el-icon-ice-cream-round" style="color:#FF7F24"></i>{{item.dynamicTags}}
                                 </p>
                                <p>{{item.essaysource}}</p>
                                <span><i class="el-icon-time"  style="color:#FFA07A"></i> {{item.essaytime}}</span>
                                <span> <i class="el-icon-view" style="color:#D1D1D1">{{item.ecount}}</i></span>
                                <hr>
                                <el-button style="float: right;" @click="readmoretext1(i)" plain>阅读全文</el-button>
                         </div>
                        
                     </div>
                     <br>
                 </span>
                 
            </div>
            <div class="uforum2r">
               <img src="../../imgas/weather.png" alt="">
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
                            <span v-if="lives.weather=='雨'||lives.weather=='小雨'||lives.weather=='中雨'">
                                <i class="el-icon-light-rain"></i>
                            </span>
                            <span v-if="lives.weather=='大雨'||lives.weather=='瀑雨'">
                                <i class="el-icon-heavy-rain"></i>
                            </span>
                             <span v-if="lives.weather=='雷阵雨'||lives.weather=='闪电'">
                                <i class="el-icon-lightning"></i>
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
                            地面结冰外出注意地滑，
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
            <div class="uforum3r">
                <p></p>
              <p style="font-size:20px; padding-left: 10px;">本站用户</p>
              <hr>
               <span v-if="userlist=='undefined'||userlist==''||userlist==null"></span>
               <span v-else style="">
                    <div v-for="(item, i) in userlist" :key="item.id">
                        <span v-if="i%4==0"><div v-html="html2"></div></span>
                         <el-col :span="6"><div class="grid-content bg-purple">
                              <img :src="item.src" style=" cursor: pointer;" @click="UserData(item)"  alt="">
                            <p>{{item.name}}</p> 
                        </div></el-col>
                        <span v-if="(i+1)%4==0"><div v-html="html1"></div></span>
                    </div>
                </span>
            </div>
        </div>
        <!-- 非置顶+站内用户 -->
        <div class="uforum3">
            <div class="uforum3l">
                 <span v-if="noesticky=='undefined'||noesticky==''||noesticky==null"></span>
                 <span v-else>
                     <div v-for="(item,i) in noesticky" :key="item.essayid" class="uforum3ldiv">
                        <span v-if="i<count">
                         <img :src="item.essayurl" alt="">
                         <div class="font3">
                               <span v-if="i<2"><span style="color:red; font-size:25px;">【最热】</span></span>
                                {{item.essaytitle}}
                                 <p><i class="el-icon-user" style="color:#FF7F24"></i>{{item.name}}&nbsp;
                                   <i class="el-icon-ice-cream-round" style="color:#FF7F24"></i>{{item.dynamicTags}}
                                 </p>
                                <p>{{item.essaysource}}</p>
                                <span><i class="el-icon-time"  style="color:#FFA07A"></i> {{item.essaytime}}</span>
                                <span> <i class="el-icon-view" style="color:#D1D1D1">{{item.ecount}}</i></span>
                                 <hr>
                                <el-button style="float: right;" @click="readmoretext2(i)" plain>阅读全文</el-button>
                         </div>
                         </span>
                        <span v-else-if="i==count">
                               <span class="rcommentSUM"  @click="count=count+3">加载更多</span>
                        </span>
                        
                     </div>
                     <br>
                 </span>
            </div>
            
        </div>
        <!-- 视频 -->
        <div class="uforum4">
             <div class="uforum4l">
                 <span v-if="videolist=='undefined'||videolist==''||videolist==null"></span>
                 <span v-else>
                     <div v-for="(item,i) in videolist" :key="item.videoid" class="uforum4ldiv">
                        <span v-if="i<count2">
                         <img :src="item.videourl" alt="">
                         <div class="font4">
                               <span v-if="i<2"><span style="color:red; font-size:25px;">【最热】</span></span>
                                {{item.videotitle}}
                                 <p><i class="el-icon-user" style="color:#FF7F24"></i>{{item.name}}&nbsp;
                                   <i class="el-icon-ice-cream-round" style="color:#FF7F24"></i>{{item.dynamicTags}}
                                 </p>
                                <p>{{item.videosource}}</p>
                                <span><i class="el-icon-time"  style="color:#FFA07A"></i> {{item.videotime}}</span>
                                <span> <i class="el-icon-view" style="color:#D1D1D1">{{item.vcount}}</i></span>
                                 <hr>
                                <el-button style="float: right;" @click="getreadmorevideo2(i)" plain>点击进入播放</el-button>
                         </div>
                         </span>
                        <span v-else-if="i==count2">
                               <span class="rcommentSUM"  @click="count2=count2+3">加载更多</span>
                        </span>
                        
                     </div>
                     <br>
                 </span>
            </div>
        </div>
        <!-- 便签 -->
        <div class="ufbela">
            <el-tooltip class="item" effect="dark" content="点击进行标签查询" placement="top-start">
                <i class="el-icon-more" @click="dialogVisible = !dialogVisible"></i>
            </el-tooltip>
        </div>
        <!-- 尾部 -->
        <transition>
            <div class="fubiaoti"  v-if="dialogVisible">
                  <p style="font-size:20px;">标签</p>
                <hr>
                  <span v-if="label=='undefined'||label==''||label==null"></span>
                 <span v-else>
                      <div v-for="item in label" :key="item">
                           <el-button type="info" @click="SelecetAll(item)" plain>{{item}}</el-button >
                           <br>
                      </div>
                 </span>
            </div>
        </transition>
    </div>
</template>

<script>
import utop  from '../user/relesase/utop'
export default {
    data(){
        return{
            user:'',
            lives:{},
            key:'aa2dcbd88df68a670472cab2791dde83',
            radcode:370881,
            esticky:[],
            noesticky:[],
            count:3,//默认显示多少
            count2:3,//默认显示多少
             html2:"<el-row style='width:100%;'>",
             html1:"</el-row>",
             userlist:[],//本站用户
             videolist:[],//
             label:[],//标签
             dialogVisible:false,
             rul:'',
             rul2:''
        }
    },

    created(){
        this.getUser();
    },
    methods:{
        uvideo(){
            this.$router.push({ name: 'uvideo'});
        },
        upicture(){
            this.$router.push({ name: 'upicture'});
        },
        SelecetAll(str){
            this.postRequest('/video/SelectLabel',{dynamicTags:str}).then(req=>{
                console.log(req)
                var data=req.data
                if(data.code==0){
                     this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                    this.videolist=data.data
                }else{
                    this.$notify.error({
                      title: '失败',
                      message: data.msg
                    });
                }
            })
            this.postRequest('/essay/SelectLabel',{dynamicTags:str}).then(req=>{
                  console.log(req)
                var data=req.data
                if(data.code==0){
                    this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                    this.noesticky=data.data
                }else{
                    this.$notify.error({
                      title: '失败',
                      message: data.msg
                    });
                }
            })
        },
         getreadmorevideo2(i){
            var video1=this.videolist[i]
            this.$router.push({name:'readmorevideo',params:{video:video1}});
        },
         //跳转
        readmoretext1(i){
            var Text1=this.esticky[i]
            this.$router.push({name:'readmoretext',params:{Text:Text1}});
        },
        //跳转
        readmoretext2(i){
            var Text1=this.noesticky[i]
            this.$router.push({name:'readmoretext',params:{Text:Text1}});
        },
        UserData(i){
            this.$router.push({name:'userdata',params:{user2:i}});
        },
        getUser(){
            var radcode=JSON.parse(localStorage.getItem('radcode'));
            if(radcode!=''&&radcode!='undefined'&&radcode!=null){
                this.radcode=radcode;
            }
            this.user=this.$store.getters.getUser;
            //获取天气
            var url='https://restapi.amap.com/v3/weather/weatherInfo?city='+this.radcode+'&key='+this.key;
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
            //获取置顶信息
            this.postRequest('/essay/selcetEsticky',{esticky:1}).then(req=>{
                var data=req.data
                if(data.code==0){
                    this.esticky=data.data
                }
            })
            //获取非置顶
             this.postRequest('/essay/selcetEsticky',{esticky:0}).then(req=>{
                var data=req.data
                if(data.code==0){
                    this.noesticky=data.data
                    this.rul=this.noesticky[0].essayurl
                }
            })
            //获取本站用户
            this.getRequest('/user/list').then(req=>{
                var data=req.data
                if(data.code==0){
                    this.userlist=data.data
                }
            })
            //获取标签
            this.getRequest('/label/selcetAll').then(req=>{
                var data=req.data
                if(data.code==0){
                    this.label=data.data
                }
            })
            //获取视频
            //获取标签
            this.getRequest('/video/selecetAllVreview').then(req=>{
                var data=req.data
                if(data.code==0){
                    this.videolist=data.data
                    this.rul2=this.videolist[0].videourl;
                }
            })
            //this.rul=this.noesticky[0].essayurl;
            
            //this.rul2=this.videolist[0].videourl;
        },
        video(){
            this.$router.push({ name: 'video', params: { id:user.id,rid:this.formdate.rid,list:this.$route.params.list}});
        },
        picture(){
            this.$router.push({ name: 'picture', params: { id:user.id,rid:this.formdate.rid,list:this.$route.params.list}});
        },
    },
    components:{
        utop
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
.uforum{
    .uforum1{
        width: 1024px;
        margin: auto;
         margin-top: 20px;
        .uforuml{
            float: left;
            background-color: #fff;
            width: 700px;
            height: 350px;
            padding: 20px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .uforumr{
            float: right;
            width: 300px;
            background-color: #fff;
            height: 350px;
            padding-top: 20px;
            text-align: center;
            img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin-bottom: 10px;
            }
            .relupload{
                padding-top: 15px;
                .rifont{
                font-size: 25px;
                color:darkturquoise;
                }
                .rifont1{
                font-size: 25px;
                color:#000;
                }
            }

        }

    }
    .uforum2{
        width: 1024px;
        margin: auto;
        margin-top: 390px;
        .uforum2l{
           float: left;
             width: 700px;
            .uforum2ldiv{
                 padding: 15px;
                padding-left: 50px;
                background-color: #fff;
                padding-bottom: 40px;
                img{
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                // border: 1px solid #000;
                float: left;
                width: 200px;
                height: 200px;
                }
                .font2{
                    text-align: center;
                    letter-spacing: 7px;
                    line-height: 30px;

                }
            }
           
            
        }
        .uforum2r{
            float: right;
            width: 300px;
            height: 220px;
            background-color: #fff;
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
        .uforum3r{
            margin-top: 25px;
            float: right;
            width: 300px;
            padding-bottom: 15px;
            background-color: #fff;
            padding-left: 15px;
             padding-right: 15px;
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
    }
    .uforum3{
        width: 1024px;
        margin: auto;
        .uforum3l{
           float: left;
             width: 700px;
            .uforum3ldiv{
                padding: 15px;
                padding-left: 50px;
                background-color: #fff;
                padding-bottom: 40px;
                margin-bottom: 16px;
                img{
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                // border: 1px solid #000;
                float: left;
                width: 200px;
                height: 200px;
                }
                .font3{
                    text-align: center;
                    letter-spacing: 7px;
                    line-height: 30px;

                }
                .rcommentSUM{
                    color:#67a7d5;
                    cursor: pointer;
                    padding-left: 260px;
                }
            }
           
            
        }
        
    }
    .uforum4{
        width: 1024px;
        margin: auto;
        .uforum4l{
           float: left;
             width: 700px;
            .uforum4ldiv{
                padding: 15px;
                padding-left: 50px;
                background-color: #fff;
                padding-bottom: 40px;
                margin-bottom: 16px;
                img{
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                // border: 1px solid #000;
                float: left;
                width: 200px;
                height: 200px;
                }
                .font4{
                    text-align: center;
                    letter-spacing: 7px;
                    line-height: 30px;

                }
                .rcommentSUM{
                    color:#67a7d5;
                    cursor: pointer;
                    padding-left: 260px;
                }
            }
           
            
        }
        
    }
    .ufbela{
        position: fixed;
        font-size: 30px;
        left:92%;
        top:90%;
        z-index: 999;
        cursor: pointer;
    }
    .fubiaoti{
        position: fixed;
        top:20%;
        left:70%;
        width: 200px;
        height: 400px;
        border-radius: 50px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        background-color: #fff;
        z-index: 99999;
        padding-top: 20px;
        text-align: center;
    }

}
</style>

