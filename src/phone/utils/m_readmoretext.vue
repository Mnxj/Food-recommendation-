<template>
    <div>
        <!-- 头部 -->
       <div class="readmretext">
            
           <div class="readmretext2">
               <mtop></mtop>
               <div class="rtop">
                 <h3>《{{moretext.essaytitle}}》</h3>
                 <p>作者：</p>
               </div>
               <div  style="padding: 20px; background-color: beige;">
                   <span v-html="moretext.essaycontent"></span>
                   <div style="font-size:12px;  padding-top: 30px; color:#9D9D9D;">
                      <span>{{ecount}}阅读</span>
                      <span style="padding-left:50px;">标签：{{moretext.dynamicTags}}</span>
                      <span style="float: right;">发布于{{moretext.essaytime}}</span>
                    </div>
                    <hr>
                    <div class="rvtbox">
                      <span><i @click="eaddlike(1)" v-if="moretext.likeflag" class="el-icon-star-off vcstatr" ></i>
                      <i @click="eaddlike(2)" v-else class="el-icon-star-on vcstatr" ></i> {{moretext.elikecount}}<span > Like</span></span>
                      <span class="rccommt"><i style="margin-left: 10px; cursor: pointer;" class="el-icon-chat-square"></i>
                      </span><span>{{moretext.ercomment}}条<span @click="textFlag" style="cursor: pointer; color:dodgerblue;">评论</span></span>'
                    </div>
               </div>
                <span v-if="etextfalg">
                    <div class="readplbox">
                        <div class="rvrpl">
                            <!-- 先查询一个评论列表，然后下面显示一个输入框 -->
                            <div class="rvrplcenter">
                                <p><span v-if="Object.keys(this.ecomment).length==0">暂时还没有人评论</span>
                                    <span v-else>
                                        <div v-for="(item,i) in ecomment" :key="item.ecid">
                                            <div  class="vcomment" v-if="i<count">
                                                 <div class="vecomment">
                                                    <img  :src="item.src" alt="" @click="UserData(item.id)" style="  cursor: pointer;">
                                                        <p class="vcommentfont">{{item.name}}</p>
                                                </div>
                                                <p style="padding-top:7px;padding-left:5px; color:#000;font-size:13px;">{{item.ectext}}</p>
                                                <p style="text-align: right;font-size:12px;">{{item.ecdate}}</p>
                                                <div class="vcbox">
                                                    <span class="vcztongbox"><i @click="addlike(item.ecid,1)" v-if="item.elike" class="el-icon-star-off vcstatr"></i>
                                                    <i @click="addlike(item.ecid,2)" v-else class="el-icon-star-on vcstatr"></i><span style="color: cornflowerblue; font-size:12px;"> {{item.ecount}} 赞同</span></span>
                                                    <span class="vccommt"><i @click="VFalgFont(i,item.ecid,item.id)" class="el-icon-chat-square"></i></span><span style="font-size:12px;">{{item.count}}条评论</span>
                                                    <a v-if="item.etrashflag" style="float :right; cursor: pointer;" @click="Readtexttrash(item.ecid,item.id)"><span class="mui-icon mui-icon-trash" style="font-size:18px;"></span></a>
                                                </div>
                                                <span v-if="item.elflag">
                                                <!-- 有人回复 -->
                                                <div class="vcboxzz">
                                                    <span v-if="Object.keys(item.eccomment).length==0">暂时还没有人回复
                                                    </span>
                                                <span v-else>
                                                    <div v-for="(item2,n) in item.eccomment" :key="item2.eccid">
                                                        <div class="boxcommentc">
                                                            <img  :src="item2.src" alt="" @click="UserData(item2.id2)" style="  cursor: pointer;">
                                                            <p style=" font-size: 12px;">&nbsp;{{item2.name2}} <span style="color:#000;">&nbsp;回复：</span>{{item2.name1}} </p>
                                                            <p style="padding-top:10px;padding-left:5px;padding-bottom:6px; color:#000; font-size: 12px;">{{item2.ecctext}}</p>
                                                            <p style="text-align: right; font-size: 12px;">{{item2.eccdate}}</p>
                                                            <div class="vcbox">
                                                                <span class="vcztongbox"><i @click="addlike2(i,item.ecid,item2.eccid,1)" v-if="item2.elike" class="el-icon-star-off vcstatr"></i>
                                                                <i @click="addlike2(i,item.ecid,item2.eccid,2)" v-else class="el-icon-star-on vcstatr"></i><span style="color: cornflowerblue;font-size:12px;"> {{item2.ecount}} 赞同</span></span>
                                                                <span class="vccommt"><i class="el-icon-chat-square" @click="EHf(i,n)"></i></span><span style="font-size:12px;">回复</span>
                                                                 <a v-if="item2.etrashflag2" @click="Readtexttrash2(i,item2.eccid,item2.id2)" style="float :right; cursor: pointer;"><span class="mui-icon mui-icon-trash" style="font-size:18px;"></span></a>
                                                            </div>
                                                        </div>
                                                        <div class="vcbox2" v-if="item2.ehf">
                                                            <el-input type="textarea"  @focus="Focus2(i,n)" :rows="item2.textfont2" placeholder="回复..." v-model="etextarea2"> </el-input>
                                                            <el-button v-if="item2.ebutton"  type="primary" plain @click="addCommentcc(i,item2.id2)">提交</el-button>
                                                        </div>
                                                    </div>
                                                </span>
                                                <el-input type="textarea"  @focus="Focus3(i)" :rows="item.etextfont2" placeholder="评论..." v-model="etextarea2"> </el-input>
                                                <el-button v-if="item.ebutton"  type="primary" plain @click="addCommentc(i)">提交</el-button>
            
                                                </div>
                                                </span>

                                            </div>
                                            <span v-else-if="i==count">
                                                <span class="vcommentSUM"  @click="count=count+3">加载更多</span>
                                            </span>
                                        </div>
                                    </span>
                                </p>
                            </div>
                            <el-input type="textarea"  @focus="Focus" :rows="etextfont" placeholder="写下你的评论..." v-model="etextarea"> </el-input>
                            <el-button v-if="etextfalg2" style=" left:250px;" type="primary" plain @click="addEComment">提交</el-button>
                        </div>
                    </div>
                </span>
           </div>
       </div>
    </div>
