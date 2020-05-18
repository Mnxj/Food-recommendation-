<template>
    <div >
      <utop></utop>
      <div class="readmorevideo2">
        <!-- 店铺信息遍历 -->
        <div v-for="(item, i) in uservideo" :key="item.videoid">
          <span v-if="i%4==0"><div v-html="html4"></div></span>
           <el-col :span="6"><div class="grid-content bg-purple image" @click="getreadmorevideo(i)">
              <img :src="item.videourl">
              <!-- <i class="el-icon-video-pause"></i> -->
              <div class="uservideotext">
                  <i class="el-icon-video-play" style=" float: left;color: lightgreen;"><span style="color:#ddd; font-size:14px;">&nbsp;{{item.vcount}}</span></i>
                  
                  <p style="float:right;">{{item.videotitle}}</p>
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
            uservideo:[],//保存查询到的视频数据
            uvideo:{
                radname:'',
                radcode:'',
            },
            html3:"</el-row>",
            html4:"<el-row style='width:100%;'>",
        }
    },
     created(){
    this.getUserVideo()
    },
    methods: {
        getUserVideo(){
            this.uvideo.radname=this.$route.params.radname;
            this.postRequest("/video/SelectAllRname2",this.uvideo).then(req=>{
                var data=req.data;
                this.uservideo=data.data;
                console.log(this.uservideo)
            })
        },
        getreadmorevideo(i){
            var video1=this.uservideo[i]
            this.$router.push({name:'readmorevideo'});
            localStorage.setItem('video',JSON.stringify(video1))
        }
    },
   components: {
      utop
   }
}
</script>
<style lang="scss" scoped>
.readmorevideo2{
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
