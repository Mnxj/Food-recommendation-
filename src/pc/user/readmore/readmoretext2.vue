<template>
    <div>
        <!-- 头部 -->
       <utop></utop>
       <div class="readmoretext2">
        <!-- 店铺信息遍历 -->
        <div v-for="(item, i) in Eassy" :key="item.essayid">
          <span v-if="i%4==0"><div v-html="html4"></div></span>
           <el-col :span="6"><div class="grid-content bg-purple image" @click="readmoretext4(i)">
              <img :src="item.essayurl">
              <!-- <i class="el-icon-video-pause"></i> -->
              <div class="uservideotext">
                  <i style=" float: left;color: lightgreen;"><span style="color:#ddd; font-size:14px;">观看{{item.ecount}}</span></i>
                  
                  <p style="float:right;">{{item.essaytitle}}</p>
              </div>
           </div></el-col>
           <span v-if="(i+1)%4==0"><div v-html="html3"></div></span>
        </div>
       </div>
    </div>
</template>
<script>
import utop from '../relesase/utop'
export default {
    data() {
        return {
            Eassy:[],//保存查询到的视频数据
            essay:{
                radname:'',
                radcode:'',
            },
            html3:"</el-row>",
            html4:"<el-row style='width:100%;'>",
        }
    },
    created(){
      this.getUseressay()
    },
    methods: {
        getUseressay(){
            this.essay.radname=this.$route.params.radname;
            this.postRequest("/essay/SelectAllRname2",this.essay).then(req=>{
                var data=req.data;
                this.Eassy=data.data;
                console.log(this.Eassy)
            })
        },
         readmoretext4(i){
           var Text1=this.Eassy[i]
            this.$router.push({name:'readmoretext',params:{Text:Text1}});
        }
    },
     components: {
      utop
  }
}
</script>
<style lang="scss" scoped>
.readmoretext2{
 width: 800px;
 margin: auto;
 img{
     width: auto;
     height: auto;
     max-width: 100%;
     max-height: 100%;
   }
   .image{
     width: 180px;
     height: 180px;
     border: 1px solid #ddd;
     border-radius: 20px;
     margin-left: 23px;
     margin-top: 12px;
   
     cursor: pointer;
     .uservideotext{
         width: 140px;
         position:absolute;
         z-index: 200;
         margin-top: -25px;
         margin-left: 10px;
         margin-right: 10px;
     }
   }
}
</style>

