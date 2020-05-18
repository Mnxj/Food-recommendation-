<template>
<div class="sms"> 
   <mtop></mtop>
   <div class="usMs" >
       <!-- 店铺信息遍历 -->
       <span v-if="Object.keys(this.list).length==0">
         <p>该地区暂时没有数据</p></span>
        <span v-else>
          <div v-for="(item,i) in list" :key="item.rid">
		 		    <div class="mui-card-content hezi">
					    <img :src="item.rurl" alt="" @click="Release(i)">
		 	    	</div>
		 		    <div class="mui-card-footer">
             	<div class="mui-media-body">		
						    <p>{{item.rname}}</p>
			 		    </div>
		 		    </div>
			    </div>
        </span>
   </div>
</div>
</template>

<script>
import mtop from '../rightupper/m_top.vue'
export default {
  data(){
    return{
      html1:"</el-row>",
      html2:"<el-row style='width:100%;'>",
      list:[],
      ipLocation:'',
      release:{
          rlong:116.991885,
          rlat:35.592788,
          m:2000,//多少范围内的
          rtype:'餐饮服务',
      },
      radname:'曲阜市'
    }
  },
  created(){
    this.getRelease()
  },
  methods: {
    getRelease(){
      var num=this.$route.params.num;
      if(num==1){
        this.release.rtype='餐饮服务'
      }else if(num==2){
        this.release.rtype='风景名胜'
      }
      this.postRequest('/release/selectRelease',this.release).then(
           resp=>{
                var data=resp.data;
                if(data.code=='0'){
                   this.list=data.data;
                   this.radname=this.list[0].radname;
                 }
      })
    }, 
    Release(i){
      localStorage.setItem('release',JSON.stringify(this.list[i]))
      this.$router.push({name:'m_release'});
    }
  },
  components:{
    mtop
  }
}
</script>

<style lang="scss" scoped>
.sms{
  background-color: #fff;
.usMs{
  	margin:11px;
	  border: 1px  solid #ADD8E6;
	 box-shadow: -5px 5px 8px  #DCDCDC;
	 background-color: antiquewhite;
   img{
     width: 200px;
     height: 200px;
     max-width: 100%;
     max-height: 100%;
   }
}
}
</style>