</template>

<script>
import mtop from '../rightupper/m_top'
export default {
    data() {
        return {
            ecount:0,
            etextarea:"",//内容
             etextarea2:'',
            etextarea3:'',
            count:3,//默认显示多少
            etextfont:1,//现实
            etextfalg:false,
            etextfalg2:false,
            src:'',
            url:'',
            ePl:0,//评论
            sum:0,//存放总评论数量
            //接受数据
            moretext:'',//接受传过来的参数
            ecomment:[],//存放评论
            //发送去的数据
            formdate:{
                essayid:'',
                ectext:'',
                id:'',
                ecid:'',//评论
                id1:'',//评论用户
                id2:'',//当前用户
                flag:'',
                ecctext:''
            },
             //点赞
            like:{
                elike:'',
                elike2:'',
                id:'',
                ecid:'',
                eccid:'',
            },
            textlike:{
                dynamicTags:'',
                essayid:'',
                id:'',
                eslike:'',
            },
            //删除
            redtexttrash:{
                id:'',
                ecid:'',
                eccid:'',
                id2:'',
            }
        }
    },
    created(){
        this.getmoretext()
    },
    methods: {
        UserData(i){
            this.postRequest("/user/SelectUserid",{id:i}).then(req=>{
                var data=req.data
                if(data.code==0){
                     this.$router.push({name:'m_data',params:{user:data.data}});
                }
            })
        },
        //简单的逻辑判断
        textFlag(){
            this.etextfalg=!this.etextfalg;
            if(!this.etextfalg){
                this.etextfalg2=false;
                this.etextfont=1;
            }else{
               this.getEComment()
            }
        },
        eaddlike(num){
            this.textlike.essayid=this.moretext.essayid;
            this.textlike.id=this.$store.getters.getUser.id;
            if(num==1){
               this.textlike.eslike='true'
            }else{
                this.textlike.eslike='false'
            }
            this.postRequest("/essay/addLike",this.textlike).then(req=>{
                var data=req.data;
                if(data.code==0){
                    var bol=data.data;
                    if(bol=='true'){
                        this.moretext.likeflag=false;
                        this.moretext.elikecount=this.moretext.elikecount+1;
                    }
                    if(bol=='false'){
                        this.moretext.likeflag=true
                        this.moretext.elikecount=this.moretext.elikecount-1;
                    }
                }
            })
        },
        //初始化
        getmoretext(){
            this.moretext=this.$route.params.Text;
            //获取播放量
            this.postRequest("/essay/addEcount",this.moretext).then(req=>{
                var data=req.data;
                this.ecount=data.data;
            })
            this.formdate.essayid=this.moretext.essayid;
            //获取所有的评论
            this.getEComment()
        },
        EHf(i,n){
            if(!this.ecomment[i].eccomment[n].ehf){
                 this.ecomment[i].eccomment[n].textfont2=1;
                 this.ecomment[i].eccomment[n].ebutton=false;
            }
            this.ecomment[i].eccomment[n].ehf=!this.ecomment[i].eccomment[n].ehf;
        },
        //显示输入框
        Focus(){
            this.etextfont=4;
            this.etextfalg2=true;
        },
        Focus2(i,n){
             this.ecomment[i].eccomment[n].textfont2=3;
             this.ecomment[i].eccomment[n].ebutton=true;
        },
        Focus3(i){
            this.ecomment[i].etextfont2=3;
            this.ecomment[i].ebutton=true;
        },
         //打开和关闭子评论的窗口
        VFalgFont(i,num,num2){
           var user=this.$store.getters.getUser;
           this.formdate.ectext=this.etextarea;
           this.formdate.id=user.id;
           this.ecomment[i].elflag=!this.ecomment[i].elflag;
           this.formdate.ecid=num;
           this.formdate.id1=num2;
           this.formdate.id2=this.formdate.id
            if(this.ecomment[i].elflag){
                this.ecomment[i].etextfont2=1;
                this.ecomment[i].ebutton=false;
                this.getECommentc(i);
            }else{
               this.ecomment[i].etextfont2=3;
               this.ecomment[i].ebutton=true;
            }
        },
        //删除
        Readtexttrash(num,num2){
            this.redtexttrash.id=num2;
            this.redtexttrash.ecid=num;
             this.postRequest("/ecommentc/ecreleasetrash",this.redtexttrash).then(req=>{
                var data=req.data;
                if(data.code==0){
                    
                   this.getEComment()
                }
            })
        },
        Readtexttrash2(i,num,num2){
            this.redtexttrash.id2=num2;
            this.redtexttrash.eccid=num;
            this.postRequest("/eccomment/ereleaseromeve",this.redtexttrash).then(req=>{
                 var data=req.data;
                if(data.code==0){
                 
                   this.ecomment[i].count=this.ecomment[i].count-1;
                   this.getECommentc(i);
                   this.textFlag2(i);
                }
            })
        },
        //喜欢
        addlike(num2,num3){
            this.like.id=this.formdate.id;
            this.like.ecid=num2;
            if(num3==1){
                this.like.elike='true';
            }else{
                this.like.elike='false';
            }
             this.postRequest("/ecommentc/ecaddrzcan",this.like).then(req=>{
                var data=req.data;
                if(data.code==0){
                    this.getEComment()
                }
            })
        },
        addlike2(i,count,num2,num3){
            this.like.id=this.formdate.id;
            this.like.eccid=num2;
            this.like.ecid=count;
            if(num3==1){
                this.like.elike2='true';
            }else{
                this.like.elike2='false';
            }
            this.postRequest("/eccomment/eaddrzcan",this.like).then(req=>{
                var data=req.data;
                if(data.code==0){
                  this.getECommentc(i)
                }
            })

        },
        //获取评论信息
        getEComment(){
             this.formdate.id=this.$store.getters.getUser.id;
             this.postRequest('/ecommentc/ecselectAll',this.formdate).then(
                 resp=>{
                 this.ecomment=resp.data.data;
                 this.sum=this.ecomment.length;
             })
        },
        //获取子评论
        getECommentc(i){
            this.postRequest("/eccomment/eselectAll",this.formdate).then(req=>{
                    var data=req.data;
                     if(data.code==0){
                            this.ecomment[i].eccomment=data.data;
                      }
            })
        }, 
        //添加评论
        addEComment(){
            var user=this.$store.getters.getUser;
            this.formdate.ectext=this.etextarea;
            this.formdate.id=user.id;
            this.postRequest('/ecommentc/ecaddComment',this.formdate).then(
             resp=>{
                 var data=resp.data;
                 if(data.code==0){
                   this.getEComment()
                   this.etextarea=''
                 }
             }) 
        },
        addCommentc(i){
             this.formdate.ecctext=this.etextarea2;
             var user=this.$store.getters.getUser;
            this.formdate.ecid=this.ecomment[i].ecid;
             this.postRequest('/eccomment/eaddComment',this.formdate).then(
             resp=>{
                 var data=resp.data;
                 if(data.code==0){
                  
                   this.postRequest('/api/ws/sendOne',{
                       id:user.id,
                       type:2,
                       message:'用户:'+user.name+',回复了您在日志('+this.moretext.essaytitle+")评论的内容",
                       id2:this.ecomment[i].id,
                       menuid:this.moretext.essayid,
                       menu:'日志',
                       url1:this.moretext.essayurl
                    }).then(req=>{})
                   this.ecomment[i].count=this.ecomment[i].count+1;
                   this.getECommentc(i);
                  this.etextarea2=''
                 }
             })
        },
        addCommentcc(i,num){
            this.formdate.ecctext=this.etextarea3;
            var user=this.$store.getters.getUser;
            this.formdate.id1=num;
            this.formdate.id2 =this.formdate.id;
             this.postRequest('/eccomment/eaddComment',this.formdate).then(
             resp=>{
                 var data=resp.data;
                 if(data.code==0){
                   
                   this.postRequest('/api/ws/sendOne',{
                       id:this.formdate.id2,
                       type:2,
                       message:'用户:'+user.name+',回复了您在日志('+this.moretext.essaytitle+")评论的内容",
                       id2:this.formdate.id1,
                       menuid:this.moretext.essayid,
                       menu:'日志',
                        url1:this.moretext.essayurl
                    }).then(req=>{})
                   this.ecomment[i].count=this.ecomment[i].count+1;
                   this.getECommentc(i);
                    this.etextarea3=''
                 }
             })
        },
    },
     components: {
      mtop
  }
}
</script>
<style lang="scss" scoped>
.readmretext{
    background-color: #fff;
    .readmretext2{
       box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .rtop{
            margin-top: -60px;
            padding-top: 30px;
            text-align: center;
            line-height: 35px;
            background-color: antiquewhite;
            padding-bottom: 20px;
           
        }
        .rvtbox{
            color: #ddd;
            font-size: 14px;
            padding-bottom: 20px;
            .vcstatr{
                color:orangered;
                margin-right: 3px;
                font-size: 22px;
          }
        }
        .readplbox{
          .rvrpl{
            background-color: #fff;
            border-radius: 4px;
            padding-bottom: 40px;
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
                               
                            }
                        }
                        .vccommt{
                            color: cornflowerblue;
                            font-size: 20px;
                            
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
                    }
                }
                .vcommentSUM{
                    color:#67a7d5;
                    padding-left: 160px;
                }
            }
          }
        }
    }
}
</style>

