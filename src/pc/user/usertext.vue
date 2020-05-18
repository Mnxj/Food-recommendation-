<template>
  <div>
    <span v-if="Object.keys(this.usertext).length==0">暂时还没有日志更新，快去上传攻略打卡地吧...</span>
    <span v-else> 
            <div class="mui-card" v-for="(item,i) in usertext" :key="item.essayid">
                <div class="usertextimg">
                    <img :src="item.essayurl" alt="">
                </div>
		    <div class="mui-card-content">
			    <div class="mui-card-content-inner">
				    <p>{{item.essaytime}}</p>
				    <p style="color: #333;">{{item.essaytitle}}&nbsp;&nbsp;&nbsp; <span style="font-size:12px;color:#ddd;">({{item.essaysource}})</span></p>
			    </div>
		    </div>
		    <div class="mui-card-footer">
			    <span><i @click="eaddlike(i,1)" v-if="item.likeflag" class="el-icon-star-off vcstatr" ></i>
                <i @click="eaddlike(i,2)" v-else class="el-icon-star-on vcstatr" ></i> {{item.elikecount}}<span > Like</span></span>
			    <a class="mui-card-link" style=" cursor: pointer;"  @click="readmoretext(i)">详情</a>
	 	    </div>
	     </div>
        <p style="cursor: pointer;" @click="readmoretext2">查看更多</p>
    </span> 
  </div>
</template>

<script>
export default {
    data() {
        return {
            usertext:[],//保存查询到的日志数据
            utext:{
                radname:'曲阜市',
                radcode:'',
                pag:1,//用作分页
                id:''
            },
            textlike:{
                essayid:'',
                id:'',
                eslike:'',
            },
        }
    },
    created(){
    this.getUsertext()
    },
    methods: {
        getUsertext(){
            var radname=JSON.parse(localStorage.getItem('radname'));
            if(radname!=''&&radname!='undefined'&&radname!=null){
                 this.utext.radname=radname;
            }
            this.utext.id=this.$store.getters.getUser.id;
            this.postRequest("/essay/SelectAllRname",this.utext).then(req=>{
                var data=req.data;
                this.usertext=data.data;
            })
        },
        readmoretext(i){
            var Text1=this.usertext[i]
            this.$router.push({name:'readmoretext',params:{Text:Text1}});
        },
        eaddlike(i,num){
            this.textlike.essayid=this.usertext[i].essayid;
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
                        this.usertext[i].likeflag=false;
                        this.usertext[i].elikecount=this.usertext[i].elikecount+1;
                    }
                    if(bol=='false'){
                        this.usertext[i].likeflag=true
                        this.usertext[i].elikecount=this.usertext[i].elikecount-1;
                    }
                }
            })
        },
        readmoretext2(){
            var radname1=this.message;
            this.$router.push({name:'readmoretext2',params:{radname:radname1}});
        }
    },
    props:['message'],
}
</script>
<style lang="scss" scoped>
    .usertextimg{
        border: 1px solid #ddd;
        img{
            height: 40vw;
        }
    }
    .vcstatr{
            color:orangered;
            margin-right: 3px;
            font-size: 22px;
            cursor: pointer;
    }
</style>

