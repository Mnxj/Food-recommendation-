<template>
    <div class="text">
        <div class="mui-card">
		   <span v-if="Object.keys(this.usertext).length==0">暂时还没有日志更新，快去上传攻略打卡地吧...</span>
    	   <span v-else> 
			<div v-for="(item,i) in usertext" :key="item.essayid">
		 		<div class="mui-card-content" >
					<img :src="item.essayurl" alt=""  @click="readmoretext(i)">
		 		</div>
		 		<div class="mui-card-footer">
             		<div class="mui-media-body">		
						<p>{{item.essaytitle}} &nbsp;({{item.essaysource}})</p>
						<p>发表于{{item.essaytime}}</p>
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
			 usertext:[],//保存查询到的日志数据
			  utext:{
                radname:'',
                radcode:'',
                pag:1,//用作分页
                id:''
            },
		}
	},
	created(){
    	this.getUsertext()
	},
	methods:{
		getUsertext(){
			this.utext.id=this.$store.getters.getUser.id;
            this.utext.radname='曲阜市';
            this.postRequest("/essay/SelectAllRname",this.utext).then(req=>{
                var data=req.data;
				this.usertext=data.data;
				
            })
		},
		 readmoretext(i){
            var Text1=this.usertext[i]
            this.$router.push({name:'m_readmoretext',params:{Text:Text1}});
		},
	}
    
}
</script>
<style lang="scss" scoped>
.text{
	margin:11px;
	border: 1px  solid #ADD8E6;
	 box-shadow: -5px 5px 8px  #DCDCDC;
	 background-color: antiquewhite;
	img{
        height: 70px;
    }
}
</style>
