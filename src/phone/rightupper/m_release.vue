<template>
    <div class="re">
        <!-- 头部 -->
        <mtop></mtop>
        <!-- 中间显示信息 -->
       <div v-if="num==0">
         <div class="center">
            <!-- 图片加内容 -->
            <div class="relase">
                <img :src="release.rurl" width="300px" height="300px" alt="">
                <h2 class="wenzi">{{release.rname}}</h2>
                <div class="text">
                    <p><span style="color:black;">标签：</span>   <span>{{release.rtag}}</span></p>
                    <p><span style="color:black;">评价:</span>   <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate></p>
                    <p><span style="color:black;">人均消费:</span>    <span style="color:red;">{{release.rcost}}</span>￥</p>
                    <p><span style="color:black;">类型:</span>    <span>{{release.rtype}}</span></p>
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
                               <span v-if="Object.keys(item.rccomment).length==0">暂时还没有人回复
                                          
                               </span>
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
             </el-tabs>
            </div>
       
            
        </div>
       </div>
    </div>
</template>

<script>
import mtop from '../rightupper/m_top.vue'
export default {
    data(){
        return{
            value:'',
            sum:0,//存放总评论数量
            count:3,//默认显示多少
            release:'',
            num:0,//切换窗体
            textarea:'',
            textarea2:'',
            textarea3:'',
            textfont:1,//评论初始大小
            textfalg:false,//控制显示评论的按钮
            textfalg2:false,
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
        this.getComment()
    },
    methods: {
         //天气的处理
        getRelease(){
            this.release=JSON.parse(localStorage.getItem('release'));
            this.formdate.rid=this.release.rid;
            if(this.release.rtag.length>68){
                var string1 =this.release.rtag
                this.release.rtag=string1.substr(1,68)+"..."
            }
             this.value=parseFloat(this.release.rating);
            if(this.release.rcost=='[]'){
                this.release.rcost="";
            }
        },
        UserData(i){
            this.postRequest("/user/SelectUserid",{id:i}).then(req=>{
                var data=req.data
                if(data.code==0){
                     this.$router.push({name:'m_data',params:{user:data.data}});
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
            this.$router.push({name:'readmorevideo',params:{video:video1}});
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
                       message:'用户:'+user.name+',回复了您在店铺('+this.release.name+")评论的内容",
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
            this.formdate.rcctext=this.textarea3;
              var user=this.$store.getters.getUser;
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
                       message:'用户:'+user.name+',回复了您在店铺('+this.release.name+")评论的内容",
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
    components:{
        mtop,
    }
}
</script>
<style lang="scss" scoped>
.re{
    background-color: #fff;
    .center{
        margin: auto;
        .relase{
            padding-bottom: 20px;
            padding-left:30px;
            .wenzi{
                 margin-top: 20px;
                padding-bottom:20px;
            }
            .text{
                line-height: 40px;
            }
        }
    }
.rcenter2{
    background-color: #fff;
    margin: auto;
    .center2div{
        width: 390px;
        padding-top: 30px;
        padding-bottom: 10px;
        background-color: #fff;
        padding-left: 10px;
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
               
               }
             }
              .rccommt{
                color: cornflowerblue;
                font-size: 24px;
              
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
             width: 210px;
             margin: auto;
             border-radius: 10px;
             }
          }
         
       }
       .rcommentSUM{
           color:#67a7d5;
        
           padding-left: 160px;
       }
    }
  }
}
</style>
