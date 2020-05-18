<template>
    <div class="mdayvideo">
        <div class="mui-card">
			<span v-if="Object.keys(this.uservideo).length==0">暂时还没有vlog更新，快去上传攻略打卡地吧...</span>
       		<span v-else>
				<div  v-for="(item,i) in uservideo" :key="item.videoid">
		 			<div class="mui-card-content" >
						<img :src="item.videourl" alt="" width="100%" @click="getreadmorevideo(i)"/>
		 			</div>
		 			<div class="mui-card-footer">
             			<div class="mui-media-body">	
							  <i class="el-icon-video-play" style=" float: left;color: lightgreen;"><span style="color:#ddd; font-size:14px;">&nbsp;{{item.vcount}}</span></i>	
							<P>发表于{{item.videotime}}</P>
							<p>{{item.videotitle}} &nbsp;({{item.videosource}})</p>							
			 			</div>
		 			</div>
				 </div>
       		</span>
	   </div>
    </div>
</template>
<script>
export default {
	 data() {
        return {
            uservideo:[],//保存查询到的视频数据
            uvideo:{
                radname:'',
                radcode:'',
                pag:1,//用作分页
            },
        }
	},
	created(){
    	this.getUserVideo()
	},
	 methods: {
        getUserVideo(){
            this.uvideo.radname='曲阜市';
            this.postRequest("/video/SelectAllRname",this.uvideo).then(req=>{
                var data=req.data;
                this.uservideo=data.data;
            })
		},
		 getreadmorevideo(i){
            var video1=this.uservideo[i]
            this.$router.push({name:'m_readmorevideo',params:{video:video1}});
        },
	 }
    
}
</script>
<style lang="scss" scoped>
.mdayvideo{
	margin:11px;
	border: 1px  solid #ADD8E6;
	 box-shadow: -5px 5px 8px  #DCDCDC;
	 background-color:cornsilk;
	 img{
        height: 200px;
    }
}
</style>
