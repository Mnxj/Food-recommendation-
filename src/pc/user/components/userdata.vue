<template>
    <div>
        <div class="Fccenterbox2">
             <span v-if="getUserlist=='undefined'||getUserlist==''||getUserlist==null">暂时没有共同好友。</span>
             <span v-else>
            <!-- 左边是用户 -->
            <div class="Fccenterbox2f" >
                 <!-- 这里的标签名称要和main.js文件中定义的组件名称保持一致 -->
                <div v-for="(item,i) in getUserlist" :key="item.id" >
                    <happy-scroll color="rgba(0,0,0,0.5)" size="1">
                        <div @click="bg(i)" class="Tchar">
                            <img :src="item.src" alt=""> &nbsp;&nbsp;&nbsp;
                            <span>{{item.name}}</span>
                            <span style="font-size:13px; color:#5D5D5D;">&nbsp;&nbsp;<span v-if="item.userflag">
                                在线
                            </span>
                            <span v-else>
                                离线
                            </span>
                            </span>
                        </div>
                    </happy-scroll>
                    <!-- 右边是输入框 -->
                    <div v-if="item.newsfalg" >
                        <div class="Fccenterbox3" >
                            <div style=" padding-top: 15px;text-align: center;pading-bottom:5px;">
                                <p style="color:#000;">正在与&nbsp;<span style=" width: 120px;height: 70px;font-size:17px;color: darkgoldenrod;
                                font-weight: bold;background-color: antiquewhite;border-radius: 50px;"> &nbsp;{{item.name}} &nbsp;</span>&nbsp;聊天</p>
                            </div>
                            <div style="width: 680px; height: 420px;">
                            <happy-scroll color="rgba(0,0,0,0.5)" size="1">
                                &nbsp;
                                <div v-for="item in getEventlist" :key="item.idd" style=" width: 680px;">
                                    <span v-if="item.id==user.id" >
                                        <div class="box3r">
                                            <img :src="item.url1" alt="">
                                            <span style="font-size: 16px;">{{item.message}}</span>
                                            <br>
                                            <p>{{item.date}}</p>
                                        </div>
                                    </span>
                                    <span v-else>
                                        <div class="box3l">
                                            <img :src="item.url2" alt=""  @click="UserData(item.id2)">
                                            <span style="font-size: 16px;">{{item.message}}</span>
                                            <br>
                                            <p style="float: right;">{{item.date}}</p>
                                        </div>
                                    </span>
                                </div>
                            </happy-scroll>
                            </div>
                            <br>
                        </div>
                        <div class="Fccenterboxmin">
                            <el-input class="shuru" v-model="input" placeholder="请输入内容"></el-input>
                            <el-button type="primary" @click="sumbit(i)"><i class="el-icon-s-promotion"></i>&nbsp;发送</el-button>
                        </div>
                    </div>
                 </div>
            </div> 
             </span>          
        </div>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            user:'',
            input:"",
            listuser:[],
            count:0,
        }
    },
    created(){
        this.getUser()
    },
    methods:{
        UserData(i){
            this.postRequest("/user/SelectUserid",{id:i}).then(req=>{
                var data=req.data
                if(data.code==0){
                     this.$router.push({name:'userdata',params:{user2:data.data}});
                }
            })
        },
        getUser(){
            this.user=this.$store.getters.getUser;
            this.count=this.user.id;
            // this.postRequest('/user/SelectR',{id1:this.user.id}).then(req=>{
            //     var data=req.data;
            //     this.listuser=data.data;
            // })
        },
       bg(i){
           this.getUserlist[i].newsfalg=!this.getUserlist[i].newsfalg;
            this.$websocket.dispatch('getEventlist',this.getUserlist[i].id);
       },
       sumbit(i){
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth();//得到月份
            var date = now.getDate();//得到日期
             var day = now.getDay();//得到周几
            var hour = now.getHours();//得到小时
            var minu = now.getMinutes();//得到分钟
            var sec = now.getSeconds();//得到秒
            var week;
            month = month + 1;
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            if (hour < 10) hour = "0" + hour;
            if (minu < 10) minu = "0" + minu;
            if (sec < 10) sec = "0" + sec;
           if(this.input!=''){
                var data={
                    id:this.user.id,
                    type:1,
                    message:this.input,
                    id2:this.getUserlist[i].id,
                    url2:this.getUserlist[i].src,
                    url1:this.user.src,
                    date:year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec 
                }
                console.log(data)
              //  this.$websocket.dispatch('adduserdata',data);
                this.postRequest('/api/ws/sendOne',data).then(req=>{})
           }
           
            this.input=''
       }
    },
    computed:{     
        getEventlist(){
           return this.$websocket.getters.getUserdata();
        },
        getUserlist(){
           return this.$websocket.getters.getUserlist();
        },
    }
    
}
</script>
<style lang="scss" scoped>
.Fccenterbox2{
    .Fccenterbox2f{
        width: 1024px;
        padding-left: 30px;
        
        .Tchar{
            padding-top: 13px;
            padding-left: 20px;
            width: 200px;
            height: 60px;
            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
            cursor: pointer;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50px;
            }
        }
        .Fccenterbox3{
            width: 680px;
            height: 480px;
            background-color: #ffffff70;
            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            margin-left: 210px;  
            margin-top: -100px;
            padding-right:  15px;
            .box3r{
                 float: right;
                 width: 400px;
                 box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
                 border-radius: 20px;
                 padding-left: 20px;
                 margin-top: 7px;
                 margin-bottom: 7px;
                 padding-top: 10px;
                 margin-left: 15px;
                 padding-right: 20px;
                  img{
                   float: right;
                   width: 40px;
                   height: 40px;
                   border-radius: 50px;
                   }
            }
            .box3l{
                 float: left;
                 width: 400px;
                 box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
                 border-radius: 20px;
                 padding-left: 20px;
                 margin-top: 7px;
                 margin-bottom: 7px;
                 padding-top: 10px;
                 margin-left: 15px;
                 padding-right: 20px;
                  img{
                   width: 40px;
                   height: 40px;
                   border-radius: 50%;
                   }
            }
        }
        .Fccenterboxmin{
            width: 700px;
            margin-left: 210px;
            .shuru{
                width: 604px;
            }
        }
    } 
}
</style>

